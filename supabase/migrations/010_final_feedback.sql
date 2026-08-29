-- Final feedback module (Son bir görev)

alter table public.content_items
  drop constraint if exists content_items_type_check;

alter table public.content_items
  add constraint content_items_type_check
  check (type in (
    'video', 'reading', 'topic_quiz', 'module_assessment',
    'performance_task', 'capstone', 'final_feedback'
  ));

create table if not exists public.course_feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content_item_id uuid not null references public.content_items(id) on delete cascade,
  full_name text not null,
  team_message text not null,
  improvement_feedback text not null,
  submitted_at timestamptz not null default now(),
  unique (user_id)
);

create index if not exists course_feedback_submissions_user_idx
  on public.course_feedback_submissions (user_id);

create index if not exists course_feedback_submissions_content_idx
  on public.course_feedback_submissions (content_item_id);

alter table public.course_feedback_submissions enable row level security;

drop policy if exists "Students manage own feedback" on public.course_feedback_submissions;
create policy "Students manage own feedback"
  on public.course_feedback_submissions for all to authenticated
  using (user_id = auth.uid() or public.is_moderator())
  with check (user_id = auth.uid() or public.is_moderator());

grant select, insert on public.course_feedback_submissions to authenticated;
