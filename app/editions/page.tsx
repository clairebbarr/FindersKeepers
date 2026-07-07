import type { Metadata } from "next";
import { EditionCard } from "@/components/sections/EditionCard";
import { EditableText } from "@/components/admin/EditableText";
import { editions } from "@/content/editions";
import { getMediaMap, getSiteContentMap } from "@/lib/site-content/get";

export const metadata: Metadata = {
  title: "Editions",
  description: "The full archive of Finders, Keepers editions — past, present and upcoming.",
};

export default async function EditionsPage() {
  const [mediaMap, contentMap] = await Promise.all([
    getMediaMap(editions.map((e) => `edition-${e.slug}`)),
    getSiteContentMap("editions"),
  ]);

  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <EditableText
          page="editions"
          section="intro"
          field="eyebrow"
          as="p"
          className="font-body text-xs uppercase tracking-[0.3em] text-fk-rust"
          initialValue={contentMap["intro.eyebrow"] ?? "Bimonthly · 6 editions a year"}
        />
        <h1 className="mt-3 font-display text-4xl font-semibold text-fk-plum sm:text-5xl">Editions</h1>
        <EditableText
          page="editions"
          section="intro"
          field="subheading"
          as="p"
          className="mt-4 font-body text-lg text-fk-ink/75"
          initialValue={
            contentMap["intro.subheading"] ?? "Every edition is its own small collection. Here's the full archive."
          }
        />
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {editions.map((edition) => (
          <EditionCard key={edition.slug} edition={edition} mediaUrl={mediaMap[`edition-${edition.slug}`] ?? null} />
        ))}
      </div>
    </div>
  );
}
