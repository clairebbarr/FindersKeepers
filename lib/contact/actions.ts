"use server";

import { createClient } from "@/lib/supabase/server";
import { sendEmail, notifyAdmins } from "@/lib/email/resend";
import { contactAutoresponderEmail, contactAdminNotificationEmail } from "@/lib/email/templates";

export type ContactState = { status: "idle" | "success" | "error"; message?: string };

export async function submitContactMessage(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message || !email.includes("@")) {
    return { status: "error", message: "Please fill in every field with a valid email." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({ name, email, message });
  if (error) {
    return { status: "error", message: "Something went wrong — please try again." };
  }

  // Email delivery is best-effort — the message is already saved either way.
  await Promise.all([
    sendEmail({ to: email, subject: "A small note from Finders, Keepers", html: contactAutoresponderEmail(name) }),
    notifyAdmins(`New contact message from ${name}`, contactAdminNotificationEmail({ name, email, message })),
  ]);

  return { status: "success" };
}
