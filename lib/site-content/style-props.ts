/** Shared definitions for per-element style overrides. Plain module (not a
 *  "use server" file) so both the server action and the root-layout CSS
 *  injection use the exact same whitelist and validation. */
export type StylePropDef =
  | { css: string; type: "hex" }
  | { css: string; type: "enum"; values: readonly string[] };

export const STYLE_PROPS: Record<string, StylePropDef> = {
  color: { css: "color", type: "hex" },
  backgroundColor: { css: "background-color", type: "hex" },
  borderColor: { css: "border-color", type: "hex" },
  borderWidth: { css: "border-width", type: "enum", values: ["0px", "1px", "2px", "4px"] },
  borderStyle: { css: "border-style", type: "enum", values: ["solid", "dashed", "dotted", "none"] },
  borderRadius: { css: "border-radius", type: "enum", values: ["0px", "8px", "24px", "9999px"] },
  boxShadow: {
    css: "box-shadow",
    type: "enum",
    values: [
      "none",
      "3px 3px 0 0 var(--color-fk-plum)",
      "5px 5px 0 0 var(--color-fk-plum)",
      "0 8px 24px rgba(0,0,0,0.18)",
    ],
  },
};

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

export function isValidStyleValue(prop: string, value: string): boolean {
  const def = STYLE_PROPS[prop];
  if (!def) return false;
  if (def.type === "hex") return HEX_RE.test(value);
  return def.values.includes(value);
}
