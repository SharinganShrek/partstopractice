-- Capstone: three submission links (Tinkercad, Drive report, Arduino code)

alter table public.assignment_submissions
  add column if not exists arduino_link text;
