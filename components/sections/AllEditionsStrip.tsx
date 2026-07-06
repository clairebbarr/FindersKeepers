import { LinkButton } from "@/components/ui/Button";
import { EditionCard } from "@/components/sections/EditionCard";
import { editions } from "@/content/editions";

export function AllEditionsStrip({ mediaMap = {} }: { mediaMap?: Record<string, string> }) {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-fk-rust">
            Bimonthly &middot; 6 editions a year
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold uppercase tracking-tight text-fk-plum sm:text-5xl">
            The Editions
          </h2>
          <p className="mt-3 font-body text-fk-ink/75">
            One every other month, each with its own theme and colour way.
          </p>
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
