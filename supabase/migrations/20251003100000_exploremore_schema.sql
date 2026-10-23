-- ExploreMore Stones — Postgres schema for Supabase
-- Apply with the Supabase SQL editor or `supabase db push`.
-- Catalog tables are public-read. Lead tables are insert-only for anon.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------------------------------------------------------------------------
-- Catalog
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.stones (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL,
  origin TEXT,
  quarry_location TEXT,
  image TEXT,
  description TEXT,
  color TEXT,
  finish_available JSONB NOT NULL DEFAULT '[]'::jsonb,
  compressive_strength TEXT,
  water_absorption TEXT,
  hardness TEXT,
  density TEXT,
  recommended_uses JSONB NOT NULL DEFAULT '[]'::jsonb,
  historical_significance TEXT,
  price_tier TEXT,
  rating NUMERIC(3,2),
  tags JSONB NOT NULL DEFAULT '[]'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_stones_category ON public.stones (category);
CREATE INDEX IF NOT EXISTS idx_stones_name ON public.stones (name);
CREATE INDEX IF NOT EXISTS idx_stones_tags_gin ON public.stones USING gin (tags);

CREATE TABLE IF NOT EXISTS public.architecture (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  stone_used TEXT,
  location TEXT,
  era TEXT,
  builder TEXT,
  image TEXT,
  summary TEXT,
  stone_details TEXT,
  key_features JSONB NOT NULL DEFAULT '[]'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_architecture_era ON public.architecture (era);

CREATE TABLE IF NOT EXISTS public.heritage_timeline (
  era_id TEXT PRIMARY KEY,
  era_name TEXT NOT NULL,
  period TEXT,
  title TEXT,
  description TEXT,
  stone_hero TEXT,
  exemplar TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.applications (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('modern', 'traditional')),
  title TEXT NOT NULL,
  subtitle TEXT,
  icon TEXT,
  recommended JSONB NOT NULL DEFAULT '[]'::jsonb,
  description TEXT
);

CREATE INDEX IF NOT EXISTS idx_applications_kind ON public.applications (kind);

CREATE TABLE IF NOT EXISTS public.visualizer_rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  base_image TEXT,
  floor_height TEXT,
  wall_width TEXT
);

CREATE TABLE IF NOT EXISTS public.visualizer_lighting (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  filter TEXT
);

CREATE TABLE IF NOT EXISTS public.visualizer_finishes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  overlay_opacity TEXT,
  blend_mode TEXT
);

CREATE TABLE IF NOT EXISTS public.visualizer_stones (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  texture TEXT,
  tint TEXT
);

CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  stone TEXT,
  image TEXT,
  caption TEXT
);

CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery (category);

CREATE TABLE IF NOT EXISTS public.stats (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  years_experience TEXT,
  stone_varieties TEXT,
  projects_completed TEXT,
  cities_served TEXT,
  satisfaction_rate TEXT,
  quarry_ownership TEXT
);

-- ---------------------------------------------------------------------------
-- Leads (PII) — focus of this review
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'Received'
    CHECK (status IN ('Received', 'In Review', 'Quoted', 'Closed')),
  name TEXT NOT NULL CHECK (char_length(btrim(name)) BETWEEN 2 AND 120),
  email TEXT NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone TEXT CHECK (phone IS NULL OR char_length(phone) <= 40),
  stone_interest TEXT,
  application TEXT,
  square_footage TEXT,
  project_type TEXT,
  message TEXT CHECK (message IS NULL OR char_length(message) <= 4000)
);

CREATE INDEX IF NOT EXISTS idx_inquiries_email ON public.inquiries (email);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries (status);
CREATE INDEX IF NOT EXISTS idx_inquiries_email_created ON public.inquiries (email, created_at DESC);

CREATE TABLE IF NOT EXISTS public.subscribers (
  email TEXT PRIMARY KEY CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  source TEXT,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_subscribers_subscribed_at ON public.subscribers (subscribed_at DESC);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

ALTER TABLE public.stones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.architecture ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.heritage_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visualizer_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visualizer_lighting ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visualizer_finishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visualizer_stones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Public catalog: read-only for anon + authenticated
CREATE POLICY stones_select_public ON public.stones FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY architecture_select_public ON public.architecture FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY heritage_select_public ON public.heritage_timeline FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY applications_select_public ON public.applications FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY vis_rooms_select_public ON public.visualizer_rooms FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY vis_lighting_select_public ON public.visualizer_lighting FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY vis_finishes_select_public ON public.visualizer_finishes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY vis_stones_select_public ON public.visualizer_stones FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY gallery_select_public ON public.gallery FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY stats_select_public ON public.stats FOR SELECT TO anon, authenticated USING (true);

-- Leads: anon may INSERT only. No SELECT/UPDATE/DELETE for anon.
-- Server uses the service role (bypasses RLS) to list leads.
CREATE POLICY inquiries_insert_anon ON public.inquiries
  FOR INSERT TO anon
  WITH CHECK (
    status = 'Received'
    AND char_length(btrim(name)) BETWEEN 2 AND 120
  );

CREATE POLICY subscribers_insert_anon ON public.subscribers
  FOR INSERT TO anon
  WITH CHECK (email = lower(btrim(email)));

REVOKE ALL ON public.inquiries FROM anon, authenticated;
REVOKE ALL ON public.subscribers FROM anon, authenticated;

GRANT INSERT (
  name, email, phone, stone_interest, application, square_footage, project_type, message
) ON public.inquiries TO anon;

GRANT INSERT (email, source) ON public.subscribers TO anon;

-- Authenticated staff still cannot dump leads unless you add a dedicated role.
-- Use the service role from Express, or add a later policy keyed on auth.jwt() claims.
