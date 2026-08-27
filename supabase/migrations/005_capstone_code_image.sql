-- Capstone: replace Tinkercad link with code text + project image

alter table public.assignment_submissions
  add column if not exists code_text text,
  add column if not exists image_path text;

alter table public.assignment_submissions
  alter column primary_link drop not null;

insert into storage.buckets (id, name, public)
values ('capstone-submissions', 'capstone-submissions', false)
on conflict (id) do nothing;

create policy "Students upload own capstone images"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'capstone-submissions'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Students update own capstone images"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'capstone-submissions'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Students and moderators read capstone images"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'capstone-submissions'
    and (
      (storage.foldername(name))[1] = auth.uid()::text
      or public.is_moderator()
    )
  );
