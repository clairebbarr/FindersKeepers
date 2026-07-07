-- Placeholder subscription flag until Stripe (Stage 3) exists. A future
-- Stripe webhook handler will flip this on checkout.session.completed /
-- customer.subscription.updated and off on customer.subscription.deleted.
-- Lets the admin Users page categorise people today without pretending
-- billing is wired up.
alter table public.profiles
  add column if not exists subscribed boolean not null default false;
