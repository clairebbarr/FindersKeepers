import { Wordmark } from "@/components/brand/Wordmark";
import { LinkButton } from "@/components/ui/Button";
import { EditableText } from "@/components/admin/EditableText";
import { EditableIcon } from "@/components/admin/EditableIcon";
import { ColorEditableSection } from "@/components/admin/ColorEditableSection";
import { home } from "@/content/site-copy";
import type { IconKey } from "@/lib/site-content/icon-registry";

const specimens: IconKey[] = [
  "star8",
  "key",
  "shell",
  "moth",
  "pressedflower",
  "bow",
  "teacup",
  "book",
  "envelope",
];

export function Hero({
  contentMap = {},
  colorOverrides = {},
}: {
  contentMap?: Record<string, string>;
  colorOverrides?: Record<string, string>;
}) {
  const blockOverride = contentMap["hero.bgColor"] ?? null;
  const effectiveHex = blockOverride ?? colorOverrides["plum"] ?? "#4a214b";

  return (
    <ColorEditableSection
      className="overflow-hidden bg-fk-plum text-fk-mint"
      tokenKey="plum"
      page="home"
      section="hero"
      field="bgColor"
      effectiveHex={effectiveHex}
      blockOverrideHex={blockOverride}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        {/* Left: wordmark + list */}
        <div className="relative">
          <EditableText
            page="home"
            section="hero"
            field="eyebrow"
            as="p"
            className="font-body text-[0.65rem] uppercase tracking-[0.18em] text-fk-mint/70 sm:text-xs sm:tracking-[0.3em]"
            initialValue={contentMap["hero.eyebrow"] ?? home.heroEyebrow}
          />

          <Wordmark stacked className="mt-4 text-[3.5rem] leading-[0.82] text-fk-mint sm:text-8xl" />

          <ul className="mt-8 space-y-1 font-body text-sm uppercase tracking-[0.12em] text-fk-mint/85 sm:text-base">
            {home.heroList.map((line, i) => (
              <EditableText
                key={i}
                page="home"
                section="hero"
                field={`list-${i}`}
                as="li"
                initialValue={contentMap[`hero.list-${i}`] ?? line}
              />
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LinkButton href={home.primaryCta.href} variant="secondary">
              {home.primaryCta.label}
            </LinkButton>
            <LinkButton
              href={home.secondaryCta.href}
              variant="ghost"
              className="border-fk-mint/50 text-fk-mint hover:bg-fk-mint/10"
            >
              {home.secondaryCta.label}
            </LinkButton>
          </div>
        </div>

        {/* Right: collector's specimen case of brand motifs */}
        <div className="relative mx-auto w-full max-w-xs">
          <EditableText
            page="home"
            section="hero"
            field="specimen-label"
            as="p"
            className="mb-3 block text-center font-body text-[0.65rem] uppercase tracking-[0.3em] text-fk-mint/70"
            initialValue={contentMap["hero.specimen-label"] ?? "A collection of small things"}
          />
          <div
            data-fk-edit="home:hero:specimen-grid"
            className="grid grid-cols-3 overflow-hidden rounded-sm border-2 border-fk-mint/60"
          >
            {specimens.map((defaultKey, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center border border-fk-mint/25 p-4"
              >
                <EditableIcon
                  page="home"
                  section={`hero-specimen-${i}`}
                  field="icon"
                  initialIconKey={contentMap[`hero-specimen-${i}.icon`] ?? defaultKey}
                  iconClassName="h-8 w-8 text-fk-mint sm:h-9 sm:w-9"
                />
              </div>
            ))}
          </div>
          <EditableText
            page="home"
            section="hero"
            field="mark"
            as="p"
            className="mt-4 text-center font-body text-xs uppercase tracking-[0.2em] text-fk-mint/80"
            initialValue={contentMap["hero.mark"] ?? home.heroMark}
          />
        </div>
      </div>

      {/* bottom ribbon, like the reference footer strip */}
      <div className="overflow-hidden border-t border-fk-mint/20 bg-fk-plum-dark py-3">
        <EditableText
          page="home"
          section="hero"
          field="ribbon"
          as="p"
          className="text-center font-body text-[0.6rem] uppercase tracking-[0.2em] text-fk-mint/70 sm:text-xs sm:tracking-[0.3em]"
          initialValue={contentMap["hero.ribbon"] ?? "Notice ✶ Collect ✶ Create ✶ Share"}
        />
      </div>
    </ColorEditableSection>
  );
}
