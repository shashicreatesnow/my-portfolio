INSERT INTO site_settings (key, value) VALUES
  ('hero', '{
    "title": "Design Strategist & AI Systems Builder",
    "subtitle": "I don''t just design — I engineer the system that designs.",
    "cta_text": "See My Work",
    "cta_link": "/works"
  }'),
  ('about', '{
    "headline": "Crafting the Vision",
    "subheadline": "A designer who thinks in systems, not just surfaces",
    "profile_image_url": ""
  }'),
  ('contact', '{
    "email": "shashiprofessionalacc@gmail.com",
    "linkedin": "https://www.linkedin.com/in/shashi-pratap-singh-3957b922b",
    "behance": "https://www.behance.net/shashipsingh",
    "twitter": "",
    "github": ""
  }'),
  ('seo', '{
    "site_title": "Shashi Pratap Singh — Design Strategist & AI Systems Builder",
    "site_description": "I research, strategize, and build AI-powered design systems that produce at scale.",
    "og_image_url": ""
  }'),
  ('navigation', '{
    "items": [
      {"label": "Works", "href": "/works"},
      {"label": "Lab", "href": "/lab"},
      {"label": "About", "href": "/about"}
    ]
  }')
ON CONFLICT (key) DO NOTHING;
