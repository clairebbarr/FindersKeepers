"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useEditMode } from "./EditModeContext";
import { updateSiteContent } from "@/lib/site-content/actions";
import { ICON_REGISTRY, ICON_KEYS, isIconKey, type IconKey } from "@/lib/site-content/icon-registry";

/**
 * A single icon that admins can swap for any other icon in the brand
 * library, in place — the icon's position/size in the layout never moves,
 * only which glyph renders. Same click-to-edit language as EditableImage.
 */
export function EditableIcon({
  page,
  section,
  field,
  initialIconKey,
  iconClassName = "",
}: {
  page: string;
  section: string;
  field: string;
  initialIconKey: string;
  iconClassName?: string;
}) {
  const { isAdmin, editMode } = useEditMode();
  const [iconKey, setIconKey] = useState<IconKey>(isIconKey(initialIconKey) ? initialIconKey : "star8");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const CurrentIcon = ICON_REGISTRY[iconKey].Icon;

  if (!isAdmin || !editMode) {
    return <CurrentIcon className={iconClassName} />;
  }

  function pick(key: IconKey) {
    setIconKey(key);
    setOpen(false);
    startTransition(async () => {
      await updateSiteContent(page, section, field, key);
      router.refresh();
    });
  }

  return (
    <span className="relative inline-flex">
      <CurrentIcon className={iconClassName} />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-label="Change this icon"
        disabled={isPending}
        className="absolute -right-2 -top-2 z-30 flex h-6 w-6 items-center justify-center rounded-full border-2 border-fk-cream bg-fk-ink/80 text-[10px] text-fk-cream shadow-[1px_1px_0_0_var(--color-fk-ink)]"
      >
        ✎
      </button>
      {open ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute left-1/2 top-full z-40 mt-2 w-56 -translate-x-1/2 rounded-2xl border-2 border-fk-plum bg-fk-cream p-3 text-left shadow-[3px_3px_0_0_var(--color-fk-plum)]"
        >
          <p className="font-body text-xs uppercase tracking-wide text-fk-ink/60">Pick an icon</p>
          <div className="mt-2 grid grid-cols-5 gap-2">
            {ICON_KEYS.map((key) => {
              const { Icon, label } = ICON_REGISTRY[key];
              return (
                <button
                  key={key}
                  type="button"
                  title={label}
                  onClick={() => pick(key)}
                  className={`flex h-9 w-9 items-center justify-center rounded border ${
                    key === iconKey ? "border-fk-rust bg-fk-rust/10" : "border-fk-plum/20"
                  }`}
                >
                  <Icon className="h-5 w-5 text-fk-plum" />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </span>
  );
}
