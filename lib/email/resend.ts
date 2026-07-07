import { newSubscriberAdminNotificationEmail } from "@/lib/email/templates";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_ADDRESS = "Finders, Keepers <hello@finderskeepersletters.com>";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://finderskeepersletters.com";

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
 * Every email sent to anyone is CC'd to all 3 admins (full chain
 * visibility), unless the recipient already IS one of the admins — no point
 * CC'ing someone their own To: line. Pass `skipAdminCc: true` for the rare
 * case an email is already addressed to exactly the admins (avoids a
 * pointless empty-cc noop, not a way to hide a send from them).
 *
 * Note: sending FROM @finderskeepersletters.com requires that domain to be
 * verified in the Resend dashboard first, or Resend will reject the send.
 */
export async function sendEmail({
  to,
  subject,
  html,
  skipAdminCc = false,
}: {
  to: string | string[];
  subject: string;
  html: string;
  skipAdminCc?: boolean;
}) {
  if (!RESEND_API_KEY) {
    console.warn(`[email] RESEND_API_KEY not set — skipped "${subject}" to`, to);
    return { sent: false };
  }

  const toList = Array.isArray(to) ? to : [to];
  const cc = skipAdminCc
    ? undefined
    : ADMIN_EMAILS.filter((admin) => !toList.includes(admin));

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to,
      ...(cc && cc.length > 0 ? { cc } : {}),
      subject,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[email] Resend send failed", res.status, await res.text());
    return { sent: false };
  }
  return { sent: true };
}

export function notifyAdmins(subject: string, html: string) {
  return sendEmail({ to: ADMIN_EMAILS, subject, html, skipAdminCc: true });
}

/**
 * Call this from the Stripe webhook once Stage 3 checkout is wired up (there
 * is no real "subscribe" event yet — Pricing is a waitlist that links to
 * Contact, see README). Kept here now so the webhook handler is a one-line
 * call instead of new plumbing when that day comes.
 */
export function notifyAdminsOfNewSubscriber({ name, email, plan }: { name: string; email: string; plan: string }) {
  return notifyAdmins(`New subscriber: ${name || email}`, newSubscriberAdminNotificationEmail({ name, email, plan }));
}
