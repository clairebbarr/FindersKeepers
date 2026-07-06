import type { Metadata } from "next";
import { EditionCard } from "@/components/sections/EditionCard";
import { editions } from "@/content/editions";

export const metadata: Metadata = {
  title: "Editions",
  description: "The full archive of Finders, Keepers editions — past, present and upcoming.",
};

export default function EditionsPage() {
  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-fk-rust">Bimonthly &middot; 6 editions a year</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-fk-plum sm:text-5xl">Editions</h1>
        <p className="mt-4 font-body text-lg text-fk-ink/75">
          Every edition is its own small collection. Here&apos;s the full archive.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {editions.map((edition) => (
          <EditionCard key={edition.slug} edition={edition} />
        ))}
      </div>
    </div>
  );
}
