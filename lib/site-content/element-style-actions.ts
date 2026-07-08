"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// Per-element style overrides are stored in site_content under a synthetic
// page bucket ("@styles") so the whole set can be fetched once and injected as
// global CSS in the root layout — a saved colour then applies for every
// visitor, not just admins. section = the element's data-fk-edit key,
// field = the CSS property, value = the value.
const HEX_RE = /^#[0-9a-fA-F]{6}$/;
const KEY_RE = /^[a-zA-Z0-9:_-]+$/;
const ALLOWED_PROPS = new Set(["color", "backgroundColor"]);

export async function updateElementStyle(elementKey: string, prop: string, value: string) {
  if (!KEY_RE.test(elementKey)) throw new Error("Invalid element key");
  if (!ALLOWED_PROPS.has(prop)) throw new Error("Unsupported style property");
  // An empty value means "reset to the design default".
  if (value !== "" && !HEX_RE.test(value)) throw new Error("Invalid colour");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  if (value === "") {
    const { error } = await supabase
      .from("site_content")
      .delete()
      .eq("page", "@styles")
      .eq("section", elementKey)
      .eq("field", prop);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("site_content")
      .upsert(
        { page: "@styles", section: elementKey, field: prop, value, updated_by: user.id },
        { onConflict: "page,section,field" }
      );
    if (error) throw new Error(error.message);
  }

  revalidatePath("/", "layout");
}
