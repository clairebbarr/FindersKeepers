"use client";

import { useRef, useState, type ReactNode } from "react";
import { useEditMode } from "./EditModeContext";
import { createClient } from "@/lib/supabase/client";

export function EditableImage({
  mediaKey,
  initialUrl,
  alt,
  className = "",
  fallback,
}: {
  mediaKey: string;
  initialUrl: string | null;
  alt: string;
  className?: string;
  fallback: ReactNode;
}) {
  const { isAdmin, editMode } = useEditMode();
  const [url, setUrl] = useState(initialUrl);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${mediaKey}-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("media").upload(path, file, { upsert: true });
      if (uploadError) {
        console.error(uploadError);
        return;
      }
      const { data: pub } = supabase.storage.from("media").getPublicUrl(path);
      await supabase.from("media_assets").upsert(
        { key: mediaKey, url: pub.publicUrl, alt_text: alt },
        { onConflict: "key" }
      );
      setUrl(pub.publicUrl);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element -- user-uploaded, arbitrary remote host
        <img src={url} alt={alt} className="h-full w-full object-cover" />
      ) : (
        fallback
      )}
      {isAdmin && editMode ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="absolute inset-0 flex items-center justify-center bg-fk-plum/75 font-body text-xs uppercase tracking-wide text-fk-cream opacity-0 transition-opacity hover:opacity-100"
        >
          {uploading ? "Uploading..." : "Change photo"}
        </button>
      ) : null}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}
