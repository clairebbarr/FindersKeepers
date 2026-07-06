import { LinkButton } from "@/components/ui/Button";
import { JournalGrid } from "@/components/sections/JournalGrid";

export function LatestDiscoveries() {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-fk-plum sm:text-4xl">Latest Discoveries</h2>
          <p className="mt-3 font-body text-fk-ink/75">
            Things we&apos;ve noticed, collected, found and made lately.
          </p>
        </div>

        <div className="mt-12">
          <JournalGrid limit={3} />
        </div>

        <div className="mt-10 text-center">
          <LinkButton href="/journal" variant="ghost">
            Read the journal
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
