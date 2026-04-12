"use client";

import { useMemo, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

import type { BlockType, ProjectBlockRecord } from "@/lib/types/blocks";

export function getDefaultBlockContent(blockType: BlockType) {
  switch (blockType) {
    case "heading1":
      return { text: "", level: "h1" };
    case "heading2":
      return { text: "", level: "h2" };
    case "heading3":
      return { text: "", level: "h3" };
    case "quote":
      return { text: "", attribution: "" };
    case "image":
      return { url: "", blur_hash: "", alt: "", caption: "", display: "contained" };
    case "gallery":
      return { images: [], layout: "grid", columns: 3 };
    case "before_after":
      return {
        before: { url: "", alt: "", caption: "" },
        after: { url: "", alt: "", caption: "" },
        caption: "",
        mode: "side-by-side",
      };
    case "annotated_image":
      return { url: "", alt: "", annotations: [] };
    case "video":
      return { url: "", provider: "youtube", caption: "" };
    case "columns_2":
      return { column_count: "2", columns: [{ blocks: [] }, { blocks: [] }] };
    case "columns_3":
      return {
        column_count: "3",
        columns: [{ blocks: [] }, { blocks: [] }, { blocks: [] }],
      };
    case "divider":
      return { style: "thin" };
    case "spacer":
      return { size: "medium" };
    case "callout":
      return { value: "", label: "", description: "", style: "highlight" };
    case "metric_row":
      return {
        metrics: [
          { value: "", label: "", prefix: "", suffix: "" },
          { value: "", label: "", prefix: "", suffix: "" },
        ],
      };
    case "list":
      return {
        list_type: "bullet",
        items: [{ id: crypto.randomUUID(), text: "" }],
      };
    case "toggle":
      return { title: "", content_html: "" };
    case "table":
      return {
        has_header: true,
        rows: [
          ["Header 1", "Header 2", "Header 3"],
          ["", "", ""],
        ],
      };
    case "embed":
      return { url: "", platform: "generic", caption: "", aspect_ratio: "video" };
    case "file":
      return { file_name: "", description: "", file_url: "", file_size: "" };
    case "code":
      return { code: "", language: "text", caption: "" };
    case "text":
    default:
      return { html: "" };
  }
}

export function createBlock(blockType: BlockType, projectId?: string): ProjectBlockRecord {
  return {
    id: crypto.randomUUID(),
    project_id: projectId,
    sort_order: 0,
    block_type: blockType,
    content: getDefaultBlockContent(blockType),
  };
}

export function useBlockEditor(initialBlocks: ProjectBlockRecord[], projectId?: string) {
  const [blocks, setBlocks] = useState<ProjectBlockRecord[]>(initialBlocks);

  const orderedBlocks = useMemo(
    () => blocks.map((block, index) => ({ ...block, sort_order: index })),
    [blocks],
  );

  function addBlock(blockType: BlockType, index?: number) {
    const nextBlock = createBlock(blockType, projectId);
    setBlocks((current) => {
      if (index === undefined || index < 0 || index >= current.length) {
        return [...current, nextBlock];
      }

      const clone = [...current];
      clone.splice(index, 0, nextBlock);
      return clone;
    });
  }

  function updateBlock(id: string, content: Record<string, unknown>) {
    setBlocks((current) =>
      current.map((block) => (block.id === id ? { ...block, content } : block)),
    );
  }

  function deleteBlock(id: string) {
    setBlocks((current) => current.filter((block) => block.id !== id));
  }

  function duplicateBlock(id: string) {
    setBlocks((current) => {
      const index = current.findIndex((block) => block.id === id);
      if (index === -1) {
        return current;
      }

      const duplicate = {
        ...current[index],
        id: crypto.randomUUID(),
      };
      const clone = [...current];
      clone.splice(index + 1, 0, duplicate);
      return clone;
    });
  }

  function moveBlock(from: number, to: number) {
    setBlocks((current) => arrayMove(current, from, to));
  }

  function replaceBlocks(nextBlocks: ProjectBlockRecord[]) {
    setBlocks(nextBlocks);
  }

  return {
    blocks: orderedBlocks,
    addBlock,
    updateBlock,
    deleteBlock,
    duplicateBlock,
    moveBlock,
    replaceBlocks,
  };
}
