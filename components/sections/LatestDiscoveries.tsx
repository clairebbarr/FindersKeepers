import { LinkButton } from "@/components/ui/Button";
import { JournalGrid } from "@/components/sections/JournalGrid";
import { EditableText } from "@/components/admin/EditableText";
import { getAllJournalPosts } from "@/lib/journal/get";

export async function LatestDiscoveries({ contentMap = {} }: { contentMap?: Record<string, string> }) {
  const posts = await getAllJournalPosts();

  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <EditableText
            page="home"
            section="latest-discoveries"
            field="heading"
            as="h2"
            className="font-display text-3xl font-semibold text-fk-plum sm:text-4xl"
            initialValue={contentMap["latest-discoveries.heading"] ?? "Latest Discoveries"}
          />
          <EditableText
            page="home"
            section="latest-discoveries"
            field="subheading"
            as="p"
            className="mt-3 font-body text-fk-ink/75"
            initialValue={
              contentMap["latest-discoveries.subheading"] ?? "Things we've noticed, collected, found and made lately."
            }
          />
        </div>

        <div className="mt-12">
          <JournalGrid posts={posts} limit={3} />
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
