import { BRAND_COLOR_TOKENS } from "@/lib/site-content/color-tokens";
import { getColorOverrides } from "@/lib/site-content/get";
import { ColorTokenRow } from "./ColorTokenRow";

export default async function AdminColoursPage() {
  const overrides = await getColorOverrides();

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-fk-plum">Brand Colours</h2>
      <p className="mt-1 max-w-xl font-body text-sm text-fk-ink/60">
        Changing a colour here updates it everywhere on the site at once, since every section reads from
        the same brand palette. To change just one section&apos;s colour without affecting the rest, use the
        🎨 button that appears directly on that section while in edit mode.
      </p>

      <div className="mt-8 border-2 border-fk-plum bg-fk-paper px-6">
        {BRAND_COLOR_TOKENS.map((token) => (
          <ColorTokenRow
            key={token.key}
            tokenKey={token.key}
            label={token.label}
            currentHex={overrides[token.key] ?? token.defaultHex}
          />
        ))}
      </div>
    </div>
  );
}
