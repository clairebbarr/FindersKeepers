import { createClient } from "@/lib/supabase/server";
import { MessageRow } from "./MessageRow";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-fk-plum">Contact Messages</h2>
      <p className="mt-1 font-body text-sm text-fk-ink/60">
        Every submission from the Contact page. Admins are also emailed as these arrive.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {messages && messages.length > 0 ? (
          messages.map((m) => <MessageRow key={m.id} message={m} />)
        ) : (
          <p className="font-body text-sm text-fk-ink/60">No messages yet.</p>
        )}
      </div>
    </div>
  );
}
