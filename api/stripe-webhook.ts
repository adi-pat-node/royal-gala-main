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
    from: "notifications@wrengala.org",
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

async function sendGuestConfirmation(session: Stripe.Checkout.Session) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const guestEmail = session.customer_details?.email;
  if (!guestEmail) {
    console.error("Stripe webhook: missing customer email, skipping guest confirmation");
    return;
  }

  const guestName = session.customer_details?.name || "Guest";
  const isDonation = session.metadata?.type === "donation";

  const bodyLines = isDonation
    ? [
        `Dear ${guestName},`,
        "",
        "Thank you for your generous donation to The Wren Gala Dinner, taking place on Tuesday 29th September 2026 at St Bartholomew's Church, New York.",
        "",
        "Your support is greatly appreciated and helps us continue the vital work of St James's Piccadilly and the Changemaker Programme.",
        "",
        "In the meantime, if you have any questions, please don't hesitate to reply to this email.",
        "",
        "With best wishes,",
        "The Wren Gala Team",
      ]
    : [
        `Dear ${guestName},`,
        "",
        "Thank you for booking your place at The Wren Gala Dinner, taking place on Tuesday 29th September 2026 at St Bartholomew's Church, New York.",
        "",
        "We are delighted that you will be joining us for what promises to be a very special evening. Your booking has been received and is now confirmed.",
        "",
        "Your support is greatly appreciated.",
        "",
        "Over the coming weeks, we will be in touch with further event information, including timings and any details we require from you ahead of the Gala.",
        "",
        "In the meantime, if you have any questions, please don't hesitate to reply to this email.",
        "",
        "We look forward to welcoming you in September.",
        "",
        "With best wishes,",
        "The Wren Gala Team",
      ];

  await resend.emails.send({
    from: "notifications@wrengala.org",
    to: guestEmail,
    replyTo: "rsvp@sjp.org.uk",
    subject: "Thank you for your booking — The Wren Gala Dinner, New York 2026",
    text: bodyLines.join("\n"),
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

    if (session.metadata?.tier || session.metadata?.type === "donation") {
      try {
        await sendGuestConfirmation(session);
      } catch (error) {
        console.error("Failed to send guest confirmation email:", error);
      }
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
