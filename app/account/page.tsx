import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ArchivalFrame } from "@/components/brand/ArchivalFrame";
import { Key } from "@/components/brand/icons";
import { Button, LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Card";
import { getCurrentProfile, isAdminRole } from "@/lib/auth/current-profile";
import { signOut } from "@/lib/auth/actions";
import { createClient } from "@/lib/supabase/server";
import { AddressSection } from "./AddressSection";

export const metadata: Metadata = { title: "Account" };

const stillComing = [
  "Subscription status and billing portal — needs Stripe (Stage 3)",
  "Edition and order history — needs Stripe (Stage 3)",
  "Saved Lost Letters — needs the Lost Letters backend (Stage 4)",
];

export default async function AccountPage() {
  const profile = await getCurrentProfile();
  if (!profile) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { data: addresses } = await supabase
    .from("addresses")
    .select("id, label, recipient_name, line1, line2, city, postcode, country")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-lg text-center">
        <Key className="mx-auto h-8 w-8 text-fk-rust" />
        <h1 className="mt-4 font-display text-4xl font-semibold text-fk-plum">Account</h1>

        <ArchivalFrame className="mt-10 text-left">
          <p className="font-body text-sm text-fk-ink/60">Signed in as</p>
          <p className="font-display text-xl font-semibold text-fk-plum">
            {profile.full_name || profile.email}
          </p>
          <p className="font-body text-sm text-fk-ink/70">{profile.email}</p>
          <p className="mt-2">
            <Badge>{profile.subscribed ? "Subscribed" : "Not subscribed"}</Badge>
          </p>
          {isAdminRole(profile.role) ? (
            <>
              <p className="mt-2 inline-block rounded-full border border-fk-rust px-3 py-1 font-body text-xs uppercase tracking-[0.15em] text-fk-rust">
                {profile.role}
              </p>
              <LinkButton href="/admin" className="mt-4 w-full">
                Open Admin Dashboard
              </LinkButton>
            </>
          ) : null}

          <AddressSection addresses={addresses ?? []} />

          <div className="mt-6 border-t border-fk-plum/20 pt-6">
            <p className="font-body text-sm text-fk-ink/70">Still coming:</p>
            <ul className="mt-3 space-y-1">
              {stillComing.map((item) => (
                <li key={item} className="font-body text-sm text-fk-ink/60">
                  &bull; {item}
                </li>
              ))}
            </ul>
          </div>

          <form action={signOut} className="mt-6">
            <Button type="submit" variant="ghost" className="w-full">
              Sign out
            </Button>
          </form>
        </ArchivalFrame>
      </div>
    </div>
  );
}
