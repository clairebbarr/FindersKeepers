import type { Metadata } from "next";
import { JournalGrid } from "@/components/sections/JournalGrid";
import { AddJournalPostForm } from "@/components/admin/AddJournalPostForm";
import { getAllJournalPosts } from "@/lib/journal/get";

export const metadata: Metadata = {
  title: "Journal",
  description: "Things we've noticed, collected, found, made, and think are worth keeping.",
};

export default async function JournalPage() {
  const posts = await getAllJournalPosts();

  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-semibold text-fk-plum sm:text-5xl">Journal</h1>
        <p className="mt-4 font-body text-lg text-fk-ink/75">
          A small illustrated magazine of things we&apos;ve noticed, collected, found and made.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-6xl">
        <AddJournalPostForm />
        <JournalGrid posts={posts} />
      </div>
    </div>
  );
}
