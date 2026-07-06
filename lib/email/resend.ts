const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_ADDRESS = "Finders, Keepers <hello@finderskeepersletters.com>";

/**
 * The three real admins — every contact message and new signup notifies
 * all three. Kept here rather than querying `profiles` at send-time so
 * notifications don't silently stop if someone's role changes.
 */
export const ADMIN_EMAILS = [
  "clairebarr@finderskeepersletters.com",
  "catherinecameron@finderskeepersletters.com",
  "leahsharman@finderskeepersletters.com",
];

/**
 * Sends via Resend's HTTP API directly (no SDK dependency). No-ops with a
 * console warning if RESEND_API_KEY isn't set, so the site never crashes
 * over a missing email provider — matches the same pattern used for
 * Supabase env vars elsewhere in this codebase.
 *
 * Note: sending FROM @finderskeepersletters.com requires that domain to be
 * verified in the Resend dashboard first, or Resend will reject the send.
 */
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  if (!RESEND_API_KEY) {
    console.warn(`[email] RESEND_API_KEY not set — skipped "${subject}" to`, to);
    return { sent: false };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_ADDRESS, to, subject, html }),
  });

  if (!res.ok) {
    console.error("[email] Resend send failed", res.status, await res.text());
    return { sent: false };
  }
  return { sent: true };
}

export function notifyAdmins(subject: string, html: string) {
  return sendEmail({ to: ADMIN_EMAILS, subject, html });
}
