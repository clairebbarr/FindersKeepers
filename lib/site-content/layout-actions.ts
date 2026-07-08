"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// Page layout (section order + which sections are hidden) is stored in
// site_content under a synthetic page bucket "@layout", section = the page key
// (e.g. "home"), field = "order" | "hidden", value = comma-separated ids.
const KEY_RE = /^[a-zA-Z0-9:_-]+$/;
const ID_RE = /^[a-zA-Z0-9_-]+$/;

function pathFor(pageKey: string) {
  return pageKey === "home" ? "/" : `/${pageKey}`;
}

async function saveField(pageKey: string, field: string, value: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("site_content")
    .upsert(
      { page: "@layout", section: pageKey, field, value, updated_by: user.id },
      { onConflict: "page,section,field" }
    );
  if (error) throw new Error(error.message);
}

export async function setLayoutOrder(pageKey: string, ids: string[]) {
  if (!KEY_RE.test(pageKey) || !ids.every((id) => ID_RE.test(id))) throw new Error("Invalid layout");
  await saveField(pageKey, "order", ids.join(","));
  revalidatePath(pathFor(pageKey));
}

export async function setHiddenSections(pageKey: string, hiddenIds: string[]) {
  if (!KEY_RE.test(pageKey) || !hiddenIds.every((id) => ID_RE.test(id))) throw new Error("Invalid layout");
  await saveField(pageKey, "hidden", hiddenIds.join(","));
  revalidatePath(pathFor(pageKey));
}
