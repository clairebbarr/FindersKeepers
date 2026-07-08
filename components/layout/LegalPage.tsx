import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: ReactNode;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl">
        {typeof title === "string" ? (
          <h1 className="font-display text-4xl font-semibold text-fk-plum">{title}</h1>
        ) : (
          title
        )}
        <p className="mt-2 font-body text-xs uppercase tracking-[0.15em] text-fk-ink/50">
          Last updated: {updated}
        </p>
        <div className="mt-6 border-l-2 border-fk-mustard bg-fk-mustard/10 px-4 py-3 font-body text-sm text-fk-ink/70">
          This page is an editable placeholder, not finished legal advice. It should be reviewed by a
          qualified UK solicitor or accountant before the site goes live.
        </div>
        <div className="prose-fk mt-10 space-y-6 font-body text-fk-ink/85">{children}</div>
      </div>
    </div>
  );
}
