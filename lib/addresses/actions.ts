"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type AddressState = { status: "idle" | "success" | "error"; message?: string };

export async function saveAddress(_prevState: AddressState, formData: FormData): Promise<AddressState> {
  const recipient_name = String(formData.get("recipient_name") ?? "").trim();
  const line1 = String(formData.get("line1") ?? "").trim();
  const line2 = String(formData.get("line2") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const postcode = String(formData.get("postcode") ?? "").trim();
  const country = String(formData.get("country") ?? "United Kingdom").trim();
  const label = String(formData.get("label") ?? "Home").trim();

  if (!recipient_name || !line1 || !city || !postcode) {
    return { status: "error", message: "Name, address line 1, city and postcode are required." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { status: "error", message: "Not authenticated." };

    // Only one default address per person for now — clear any existing ones.
    await supabase.from("addresses").update({ is_default: false }).eq("user_id", user.id);

    const { error } = await supabase.from("addresses").insert({
      user_id: user.id,
      label: label || "Home",
      recipient_name,
      line1,
      line2: line2 || null,
      city,
      postcode,
      country: country || "United Kingdom",
      is_default: true,
    });

    if (error) return { status: "error", message: "Something went wrong — please try again." };
  } catch (err) {
    console.error("[addresses] saveAddress failed:", err);
    return { status: "error", message: "Something went wrong — please try again." };
  }

  revalidatePath("/account");
  return { status: "success" };
}

export async function deleteAddress(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("addresses").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/account");
}
