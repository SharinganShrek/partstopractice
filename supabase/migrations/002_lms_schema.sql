-- LMS schema for Khan Academy Yaz Kursu

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text not null,
  role text not null default 'student' check (role in ('student', 'moderator', 'instructor')),
  created_at timestamptz not null default now()
);

-- Closed cohort enrollment list
create table if not exists public.course_enrollments (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  enrolled_at timestamptz not null default now()
);

create index if not exists course_enrollments_user_id_idx on public.course_enrollments (user_id);

-- Course modules
create table if not exists public.modules (
  id serial primary key,
  order_index int not null unique,
  title text not null,
  description text,
  slug text not null unique
);

-- Quizzes
create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  passing_score int not null default 70,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  order_index int not null,
  question_text text not null,
  options jsonb not null,
  correct_answer text not null,
  unique (quiz_id, order_index)
);

create index if not exists quiz_questions_quiz_id_idx on public.quiz_questions (quiz_id);

-- Module content items
create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  module_id int not null references public.modules(id) on delete cascade,
  order_index int not null,
  type text not null check (type in ('video', 'topic_quiz', 'module_assessment')),
  title text not null,
  drive_url text,
  quiz_id uuid references public.quizzes(id) on delete set null,
  estimated_duration_minutes int,
  unique (module_id, order_index)
);

create index if not exists content_items_module_id_idx on public.content_items (module_id);

-- Student progress
create table if not exists public.student_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content_item_id uuid not null references public.content_items(id) on delete cascade,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  watch_seconds int not null default 0,
  completed_at timestamptz,
  unique (user_id, content_item_id)
);

create index if not exists student_progress_user_id_idx on public.student_progress (user_id);

-- Quiz attempts
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  score int not null check (score >= 0 and score <= 100),
  answers jsonb not null default '{}',
  passed boolean not null default false,
  completed_at timestamptz not null default now()
);

create index if not exists quiz_attempts_user_quiz_idx on public.quiz_attempts (user_id, quiz_id);

-- Final project submissions
create table if not exists public.project_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  drive_link text,
  file_path text,
  status text not null default 'pending' check (status in ('pending', 'under_review', 'approved', 'revision')),
  grade int check (grade >= 0 and grade <= 100),
  feedback text,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id)
);

-- Certificates
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  average_score numeric(5,2) not null,
  pdf_path text,
  issued_at timestamptz not null default now(),
  email_sent_at timestamptz
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(coalesce(new.email, ''), '@', 1)),
    case
      when (new.raw_app_meta_data ->> 'role') = 'moderator' then 'moderator'
      else 'student'
    end
  )
  on conflict (id) do update set email = excluded.email;

  update public.course_enrollments
  set user_id = new.id
  where lower(email) = lower(coalesce(new.email, ''))
    and user_id is null;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Check enrollment by email (for login flow)
create or replace function public.is_email_enrolled(check_email text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.course_enrollments
    where lower(email) = lower(check_email)
  );
$$;

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.course_enrollments enable row level security;
alter table public.modules enable row level security;
alter table public.content_items enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.student_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.project_submissions enable row level security;
alter table public.certificates enable row level security;

-- Helper: is moderator
create or replace function public.is_moderator()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'moderator', false);
$$;

-- Profiles policies
create policy "Users can read own profile"
  on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_moderator());

create policy "Users can update own profile"
  on public.profiles for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "Moderators can read all profiles"
  on public.profiles for select to authenticated
  using (public.is_moderator());

-- Enrollments: students see own; moderators see all
create policy "Users can read own enrollment"
  on public.course_enrollments for select to authenticated
  using (user_id = auth.uid() or public.is_moderator());

create policy "Moderators manage enrollments"
  on public.course_enrollments for all to authenticated
  using (public.is_moderator())
  with check (public.is_moderator());

-- Public content read for authenticated users
create policy "Authenticated read modules"
  on public.modules for select to authenticated using (true);

create policy "Authenticated read content_items"
  on public.content_items for select to authenticated using (true);

create policy "Authenticated read quizzes"
  on public.quizzes for select to authenticated using (true);

create policy "Authenticated read quiz_questions"
  on public.quiz_questions for select to authenticated using (true);

-- Student progress
create policy "Students manage own progress"
  on public.student_progress for all to authenticated
  using (user_id = auth.uid() or public.is_moderator())
  with check (user_id = auth.uid() or public.is_moderator());

create policy "Moderators read all progress"
  on public.student_progress for select to authenticated
  using (public.is_moderator());

-- Quiz attempts
create policy "Students manage own attempts"
  on public.quiz_attempts for all to authenticated
  using (user_id = auth.uid() or public.is_moderator())
  with check (user_id = auth.uid() or public.is_moderator());

-- Project submissions
create policy "Students manage own project"
  on public.project_submissions for all to authenticated
  using (user_id = auth.uid() or public.is_moderator())
  with check (user_id = auth.uid() or public.is_moderator());

-- Certificates
create policy "Students read own certificate"
  on public.certificates for select to authenticated
  using (user_id = auth.uid() or public.is_moderator());

create policy "Students insert own certificate"
  on public.certificates for insert to authenticated
  with check (user_id = auth.uid());

create policy "Moderators manage certificates"
  on public.certificates for all to authenticated
  using (public.is_moderator())
  with check (public.is_moderator());

-- Grants
grant select on public.modules to authenticated;
grant select on public.content_items to authenticated;
grant select on public.quizzes to authenticated;
grant select on public.quiz_questions to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select on public.course_enrollments to authenticated;
grant select, insert, update, delete on public.course_enrollments to authenticated;
grant select, insert, update on public.student_progress to authenticated;
grant select, insert on public.quiz_attempts to authenticated;
grant select, insert, update on public.project_submissions to authenticated;
grant select, insert on public.certificates to authenticated;

grant execute on function public.is_email_enrolled(text) to anon, authenticated;

-- Storage bucket for certificates (optional, created via dashboard or here)
insert into storage.buckets (id, name, public)
values ('certificates', 'certificates', false)
on conflict (id) do nothing;

create policy "Users read own certificate files"
  on storage.objects for select to authenticated
  using (bucket_id = 'certificates' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Service can upload certificates"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'certificates');
