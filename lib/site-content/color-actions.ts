"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { BRAND_COLOR_TOKENS, type BrandColorTokenKey } from "./color-tokens";

const HEX_RE = /^#[0-9a-fA-F]{6}$/;
const VALID_TOKENS: Set<string> = new Set(BRAND_COLOR_TOKENS.map((t) => t.key));

/** Changes a brand colour everywhere on the site at once (every element
 *  using bg-fk-<key> / text-fk-<key> reads the same CSS variable). */
export async function updateGlobalColor(tokenKey: BrandColorTokenKey | string, hex: string) {
  if (!VALID_TOKENS.has(tokenKey)) {
    throw new Error("Unknown colour token");
  }
  if (!HEX_RE.test(hex)) throw new Error("Invalid colour");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("site_colors")
    .upsert({ token_key: tokenKey, value: hex, updated_by: user.id }, { onConflict: "token_key" });
  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
}

/** Changes the colour of just one block, stored the same way as editable
 *  text (site_content), so it doesn't touch the shared brand token. */
export async function updateBlockColor(page: string, section: string, field: string, hex: string) {
  if (!HEX_RE.test(hex)) throw new Error("Invalid colour");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("site_content")
    .upsert({ page, section, field, value: hex, updated_by: user.id }, { onConflict: "page,section,field" });
  if (error) throw new Error(error.message);

  revalidatePath(page === "home" ? "/" : `/${page}`);
}
