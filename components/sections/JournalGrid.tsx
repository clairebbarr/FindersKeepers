import Link from "next/link";
import { Card, Badge } from "@/components/ui/Card";
import { journalPosts } from "@/content/journal-posts";

export function JournalGrid({ limit }: { limit?: number }) {
  const posts = limit ? journalPosts.slice(0, limit) : journalPosts;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.slug} href={`/journal/${post.slug}`} className="block">
          <Card className="flex h-full flex-col gap-3">
            <Badge>{post.category}</Badge>
            <h3 className="font-display text-xl font-semibold text-fk-plum">{post.title}</h3>
            <p className="font-body text-sm text-fk-ink/70">{post.subtitle}</p>
            <p className="mt-auto font-body text-xs uppercase tracking-[0.15em] text-fk-ink/50">
              {post.author} &middot;{" "}
              {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
