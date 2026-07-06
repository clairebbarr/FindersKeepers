import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { journalPosts, getJournalPost } from "@/content/journal-posts";

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  return (
    <article className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <Badge>{post.category}</Badge>
        <h1 className="mt-4 font-display text-4xl font-semibold text-fk-plum sm:text-5xl">{post.title}</h1>
        <p className="mt-2 font-body text-lg text-fk-ink/70">{post.subtitle}</p>
        <p className="mt-2 font-body text-xs uppercase tracking-[0.15em] text-fk-ink/50">
          {post.author} &middot;{" "}
          {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="mt-8 space-y-4 font-body text-lg leading-relaxed text-fk-ink/85">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-12">
          <LinkButton href="/journal" variant="ghost">
            Back to the journal
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
