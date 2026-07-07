import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentProfile, isAdminRole } from "@/lib/auth/current-profile";

export const metadata: Metadata = { title: "Admin Dashboard", robots: { index: false } };

const adminNav = [
  { label: "Overview", href: "/admin" },
  { label: "Users", href: "/admin/users" },
  { label: "Messages", href: "/admin/messages" },
  { label: "Subscribers", href: "/admin/subscribers" },
  { label: "Colours", href: "/admin/colours" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();
  if (!profile || !isAdminRole(profile.role)) {
    redirect("/");
  }

  return (
    <div className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-fk-plum/20 pb-6">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-fk-rust">Admin</p>
            <h1 className="mt-1 font-display text-3xl font-semibold text-fk-plum">Dashboard</h1>
          </div>
          <nav className="flex flex-wrap gap-2" aria-label="Admin">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-fk-plum/30 px-4 py-1.5 font-body text-sm text-fk-ink/80 hover:border-fk-plum hover:text-fk-plum"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              className="rounded-full border border-fk-ink/20 px-4 py-1.5 font-body text-sm text-fk-ink/60 hover:border-fk-ink/40"
            >
              Back to site
            </Link>
          </nav>
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
