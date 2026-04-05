import type { AboutBlockRecord, CollectionRecord } from "@/lib/types/database";
import type { ProjectRecord } from "@/lib/types/projects";
import type { ProjectBlockRecord } from "@/lib/types/blocks";

const now = new Date().toISOString();

export const mockProjects: ProjectRecord[] = [
  {
    id: "mock-project-1",
    title: "Design Forge",
    slug: "design-forge",
    description:
      "An AI-assisted thumbnail production system built to increase creative throughput without flattening craft.",
    cover_image_url:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    cover_image_blur_hash: "",
    status: "published",
    is_featured: true,
    sort_order: 0,
    category_tags: ["AI Pipeline", "Visual Design", "Thumbnail System"],
    client_name: "EloElo / Master App",
    project_role: "Lead Visual Designer",
    project_timeline: "2024 — Present",
    project_industry: "EdTech, Mobile Learning",
    meta_title: null,
    meta_description: null,
    og_image_url: null,
    created_at: now,
    updated_at: now,
  },
];

export const mockProjectBlocks: ProjectBlockRecord[] = [
  {
    id: "mock-block-1",
    project_id: "mock-project-1",
    sort_order: 0,
    block_type: "heading2",
    content: {
      text: "Problem",
      level: "h2",
    },
  },
  {
    id: "mock-block-2",
    project_id: "mock-project-1",
    sort_order: 1,
    block_type: "text",
    content: {
      html: "<p>EloElo needed a scalable way to produce high-performing thumbnails across multiple content categories without turning the design process into a factory line.</p>",
    },
  },
  {
    id: "mock-block-3",
    project_id: "mock-project-1",
    sort_order: 2,
    block_type: "metric_row",
    content: {
      metrics: [
        { value: "500+", label: "thumbnails designed" },
        { value: "10+", label: "content categories" },
        { value: "3", label: "AI workflows shipped" },
      ],
    },
  },
  {
    id: "mock-block-4",
    project_id: "mock-project-1",
    sort_order: 3,
    block_type: "callout",
    content: {
      value: "System over surface",
      label: "The approach",
      description:
        "The real win was designing a repeatable creative engine, not just polishing individual assets.",
      style: "accent",
    },
  },
];

export const mockCollections: CollectionRecord[] = [
  {
    id: "mock-collection-1",
    image_url:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    image_blur_hash: null,
    caption: "Experimental interface study",
    tags: ["Poster", "Experiment"],
    sort_order: 0,
    is_published: true,
    width: 1200,
    height: 1600,
    created_at: now,
    updated_at: now,
  },
];

export const mockAboutBlocks: AboutBlockRecord[] = [
  {
    id: "about-block-1",
    sort_order: 0,
    block_type: "text",
    content: {
      html: "<p>I work at the intersection of visual systems, research, and AI-enabled creative tooling. My practice is about designing leverage, not just outputs.</p>",
    },
  },
];
