import { LinkButton } from "@/components/ui/Button";
import { Star4, Star8 } from "@/components/brand/icons";
import { founders } from "@/content/founders";

export function MeetKeepersTeaser() {
  return (
    <section className="relative overflow-hidden bg-fk-mint px-5 py-20 sm:px-8">
      <Star8 className="absolute -left-4 top-8 h-16 w-16 text-fk-plum/10" />
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-xs uppercase tracking-[0.35em] text-fk-plum/70">The three of us</p>
          <h2 className="mt-3 font-display text-4xl font-semibold uppercase tracking-tight text-fk-plum sm:text-5xl">
            Meet the Keepers
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {founders.map((f, i) => (
            <div
              key={f.slug}
              className="relative border-2 border-fk-plum bg-fk-cream p-6 text-center shadow-[5px_5px_0_0_var(--color-fk-plum)]"
              style={{ transform: `rotate(${i === 1 ? 0 : i === 0 ? -1.5 : 1.5}deg)` }}
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-fk-plum bg-fk-mint font-display text-2xl font-semibold text-fk-plum">
                {f.initials}
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold uppercase text-fk-plum">{f.name}</h3>
              <p className="font-body text-xs uppercase tracking-[0.12em] text-fk-rust">{f.role}</p>
              <Star4 className="mx-auto mt-3 h-4 w-4 text-fk-plum/40" />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <LinkButton href="/keepers" variant="ghost" className="border-fk-plum text-fk-plum hover:bg-fk-plum/10">
            Meet all three
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
