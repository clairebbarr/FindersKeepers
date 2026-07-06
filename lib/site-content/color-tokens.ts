/** The only design tokens that can be overridden — matches app/globals.css.
 *  Labels are what admins see in the Colours dashboard and colour pickers:
 *  core structural colours keep clear names (Background, Paper, Ink,
 *  Primary, Secondary); the rest are generic "Accent" slots so they read as
 *  freely adjustable rather than tied to one specific hue. */
export const BRAND_COLOR_TOKENS = [
  { key: "cream", label: "Background", defaultHex: "#f7f5ef" },
  { key: "paper", label: "Paper", defaultHex: "#ece7d6" },
  { key: "ink", label: "Ink (text)", defaultHex: "#2a1226" },
  { key: "plum", label: "Primary", defaultHex: "#4a214b" },
  { key: "mint", label: "Secondary", defaultHex: "#b6e8ce" },
  { key: "rust", label: "Accent 1", defaultHex: "#f06d30" },
  { key: "dustyblue", label: "Accent 2", defaultHex: "#7fa7b3" },
  { key: "mustard", label: "Accent 3", defaultHex: "#e8b84b" },
] as const;

export type BrandColorTokenKey = (typeof BRAND_COLOR_TOKENS)[number]["key"];
