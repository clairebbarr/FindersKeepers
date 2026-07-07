"use client";

import { useActionState, useState, useTransition } from "react";
import { Label, Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { saveAddress, deleteAddress, type AddressState } from "@/lib/addresses/actions";

type Address = {
  id: string;
  label: string;
  recipient_name: string;
  line1: string;
  line2: string | null;
  city: string;
  postcode: string;
  country: string;
};

const initialState: AddressState = { status: "idle" };

export function AddressSection({ addresses }: { addresses: Address[] }) {
  const [showForm, setShowForm] = useState(addresses.length === 0);
  const [state, formAction, pending] = useActionState(saveAddress, initialState);
  const [isDeleting, startDelete] = useTransition();

  // Adjusting state during render (not in an effect) on a status transition —
  // the pattern React recommends for "reset UI when an action succeeds"
  // instead of a setState-in-effect cascade.
  const [handledStatus, setHandledStatus] = useState(state.status);
  if (state.status !== handledStatus) {
    setHandledStatus(state.status);
    if (state.status === "success") setShowForm(false);
  }

  return (
    <div className="mt-6 border-t border-fk-plum/20 pt-6">
      <p className="font-body text-sm font-semibold text-fk-ink">Delivery address</p>

      {addresses.map((a) => (
        <div key={a.id} className="mt-3 flex items-start justify-between gap-3 border border-fk-plum/20 p-3">
          <div className="font-body text-sm text-fk-ink/80">
            <p className="font-semibold text-fk-ink">{a.recipient_name}</p>
            <p>{a.line1}</p>
            {a.line2 ? <p>{a.line2}</p> : null}
            <p>
              {a.city}, {a.postcode}
            </p>
            <p>{a.country}</p>
          </div>
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => startDelete(() => deleteAddress(a.id))}
            className="shrink-0 font-body text-xs text-fk-rust underline underline-offset-2"
          >
            Remove
          </button>
        </div>
      ))}

      {!showForm ? (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="mt-3 font-body text-sm text-fk-plum underline underline-offset-2"
        >
          {addresses.length > 0 ? "Replace address" : "+ Add an address"}
        </button>
      ) : (
        <form action={formAction} className="mt-4 space-y-3">
          <div>
            <Label htmlFor="addr-name">Recipient name</Label>
            <Input id="addr-name" name="recipient_name" required />
          </div>
          <div>
            <Label htmlFor="addr-line1">Address line 1</Label>
            <Input id="addr-line1" name="line1" required />
          </div>
          <div>
            <Label htmlFor="addr-line2">Address line 2 (optional)</Label>
            <Input id="addr-line2" name="line2" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="addr-city">City</Label>
              <Input id="addr-city" name="city" required />
            </div>
            <div>
              <Label htmlFor="addr-postcode">Postcode</Label>
              <Input id="addr-postcode" name="postcode" required />
            </div>
          </div>
          <div>
            <Label htmlFor="addr-country">Country</Label>
            <Input id="addr-country" name="country" defaultValue="United Kingdom" />
          </div>
          {state.status === "error" ? (
            <p className="font-body text-sm text-fk-rust">{state.message}</p>
          ) : null}
          <div className="flex gap-3">
            <Button type="submit" disabled={pending} className="text-sm">
              {pending ? "Saving..." : "Save address"}
            </Button>
            {addresses.length > 0 ? (
              <Button type="button" variant="ghost" className="text-sm" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            ) : null}
          </div>
        </form>
      )}
    </div>
  );
}
