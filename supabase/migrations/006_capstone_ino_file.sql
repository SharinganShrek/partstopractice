-- Capstone: .ino file upload instead of code text + image

alter table public.assignment_submissions
  add column if not exists file_path text,
  add column if not exists file_name text;
