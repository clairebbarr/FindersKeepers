import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { editions } from "@/content/editions";
import { journalPosts } from "@/content/journal-posts";

async function getCounts() {
  const supabase = await createClient();
  const [users, subscribed, subscribers, messages, unhandled] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }).eq("subscribed", true),
    supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("handled", false),
  ]);
  return {
    users: users.count ?? 0,
    subscribed: subscribed.count ?? 0,
    subscribers: subscribers.count ?? 0,
    messages: messages.count ?? 0,
    unhandled: unhandled.count ?? 0,
  };
}

export default async function AdminOverviewPage() {
  const counts = await getCounts();

  const cards = [
    {
      label: "Users",
      value: counts.users,
      sub: `${counts.subscribed} subscribed`,
      href: "/admin/users",
    },
    { label: "Newsletter subscribers", value: counts.subscribers, href: "/admin/subscribers" },
    {
      label: "Contact messages",
      value: counts.messages,
      sub: counts.unhandled > 0 ? `${counts.unhandled} awaiting reply` : "all handled",
      href: "/admin/messages",
    },
    { label: "Editions", value: editions.length, href: "/editions" },
    { label: "Journal posts", value: journalPosts.length, href: "/journal" },
  ];

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="block border-2 border-fk-plum bg-fk-paper p-6 shadow-[3px_3px_0_0_var(--color-fk-plum)] transition-transform hover:-translate-y-0.5"
          >
            <p className="font-body text-xs uppercase tracking-[0.15em] text-fk-rust">{card.label}</p>
            <p className="mt-2 font-display text-4xl font-semibold text-fk-plum">{card.value}</p>
            {card.sub ? <p className="mt-1 font-body text-xs text-fk-ink/60">{card.sub}</p> : null}
          </Link>
        ))}
      </div>

      <div className="mt-10 border-t border-fk-plum/20 pt-8">
        <h2 className="font-display text-xl font-semibold text-fk-plum">Editing the site</h2>
        <p className="mt-2 max-w-2xl font-body text-sm text-fk-ink/75">
          Most content is edited directly on the page: log in, click the small round button in the
          bottom-right corner of any page, switch on &quot;Edit this site&quot;, then click any dashed-outline
          text or image to change it. Brand colours can be changed the same way — click the 🎨 button on a
          coloured section — or all at once from the{" "}
          <Link href="/admin/colours" className="underline">
            Colours
          </Link>{" "}
          page.
        </p>
      </div>
    </div>
  );
}
