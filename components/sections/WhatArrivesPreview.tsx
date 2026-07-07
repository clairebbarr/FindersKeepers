import { LinkButton } from "@/components/ui/Button";
import { ColorEditableSection } from "@/components/admin/ColorEditableSection";
import { EditableText } from "@/components/admin/EditableText";
import { EditableIcon } from "@/components/admin/EditableIcon";
import { EditableRotation } from "@/components/admin/EditableRotation";
import { whatArrivesCategories } from "@/content/site-copy";
import type { IconKey } from "@/lib/site-content/icon-registry";

const defaultIcons: IconKey[] = ["star8", "key", "pressedflower", "envelope", "waxseal"];
const defaultTilts = [-2, 1.5, -1, 2, -1.5];

export function WhatArrivesPreview({
  contentMap = {},
  colorOverrides = {},
}: {
  contentMap?: Record<string, string>;
  colorOverrides?: Record<string, string>;
}) {
  const blockOverride = contentMap["what-arrives-preview.bgColor"] ?? null;
  const effectiveHex = blockOverride ?? colorOverrides["paper"] ?? "#ece7d6";

  return (
    <ColorEditableSection
      className="bg-fk-paper px-5 py-20 sm:px-8"
      tokenKey="paper"
      page="home"
      section="what-arrives-preview"
      field="bgColor"
      effectiveHex={effectiveHex}
      blockOverrideHex={blockOverride}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <EditableText
            page="home"
            section="what-arrives-preview"
            field="eyebrow"
            as="p"
            className="font-body text-xs uppercase tracking-[0.3em] text-fk-rust"
            initialValue={contentMap["what-arrives-preview.eyebrow"] ?? "Inside every envelope"}
          />
          <EditableText
            page="home"
            section="what-arrives-preview"
            field="heading"
            as="h2"
            className="mt-3 font-display text-4xl font-semibold uppercase tracking-tight text-fk-plum sm:text-5xl"
            initialValue={contentMap["what-arrives-preview.heading"] ?? "What Arrives"}
          />
          <EditableText
            page="home"
            section="what-arrives-preview"
            field="subheading"
            as="p"
            className="mt-3 font-body text-fk-ink/75"
            initialValue={
              contentMap["what-arrives-preview.subheading"] ?? "Not every envelope contains the same things. That is the point."
            }
          />
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {whatArrivesCategories.map((cat, i) => (
            <EditableRotation
              key={cat.key}
              page="home"
              section={`what-arrives-cat-${cat.key}`}
              field="rotation"
              initialDeg={Number(
                contentMap[`what-arrives-cat-${cat.key}.rotation`] ?? defaultTilts[i % defaultTilts.length]
              )}
            >
              <div className="flex flex-col items-start gap-3 border-2 border-fk-plum bg-fk-cream p-5 shadow-[4px_4px_0_0_var(--color-fk-plum)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-fk-plum bg-fk-mint">
                  <EditableIcon
                    page="home"
                    section={`what-arrives-cat-${cat.key}`}
                    field="icon"
                    initialIconKey={
                      contentMap[`what-arrives-cat-${cat.key}.icon`] ?? defaultIcons[i % defaultIcons.length]
                    }
                    iconClassName="h-6 w-6 text-fk-plum"
                  />
                </span>
                <EditableText
                  page="home"
                  section={`what-arrives-cat-${cat.key}`}
                  field="title"
                  as="h3"
                  className="font-display text-lg font-semibold uppercase text-fk-plum"
                  initialValue={contentMap[`what-arrives-cat-${cat.key}.title`] ?? cat.title}
                />
                <EditableText
                  page="home"
                  section={`what-arrives-cat-${cat.key}`}
                  field="description"
                  as="p"
                  className="font-body text-sm text-fk-ink/75"
                  initialValue={contentMap[`what-arrives-cat-${cat.key}.description`] ?? cat.description}
                />
              </div>
            </EditableRotation>
          ))}
        </div>

        <div className="mt-12 text-center">
          <LinkButton href="/what-arrives">See what arrives in full</LinkButton>
        </div>
      </div>
    </ColorEditableSection>
  );
}
