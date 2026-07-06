/**
 * Next.js signals "this route needs dynamic rendering" by throwing an error
 * with this digest when cookies()/headers()/etc are read during static
 * generation. Any try/catch wrapping a Supabase call (which reads cookies)
 * must let this specific error propagate — swallowing it would hide the
 * signal Next.js needs to correctly mark the route dynamic.
 */
export function rethrowIfDynamicServerUsage(err: unknown): void {
  if (
    err &&
    typeof err === "object" &&
    "digest" in err &&
    String((err as { digest: unknown }).digest).startsWith("DYNAMIC_SERVER_USAGE")
  ) {
    throw err;
  }
}
