-- Video upload requests table
create table if not exists public.video_requests (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  video_type text not null check (video_type in ('first', 'fll', 'ftc', 'frc')),
  language text not null,
  drive_link text not null,
  submitter_name text,
  submitter_email text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  moderator_notes text,
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

alter table public.video_requests enable row level security;

-- Public can submit new requests
create policy "Anyone can insert video requests"
  on public.video_requests
  for insert
  to anon, authenticated
  with check (true);

-- Moderators can read all requests
create policy "Moderators can select video requests"
  on public.video_requests
  for select
  to authenticated
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'moderator'
  );

-- Moderators can update requests (approve/reject)
create policy "Moderators can update video requests"
  on public.video_requests
  for update
  to authenticated
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'moderator'
  )
  with check (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'moderator'
  );

grant insert on public.video_requests to anon, authenticated;
grant select, update on public.video_requests to authenticated;

create index if not exists video_requests_status_idx on public.video_requests (status);
create index if not exists video_requests_created_at_idx on public.video_requests (created_at desc);
