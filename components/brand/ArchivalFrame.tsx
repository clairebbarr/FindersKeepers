import type { ReactNode } from "react";

export function ArchivalFrame({
  children,
  className = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className={`relative border border-fk-ink/25 p-6 sm:p-8 ${className}`}>
      <span className="absolute -top-3 left-3 h-2 w-2 border-t border-l border-fk-ink/40" />
      <span className="absolute -top-3 right-3 h-2 w-2 border-t border-r border-fk-ink/40" />
      <span className="absolute -bottom-3 left-3 h-2 w-2 border-b border-l border-fk-ink/40" />
      <span className="absolute -bottom-3 right-3 h-2 w-2 border-b border-r border-fk-ink/40" />
      {label ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-fk-cream px-3 font-body text-[0.65rem] uppercase tracking-[0.25em] text-fk-ink/60">
          {label}
        </span>
      ) : null}
      {children}
    </div>
  );
}
