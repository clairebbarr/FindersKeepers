import { LinkButton } from "@/components/ui/Button";
import { EditionCard } from "@/components/sections/EditionCard";
import { EditableText } from "@/components/admin/EditableText";
import { editions } from "@/content/editions";

export function AllEditionsStrip({
  mediaMap = {},
  contentMap = {},
}: {
  mediaMap?: Record<string, string>;
  contentMap?: Record<string, string>;
}) {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <EditableText
            page="home"
            section="all-editions-strip"
            field="eyebrow"
            as="p"
            className="font-body text-xs uppercase tracking-[0.3em] text-fk-rust"
            initialValue={contentMap["all-editions-strip.eyebrow"] ?? "Bimonthly · 6 editions a year"}
          />
          <EditableText
            page="home"
            section="all-editions-strip"
            field="heading"
            as="h2"
            className="mt-3 font-display text-4xl font-semibold uppercase tracking-tight text-fk-plum sm:text-5xl"
            initialValue={contentMap["all-editions-strip.heading"] ?? "The Editions"}
          />
          <EditableText
            page="home"
            section="all-editions-strip"
            field="subheading"
            as="p"
            className="mt-3 font-body text-fk-ink/75"
            initialValue={
              contentMap["all-editions-strip.subheading"] ?? "One every other month, each with its own theme and colour way."
            }
          />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {editions.map((edition) => (
            <EditionCard
              key={edition.slug}
              edition={edition}
              compact
              mediaUrl={mediaMap[`edition-${edition.slug}`] ?? null}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <LinkButton href="/editions" variant="ghost">
            See the full archive
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
