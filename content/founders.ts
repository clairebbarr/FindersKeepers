export type Founder = {
  slug: string;
  name: string;
  role: string;
  isFounder: boolean;
  bio: string;
  initials: string;
  /** True while awaiting real details; false once real copy is in place. */
  placeholder: boolean;
};

/**
 * The three real founders of Finders, Keepers. Claire is the founder.
 * Roles and bios below are based only on the details the founders gave —
 * their disciplines and shared love of charity-shop finds, trinkets, unique
 * items and small details. Nothing here is invented; refine wording with them
 * as needed.
 */
export const founders: Founder[] = [
  {
    slug: "claire",
    name: "Claire",
    role: "Founder & Painter",
    isFounder: true,
    bio: "Claire started Finders, Keepers. She's a fine artist and painter, happiest with a brush in hand or lost in a charity shop looking for the next thing worth keeping.",
    initials: "C",
    placeholder: false,
  },
  {
    slug: "leah",
    name: "Leah",
    role: "Designer & Illustrator",
    isFounder: false,
    bio: "Leah shapes much of how Finders, Keepers looks — graphic design, illustration, painting and drawing. She has a soft spot for unique objects and the small details most people walk straight past.",
    initials: "L",
    placeholder: false,
  },
  {
    slug: "catherine",
    name: "Catherine",
    role: "Writer & Storyteller",
    isFounder: false,
    bio: "Catherine comes from theatre and writing, and gives much of each edition its words and stories. Like the others, she can't resist a trinket, a charity shop find, or a beautifully odd little thing.",
    initials: "C",
    placeholder: false,
  },
];

/** Shared line true of all three founders. */
export const keepersShared =
  "The three of us share a love of trinkets, charity shop finds, unique items, and the small, easily-missed details that make something worth keeping.";
