import type { InputHTMLAttributes, LabelHTMLAttributes } from "react";

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      {...props}
      className={`mb-1 block font-body text-sm font-semibold text-fk-ink/80 ${props.className ?? ""}`}
    />
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full border border-fk-ink/30 bg-fk-cream px-4 py-2.5 font-body text-fk-ink placeholder:text-fk-ink/40 focus:border-fk-plum focus:outline-none ${props.className ?? ""}`}
    />
  );
}
