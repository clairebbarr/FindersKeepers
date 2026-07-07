import { LinkButton } from "@/components/ui/Button";
import { Star4 } from "@/components/brand/icons";
import { ColorEditableSection } from "@/components/admin/ColorEditableSection";
import { EditableText } from "@/components/admin/EditableText";
import { ourWhy, brand } from "@/content/site-copy";

export function OurWhyTeaser({
  contentMap = {},
  colorOverrides = {},
}: {
  contentMap?: Record<string, string>;
  colorOverrides?: Record<string, string>;
}) {
  const blockOverride = contentMap["why-teaser.bgColor"] ?? null;
  const effectiveHex = blockOverride ?? colorOverrides["mint"] ?? "#b6e8ce";

  return (
    <ColorEditableSection
      className="bg-fk-mint px-5 py-20 text-fk-plum sm:px-8"
      tokenKey="mint"
      page="home"
      section="why-teaser"
      field="bgColor"
      effectiveHex={effectiveHex}
      blockOverrideHex={blockOverride}
    >
      <div className="mx-auto max-w-2xl text-center">
        <Star4 className="mx-auto h-8 w-8 text-fk-plum" />
        <EditableText
          page="home"
          section="why-teaser"
          field="heading"
          as="h2"
          className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight sm:text-5xl"
          initialValue={contentMap["why-teaser.heading"] ?? ourWhy.heading}
        />
        <EditableText
          page="home"
          section="why-teaser"
          field="paragraph1"
          as="p"
          className="mt-6 font-body text-lg leading-relaxed text-fk-plum/85"
          initialValue={contentMap["why-teaser.paragraph1"] ?? ourWhy.paragraphs[0]}
        />
        <EditableText
          page="home"
          section="why-teaser"
          field="paragraph2"
          as="p"
          className="mt-6 font-display text-2xl italic"
          initialValue={contentMap["why-teaser.paragraph2"] ?? ourWhy.paragraphs[1]}
        />
        <p className="mt-6 font-body text-sm uppercase tracking-[0.2em] text-fk-rust">{brand.tagline}</p>
        <LinkButton
          href="/about"
          variant="ghost"
          className="mt-8 border-fk-plum text-fk-plum hover:bg-fk-plum/10"
        >
          Read our why
        </LinkButton>
      </div>
    </ColorEditableSection>
  );
}
