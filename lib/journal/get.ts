import { createClient } from "@/lib/supabase/server";
import { rethrowIfDynamicServerUsage } from "@/lib/supabase/errors";
import { journalPosts as staticPosts, type JournalPost, type JournalCategory } from "@/content/journal-posts";

/** Real, admin-added posts merged with the static starter set, newest first. */
export async function getAllJournalPosts(): Promise<JournalPost[]> {
  const dbPosts = await getDbJournalPosts();
  const converted: JournalPost[] = dbPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle ?? "",
    category: p.category as JournalCategory,
    date: p.created_at,
    author: p.author,
    excerpt: p.excerpt ?? p.body.slice(0, 160),
    body: p.body.split("\n\n"),
  }));

  return [...converted, ...staticPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

type DbJournalPost = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  category: string;
  author: string;
  excerpt: string | null;
  body: string;
  created_at: string;
};

async function getDbJournalPosts(): Promise<DbJournalPost[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("journal_posts")
      .select("*")
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch (err) {
    rethrowIfDynamicServerUsage(err);
    console.error("[journal] failed to load posts:", err);
    return [];
  }
}
