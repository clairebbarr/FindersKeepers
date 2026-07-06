-- Real journal posts, addable by admins from the site. created_at defaults
-- to now() so a new post is automatically dated the day it's added.
create table if not exists public.journal_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  category text not null,
  author text not null,
  excerpt text,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.journal_posts enable row level security;

drop policy if exists "journal_posts_select_public" on public.journal_posts;
create policy "journal_posts_select_public" on public.journal_posts
  for select using (true);

drop policy if exists "journal_posts_admin_write" on public.journal_posts;
create policy "journal_posts_admin_write" on public.journal_posts
  for all using (public.is_admin()) with check (public.is_admin());
