-- Customer shipping addresses. Genuinely usable today (no Stripe needed) —
-- what still needs Stage 3 is attaching an address to a real paid order.
create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  label text not null default 'Home',
  recipient_name text not null,
  line1 text not null,
  line2 text,
  city text not null,
  postcode text not null,
  country text not null default 'United Kingdom',
  is_default boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.addresses enable row level security;

drop policy if exists "addresses_own_select" on public.addresses;
create policy "addresses_own_select" on public.addresses
  for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "addresses_own_write" on public.addresses;
create policy "addresses_own_write" on public.addresses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
