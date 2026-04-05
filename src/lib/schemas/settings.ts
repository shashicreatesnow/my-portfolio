import { z } from "zod";

export const heroSettingsSchema = z.object({
  title: z.string().min(1).max(200),
  subtitle: z.string().min(1).max(300),
  cta_text: z.string().min(1).max(80),
  cta_link: z.string().min(1).max(160),
});

export const contactSettingsSchema = z.object({
  email: z.string().email(),
  linkedin: z.string().url(),
  behance: z.string().url(),
  twitter: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
});

export const seoSettingsSchema = z.object({
  site_title: z.string().min(1).max(200),
  site_description: z.string().min(1).max(300),
  og_image_url: z.string().url().optional().or(z.literal("")),
});

export const navigationItemSchema = z.object({
  label: z.string().min(1).max(40),
  href: z.string().min(1).max(120),
});

export const navigationSettingsSchema = z.object({
  items: z.array(navigationItemSchema).min(1).max(8),
});

export const aboutSettingsSchema = z.object({
  headline: z.string().min(1).max(160),
  subheadline: z.string().min(1).max(240),
  profile_image_url: z.string().url().optional().or(z.literal("")),
});
