"use server";

import { createClient } from "@/lib/supabase/server";

export type NewsletterState = { status: "idle" | "success" | "error"; message?: string };

export async function subscribeToNewsletter(
  _prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email || !email.includes("@")) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("newsletter_subscribers").insert({ email, source: "website" });

  if (error) {
    // unique_violation — already subscribed. Treat as success, not an error.
    if (error.code === "23505") {
      return { status: "success" };
    }
    return { status: "error", message: "Something went wrong — please try again." };
  }

  return { status: "success" };
}
