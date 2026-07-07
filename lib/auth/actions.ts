"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { notifyAdmins, sendEmail, SITE_URL } from "@/lib/email/resend";
import { newSignupAdminNotificationEmail, welcomeEmail } from "@/lib/email/templates";

export type AuthActionState = { error: string | null };

const CONNECTION_ERROR =
  "Couldn't connect to the account system. If this keeps happening, the site's Supabase environment variables may not be configured on this deployment.";

export async function login(_prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  // TEMPORARY DIAGNOSTIC — surfaces the real cause instead of the vague
  // "couldn't connect" message. Remove once the deployment is fixed.
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const diag = `URL:${rawUrl ? rawUrl.replace("https://", "").slice(0, 22) : "MISSING"} | KEY:${
    rawKey ? `present(${rawKey.slice(0, 6)}…len${rawKey.length})` : "MISSING"
  }`;

  let authError: string | null = null;
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) authError = error.message;
  } catch (err) {
    return { error: `[DIAG] ${diag} | threw: ${err instanceof Error ? err.message : String(err)}` };
  }

  if (authError) return { error: `[DIAG] ${diag} | auth: ${authError}` };

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(_prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("name") ?? "");

  let authError: string | null = null;
  let hasSession = false;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) {
      authError = error.message;
    } else {
      hasSession = !!data.session;
    }
  } catch (err) {
    console.error("[auth] signup failed:", err);
    return { error: CONNECTION_ERROR };
  }

  if (authError) return { error: authError };

  try {
    await notifyAdmins(
      `New signup: ${fullName || email}`,
      newSignupAdminNotificationEmail({ name: fullName, email })
    );
    await sendEmail({
      to: email,
      subject: "Welcome to Finders, Keepers",
      html: welcomeEmail({ name: fullName, siteUrl: SITE_URL }),
    });
  } catch (err) {
    // Email is best-effort — never block signup on a notification failure.
    console.error("[email] signup notification failed:", err);
  }

  revalidatePath("/", "layout");

  if (!hasSession) {
    // Email confirmation is required before a session exists.
    redirect("/signup?check-email=1");
  }
  redirect("/account");
}

export async function signOut() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (err) {
    console.error("[auth] sign out failed:", err);
  }
  revalidatePath("/", "layout");
  redirect("/");
}
