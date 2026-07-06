import type { Metadata } from "next";
import Link from "next/link";
import { ArchivalFrame } from "@/components/brand/ArchivalFrame";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-display text-4xl font-semibold text-fk-plum">Login</h1>

        <ArchivalFrame className="mt-10">
          <LoginForm />
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
