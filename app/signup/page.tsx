import type { Metadata } from "next";
import Link from "next/link";
import { ArchivalFrame } from "@/components/brand/ArchivalFrame";
import { SignupForm } from "./SignupForm";

export const metadata: Metadata = { title: "Sign Up" };

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const checkEmail = params["check-email"] === "1";

  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-display text-4xl font-semibold text-fk-plum">Sign Up</h1>

        <ArchivalFrame className="mt-10">
          {checkEmail ? (
            <p className="border border-fk-mint bg-fk-mint/20 px-4 py-3 text-center font-body text-sm text-fk-plum">
              Almost there — check your email for a confirmation link before logging in.
            </p>
          ) : (
            <>
              <SignupForm />
              <p className="mt-6 text-center font-body text-sm text-fk-ink/70">
                Already have an account?{" "}
                <Link href="/login" className="text-fk-plum underline underline-offset-2">
                  Log in
                </Link>
              </p>
            </>
          )}
        </ArchivalFrame>
      </div>
    </div>
  );
}
