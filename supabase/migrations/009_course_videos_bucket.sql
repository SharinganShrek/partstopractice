insert into storage.buckets (id, name, public)
values ('course-videos', 'course-videos', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read course videos" on storage.objects;
create policy "Public read course videos"
  on storage.objects for select
  using (bucket_id = 'course-videos');

drop policy if exists "Service role upload course videos" on storage.objects;
create policy "Service role upload course videos"
  on storage.objects for insert
  with check (bucket_id = 'course-videos');
