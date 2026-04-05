import {
  ArrowLeftRight,
  BarChart3,
  Code,
  Columns2,
  Columns3,
  Heading2,
  Heading3,
  Image,
  Images,
  MapPin,
  Minus,
  MoveVertical,
  Play,
  Quote,
  TrendingUp,
  Type,
} from "lucide-react";

import type { BlockConfig, BlockType } from "@/lib/types/blocks";

export const BLOCK_TYPES: Record<BlockType, BlockConfig> = {
  text: { label: "Paragraph", icon: Type, category: "Text" },
  heading2: { label: "Heading 2", icon: Heading2, category: "Text" },
  heading3: { label: "Heading 3", icon: Heading3, category: "Text" },
  quote: { label: "Quote", icon: Quote, category: "Text" },
  image: { label: "Image", icon: Image, category: "Media" },
  gallery: { label: "Image Gallery", icon: Images, category: "Media" },
  before_after: {
    label: "Before / After",
    icon: ArrowLeftRight,
    category: "Media",
  },
  annotated_image: {
    label: "Annotated Image",
    icon: MapPin,
    category: "Media",
  },
  video: { label: "Video Embed", icon: Play, category: "Media" },
  columns_2: { label: "2 Columns", icon: Columns2, category: "Layout" },
  columns_3: { label: "3 Columns", icon: Columns3, category: "Layout" },
  divider: { label: "Divider", icon: Minus, category: "Layout" },
  spacer: { label: "Spacer", icon: MoveVertical, category: "Layout" },
  callout: { label: "Callout / Stat", icon: TrendingUp, category: "Data" },
  metric_row: { label: "Metric Row", icon: BarChart3, category: "Data" },
  code: { label: "Code Block", icon: Code, category: "Data" },
};

export const BLOCK_TYPE_OPTIONS = Object.entries(BLOCK_TYPES).map(
  ([value, config]) => ({
    value: value as BlockType,
    ...config,
  }),
);

export const COLUMN_BLOCK_TYPES: BlockType[] = [
  "text",
  "heading2",
  "heading3",
  "image",
  "callout",
];
