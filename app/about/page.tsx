import type { Metadata } from "next";
import { ArchivalFrame } from "@/components/brand/ArchivalFrame";
import { Star4 } from "@/components/brand/icons";
import { ourWhy, aboutSections, brand } from "@/content/site-copy";

export const metadata: Metadata = {
  title: "Our Why",
  description: "Why Finders, Keepers exists — a reminder to look for the little treasures in life.",
};

export default function AboutPage() {
  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <Star4 className="mx-auto h-8 w-8 text-fk-rust" />
          <h1 className="mt-4 font-display text-4xl font-semibold text-fk-plum sm:text-5xl">
            {ourWhy.heading}
          </h1>
        </div>

        <div className="mt-12 space-y-6 font-body text-lg leading-relaxed text-fk-ink/85">
          {ourWhy.paragraphs.map((p, i) =>
            i === 1 ? (
              <p key={i} className="font-display text-2xl italic text-fk-plum text-center">
                {p}
              </p>
            ) : (
              <p key={i}>{p}</p>
            )
          )}
        </div>

        <p className="mt-10 text-center font-display text-xl font-semibold text-fk-rust">{brand.tagline}</p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {aboutSections.map((s) => (
            <ArchivalFrame key={s.heading}>
              <h2 className="font-display text-xl font-semibold text-fk-plum">{s.heading}</h2>
              <p className="mt-2 font-body text-sm text-fk-ink/75">{s.body}</p>
            </ArchivalFrame>
          ))}
        </div>
      </div>
    </div>
  );
}
