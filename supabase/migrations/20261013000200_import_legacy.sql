begin;
set local lock_timeout = '5s';
create function public.import_legacy_content(items jsonb) returns integer
language plpgsql security definer set search_path = '' as $$
declare item jsonb; entry_id uuid; imported integer := 0;
begin
  if jsonb_typeof(items) <> 'array' or jsonb_array_length(items) > 500 then raise exception 'Invalid import'; end if;
  for item in select * from jsonb_array_elements(items) loop
    entry_id := null;
    insert into public.editorial_entries(kind, slug, draft, published_version, first_published_at)
    values(item->>'kind', item->'content'->>'slug', item->'content', 1, now())
    on conflict (kind, slug) do nothing returning id into entry_id;
    if entry_id is not null then
      insert into public.published_content(id, kind, slug, data) values(entry_id, item->>'kind', item->'content'->>'slug', item->'content');
      imported := imported + 1;
    end if;
  end loop;
  return imported;
end;
$$;
revoke all on function public.import_legacy_content(jsonb) from public, anon, authenticated;
grant execute on function public.import_legacy_content(jsonb) to service_role;
commit;
