export type SeasonalPalette = {
  key: string;
  label: string;
  season: string;
  colors: {
    primary: string;
    accent: string;
    paper: string;
    ink: string;
  };
};

/**
 * Seasonal edition colour ways. Hex values are close approximations of the
 * founders' reference palette sheet, not pixel-measured brand hex — treat
 * as placeholders to confirm against the real brand guide, adjustable later
 * from the CMS palette switcher (Stage 2).
 */
export const seasonalPalettes: SeasonalPalette[] = [
  {
    key: "autumn",
    label: "Aubergine & Mint",
    season: "Autumn",
    colors: { primary: "#4a2148", accent: "#f08d30", paper: "#f7f5ef", ink: "#241626" },
  },
  {
    key: "winter",
    label: "Cobalt & Chocolate",
    season: "Winter",
    colors: { primary: "#1e3f8f", accent: "#4c2b1f", paper: "#eef1f6", ink: "#1a1a2e" },
  },
  {
    key: "spring",
    label: "Kelly Green & Yellow",
    season: "Spring",
    colors: { primary: "#159a68", accent: "#ffd54f", paper: "#f4f6ee", ink: "#1e2b20" },
  },
  {
    key: "summer",
    label: "Tomato & Pool Blue",
    season: "Summer",
    colors: { primary: "#e6402a", accent: "#58c6e5", paper: "#fdf5ea", ink: "#2a1a14" },
  },
];

export function getPalette(key: string): SeasonalPalette {
  return seasonalPalettes.find((p) => p.key === key) ?? seasonalPalettes[0];
}
