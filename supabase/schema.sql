-- ============================================================
-- Sokratix — Supabase schema + seed
-- Run this in the Supabase SQL Editor (one time).
-- ============================================================

-- Extensions
create extension if not exists "pgcrypto";

-- ---------- Tables ----------
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  category    text,
  platform    text,
  role        text,
  description text,
  ux_focus    jsonb default '[]'::jsonb,
  accent      text default '#ff1a1a',
  image_url   text,
  behance_url text default 'https://www.behance.net/danusshadityak',
  sort_order  int  default 0,
  created_at  timestamptz default now()
);

create table if not exists public.case_studies (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  type        text,
  description text,
  ux_focus    text,
  tags        jsonb default '[]'::jsonb,
  accent      text default '#ff1a1a',
  image_url   text,
  behance_url text default 'https://www.behance.net/danusshadityak',
  sort_order  int  default 0,
  created_at  timestamptz default now()
);

create table if not exists public.site_settings (
  id                int primary key default 1,
  intro_video_url   text,
  intro_poster_url  text
);

create table if not exists public.gallery (
  id         uuid primary key default gen_random_uuid(),
  title      text,
  image_url  text not null,
  path       text,
  created_at timestamptz default now()
);

-- ---------- Row Level Security ----------
-- Public can READ content. Writes happen server-side with the
-- service-role key (which bypasses RLS), so no write policies are needed.
alter table public.projects      enable row level security;
alter table public.case_studies  enable row level security;
alter table public.site_settings enable row level security;
alter table public.gallery       enable row level security;

create policy "public read projects"      on public.projects      for select using (true);
create policy "public read case_studies"  on public.case_studies  for select using (true);
create policy "public read site_settings" on public.site_settings for select using (true);
create policy "public read gallery"       on public.gallery       for select using (true);

-- ---------- Storage bucket ----------
-- Public bucket for videos, posters, and images.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media"
  on storage.objects for select
  using (bucket_id = 'media');

-- ---------- Seed content ----------
insert into public.site_settings (id) values (1) on conflict (id) do nothing;

insert into public.projects (name, category, platform, role, description, ux_focus, accent, sort_order) values
('Hekma', 'Healthcare App', 'Web + Mobile', 'UI/UX Designer',
 'Hekma is a healthcare platform focused on patient experience, health dashboards, clinical study journeys, health metrics, medical records, appointment flows, and patient-centered digital care.',
 '["Patient-first dashboard experience","Clinical study journey clarity","Health metrics visualization","Medical record accessibility","Appointment and care workflow design","Clean mobile and web experience"]'::jsonb,
 '#7c5cff', 1),
('XATS', 'Applicant Tracking / AI Interview', 'Web + Mobile', 'UI/UX Designer',
 'XATS is an applicant tracking and AI interview platform designed to simplify candidate screening, interview scheduling, assessments, and recruitment workflows across web and mobile.',
 '["Candidate screening flow","AI interview experience","Resume and profile review","Interview scheduling","Recruiter dashboard","Pipeline management","Faster decision-making"]'::jsonb,
 '#2f80ff', 2);

insert into public.case_studies (title, type, description, ux_focus, tags, accent, sort_order) values
('Skill Tree', 'UI Case Study',
 'Skill Tree connects skilled professionals with clients, simplifying job posting, skill discovery, and collaboration across industries.',
 'Easy category discovery, search-first experience, clear service listing, trust-focused worker profiles.',
 '["Marketplace","Job Platform","Skill Discovery","Mobile App","UI Design"]'::jsonb, '#33b651', 1),
('Kuppai Vandi', 'UX Case Study',
 'A waste management app that encourages users to segregate organic, plastic, and e-waste while earning rewards through responsible disposal.',
 'Behavior motivation, reward system, simple pickup booking, environmental awareness.',
 '["Waste Management","Sustainability","Rewards","Tracking","UX Design"]'::jsonb, '#ff7a1a', 2),
('MediMeet', 'UX Case Study',
 'MediMeet simplifies healthcare access by helping users find doctors, book online or in-person consultations, access reports, and receive appointment reminders.',
 'Trust, accessibility, fast doctor discovery, appointment clarity, simple healthcare flow.',
 '["Healthcare","Appointment Booking","Doctor Search","Reports","UX Design"]'::jsonb, '#2f80ff', 3),
('FundNest', 'UX Case Study',
 'FundNest makes investing easier by helping users explore mutual funds, manage SIPs, track portfolios, and receive personalized recommendations.',
 'Financial clarity, beginner-friendly investing, confidence-building UI, personalized insights.',
 '["Fintech","Mutual Funds","SIP","Portfolio","UX Design"]'::jsonb, '#37c0e6', 4);
