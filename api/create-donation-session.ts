import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-06-24.dahlia",
});

function getBaseUrl(req: VercelRequest): string {
  if (typeof req.headers.origin === "string" && req.headers.origin) {
    return req.headers.origin;
  }
  const host = req.headers.host;
  const protocol = host?.startsWith("localhost") || host?.startsWith("127.0.0.1")
    ? "http"
    : "https";
  return `${protocol}://${host}`;
}

const MIN_DONATION_CENTS = 100;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { amount } = req.body as { amount?: number };

  if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid or missing amount" });
  }

  const unitAmount = Math.round(amount * 100);
  if (unitAmount < MIN_DONATION_CENTS) {
    return res.status(400).json({ error: "Donation amount is too small" });
  }

  const baseUrl = getBaseUrl(req);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: unitAmount,
            product_data: {
              name: "Royal Gala — Donation",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "donation",
      },
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/tickets`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe donation session error:", error);
    return res.status(500).json({ error: "Unable to create donation session" });
  }
}
