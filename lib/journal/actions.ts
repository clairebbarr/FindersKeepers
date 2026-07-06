"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type JournalPostState = { status: "idle" | "success" | "error"; message?: string };

function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `post-${Date.now()}`
  );
}

/** Admin-only (RLS-enforced) — created_at defaults to now() in the database,
 *  so every new post is automatically dated the day it's added. */
export async function createJournalPost(
  _prevState: JournalPostState,
  formData: FormData
): Promise<JournalPostState> {
  const title = String(formData.get("title") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!title || !category || !body) {
    return { status: "error", message: "Title, category and body are all required." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { status: "error", message: "Not authenticated." };

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", user.id)
      .single();
    const author = profile?.full_name || profile?.email || "Finders, Keepers";

    const { error } = await supabase.from("journal_posts").insert({
      slug: slugify(title),
      title,
      subtitle: subtitle || null,
      category,
      author,
      excerpt: body.split("\n\n")[0]?.slice(0, 200) ?? "",
      body,
    });

    if (error) {
      return {
        status: "error",
        message: error.code === "23505" ? "A post with that title already exists." : "Something went wrong.",
      };
    }
  } catch (err) {
    console.error("[journal] createJournalPost failed:", err);
    return { status: "error", message: "Something went wrong — please try again." };
  }

  revalidatePath("/journal");
  revalidatePath("/");
  return { status: "success" };
}
