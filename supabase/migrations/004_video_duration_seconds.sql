alter table public.content_items
  add column if not exists duration_seconds int;

comment on column public.content_items.duration_seconds is
  'Exact video length in seconds from Drive metadata; preferred over estimated_duration_minutes.';
