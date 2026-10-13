begin;
set local lock_timeout = '5s';

create schema editorial_private;
revoke all on schema editorial_private from public;
grant usage on schema editorial_private to anon, authenticated;

create table public.editorial_editors (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.editorial_editors enable row level security;
revoke all on public.editorial_editors from anon, authenticated;
grant select on public.editorial_editors to authenticated;
create policy own_editor_membership on public.editorial_editors for select to authenticated using (user_id = auth.uid());

create function editorial_private.is_editor() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.editorial_editors where user_id = (select auth.uid()));
$$;
revoke all on function editorial_private.is_editor() from public;
grant execute on function editorial_private.is_editor() to anon, authenticated;

create table public.editorial_entries (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('event', 'album', 'video')),
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug) <= 100),
  draft jsonb not null check (jsonb_typeof(draft) = 'object' and octet_length(draft::text) <= 1000000 and draft->>'slug' = slug),
  version integer not null default 1,
  published_version integer,
  first_published_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (kind, slug)
);
create table public.published_content (
  id uuid primary key references public.editorial_entries(id),
  kind text not null,
  slug text not null,
  data jsonb not null,
  published_at timestamptz not null default now(),
  unique (kind, slug)
);
alter table public.editorial_entries enable row level security;
alter table public.published_content enable row level security;
revoke all on public.editorial_entries, public.published_content from anon, authenticated;
grant select, insert on public.editorial_entries to authenticated;
grant update (draft, slug) on public.editorial_entries to authenticated;
grant select on public.published_content to anon, authenticated;
create policy editors_read on public.editorial_entries for select to authenticated using ((select editorial_private.is_editor()));
create policy editors_insert on public.editorial_entries for insert to authenticated with check ((select editorial_private.is_editor()) and version = 1 and published_version is null and first_published_at is null);
create policy editors_update on public.editorial_entries for update to authenticated using ((select editorial_private.is_editor())) with check ((select editorial_private.is_editor()));
create policy published_read on public.published_content for select to anon, authenticated using (true);

create function editorial_private.version_entry() returns trigger
language plpgsql set search_path = '' as $$
begin
  if old.first_published_at is not null and new.slug <> old.slug then
    raise exception 'The URL of a previously published content cannot change' using errcode = '23514';
  end if;
  new.version := old.version + 1;
  new.updated_at := now();
  return new;
end;
$$;
create trigger version_entry before update on public.editorial_entries for each row execute function editorial_private.version_entry();

create function public.transition_content(entry_id uuid, expected_version integer, action text) returns void
language plpgsql security definer set search_path = '' as $$
declare entry public.editorial_entries;
begin
  if not editorial_private.is_editor() then raise exception 'Not authorized' using errcode = '42501'; end if;
  select * into entry from public.editorial_entries where id = entry_id for update;
  if not found or entry.version <> expected_version then raise exception 'Content changed' using errcode = '40001'; end if;
  if action = 'publish' then
    if coalesce(length(trim(entry.draft->>'title')), 0) = 0 then raise exception 'Title required' using errcode = '23514'; end if;
    if entry.kind = 'album' and (jsonb_typeof(entry.draft->'photos') is distinct from 'array' or jsonb_array_length(entry.draft->'photos') = 0) then raise exception 'Photos required' using errcode = '23514'; end if;
    insert into public.published_content(id, kind, slug, data) values (entry.id, entry.kind, entry.slug, entry.draft)
      on conflict (id) do update set data = excluded.data, published_at = now();
    update public.editorial_entries set published_version = version + 1, first_published_at = coalesce(first_published_at, now()) where id = entry_id;
  elsif action = 'unpublish' then
    delete from public.published_content where id = entry_id;
    update public.editorial_entries set published_version = null where id = entry_id;
  elsif action = 'delete' then
    if exists(select 1 from public.published_content where id = entry_id) then raise exception 'Unpublish before deletion' using errcode = '23514'; end if;
    delete from public.editorial_entries where id = entry_id;
  else raise exception 'Unknown transition' using errcode = '22023';
  end if;
end;
$$;
revoke all on function public.transition_content(uuid, integer, text) from public;
grant execute on function public.transition_content(uuid, integer, text) to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('editorial-images', 'editorial-images', false, 2097152, array['image/webp']);
create policy editorial_upload on storage.objects for insert to authenticated
with check (bucket_id = 'editorial-images' and name ~ '^[a-f0-9-]{36}\.webp$' and (select editorial_private.is_editor()));
create policy editorial_images_read on storage.objects for select to anon, authenticated
using (bucket_id = 'editorial-images' and (
  (select editorial_private.is_editor()) or exists (
    select 1 from public.published_content p
    where jsonb_path_exists(p.data, '$.**.src ? (@ == $src)', jsonb_build_object('src', '/media/' || name))
  )
));
comment on table public.published_content is 'Public snapshots only. Drafts and image access remain protected by RLS.';
commit;
