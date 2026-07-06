import { Badge } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { Star4 } from "@/components/brand/icons";
import { editions } from "@/content/editions";
import { getPalette } from "@/content/palettes";

export function CurrentEditionSection() {
  const edition = editions[0];
  const palette = getPalette(edition.paletteKey);

  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div
          className="grid gap-8 border p-8 sm:grid-cols-2 sm:p-12"
          style={{ borderColor: palette.colors.primary, backgroundColor: palette.colors.paper }}
        >
          <div
            className="flex aspect-square items-center justify-center rounded-sm"
            style={{ backgroundColor: palette.colors.primary }}
          >
            <Star4 className="h-16 w-16" style={{ color: palette.colors.accent }} />
          </div>

          <div className="flex flex-col justify-center">
            <Badge className="w-fit" style={{ borderColor: palette.colors.primary, color: palette.colors.primary }}>
              Edition {edition.number} &middot; {edition.status}
            </Badge>
            <h2 className="mt-4 font-display text-3xl font-semibold" style={{ color: palette.colors.primary }}>
              {edition.name}
            </h2>
            <p className="mt-3 font-body text-sm uppercase tracking-[0.2em]" style={{ color: palette.colors.ink }}>
              Dispatch: {edition.dispatchWindow}
            </p>
            <p className="mt-4 font-body text-fk-ink/80">{edition.theme}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href="/pricing">Join the next edition</LinkButton>
              <LinkButton href={`/editions/${edition.slug}`} variant="ghost">
                See this edition
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
