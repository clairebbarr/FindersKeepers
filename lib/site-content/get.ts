import { createClient } from "@/lib/supabase/server";
import { rethrowIfDynamicServerUsage } from "@/lib/supabase/errors";

/** Editable text overrides for a page, keyed "section.field". Falls back to
 *  an empty map (callers use their own static default) if unset/unreachable. */
export async function getSiteContentMap(page: string): Promise<Record<string, string>> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return {};
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_content").select("section, field, value").eq("page", page);
    const map: Record<string, string> = {};
    (data ?? []).forEach((row) => {
      map[`${row.section}.${row.field}`] = row.value ?? "";
    });
    return map;
  } catch (err) {
    rethrowIfDynamicServerUsage(err);
    return {};
  }
}

/** Uploaded image URLs keyed by media_assets.key. */
export async function getMediaMap(keys: string[]): Promise<Record<string, string>> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || keys.length === 0) return {};
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("media_assets").select("key, url").in("key", keys);
    const map: Record<string, string> = {};
    (data ?? []).forEach((row) => {
      map[row.key] = row.url;
    });
    return map;
  } catch (err) {
    rethrowIfDynamicServerUsage(err);
    return {};
  }
}

/** Global brand colour token overrides (e.g. "plum" -> "#4a214b"), keyed by
 *  the same short name used in --color-fk-<key> / bg-fk-<key> classes. */
export async function getColorOverrides(): Promise<Record<string, string>> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return {};
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_colors").select("token_key, value");
    const map: Record<string, string> = {};
    (data ?? []).forEach((row) => {
      map[row.token_key] = row.value;
    });
    return map;
  } catch (err) {
    rethrowIfDynamicServerUsage(err);
    return {};
  }
}
