-- Global brand colour tokens. Overriding a row here changes that colour
-- everywhere it's used sitewide (it drives a CSS custom property that every
-- Tailwind utility class like bg-fk-plum reads from). Per-block overrides
-- (changing just one section's colour) reuse the existing site_content table
-- instead of a new one — same key/value shape, just a hex string as the value.
create table if not exists public.site_colors (
  token_key text primary key,
  value text not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id)
);

alter table public.site_colors enable row level security;

drop policy if exists "site_colors_select_public" on public.site_colors;
create policy "site_colors_select_public" on public.site_colors
  for select using (true);

drop policy if exists "site_colors_admin_write" on public.site_colors;
create policy "site_colors_admin_write" on public.site_colors
  for all using (public.is_admin()) with check (public.is_admin());
