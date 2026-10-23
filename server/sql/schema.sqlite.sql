-- ExploreMore Stones — local SQLite schema
PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS stones (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL,
  origin TEXT,
  quarry_location TEXT,
  image TEXT,
  description TEXT,
  color TEXT,
  finish_available TEXT NOT NULL DEFAULT '[]',
  compressive_strength TEXT,
  water_absorption TEXT,
  hardness TEXT,
  density TEXT,
  recommended_uses TEXT NOT NULL DEFAULT '[]',
  historical_significance TEXT,
  price_tier TEXT,
  rating REAL,
  tags TEXT NOT NULL DEFAULT '[]'
);

CREATE INDEX IF NOT EXISTS idx_stones_category ON stones (category);
CREATE INDEX IF NOT EXISTS idx_stones_name ON stones (name);

CREATE TABLE IF NOT EXISTS architecture (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  stone_used TEXT,
  location TEXT,
  era TEXT,
  builder TEXT,
  image TEXT,
  summary TEXT,
  stone_details TEXT,
  key_features TEXT NOT NULL DEFAULT '[]'
);

CREATE INDEX IF NOT EXISTS idx_architecture_era ON architecture (era);

CREATE TABLE IF NOT EXISTS heritage_timeline (
  era_id TEXT PRIMARY KEY,
  era_name TEXT NOT NULL,
  period TEXT,
  title TEXT,
  description TEXT,
  stone_hero TEXT,
  exemplar TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('modern', 'traditional')),
  title TEXT NOT NULL,
  subtitle TEXT,
  icon TEXT,
  recommended TEXT NOT NULL DEFAULT '[]',
  description TEXT
);

CREATE INDEX IF NOT EXISTS idx_applications_kind ON applications (kind);

CREATE TABLE IF NOT EXISTS visualizer_rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  base_image TEXT,
  floor_height TEXT,
  wall_width TEXT
);

CREATE TABLE IF NOT EXISTS visualizer_lighting (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  filter TEXT
);

CREATE TABLE IF NOT EXISTS visualizer_finishes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  overlay_opacity TEXT,
  blend_mode TEXT
);

CREATE TABLE IF NOT EXISTS visualizer_stones (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  texture TEXT,
  tint TEXT
);

CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  stone TEXT,
  image TEXT,
  caption TEXT
);

CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery (category);

CREATE TABLE IF NOT EXISTS stats (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  years_experience TEXT,
  stone_varieties TEXT,
  projects_completed TEXT,
  cities_served TEXT,
  satisfaction_rate TEXT,
  quarry_ownership TEXT
);

CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Received' CHECK (status IN ('Received', 'In Review', 'Quoted', 'Closed')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  stone_interest TEXT,
  application TEXT,
  square_footage TEXT,
  project_type TEXT,
  message TEXT
);

CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries (email);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries (status);
CREATE INDEX IF NOT EXISTS idx_inquiries_email_created ON inquiries (email, created_at DESC);

CREATE TABLE IF NOT EXISTS subscribers (
  email TEXT PRIMARY KEY,
  source TEXT,
  subscribed_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_subscribers_subscribed_at ON subscribers (subscribed_at DESC);
