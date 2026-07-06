import type { Metadata } from "next";
import { Star4 } from "@/components/brand/icons";
import { founders, keepersShared } from "@/content/founders";

export const metadata: Metadata = {
  title: "Meet the Keepers",
  description: "The three people behind Finders, Keepers.",
};

export default function KeepersPage() {
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
          <div
            key={f.slug}
            className="relative border-2 border-fk-plum bg-fk-paper p-8 text-center shadow-[6px_6px_0_0_var(--color-fk-plum)]"
            style={{ transform: `rotate(${i === 1 ? 0 : i === 0 ? -1 : 1}deg)` }}
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-fk-plum bg-fk-mint font-display text-3xl font-semibold text-fk-plum">
              {f.initials}
            </div>
            <h2 className="mt-5 font-display text-3xl font-semibold uppercase text-fk-plum">{f.name}</h2>
            <p className="mt-1 font-body text-sm uppercase tracking-[0.15em] text-fk-rust">{f.role}</p>
            <Star4 className="mx-auto mt-4 h-5 w-5 text-fk-plum/40" />
            <p className="mt-4 border-t border-fk-plum/20 pt-4 font-body text-sm text-fk-ink/80">{f.bio}</p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-center font-display text-xl italic text-fk-plum">
        {keepersShared}
      </p>
    </div>
  );
}
