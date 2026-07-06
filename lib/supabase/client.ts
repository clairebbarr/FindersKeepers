import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for use in Client Components. Not wired into any page yet —
 * Stage 2 (auth/database) starts once real project credentials are set in
 * NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. See .env.example.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
