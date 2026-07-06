import type { Metadata } from "next";
import Link from "next/link";
import { ArchivalFrame } from "@/components/brand/ArchivalFrame";
import { Label, Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-display text-4xl font-semibold text-fk-plum">Login</h1>

        <ArchivalFrame className="mt-10">
          <p className="mb-6 text-center font-body text-sm text-fk-ink/60">
            Accounts arrive with Stage 2 of the build (Supabase authentication). This form is a preview of
            the layout only — it doesn&apos;t sign anyone in yet.
          </p>
          <form className="space-y-5">
            <div>
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" type="email" disabled placeholder="you@example.com" />
            </div>
            <div>
              <Label htmlFor="login-password">Password</Label>
              <Input id="login-password" type="password" disabled placeholder="••••••••" />
            </div>
            <Button type="button" disabled className="w-full">
              Log in
            </Button>
          </form>
          <p className="mt-6 text-center font-body text-sm text-fk-ink/70">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-fk-plum underline underline-offset-2">
              Sign up
            </Link>
          </p>
        </ArchivalFrame>
      </div>
    </div>
  );
}
