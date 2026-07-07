import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/Card";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, subscribed, created_at")
    .order("created_at", { ascending: false });

  const all = profiles ?? [];
  const subscribed = all.filter((p) => p.subscribed);
  const notSubscribed = all.filter((p) => !p.subscribed);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-fk-plum">Customers &amp; Users</h2>
      <p className="mt-1 max-w-2xl font-body text-sm text-fk-ink/60">
        Everyone with an account, split by subscription status. Subscription status is a placeholder until
        Stripe (Stage 3) is connected — it will update automatically from real payments once that&apos;s wired
        up, rather than needing to be set by hand here.
      </p>

      <Section title="Subscribed" people={subscribed} emptyText="No one is marked as subscribed yet." />
      <Section title="Not Subscribed" people={notSubscribed} emptyText="No other accounts yet." />
    </div>
  );
}

type PersonRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string;
  subscribed: boolean;
  created_at: string;
};

function Section({
  title,
  people,
  emptyText,
}: {
  title: string;
  people: PersonRow[];
  emptyText: string;
}) {
  return (
    <div className="mt-10">
      <h3 className="font-display text-lg font-semibold text-fk-plum">
        {title} <span className="font-body text-sm font-normal text-fk-ink/50">({people.length})</span>
      </h3>
      <div className="mt-4 overflow-hidden border-2 border-fk-plum">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-fk-plum text-fk-cream">
            <tr>
              <th className="px-4 py-2 font-semibold">Name</th>
              <th className="px-4 py-2 font-semibold">Email</th>
              <th className="px-4 py-2 font-semibold">Role</th>
              <th className="px-4 py-2 font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody>
            {people.length > 0 ? (
              people.map((p, i) => (
                <tr key={p.id} className={i % 2 === 0 ? "bg-fk-paper" : "bg-fk-cream"}>
                  <td className="px-4 py-2 text-fk-ink/85">{p.full_name || "—"}</td>
                  <td className="px-4 py-2 text-fk-ink/85">{p.email}</td>
                  <td className="px-4 py-2">
                    <Badge>{p.role}</Badge>
                  </td>
                  <td className="px-4 py-2 text-fk-ink/60">
                    {new Date(p.created_at).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-fk-ink/60">
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
