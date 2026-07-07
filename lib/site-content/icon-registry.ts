import {
  Star8,
  Star4,
  Key,
  WaxSeal,
  Envelope,
  Moth,
  Bird,
  PressedFlower,
  Shell,
  Bow,
  Teacup,
  Book,
  Stamp,
  Scissors,
  Candle,
  type IconProps,
} from "@/components/brand/icons";

export const ICON_REGISTRY = {
  star8: { label: "8-point star", Icon: Star8 },
  star4: { label: "4-point star", Icon: Star4 },
  key: { label: "Key", Icon: Key },
  waxseal: { label: "Wax seal", Icon: WaxSeal },
  envelope: { label: "Envelope", Icon: Envelope },
  moth: { label: "Moth", Icon: Moth },
  bird: { label: "Bird", Icon: Bird },
  pressedflower: { label: "Pressed flower", Icon: PressedFlower },
  shell: { label: "Shell", Icon: Shell },
  bow: { label: "Bow", Icon: Bow },
  teacup: { label: "Teacup", Icon: Teacup },
  book: { label: "Book", Icon: Book },
  stamp: { label: "Stamp", Icon: Stamp },
  scissors: { label: "Scissors", Icon: Scissors },
  candle: { label: "Candle", Icon: Candle },
} satisfies Record<string, { label: string; Icon: (props: IconProps) => React.JSX.Element }>;

export type IconKey = keyof typeof ICON_REGISTRY;

export const ICON_KEYS = Object.keys(ICON_REGISTRY) as IconKey[];

export function isIconKey(key: string): key is IconKey {
  return key in ICON_REGISTRY;
}
