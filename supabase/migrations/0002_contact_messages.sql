-- Contact form submissions.
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now(),
  handled boolean not null default false
);

alter table public.contact_messages enable row level security;

drop policy if exists "contact_messages_insert_public" on public.contact_messages;
create policy "contact_messages_insert_public" on public.contact_messages
  for insert with check (true);

drop policy if exists "contact_messages_select_admin" on public.contact_messages;
create policy "contact_messages_select_admin" on public.contact_messages
  for select using (public.is_admin());

drop policy if exists "contact_messages_update_admin" on public.contact_messages;
create policy "contact_messages_update_admin" on public.contact_messages
  for update using (public.is_admin()) with check (public.is_admin());
