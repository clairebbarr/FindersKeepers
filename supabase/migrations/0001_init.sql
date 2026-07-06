-- Finders, Keepers — Stage 2 initial schema
-- Profiles + roles, editable site content (the click-to-edit CMS store),
-- uploaded media, and newsletter signups. Idempotent (safe to re-run).

-- ============================================================
-- profiles
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  role text not null default 'customer' check (role in ('customer', 'editor', 'admin', 'owner')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- security-definer helper so policies can check "is this caller an admin"
-- without recursively re-invoking RLS on profiles itself.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'owner')
  );
$$;

drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- defense in depth: even though the update policy above doesn't restrict
-- which columns change, this trigger blocks a non-admin from ever writing a
-- different role onto their own row (e.g. via a raw REST call).
--
-- Only constrains real end-user requests through the public API (Postgres
-- role `authenticated`, detected via auth.role() — a session setting, safe
-- to read even inside SECURITY DEFINER, unlike current_user/session_user
-- which change meaning under SECURITY DEFINER). Trusted contexts (the
-- Supabase dashboard, a direct admin connection, a future service-role
-- admin script) are not constrained by this trigger.
create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.role() = 'authenticated'
     and new.role is distinct from old.role
     and not public.is_admin() then
    new.role := old.role;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_prevent_role_escalation on public.profiles;
create trigger trg_prevent_role_escalation
  before update on public.profiles
  for each row execute function public.prevent_role_escalation();

-- auto-create a profile row for every new auth user (customer by default;
-- admin accounts are promoted afterwards via a follow-up update).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    'customer'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- site_content — the generic key/value store behind click-to-edit text
-- ============================================================
create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  section text not null,
  field text not null,
  value text,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id),
  unique (page, section, field)
);

alter table public.site_content enable row level security;

drop policy if exists "site_content_select_public" on public.site_content;
create policy "site_content_select_public" on public.site_content
  for select using (true);

drop policy if exists "site_content_admin_write" on public.site_content;
create policy "site_content_admin_write" on public.site_content
  for all using (public.is_admin()) with check (public.is_admin());

-- ============================================================
-- media_assets — uploaded photos (founder headshots, edition covers, etc.)
-- ============================================================
create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  url text not null,
  alt_text text,
  uploaded_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

alter table public.media_assets enable row level security;

drop policy if exists "media_select_public" on public.media_assets;
create policy "media_select_public" on public.media_assets
  for select using (true);

drop policy if exists "media_admin_write" on public.media_assets;
create policy "media_admin_write" on public.media_assets
  for all using (public.is_admin()) with check (public.is_admin());

-- ============================================================
-- newsletter_subscribers — "Leave your name in the drawer"
-- ============================================================
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz not null default now(),
  source text default 'website'
);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "newsletter_insert_public" on public.newsletter_subscribers;
create policy "newsletter_insert_public" on public.newsletter_subscribers
  for insert with check (true);

drop policy if exists "newsletter_select_admin" on public.newsletter_subscribers;
create policy "newsletter_select_admin" on public.newsletter_subscribers
  for select using (public.is_admin());

-- ============================================================
-- storage bucket for uploaded images
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media_bucket_public_read" on storage.objects;
create policy "media_bucket_public_read" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "media_bucket_admin_insert" on storage.objects;
create policy "media_bucket_admin_insert" on storage.objects
  for insert with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media_bucket_admin_update" on storage.objects;
create policy "media_bucket_admin_update" on storage.objects
  for update using (bucket_id = 'media' and public.is_admin());

drop policy if exists "media_bucket_admin_delete" on storage.objects;
create policy "media_bucket_admin_delete" on storage.objects
  for delete using (bucket_id = 'media' and public.is_admin());
