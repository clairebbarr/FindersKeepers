"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/** Upserts one editable text field. RLS also enforces admin-only writes;
 *  this check just gives a clean error instead of a silent RLS rejection. */
export async function updateSiteContent(page: string, section: string, field: string, value: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("site_content")
    .upsert({ page, section, field, value, updated_by: user.id }, { onConflict: "page,section,field" });

  if (error) throw new Error(error.message);
  revalidatePath(page === "home" ? "/" : `/${page}`);
}
