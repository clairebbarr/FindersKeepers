"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Star4 } from "@/components/brand/icons";
import { LinkButton } from "@/components/ui/Button";

const primaryNav = [
  { label: "Our Why", href: "/about" },
  { label: "What Arrives", href: "/what-arrives" },
  { label: "Editions", href: "/editions" },
  { label: "Lost Letters", href: "/lost-letters" },
  { label: "Journal", href: "/journal" },
  { label: "Pricing", href: "/pricing" },
];

const secondaryNav = [
  { label: "Meet the Keepers", href: "/keepers" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-fk-plum bg-fk-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
          <Star4 className="h-4 w-4 text-fk-rust" />
          <Wordmark className="text-lg text-fk-plum sm:text-xl" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-body text-xs uppercase tracking-[0.12em] text-fk-ink/75 transition-colors hover:text-fk-rust"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="font-body text-sm text-fk-ink/80 hover:text-fk-plum">
            Login
          </Link>
          <LinkButton href="/pricing" className="text-xs sm:text-sm">
            Join the next edition
          </LinkButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={`h-px w-6 bg-fk-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-fk-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-fk-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="flex flex-col gap-1 border-t border-fk-ink/10 bg-fk-cream px-5 pb-6 pt-2 lg:hidden"
        >
          {[...primaryNav, ...secondaryNav].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-fk-ink/5 py-3 font-body text-base text-fk-ink/85"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="border-b border-fk-ink/5 py-3 font-body text-base text-fk-ink/85"
          >
            Login
          </Link>
          <LinkButton href="/pricing" className="mt-4 w-full">
            Join the next edition
          </LinkButton>
        </nav>
      ) : null}
    </header>
  );
}
