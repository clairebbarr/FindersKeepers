function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function wrapper(bodyHtml: string) {
  return `<div style="background:#f7f5ef;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;color:#2a1226;">
    <div style="max-width:480px;margin:0 auto;background:#ffffff;border:2px solid #4a214b;padding:32px;">
      <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#f06d30;margin:0 0 8px;">Finders, Keepers</p>
      ${bodyHtml}
      <p style="margin-top:32px;font-size:12px;color:#4a214b99;">We do the finding. You do the keeping.</p>
    </div>
  </div>`;
}

export function contactAutoresponderEmail(name: string) {
  const safeName = escapeHtml(name);
  return wrapper(`
    <h1 style="font-size:22px;margin:0 0 16px;color:#4a214b;">Thanks for reaching out, ${safeName}.</h1>
    <p style="font-size:15px;line-height:1.6;">Your message has landed safely in our drawer. One of the three of us will get back to you within 24 hours.</p>
  `);
}

export function contactAdminNotificationEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return wrapper(`
    <h1 style="font-size:20px;margin:0 0 16px;color:#4a214b;">New contact message</h1>
    <p style="font-size:14px;"><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
    <p style="font-size:14px;white-space:pre-wrap;border-left:2px solid #4a214b;padding-left:12px;margin-top:12px;">${escapeHtml(message)}</p>
  `);
}

export function newSignupAdminNotificationEmail({ name, email }: { name: string; email: string }) {
  return wrapper(`
    <h1 style="font-size:20px;margin:0 0 16px;color:#4a214b;">Someone new signed up</h1>
    <p style="font-size:14px;"><strong>${escapeHtml(name || "(no name given)")}</strong> — ${escapeHtml(email)}</p>
  `);
}
