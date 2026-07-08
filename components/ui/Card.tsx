import type { HTMLAttributes, ReactNode } from "react";

export function Card({
  children,
  className = "",
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      data-fk-edit="ui:card"
      {...rest}
      className={`border border-fk-ink/15 bg-fk-paper/60 p-6 shadow-[3px_3px_0_0_rgba(36,22,38,0.08)] transition-transform duration-150 hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  className = "",
  ...rest
}: HTMLAttributes<HTMLSpanElement> & { children: ReactNode }) {
  return (
    <span
      data-fk-edit="ui:badge"
      {...rest}
      className={`inline-flex items-center rounded-full border border-fk-ink/30 px-3 py-1 font-body text-xs uppercase tracking-[0.2em] text-fk-ink/70 ${className}`}
    >
      {children}
    </span>
  );
}
