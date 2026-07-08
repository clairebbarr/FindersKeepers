import { PublisherMark } from "@/components/brand/PublisherMark";
import { Star4 } from "@/components/brand/icons";
import { EditableText } from "@/components/admin/EditableText";
import { home } from "@/content/site-copy";

export function PromiseSection({
  contentMap = {},
}: {
  contentMap?: Record<string, string>;
}) {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-4xl items-center gap-10 sm:grid-cols-[auto_1fr]">
        <div className="mx-auto">
          <PublisherMark className="h-40 w-40 text-fk-plum sm:h-48 sm:w-48" />
        </div>
        <div className="text-center sm:text-left">
          <EditableText
            page="home"
            section="promise"
            field="eyebrow"
            as="p"
            className="font-body text-xs uppercase tracking-[0.3em] text-fk-rust"
            initialValue={contentMap["promise.eyebrow"] ?? "Our publisher's mark"}
          />
          <h2 className="mt-3 flex flex-wrap items-center justify-center gap-3 font-display text-4xl font-semibold uppercase tracking-tight text-fk-plum sm:justify-start sm:text-5xl">
            <EditableText
              page="home"
              section="promise"
              field="heading"
              initialValue={contentMap["promise.heading"] ?? home.promiseHeading}
            />
            <Star4 className="h-6 w-6 text-fk-rust" />
          </h2>
          <EditableText
            page="home"
            section="promise"
            field="body"
            as="p"
            className="mt-4 max-w-md font-body text-lg text-fk-ink/80"
            initialValue={contentMap["promise.body"] ?? home.promiseBody}
          />
        </div>
      </div>
    </section>
  );
}
