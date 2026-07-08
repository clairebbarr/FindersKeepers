import type { Metadata } from "next";
import { Star4 } from "@/components/brand/icons";
import { EditableImage } from "@/components/admin/EditableImage";
import { EditableText } from "@/components/admin/EditableText";
import { EditableRotation } from "@/components/admin/EditableRotation";
import { founders, keepersShared } from "@/content/founders";
import { getSiteContentMap, getMediaMap } from "@/lib/site-content/get";

export const metadata: Metadata = {
  title: "Meet the Keepers",
  description: "The three people behind Finders, Keepers.",
};

export default async function KeepersPage() {
  const [contentMap, mediaMap] = await Promise.all([
    getSiteContentMap("keepers"),
    getMediaMap(founders.map((f) => `founder-${f.slug}`)),
  ]);

  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-body text-xs uppercase tracking-[0.35em] text-fk-rust">The three of us</p>
        <h1 className="mt-3 font-display text-4xl font-semibold uppercase tracking-tight text-fk-plum sm:text-6xl">
          Meet the Keepers
        </h1>
        <p className="mt-5 font-body text-lg text-fk-ink/75">
          Claire, Leah and Catherine — the three people who do the finding, so you can do the keeping.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-3">
        {founders.map((f, i) => (
          <EditableRotation
            key={f.slug}
            page="keepers"
            section={f.slug}
            field="rotation"
            editKey={`keepers:${f.slug}:card`}
            initialDeg={Number(contentMap[`${f.slug}.rotation`] ?? (i === 1 ? 0 : i === 0 ? -1 : 1))}
            className="border-2 border-fk-plum bg-fk-paper p-8 text-center shadow-[6px_6px_0_0_var(--color-fk-plum)]"
          >
            <EditableImage
              mediaKey={`founder-${f.slug}`}
              initialUrl={mediaMap[`founder-${f.slug}`] ?? null}
              alt={f.name}
              className="mx-auto h-24 w-24 rounded-full border-2 border-fk-plum"
              fallback={
                <div className="flex h-full w-full items-center justify-center bg-fk-mint font-display text-3xl font-semibold text-fk-plum">
                  {f.initials}
                </div>
              }
            />
            <h2 className="mt-5 font-display text-3xl font-semibold uppercase text-fk-plum">{f.name}</h2>
            <p className="mt-1 font-body text-sm uppercase tracking-[0.15em] text-fk-rust">{f.role}</p>
            <Star4 className="mx-auto mt-4 h-5 w-5 text-fk-plum/40" />
            <EditableText
              page="keepers"
              section={f.slug}
              field="bio"
              as="p"
              className="mt-4 border-t border-fk-plum/20 pt-4 font-body text-sm text-fk-ink/80"
              initialValue={contentMap[`${f.slug}.bio`] ?? f.bio}
            />
          </EditableRotation>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-center font-display text-xl italic text-fk-plum">
        {keepersShared}
      </p>
    </div>
  );
}
