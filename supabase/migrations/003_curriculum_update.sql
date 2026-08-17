-- Curriculum update: new content types, unit grouping, assignment submissions, QR verification

-- Extend content_items types and add unit grouping
alter table public.content_items
  drop constraint if exists content_items_type_check;

alter table public.content_items
  add constraint content_items_type_check
  check (type in (
    'video', 'reading', 'topic_quiz', 'module_assessment',
    'performance_task', 'capstone'
  ));

alter table public.content_items
  add column if not exists unit_label text,
  add column if not exists unit_order int;

-- Assignment submissions (performance tasks + capstone)
create table if not exists public.assignment_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content_item_id uuid not null references public.content_items(id) on delete cascade,
  primary_link text not null,
  secondary_link text,
  status text not null default 'submitted' check (status in ('submitted', 'under_review', 'approved', 'revision')),
  grade int check (grade >= 0 and grade <= 100),
  feedback text,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id),
  unique (user_id, content_item_id)
);

create index if not exists assignment_submissions_user_idx on public.assignment_submissions (user_id);
create index if not exists assignment_submissions_content_idx on public.assignment_submissions (content_item_id);

alter table public.assignment_submissions enable row level security;

create policy "Students manage own assignments"
  on public.assignment_submissions for all to authenticated
  using (user_id = auth.uid() or public.is_moderator())
  with check (user_id = auth.uid() or public.is_moderator());

grant select, insert, update on public.assignment_submissions to authenticated;

-- Certificate verification code for QR
alter table public.certificates
  add column if not exists verification_code uuid default gen_random_uuid() unique;

-- Reset LMS content for curriculum re-seed (safe when no production student data)
truncate table public.student_progress cascade;
truncate table public.quiz_attempts cascade;
truncate table public.assignment_submissions cascade;
truncate table public.project_submissions cascade;
truncate table public.quiz_questions cascade;
truncate table public.quizzes cascade;
truncate table public.content_items cascade;
truncate table public.modules cascade;
