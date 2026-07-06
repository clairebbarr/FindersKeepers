/** The only design tokens that can be overridden — matches app/globals.css. */
export const BRAND_COLOR_TOKENS = [
  { key: "cream", label: "Cream (background)", defaultHex: "#f7f5ef" },
  { key: "paper", label: "Paper", defaultHex: "#ece7d6" },
  { key: "ink", label: "Ink (text)", defaultHex: "#2a1226" },
  { key: "plum", label: "Plum (primary)", defaultHex: "#4a214b" },
  { key: "mint", label: "Mint (accent)", defaultHex: "#b6e8ce" },
  { key: "rust", label: "Rust (accent)", defaultHex: "#f06d30" },
  { key: "dustyblue", label: "Dusty blue", defaultHex: "#7fa7b3" },
  { key: "mustard", label: "Mustard", defaultHex: "#e8b84b" },
] as const;

export type BrandColorTokenKey = (typeof BRAND_COLOR_TOKENS)[number]["key"];
