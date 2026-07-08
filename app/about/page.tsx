import type { Metadata } from "next";
import { ArchivalFrame } from "@/components/brand/ArchivalFrame";
import { Star4 } from "@/components/brand/icons";
import { EditableText } from "@/components/admin/EditableText";
import { ourWhy, aboutSections, brand } from "@/content/site-copy";
import { getSiteContentMap } from "@/lib/site-content/get";

export const metadata: Metadata = {
  title: "Our Why",
  description: "Why Finders, Keepers exists — a reminder to look for the little treasures in life.",
};

export default async function AboutPage() {
  const contentMap = await getSiteContentMap("about");

  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <Star4 className="mx-auto h-8 w-8 text-fk-rust" />
          <EditableText
            page="about"
            section="intro"
            field="heading"
            as="h1"
            className="mt-4 font-display text-4xl font-semibold text-fk-plum sm:text-5xl"
            initialValue={contentMap["intro.heading"] ?? ourWhy.heading}
          />
        </div>

        <div className="mt-12 space-y-6 font-body text-lg leading-relaxed text-fk-ink/85">
          {ourWhy.paragraphs.map((p, i) => (
            <EditableText
              key={i}
              page="about"
              section="intro"
              field={`paragraph-${i}`}
              as="p"
              className={i === 1 ? "block text-center font-display text-2xl italic text-fk-plum" : ""}
              initialValue={contentMap[`intro.paragraph-${i}`] ?? p}
            />
          ))}
        </div>

        <EditableText
          page="about"
          section="intro"
          field="tagline"
          as="p"
          className="mt-10 block text-center font-display text-xl font-semibold text-fk-rust"
          initialValue={contentMap["intro.tagline"] ?? brand.tagline}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {aboutSections.map((s, i) => (
            <ArchivalFrame key={s.heading}>
              <EditableText
                page="about"
                section={`card-${i}`}
                field="heading"
                as="h2"
                className="font-display text-xl font-semibold text-fk-plum"
                initialValue={contentMap[`card-${i}.heading`] ?? s.heading}
              />
              <EditableText
                page="about"
                section={`card-${i}`}
                field="body"
                as="p"
                className="mt-2 block font-body text-sm text-fk-ink/75"
                initialValue={contentMap[`card-${i}.body`] ?? s.body}
              />
            </ArchivalFrame>
          ))}
        </div>
      </div>
    </div>
  );
}
