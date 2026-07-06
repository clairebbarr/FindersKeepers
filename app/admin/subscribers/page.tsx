import { createClient } from "@/lib/supabase/server";

export default async function AdminSubscribersPage() {
  const supabase = await createClient();
  const { data: subscribers } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-fk-plum">Newsletter Subscribers</h2>
      <p className="mt-1 font-body text-sm text-fk-ink/60">
        Everyone who&apos;s left their name in the drawer, newest first.
      </p>

      <div className="mt-8 overflow-hidden border-2 border-fk-plum">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-fk-plum text-fk-cream">
            <tr>
              <th className="px-4 py-2 font-semibold">Email</th>
              <th className="px-4 py-2 font-semibold">Subscribed</th>
              <th className="px-4 py-2 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody>
            {subscribers && subscribers.length > 0 ? (
              subscribers.map((s, i) => (
                <tr key={s.id} className={i % 2 === 0 ? "bg-fk-paper" : "bg-fk-cream"}>
                  <td className="px-4 py-2 text-fk-ink/85">{s.email}</td>
                  <td className="px-4 py-2 text-fk-ink/60">
                    {new Date(s.subscribed_at).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-2 text-fk-ink/60">{s.source}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-fk-ink/60">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
