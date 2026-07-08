"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { STYLE_PROPS, isValidStyleValue } from "./style-props";

// Per-element style overrides are stored in site_content under a synthetic
// page bucket ("@styles") so the whole set can be fetched once and injected as
// global CSS in the root layout — a saved style then applies for every
// visitor, not just admins. section = the element's data-fk-edit key,
// field = the CSS property, value = the value.
const KEY_RE = /^[a-zA-Z0-9:_-]+$/;

export async function updateElementStyle(elementKey: string, prop: string, value: string) {
  if (!KEY_RE.test(elementKey)) throw new Error("Invalid element key");
  if (!STYLE_PROPS[prop]) throw new Error("Unsupported style property");
  // An empty value means "reset to the design default".
  if (value !== "" && !isValidStyleValue(prop, value)) throw new Error("Invalid style value");

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
