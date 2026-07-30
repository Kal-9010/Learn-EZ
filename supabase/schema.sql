-- L EZ — Supabase schema (PRD section 8)
--
-- Run this in the Supabase SQL editor on a fresh project. Safe to run once;
-- re-running will error on "already exists" (expected, not harmful).
--
-- Two deliberate departures from the PRD's literal section 8 SQL, both
-- security-motivated:
--   1. users.id now REFERENCES auth.users(id) instead of a bare random uuid.
--      Without this link, Row Level Security has no way to know which row
--      belongs to which logged-in user — "auth.uid() = id" only works once
--      the two ids are the same value.
--   2. Every table gets RLS enabled + explicit policies. The PRD schema as
--      written has none, which — combined with the anon key being public by
--      design (see src/lib/supabase.js) — would leave every row in every
--      table readable and writable by anyone. That directly contradicts the
--      project's "no data leaks" requirement, so this isn't optional.

-- ============================================================
-- TABLES
-- ============================================================

-- Users
create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  display_name text not null,
  created_at timestamptz default now(),
  last_active timestamptz default now(),
  profile_public boolean default false,
  is_anonymous boolean default false
);

-- Topics (Module level)
create table topics (
  id uuid primary key default gen_random_uuid(),
  module_number integer not null,
  topic_number integer not null,
  title text not null,
  description text,
  estimated_minutes integer,
  sequence_order integer not null,
  created_at timestamptz default now()
);

-- Sub-topics (Chapter level)
create table sub_topics (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid references topics(id) on delete cascade,
  title text not null,
  sequence_order integer not null,
  layer_1 jsonb not null,
  layer_2 jsonb not null,
  layer_3 jsonb not null,
  layer_4 jsonb not null,
  keywords jsonb not null,
  created_at timestamptz default now()
);

-- Scenarios (Test level)
create table scenarios (
  id uuid primary key default gen_random_uuid(),
  sub_topic_id uuid references sub_topics(id) on delete cascade,
  company text not null,
  situation text not null,
  questions jsonb not null,
  difficulty text check (difficulty in ('easy', 'medium', 'hard')),
  is_seed boolean default false,
  is_ai_generated boolean default false,
  confidence_score float,
  created_at timestamptz default now()
);

-- User Progress (per sub-topic)
create table user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  sub_topic_id uuid references sub_topics(id),
  status text check (status in (
    'not_started',
    'in_progress',
    'needs_review',
    'complete'
  )) default 'not_started',
  current_layer integer default 1,
  layers_completed integer default 0,
  scenarios_passed integer default 0,
  scenarios_failed integer default 0,
  quiz_accuracy float default 0,
  time_spent integer default 0,
  loop_count integer default 0,
  last_accessed timestamptz default now(),
  completed_at timestamptz
);

-- Shown Scenarios (no repeats)
create table shown_scenarios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  scenario_id uuid references scenarios(id),
  shown_at timestamptz default now(),
  passed boolean default false,
  total_attempts integer default 0
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- users: everyone can read a row that's marked public (powers the
-- /profile/:displayName public portfolio page); a user can always read and
-- write their own row regardless of that flag.
alter table users enable row level security;

create policy "Users can view own row"
  on users for select
  using (auth.uid() = id);

create policy "Public profiles are viewable by anyone"
  on users for select
  using (profile_public = true);

create policy "Users can insert own row"
  on users for insert
  with check (auth.uid() = id);

create policy "Users can update own row"
  on users for update
  using (auth.uid() = id);

-- topics / sub_topics / scenarios: curriculum content, not user data —
-- readable by anyone (including anonymous visitors), writable only via the
-- service role (e.g. a seeding script), never from the client.
alter table topics enable row level security;
create policy "Topics are publicly readable"
  on topics for select
  using (true);

alter table sub_topics enable row level security;
create policy "Sub-topics are publicly readable"
  on sub_topics for select
  using (true);

alter table scenarios enable row level security;
create policy "Scenarios are publicly readable"
  on scenarios for select
  using (true);

-- user_progress: private to its owner, with one exception — readable by
-- anyone when the owning user has opted into a public profile, since the
-- public portfolio page needs to read it without being logged in as them.
alter table user_progress enable row level security;

create policy "Users can view own progress"
  on user_progress for select
  using (auth.uid() = user_id);

create policy "Progress of public profiles is viewable by anyone"
  on user_progress for select
  using (
    exists (
      select 1 from users
      where users.id = user_progress.user_id
        and users.profile_public = true
    )
  );

create policy "Users can insert own progress"
  on user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on user_progress for update
  using (auth.uid() = user_id);

-- shown_scenarios: purely internal bookkeeping (no-repeat tracking) — never
-- needs to be public, only the owning user can read or write their own rows.
alter table shown_scenarios enable row level security;

create policy "Users can view own shown scenarios"
  on shown_scenarios for select
  using (auth.uid() = user_id);

create policy "Users can insert own shown scenarios"
  on shown_scenarios for insert
  with check (auth.uid() = user_id);
