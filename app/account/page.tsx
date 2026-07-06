import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ArchivalFrame } from "@/components/brand/ArchivalFrame";
import { Key } from "@/components/brand/icons";
import { Button, LinkButton } from "@/components/ui/Button";
import { getCurrentProfile, isAdminRole } from "@/lib/auth/current-profile";
import { signOut } from "@/lib/auth/actions";

export const metadata: Metadata = { title: "Account" };

const upcoming = [
  "Subscription status and billing portal (Stage 3)",
  "Address management (Stage 3)",
  "Edition and order history (Stage 3)",
  "Saved Lost Letters (Stage 4)",
];

export default async function AccountPage() {
  const profile = await getCurrentProfile();
  if (!profile) {
    redirect("/login");
  }

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

          <div className="mt-6 border-t border-fk-plum/20 pt-6">
            <p className="font-body text-sm text-fk-ink/70">
              The rest of the account dashboard (subscriptions, orders, addresses) arrives with later
              stages of the build:
            </p>
            <ul className="mt-3 space-y-1">
              {upcoming.map((item) => (
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
