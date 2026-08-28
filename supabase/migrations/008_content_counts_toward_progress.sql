alter table public.content_items
  add column if not exists counts_toward_progress boolean not null default true;

comment on column public.content_items.counts_toward_progress is
  'When false, item is supplementary and excluded from course completion / media progress.';
