export type PricingPlan = {
  slug: string;
  name: string;
  price: string;
  interval: string;
  description: string;
  perks: string[];
  waitlistOnly: boolean;
  ukOnly: boolean;
};

/**
 * Placeholder pricing. Real prices, Stripe price IDs and waitlist toggles
 * belong in the Stage 3 Plan Manager — kept editable-shaped here so the
 * Pricing page doesn't need a rebuild once billing is wired up.
 */
export const pricingPlans: PricingPlan[] = [
  {
    slug: "letter-club",
    name: "Letter Club",
    price: "£18",
    interval: "per edition, bimonthly",
    description: "Our core subscription. A new edition every other month, delivered to your door.",
    perks: [
      "One full edition, six times a year",
      "Free UK shipping",
      "Access to the digital edition archive",
      "First access to Lost Letters events",
    ],
    waitlistOnly: true,
    ukOnly: true,
  },
  {
    slug: "collector-membership",
    name: "Collector Membership",
    price: "£95",
    interval: "per year",
    description: "For collectors who want the full year up front, plus a little extra.",
    perks: [
      "All six editions for the year",
      "Free UK shipping",
      "One exclusive collector card per edition",
      "Early access to one-off Lost Letters",
    ],
    waitlistOnly: true,
    ukOnly: true,
  },
  {
    slug: "gift-subscription",
    name: "Gift Subscription",
    price: "£18",
    interval: "per edition, gifted",
    description: "Send someone else a small treasure in the post, on a schedule you choose.",
    perks: [
      "Choose 1, 3 or 6 editions",
      "A printed gift note in the first envelope",
      "We handle the sending — you just choose who for",
    ],
    waitlistOnly: true,
    ukOnly: true,
  },
  {
    slug: "one-off-edition",
    name: "One-Off Edition",
    price: "£20",
    interval: "single edition",
    description: "Not ready to subscribe? Try a single edition first, while stock lasts.",
    perks: [
      "One current or archived edition",
      "No ongoing commitment",
      "Subject to availability",
    ],
    waitlistOnly: true,
    ukOnly: true,
  },
];
