export type JournalCategory =
  | "Things We Noticed"
  | "Things We Collected"
  | "Things We Found"
  | "Things We Made"
  | "Things Worth Keeping";

export type JournalPost = {
  slug: string;
  title: string;
  subtitle: string;
  category: JournalCategory;
  date: string;
  author: string;
  excerpt: string;
  body: string[];
};

/**
 * Sample journal entries, ordered newest-first. Dates are all in the past
 * relative to the current date — these are already-published posts, so none
 * should ever be dated in the future. Replace with real posts via the CMS
 * (Stage 2).
 */
export const journalPosts: JournalPost[] = [
  {
    slug: "why-we-still-send-post",
    title: "Why we still send post",
    subtitle: "A short one, on the case for the letterbox",
    category: "Things Worth Keeping",
    date: "2026-06-20",
    author: "Catherine",
    excerpt:
      "An email disappears into a folder. A letter sits on the side until you've read it properly.",
    body: [
      "An email disappears into a folder. A letter sits on the side until you've read it properly.",
      "That's really the whole idea behind this.",
    ],
  },
  {
    slug: "printing-the-first-wax-seals",
    title: "Printing the first wax seals",
    subtitle: "Behind the scenes of our publisher's mark",
    category: "Things We Made",
    date: "2026-05-15",
    author: "Leah",
    excerpt:
      "It took more than a few attempts before the seal looked the way we'd drawn it.",
    body: [
      "It took more than a few attempts before the seal looked the way we'd drawn it.",
      "It felt right that the first thing we made for this brand was something you'd have to break to open.",
    ],
  },
  {
    slug: "the-shop-with-no-name",
    title: "The shop with no name",
    subtitle: "A find on a back street with no sign outside",
    category: "Things We Found",
    date: "2026-04-18",
    author: "Claire",
    excerpt:
      "No sign, no listing online, just a door left open and a room full of things someone had decided were worth keeping.",
    body: [
      "No sign, no listing online, just a door left open and a room full of things someone had decided were worth keeping.",
      "We left with a lot more than we went in for.",
    ],
  },
  {
    slug: "a-drawer-of-old-stamps",
    title: "A drawer of old stamps",
    subtitle: "What we found sorting through a relative's writing desk",
    category: "Things We Collected",
    date: "2026-03-09",
    author: "Claire",
    excerpt:
      "Underneath the letter paper was a tin of stamps going back decades, most of them never used.",
    body: [
      "Underneath the letter paper was a tin of stamps going back decades, most of them never used.",
      "A few of them may well find their way onto a future season's envelopes. The rest are staying in the tin, for now.",
    ],
  },
  {
    slug: "the-last-light-of-october",
    title: "The last light of October",
    subtitle: "Notes on the hour before the clocks change",
    category: "Things We Noticed",
    date: "2025-10-28",
    author: "Catherine",
    excerpt:
      "There's a particular gold the light goes in the last week of October, right before the clocks change and take it away for months.",
    body: [
      "There's a particular gold the light goes in the last week of October, right before the clocks change and take it away for months.",
      "We started keeping a note of it a few years ago — nothing more than a line in a notebook. It's exactly the sort of thing that finds its way into an autumn edition.",
    ],
  },
];

export function getJournalPost(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}
