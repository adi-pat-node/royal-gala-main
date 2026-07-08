import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-06-24.dahlia",
});

const NOTIFICATION_RECIPIENTS = [
  "rsvp@sjp.org.uk",
  "Rhiannon.Richards@Quintessentially.com",
  "Helen.Skybak@Quintessentially.com",
];

async function sendBookingNotification(session: Stripe.Checkout.Session) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const name = session.customer_details?.name ?? "Not provided";
  const email = session.customer_details?.email ?? "Not provided";
  const phone = session.customer_details?.phone ?? "Not provided";
  const tier = session.metadata?.tier ?? "Not provided";
  const bookingType = session.metadata?.bookingType ?? "Not provided";

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: NOTIFICATION_RECIPIENTS,
    subject: "New Royal Gala Booking",
    text: [
      "A new Royal Gala booking has been completed.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Ticket Tier: ${tier}`,
      `Booking Type: ${bookingType}`,
    ].join("\n"),
  });
}

// Signature verification needs the raw request body, so the default body parser must stay off.
export const config = {
  api: {
    bodyParser: false,
  },
};

function readRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const signature = req.headers["stripe-signature"];

  // TODO: set STRIPE_WEBHOOK_SECRET in the Vercel project env after the webhook endpoint is created in Stripe.
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || !signature || typeof signature !== "string") {
    console.error("Stripe webhook: missing signature or STRIPE_WEBHOOK_SECRET");
    return res.status(400).json({ error: "Webhook not configured" });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await readRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return res.status(400).json({ error: "Invalid signature" });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await sendBookingNotification(session);
    } catch (error) {
      console.error("Failed to send booking notification email:", error);
    }

    // Fallback for debugging in case the notification email fails or Resend is misconfigured.
    console.log("Checkout session completed:", {
      name: session.customer_details?.name,
      email: session.customer_details?.email,
      phone: session.customer_details?.phone,
      tier: session.metadata?.tier,
      bookingType: session.metadata?.bookingType,
    });
  }

  return res.status(200).json({ received: true });
}
