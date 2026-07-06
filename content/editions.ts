export type EditionStatus = "current" | "upcoming" | "archived" | "sold-out";

export type Edition = {
  slug: string;
  number: string;
  name: string;
  paletteKey: string;
  status: EditionStatus;
  theme: string;
  dispatchWindow: string;
  description: string;
  contents: string[];
};

/**
 * Placeholder edition line-up per the brand's initial plan. Real cover
 * artwork, exact dispatch dates and final contents lists belong in the
 * Stage 2 Edition Manager — these are realistic stand-ins, not filler text.
 */
export const editions: Edition[] = [
  {
    slug: "hallowtide",
    number: "001",
    name: "Hallowtide",
    paletteKey: "autumn",
    status: "upcoming",
    theme: "Folklore, changing light, and small rituals found on walks.",
    dispatchWindow: "Late October",
    description:
      "Our first edition follows the turn into autumn — the things we noticed on darkening walks, the folklore we went looking for, and a few small rituals worth keeping as the light changes.",
    contents: [
      "A mini art print inspired by hedgerow finds",
      "A folklore note on the old names for autumn moons",
      "A recipe card for something warm",
      "A journal prompt for noticing the last of the light",
      "A wax-sealed keepsake, different for every subscriber",
    ],
  },
  {
    slug: "midwinter",
    number: "002",
    name: "Midwinter",
    paletteKey: "winter",
    status: "upcoming",
    theme: "Cobalt skies, fireside stories, and things worth keeping close.",
    dispatchWindow: "Mid December",
    description:
      "A quieter edition for the shortest days — stories to read by lamplight, a small collectable for the mantelpiece, and a playlist for slow evenings.",
    contents: [
      "A postcard print in our winter colourway",
      "A short story from a guest writer",
      "A QR-linked seasonal playlist",
      "A pressed-paper bookmark",
    ],
  },
  {
    slug: "first-stirring",
    number: "003",
    name: "First Stirring",
    paletteKey: "spring",
    status: "upcoming",
    theme: "The first green shoots and the return of longer light.",
    dispatchWindow: "Early March",
    description:
      "Edition Three notices the first signs of spring — the smallest, easiest-to-miss ones. Expect green, yellow, and a little more hope than usual.",
    contents: [
      "An illustrated print of early bulbs",
      "A creative challenge for the new season",
      "A collector card",
      "A found-object-inspired keepsake",
    ],
  },
  {
    slug: "beltane",
    number: "004",
    name: "Beltane",
    paletteKey: "summer",
    status: "upcoming",
    theme: "Old May Day traditions and the start of long evenings.",
    dispatchWindow: "Late April",
    description:
      "A celebration of the old fire festivals and the first properly long evenings of the year, with a nod to the folklore that comes with them.",
    contents: [
      "A mini print in tomato and pool blue",
      "A folklore note on May Day traditions",
      "A bookmark and sticker sheet",
    ],
  },
  {
    slug: "high-summer",
    number: "005",
    name: "High Summer",
    paletteKey: "summer",
    status: "upcoming",
    theme: "Sun-warmed streets, seaside finds, and long light evenings.",
    dispatchWindow: "Mid July",
    description:
      "Our warmest edition — things found at the seaside, on holiday, and on evenings that don't seem to end.",
    contents: [
      "A shell-motif collector card",
      "A recipe card for warm evenings",
      "A postcard from somewhere we visited",
    ],
  },
  {
    slug: "first-harvest",
    number: "006",
    name: "First Harvest",
    paletteKey: "autumn",
    status: "upcoming",
    theme: "The turn back towards autumn and gathering things in.",
    dispatchWindow: "Early September",
    description:
      "The year turns again. First Harvest gathers in what the year has given us, with a keepsake to mark the close of the cycle.",
    contents: [
      "A limited archive print",
      "A recipe card for preserving",
      "A closing note from the three of us",
    ],
  },
];

export function getEdition(slug: string): Edition | undefined {
  return editions.find((e) => e.slug === slug);
}
