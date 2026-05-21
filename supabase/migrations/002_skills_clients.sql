-- Skills and Clients tables for the new homepage sections.
-- Mirrors the patterns in 001_initial_schema.sql.

CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon_key TEXT,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER skills_updated_at
  BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_skills_sort ON skills(sort_order);
CREATE INDEX idx_skills_published ON skills(is_published) WHERE is_published = TRUE;

CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  logo_dark_url TEXT,
  website_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_clients_sort ON clients(sort_order);
CREATE INDEX idx_clients_published ON clients(is_published) WHERE is_published = TRUE;

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published skills"
  ON skills FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Authenticated users can do everything with skills"
  ON skills FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Anyone can read published clients"
  ON clients FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Authenticated users can do everything with clients"
  ON clients FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Seed placeholder rows so the homepage isn't empty during dev.
INSERT INTO skills (title, description, icon_key, sort_order, is_published) VALUES
  ('Product Design', 'Interfaces, flows, and design systems that scale across teams and platforms.', 'product', 0, TRUE),
  ('AI Automation', 'Custom agents, prompt systems, and small choreographies that turn models into teammates.', 'ai', 1, TRUE),
  ('Brand Design', 'Identity, typography, and visual systems with a clear point of view.', 'brand', 2, TRUE);

INSERT INTO clients (name, sort_order, is_published) VALUES
  ('Eloelo',           0, TRUE),
  ('Acme Studio',      1, TRUE),
  ('Northwind Labs',   2, TRUE),
  ('Stellar Brands',   3, TRUE),
  ('Riverbed Coffee',  4, TRUE),
  ('Foundry & Co',     5, TRUE);
