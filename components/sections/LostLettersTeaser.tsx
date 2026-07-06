import { Envelope, Star8 } from "@/components/brand/icons";
import { LinkButton } from "@/components/ui/Button";
import { lostLetters } from "@/content/site-copy";

export function LostLettersTeaser() {
  return (
    <section className="paper-grain relative overflow-hidden bg-fk-plum px-5 py-20 text-fk-mint sm:px-8">
      <Star8 className="absolute right-6 top-8 h-12 w-12 text-fk-rust/60" />
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-fk-mint">
          <Envelope className="h-7 w-7 text-fk-mint" />
        </span>
        <p className="mt-5 font-body text-xs uppercase tracking-[0.3em] text-fk-mint/70">The marketing plan</p>
        <h2 className="mt-3 font-display text-4xl font-semibold uppercase tracking-tight sm:text-5xl">
          {lostLetters.heading}
        </h2>
        <p className="mt-5 font-body text-lg text-fk-mint/85">{lostLetters.intro}</p>
        <p className="mt-4 font-display text-xl italic text-fk-mint/70">
          &ldquo;You found me, you keep me. If you&rsquo;re curious… scan me.&rdquo;
        </p>
        <LinkButton href="/lost-letters" variant="secondary" className="mt-8">
          Find a Lost Letter
        </LinkButton>
      </div>
    </section>
  );
}
