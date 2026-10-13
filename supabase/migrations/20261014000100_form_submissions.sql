begin;
set local lock_timeout = '5s';

create table public.form_submissions (
  id uuid primary key,
  source text not null check (source in ('contact', 'join')),
  name text not null check (char_length(name) <= 200),
  email text not null check (char_length(email) between 3 and 254),
  subject text not null check (char_length(subject) between 1 and 300),
  text text not null check (char_length(text) between 1 and 5000),
  status text not null default 'new' check (status in ('new', 'processed')),
  notification text not null default 'pending' check (notification in ('pending', 'sent', 'failed')),
  created_at timestamptz not null default now()
);
create index form_submissions_received on public.form_submissions (created_at desc, id);
alter table public.form_submissions enable row level security;
revoke all on public.form_submissions from anon, authenticated;
grant select, update(status) on public.form_submissions to authenticated;
grant all on public.form_submissions to service_role;
create policy editors_read_submissions on public.form_submissions for select to authenticated using (editorial_private.is_editor());
create policy editors_process_submissions on public.form_submissions for update to authenticated using (editorial_private.is_editor()) with check (editorial_private.is_editor());

create function public.receive_submission(submission jsonb) returns boolean
language plpgsql set search_path = '' as $$
declare inserted_id uuid;
begin
  insert into public.form_submissions (id, source, name, email, subject, text)
  values ((submission->>'id')::uuid, submission->>'source', submission->>'name', submission->>'email', submission->>'subject', submission->>'text')
  on conflict (id) do nothing returning id into inserted_id;
  if inserted_id is not null then return true; end if;
  if not exists (select 1 from public.form_submissions s where s.id = (submission->>'id')::uuid
    and s.source = submission->>'source' and s.name = submission->>'name' and s.email = submission->>'email'
    and s.subject = submission->>'subject' and s.text = submission->>'text') then
    raise exception 'Submission identifier already used' using errcode = '22023';
  end if;
  return false;
end;
$$;
revoke all on function public.receive_submission(jsonb) from public, anon, authenticated;
grant execute on function public.receive_submission(jsonb) to service_role;
commit;
