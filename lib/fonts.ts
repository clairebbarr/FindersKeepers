import { Fraunces, Spectral, Caveat } from "next/font/google";

/**
 * Stage 1 default font pairing. No licensed brand fonts were supplied yet —
 * these are close free stand-ins wired through one place so a future CMS
 * font-picker (Stage 2) only needs to swap the values here.
 */
export const displayFont = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  weight: "variable",
  display: "swap",
});

export const bodyFont = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const scriptFont = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});
