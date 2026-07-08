import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { Star4 } from "@/components/brand/icons";
import { EditableImage } from "@/components/admin/EditableImage";
import { EditableText } from "@/components/admin/EditableText";
import { editions, getEdition } from "@/content/editions";
import { getPalette } from "@/content/palettes";
import { getMediaMap, getSiteContentMap } from "@/lib/site-content/get";

export function generateStaticParams() {
  return editions.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const edition = getEdition(slug);
  if (!edition) return {};
  return {
    title: `Edition ${edition.number} — ${edition.name}`,
    description: edition.description,
  };
}

export default async function EditionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const edition = getEdition(slug);
  if (!edition) notFound();

  const palette = getPalette(edition.paletteKey);
  const [mediaMap, c] = await Promise.all([
    getMediaMap([`edition-${edition.slug}`]),
    getSiteContentMap(`edition-${edition.slug}`),
  ]);

  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <EditableImage
          mediaKey={`edition-${edition.slug}`}
          initialUrl={mediaMap[`edition-${edition.slug}`] ?? null}
          alt={`${edition.name} cover`}
          className="aspect-[16/9]"
          fallback={
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ backgroundColor: palette.colors.primary }}
            >
              <Star4 className="h-16 w-16" style={{ color: palette.colors.accent }} />
            </div>
          }
        />

        <Badge className="mt-8 w-fit" style={{ borderColor: palette.colors.primary, color: palette.colors.primary }}>
          Edition {edition.number} &middot; {edition.status}
        </Badge>
        <EditableText
          page={`edition-${edition.slug}`}
          section="intro"
          field="name"
          as="h1"
          className="mt-4 font-display text-4xl font-semibold text-fk-plum sm:text-5xl"
          initialValue={c["intro.name"] ?? edition.name}
        />
        <EditableText
          page={`edition-${edition.slug}`}
          section="intro"
          field="dispatch"
          as="p"
          className="mt-2 block font-body text-sm uppercase tracking-[0.2em] text-fk-ink/60"
          initialValue={c["intro.dispatch"] ?? `Dispatch window: ${edition.dispatchWindow}`}
        />
        <EditableText
          page={`edition-${edition.slug}`}
          section="intro"
          field="description"
          as="p"
          className="mt-6 block font-body text-lg text-fk-ink/85"
          initialValue={c["intro.description"] ?? edition.description}
        />

        <EditableText
          page={`edition-${edition.slug}`}
          section="inside"
          field="heading"
          as="h2"
          className="mt-10 block font-display text-xl font-semibold text-fk-plum"
          initialValue={c["inside.heading"] ?? "What's inside"}
        />
        <ul className="mt-4 space-y-2">
          {edition.contents.map((item, j) => (
            <EditableText
              key={j}
              page={`edition-${edition.slug}`}
              section="inside"
              field={`item-${j}`}
              as="li"
              className="border-b border-fk-ink/10 pb-2 font-body text-fk-ink/80"
              initialValue={c[`inside.item-${j}`] ?? item}
            />
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <LinkButton href="/pricing">Join the next edition</LinkButton>
          <LinkButton href="/editions" variant="ghost">
            Back to the archive
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
