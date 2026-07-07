import { Envelope, Star8 } from "@/components/brand/icons";
import { LinkButton } from "@/components/ui/Button";
import { ColorEditableSection } from "@/components/admin/ColorEditableSection";
import { EditableText } from "@/components/admin/EditableText";
import { lostLetters } from "@/content/site-copy";

export function LostLettersTeaser({
  contentMap = {},
  colorOverrides = {},
}: {
  contentMap?: Record<string, string>;
  colorOverrides?: Record<string, string>;
}) {
  const blockOverride = contentMap["lost-letters-teaser.bgColor"] ?? null;
  const effectiveHex = blockOverride ?? colorOverrides["plum"] ?? "#4a214b";

  return (
    <ColorEditableSection
      className="overflow-hidden bg-fk-plum px-5 py-20 text-fk-mint sm:px-8"
      tokenKey="plum"
      page="home"
      section="lost-letters-teaser"
      field="bgColor"
      effectiveHex={effectiveHex}
      blockOverrideHex={blockOverride}
    >
      <Star8 className="absolute right-6 top-8 h-12 w-12 text-fk-rust/60" />
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-fk-mint">
          <Envelope className="h-7 w-7 text-fk-mint" />
        </span>
        <p className="mt-5 font-body text-xs uppercase tracking-[0.3em] text-fk-mint/70">The marketing plan</p>
        <EditableText
          page="home"
          section="lost-letters-teaser"
          field="heading"
          as="h2"
          className="mt-3 font-display text-4xl font-semibold uppercase tracking-tight sm:text-5xl"
          initialValue={contentMap["lost-letters-teaser.heading"] ?? lostLetters.heading}
        />
        <EditableText
          page="home"
          section="lost-letters-teaser"
          field="intro"
          as="p"
          className="mt-5 font-body text-lg text-fk-mint/85"
          initialValue={contentMap["lost-letters-teaser.intro"] ?? lostLetters.intro}
        />
        <p className="mt-4 font-display text-xl italic text-fk-mint/70">
          &ldquo;You found me, you keep me. If you&rsquo;re curious… scan me.&rdquo;
        </p>
        <LinkButton href="/lost-letters" variant="secondary" className="mt-8">
          Find a Lost Letter
        </LinkButton>
      </div>
    </ColorEditableSection>
  );
}
