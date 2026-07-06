"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { notifyAdmins } from "@/lib/email/resend";
import { newSignupAdminNotificationEmail } from "@/lib/email/templates";

export type AuthActionState = { error: string | null };

const CONNECTION_ERROR =
  "Couldn't connect to the account system. If this keeps happening, the site's Supabase environment variables may not be configured on this deployment.";

export async function login(_prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  let authError: string | null = null;
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) authError = error.message;
  } catch (err) {
    console.error("[auth] login failed:", err);
    return { error: CONNECTION_ERROR };
  }

  if (authError) return { error: authError };

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
