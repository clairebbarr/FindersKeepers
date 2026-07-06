import { LinkButton } from "@/components/ui/Button";
import { Star4 } from "@/components/brand/icons";
import { ourWhy, brand } from "@/content/site-copy";

export function OurWhyTeaser() {
  return (
    <section className="bg-fk-mint px-5 py-20 text-fk-plum sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Star4 className="mx-auto h-8 w-8 text-fk-plum" />
        <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight sm:text-5xl">
          {ourWhy.heading}
        </h2>
        <p className="mt-6 font-body text-lg leading-relaxed text-fk-plum/85">{ourWhy.paragraphs[0]}</p>
        <p className="mt-6 font-display text-2xl italic">{ourWhy.paragraphs[1]}</p>
        <p className="mt-6 font-body text-sm uppercase tracking-[0.2em] text-fk-rust">{brand.tagline}</p>
        <LinkButton
          href="/about"
          variant="ghost"
          className="mt-8 border-fk-plum text-fk-plum hover:bg-fk-plum/10"
        >
          Read our why
        </LinkButton>
      </div>
    </section>
  );
}
