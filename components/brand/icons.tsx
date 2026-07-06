import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

/**
 * Hand-authored line-art motif library. All icons use currentColor so they
 * inherit text colour, and share a viewBox scale so they can be freely
 * mixed at any size via className (e.g. "h-6 w-6").
 */

export function Star8(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M24 2 L27 19 L38 6 L29 21 L46 24 L29 27 L38 42 L27 29 L24 46 L21 29 L10 42 L19 27 L2 24 L19 21 L10 6 L21 19 Z" />
    </svg>
  );
}

export function Star4(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M24 4 C24 15 27 22 44 24 C27 26 24 33 24 44 C24 33 21 26 4 24 C21 22 24 15 24 4 Z" />
    </svg>
  );
}

export function Key(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="8" />
      <path d="M21.5 21.5 L40 40 M33 33 L38 28 M28 38 L33 33" />
    </svg>
  );
}

export function WaxSeal(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
      <circle cx="24" cy="24" r="19" strokeDasharray="2 2.4" />
      <circle cx="24" cy="24" r="13" />
      <path d="M24 15 L26 22 L33 24 L26 26 L24 33 L22 26 L15 24 L22 22 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Envelope(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="5" y="10" width="38" height="28" rx="1" />
      <path d="M5 12 L24 28 L43 12" />
    </svg>
  );
}

export function Moth(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M24 14 C24 14 21 6 16 8 M24 14 C24 14 27 6 32 8" />
      <ellipse cx="24" cy="16" rx="2" ry="3" fill="currentColor" stroke="none" />
      <path d="M23 17 C14 15 4 22 6 30 C12 32 20 27 23 20 Z" />
      <path d="M25 17 C34 15 44 22 42 30 C36 32 28 27 25 20 Z" />
      <path d="M23 22 C17 24 10 30 11 36 C15 37 20 33 23 27 Z" />
      <path d="M25 22 C31 24 38 30 37 36 C33 37 28 33 25 27 Z" />
      <path d="M24 17 L24 30" />
    </svg>
  );
}

export function Bird(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M6 28 C14 28 18 22 20 16 C22 22 20 28 14 32 C22 34 30 32 34 24 C38 26 42 24 43 20 C40 22 37 21 36 18 C35 14 31 12 28 14 C24 10 18 11 16 16 C10 15 5 20 6 28 Z" />
    </svg>
  );
}

export function PressedFlower(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="24" cy="24" r="3.5" fill="currentColor" stroke="none" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="24"
          cy="13"
          rx="4.5"
          ry="8"
          transform={`rotate(${deg} 24 24)`}
        />
      ))}
    </svg>
  );
}

export function Shell(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M24 8 C34 12 40 22 38 36 C33 34 30 30 28 24 C27 30 26 34 24 38 C22 34 21 30 20 24 C18 30 15 34 10 36 C8 22 14 12 24 8 Z" />
      <path d="M24 8 L24 36" />
    </svg>
  );
}

export function Bow(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M24 24 C24 24 8 14 6 20 C4 27 18 26 24 24 Z" />
      <path d="M24 24 C24 24 40 14 42 20 C44 27 30 26 24 24 Z" />
      <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none" />
      <path d="M22 26 L18 38 M26 26 L30 38" />
    </svg>
  );
}

export function Teacup(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M10 20 H32 V28 C32 34 27 38 21 38 C15 38 10 34 10 28 Z" />
      <path d="M32 22 C38 22 38 30 32 30" />
      <path d="M10 20 C10 20 12 15 21 15 C30 15 32 20 32 20" />
    </svg>
  );
}

export function Book(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M24 12 C21 9 14 8 8 9 V34 C14 33 21 34 24 37 C27 34 34 33 40 34 V9 C34 8 27 9 24 12 Z" />
      <path d="M24 12 V37" />
    </svg>
  );
}

export function Stamp(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeDasharray="2.2 2" aria-hidden="true" {...props}>
      <rect x="9" y="7" width="30" height="34" rx="1" />
      <path d="M18 20 L30 20 M18 26 L30 26 M18 32 L24 32" strokeDasharray="0" />
    </svg>
  );
}

export function Scissors(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="14" r="4" />
      <circle cx="12" cy="34" r="4" />
      <path d="M15 17 L40 40 M15 31 L40 8" />
    </svg>
  );
}

export function Candle(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M24 6 C24 6 28 11 24 14 C20 11 24 6 24 6 Z" fill="currentColor" stroke="none" />
      <rect x="18" y="16" width="12" height="26" rx="1" />
      <path d="M18 22 H30" />
    </svg>
  );
}

export const iconLibrary = [
  { key: "star8", label: "Star", Icon: Star8 },
  { key: "star4", label: "Star", Icon: Star4 },
  { key: "key", label: "Key", Icon: Key },
  { key: "shell", label: "Shell", Icon: Shell },
  { key: "bow", label: "Ribbon", Icon: Bow },
  { key: "bird", label: "Bird", Icon: Bird },
  { key: "flower", label: "Flower", Icon: PressedFlower },
  { key: "scissors", label: "Scissors", Icon: Scissors },
  { key: "candle", label: "Candle", Icon: Candle },
  { key: "book", label: "Book", Icon: Book },
  { key: "teacup", label: "Teacup", Icon: Teacup },
  { key: "envelope", label: "Envelope", Icon: Envelope },
  { key: "stamp", label: "Stamp", Icon: Stamp },
  { key: "moth", label: "Moth", Icon: Moth },
  { key: "waxseal", label: "Wax Seal", Icon: WaxSeal },
] as const;
