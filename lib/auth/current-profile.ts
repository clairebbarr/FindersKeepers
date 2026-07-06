import { createClient } from "@/lib/supabase/server";
import { rethrowIfDynamicServerUsage } from "@/lib/supabase/errors";

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: "customer" | "editor" | "admin" | "owner";
};

/** Current logged-in user's profile, or null if signed out / not configured.
 *  Never throws — this runs on every page via the root layout, so a Supabase
 *  hiccup should degrade to "logged out" rather than crash the whole site. */
export async function getCurrentProfile(): Promise<Profile | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("id, email, full_name, avatar_url, role")
      .eq("id", user.id)
      .single();

    return (profile as Profile) ?? null;
  } catch (err) {
    rethrowIfDynamicServerUsage(err);
    console.error("[auth] getCurrentProfile failed:", err);
    return null;
  }
}

export function isAdminRole(role: Profile["role"] | undefined) {
  return role === "admin" || role === "owner";
}
