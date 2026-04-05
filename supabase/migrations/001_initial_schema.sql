CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  cover_image_blur_hash TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published')),
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  category_tags TEXT[] DEFAULT '{}',
  client_name TEXT,
  project_role TEXT,
  project_timeline TEXT,
  project_industry TEXT,
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_sort ON projects(sort_order);
CREATE INDEX idx_projects_featured ON projects(is_featured) WHERE is_featured = TRUE;

CREATE TABLE project_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  block_type TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER blocks_updated_at
  BEFORE UPDATE ON project_blocks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_blocks_project ON project_blocks(project_id);
CREATE INDEX idx_blocks_sort ON project_blocks(project_id, sort_order);

CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  image_blur_hash TEXT,
  caption TEXT,
  tags TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER collections_updated_at
  BEFORE UPDATE ON collections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE about_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_type TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER about_blocks_updated_at
  BEFORE UPDATE ON about_blocks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published projects"
  ON projects FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can do everything"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Anyone can read blocks of published projects"
  ON project_blocks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_blocks.project_id
      AND projects.status = 'published'
    )
  );

CREATE POLICY "Authenticated users can do everything with blocks"
  ON project_blocks FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Anyone can read published collections"
  ON collections FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Authenticated users can do everything with collections"
  ON collections FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Anyone can read about blocks"
  ON about_blocks FOR SELECT
  USING (TRUE);

CREATE POLICY "Authenticated users can do everything with about blocks"
  ON about_blocks FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Anyone can read settings"
  ON site_settings FOR SELECT
  USING (TRUE);

CREATE POLICY "Authenticated users can update settings"
  ON site_settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', TRUE);

CREATE POLICY "Public read access on portfolio images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-images');

CREATE POLICY "Authenticated users can upload portfolio images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update portfolio images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete portfolio images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');
