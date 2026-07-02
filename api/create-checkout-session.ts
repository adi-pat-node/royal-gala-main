import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
console.log("Key loaded:", process.env.STRIPE_SECRET_KEY ? "YES, starts with " + process.env.STRIPE_SECRET_KEY.slice(0, 12) : "NO");

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

type Tier = "1" | "2" | "3" | "4";
type BookingType = "individual" | "table";

const TIER_LABELS: Record<Tier, string> = {
  "1": "Tier 1",
  "2": "Tier 2",
  "3": "Tier 3",
  "4": "Tier 4",
};

// Amounts in cents. Individual = single ticket, table = table of 10.
const TIER_PRICES: Record<Tier, Record<BookingType, number>> = {
  "1": { individual: 500000, table: 5000000 },
  "2": { individual: 250000, table: 2500000 },
  "3": { individual: 150000, table: 1500000 },
  "4": { individual: 50000, table: 500000 },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { tier, bookingType } = req.body as { tier?: string; bookingType?: string };

  if (!tier || !TIER_PRICES[tier as Tier]) {
    return res.status(400).json({ error: "Invalid or missing tier" });
  }
  if (bookingType !== "individual" && bookingType !== "table") {
    return res.status(400).json({ error: "Invalid or missing bookingType" });
  }

  const amount = TIER_PRICES[tier as Tier][bookingType];
  const tierLabel = TIER_LABELS[tier as Tier];
  const bookingLabel = bookingType === "individual" ? "Individual Ticket" : "Table of 10";
  const baseUrl = getBaseUrl(req);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amount,
            product_data: {
              name: `Royal Gala — ${tierLabel} (${bookingLabel})`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        tier,
        bookingType,
      },
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/tickets`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session error:", error);
    return res.status(500).json({ error: "Unable to create checkout session" });
  }
}
