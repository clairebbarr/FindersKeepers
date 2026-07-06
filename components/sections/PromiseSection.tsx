import { PublisherMark } from "@/components/brand/PublisherMark";
import { Star4 } from "@/components/brand/icons";
import { home } from "@/content/site-copy";

export function PromiseSection() {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-4xl items-center gap-10 sm:grid-cols-[auto_1fr]">
        <div className="mx-auto">
          <PublisherMark className="h-40 w-40 text-fk-plum sm:h-48 sm:w-48" />
        </div>
        <div className="text-center sm:text-left">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-fk-rust">Our publisher&apos;s mark</p>
          <h2 className="mt-3 flex flex-wrap items-center justify-center gap-3 font-display text-4xl font-semibold uppercase tracking-tight text-fk-plum sm:justify-start sm:text-5xl">
            {home.promiseHeading}
            <Star4 className="h-6 w-6 text-fk-rust" />
          </h2>
          <p className="mt-4 max-w-md font-body text-lg text-fk-ink/80">{home.promiseBody}</p>
        </div>
      </div>
    </section>
  );
}
