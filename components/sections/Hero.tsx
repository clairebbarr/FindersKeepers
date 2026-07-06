import { Wordmark } from "@/components/brand/Wordmark";
import {
  Star8,
  Key,
  Shell,
  Moth,
  PressedFlower,
  Bow,
  Teacup,
  Book,
  Envelope,
} from "@/components/brand/icons";
import { LinkButton } from "@/components/ui/Button";
import { home } from "@/content/site-copy";

const specimens = [Star8, Key, Shell, Moth, PressedFlower, Bow, Teacup, Book, Envelope];

export function Hero() {
  return (
    <section className="paper-grain relative overflow-hidden bg-fk-plum text-fk-mint">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        {/* Left: wordmark + list */}
        <div className="relative">
          <p className="font-body text-[0.65rem] uppercase tracking-[0.18em] text-fk-mint/70 sm:text-xs sm:tracking-[0.3em]">
            {home.heroEyebrow}
          </p>

          <Wordmark stacked className="mt-4 text-[3.5rem] leading-[0.82] text-fk-mint sm:text-8xl" />

          <ul className="mt-8 space-y-1 font-body text-sm uppercase tracking-[0.12em] text-fk-mint/85 sm:text-base">
            {home.heroList.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LinkButton href={home.primaryCta.href} variant="secondary">
              {home.primaryCta.label}
            </LinkButton>
            <LinkButton
              href={home.secondaryCta.href}
              variant="ghost"
              className="border-fk-mint/50 text-fk-mint hover:bg-fk-mint/10"
            >
              {home.secondaryCta.label}
            </LinkButton>
          </div>
        </div>

        {/* Right: collector's specimen case of brand motifs */}
        <div className="relative mx-auto w-full max-w-xs">
          <p className="mb-3 text-center font-body text-[0.65rem] uppercase tracking-[0.3em] text-fk-mint/70">
            A collection of small things
          </p>
          <div className="grid grid-cols-3 overflow-hidden rounded-sm border-2 border-fk-mint/60">
            {specimens.map((Icon, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center border border-fk-mint/25 p-4"
              >
                <Icon className="h-8 w-8 text-fk-mint sm:h-9 sm:w-9" />
              </div>
            ))}
          </div>
          <p className="mt-4 text-center font-body text-xs uppercase tracking-[0.2em] text-fk-mint/80">
            {home.heroMark}
          </p>
        </div>
      </div>

      {/* bottom ribbon, like the reference footer strip */}
      <div className="overflow-hidden border-t border-fk-mint/20 bg-fk-plum-dark py-3">
        <p className="text-center font-body text-[0.6rem] uppercase tracking-[0.2em] text-fk-mint/70 sm:text-xs sm:tracking-[0.3em]">
          Notice <span className="text-fk-rust">✶</span> Collect{" "}
          <span className="text-fk-rust">✶</span> Create <span className="text-fk-rust">✶</span> Share
        </p>
      </div>
    </section>
  );
}
