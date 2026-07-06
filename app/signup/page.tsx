import type { Metadata } from "next";
import Link from "next/link";
import { ArchivalFrame } from "@/components/brand/ArchivalFrame";
import { Label, Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Sign Up" };

export default function SignupPage() {
  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-display text-4xl font-semibold text-fk-plum">Sign Up</h1>

        <ArchivalFrame className="mt-10">
          <p className="mb-6 text-center font-body text-sm text-fk-ink/60">
            Accounts arrive with Stage 2 of the build (Supabase authentication). This form is a preview of
            the layout only — it doesn&apos;t create an account yet. In the meantime, join the waitlist from
            the Pricing page.
          </p>
          <form className="space-y-5">
            <div>
              <Label htmlFor="signup-name">Name</Label>
              <Input id="signup-name" disabled />
            </div>
            <div>
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" type="email" disabled placeholder="you@example.com" />
            </div>
            <div>
              <Label htmlFor="signup-password">Password</Label>
              <Input id="signup-password" type="password" disabled placeholder="••••••••" />
            </div>
            <Button type="button" disabled className="w-full">
              Create account
            </Button>
          </form>
          <p className="mt-6 text-center font-body text-sm text-fk-ink/70">
            Already have an account?{" "}
            <Link href="/login" className="text-fk-plum underline underline-offset-2">
              Log in
            </Link>
          </p>
        </ArchivalFrame>
      </div>
    </div>
  );
}
