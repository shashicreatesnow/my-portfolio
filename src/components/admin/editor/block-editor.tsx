/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */

"use client";

import { useMemo, useState, useTransition } from "react";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  GripVertical,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { BLOCK_TYPES, BLOCK_TYPE_OPTIONS, COLUMN_BLOCK_TYPES } from "@/lib/constants/block-types";
import { useAutoSave } from "@/hooks/use-auto-save";
import { useBlockEditor, createBlock } from "@/hooks/use-block-editor";
import type { BlockType, ProjectBlockRecord } from "@/lib/types/blocks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/shared/image-uploader";

function BlockTypePicker({
  onSelect,
  limited = false,
}: {
  onSelect: (type: BlockType) => void;
  limited?: boolean;
}) {
  const options = limited
    ? BLOCK_TYPE_OPTIONS.filter((option) => COLUMN_BLOCK_TYPES.includes(option.value))
    : BLOCK_TYPE_OPTIONS;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          <Plus className="h-4 w-4" />
          Add block
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="grid gap-2 sm:grid-cols-2">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                type="button"
                className="flex items-center gap-3 rounded-2xl border border-border p-3 text-left hover:bg-secondary"
                onClick={() => onSelect(option.value)}
              >
                <Icon className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">{option.label}</p>
                  <p className="text-xs text-muted-foreground">{option.category}</p>
                </div>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function SortableBlock({
  block,
  index,
  total,
  onDuplicate,
  onDelete,
  onMove,
  children,
}: {
  block: ProjectBlockRecord;
  index: number;
  total: number;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onMove: (from: number, to: number) => void;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: block.id,
  });

  return (
    <Card
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="rounded-[32px] border border-border bg-card/80 p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-full border border-border p-2 text-muted-foreground"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Block</p>
            <p className="font-medium">{BLOCK_TYPES[block.block_type].label}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={index === 0}
            onClick={() => onMove(index, index - 1)}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={index === total - 1}
            onClick={() => onMove(index, index + 1)}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={() => onDuplicate(block.id)}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={() => onDelete(block.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {children}
    </Card>
  );
}

function ColumnEditor({
  value,
  onChange,
  projectId,
}: {
  value: { column_count: "2" | "3"; columns: Array<{ blocks: ProjectBlockRecord[] }> };
  onChange: (value: { column_count: "2" | "3"; columns: Array<{ blocks: ProjectBlockRecord[] }> }) => void;
  projectId?: string;
}) {
  return (
    <div className={`grid gap-4 ${value.column_count === "3" ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {value.columns.map((column, columnIndex) => (
        <div key={columnIndex} className="space-y-3 rounded-[24px] border border-border bg-background p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Column {columnIndex + 1}</p>
            <BlockTypePicker
              limited
              onSelect={(type) => {
                const nextColumns = [...value.columns];
                nextColumns[columnIndex] = {
                  blocks: [...column.blocks, createBlock(type, projectId)],
                };
                onChange({ ...value, columns: nextColumns });
              }}
            />
          </div>
          {column.blocks.map((block, blockIndex) => (
            <div key={block.id} className="space-y-2 rounded-2xl border border-border p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {BLOCK_TYPES[block.block_type].label}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const nextColumns = [...value.columns];
                    nextColumns[columnIndex] = {
                      blocks: column.blocks.filter((_, index) => index !== blockIndex),
                    };
                    onChange({ ...value, columns: nextColumns });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <SimpleBlockFields
                block={block}
                projectId={projectId}
                onChange={(content) => {
                  const nextBlocks = [...column.blocks];
                  nextBlocks[blockIndex] = { ...block, content };
                  const nextColumns = [...value.columns];
                  nextColumns[columnIndex] = { blocks: nextBlocks };
                  onChange({ ...value, columns: nextColumns });
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function SimpleBlockFields({
  block,
  onChange,
  projectId,
}: {
  block: ProjectBlockRecord;
  onChange: (content: Record<string, unknown>) => void;
  projectId?: string;
}) {
  const content = block.content as Record<string, any>;

  switch (block.block_type) {
    case "heading2":
    case "heading3":
      return (
        <Input
          value={content.text || ""}
          onChange={(event) => onChange({ ...content, text: event.target.value })}
          placeholder="Section heading"
        />
      );
    case "image":
      return (
        <div className="space-y-3">
          <ImageUploader
            context="blocks"
            projectId={projectId}
            value={content.url}
            onChange={(value) => onChange({ ...content, url: value })}
          />
          <Input
            value={content.alt || ""}
            onChange={(event) => onChange({ ...content, alt: event.target.value })}
            placeholder="Alt text"
          />
        </div>
      );
    case "callout":
      return (
        <div className="grid gap-3">
          <Input
            value={content.value || ""}
            onChange={(event) => onChange({ ...content, value: event.target.value })}
            placeholder="Value"
          />
          <Input
            value={content.label || ""}
            onChange={(event) => onChange({ ...content, label: event.target.value })}
            placeholder="Label"
          />
        </div>
      );
    case "text":
    default:
      return (
        <Textarea
          value={(content.html || "").replace(/<[^>]*>/g, "")}
          onChange={(event) => onChange({ ...content, html: `<p>${event.target.value}</p>` })}
          placeholder="Start typing..."
        />
      );
  }
}

function BlockFields({
  block,
  onChange,
  projectId,
}: {
  block: ProjectBlockRecord;
  onChange: (content: Record<string, unknown>) => void;
  projectId?: string;
}) {
  const content = block.content as Record<string, any>;

  if (block.block_type === "columns_2" || block.block_type === "columns_3") {
    return (
      <ColumnEditor
        projectId={projectId}
        value={{
          column_count: block.block_type === "columns_3" ? "3" : "2",
          columns:
            content.columns ||
            (block.block_type === "columns_3"
              ? [{ blocks: [] }, { blocks: [] }, { blocks: [] }]
              : [{ blocks: [] }, { blocks: [] }]),
        }}
        onChange={onChange as any}
      />
    );
  }

  if (block.block_type === "annotated_image") {
    const annotations = content.annotations || [];
    return (
      <div className="space-y-4">
        <ImageUploader
          context="blocks"
          projectId={projectId}
          value={content.url}
          onChange={(value) => onChange({ ...content, url: value })}
        />
        {content.url && (
          <div
            className="relative overflow-hidden rounded-[28px] border border-dashed border-border bg-secondary/30 p-4"
            onClick={(event) => {
              const target = event.currentTarget.getBoundingClientRect();
              const x = ((event.clientX - target.left) / target.width) * 100;
              const y = ((event.clientY - target.top) / target.height) * 100;
              onChange({
                ...content,
                annotations: [
                  ...annotations,
                  {
                    id: crypto.randomUUID(),
                    x,
                    y,
                    label: `Point ${annotations.length + 1}`,
                    description: "",
                  },
                ],
              });
            }}
          >
            <img src={content.url} alt="" className="max-h-[28rem] w-full rounded-[20px] object-cover" />
            {annotations.map((point: any, index: number) => (
              <span
                key={point.id}
                className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
                style={{ left: `${point.x}%`, top: `${point.y}%`, transform: "translate(-50%, -50%)" }}
              >
                {index + 1}
              </span>
            ))}
          </div>
        )}
        <div className="space-y-3">
          {annotations.map((point: any, index: number) => (
            <div key={point.id} className="grid gap-3 rounded-[24px] border border-border p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">Annotation {index + 1}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    onChange({
                      ...content,
                      annotations: annotations.filter((entry: any) => entry.id !== point.id),
                    })
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                value={point.label}
                onChange={(event) =>
                  onChange({
                    ...content,
                    annotations: annotations.map((entry: any) =>
                      entry.id === point.id ? { ...entry, label: event.target.value } : entry,
                    ),
                  })
                }
                placeholder="Label"
              />
              <Textarea
                value={point.description || ""}
                onChange={(event) =>
                  onChange({
                    ...content,
                    annotations: annotations.map((entry: any) =>
                      entry.id === point.id
                        ? { ...entry, description: event.target.value }
                        : entry,
                    ),
                  })
                }
                placeholder="Description"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (block.block_type === "gallery") {
    return (
      <div className="space-y-4">
        <ImageUploader
          context="blocks"
          projectId={projectId}
          value=""
          onChange={(value) =>
            onChange({
              ...content,
              images: [...(content.images || []), { url: value, alt: "", caption: "" }],
            })
          }
        />
        <div className="grid gap-3 md:grid-cols-2">
          {(content.images || []).map((image: any, index: number) => (
            <div key={`${image.url}-${index}`} className="space-y-2 rounded-[24px] border border-border p-3">
              <Input
                value={image.url}
                onChange={(event) =>
                  onChange({
                    ...content,
                    images: (content.images || []).map((entry: any, imageIndex: number) =>
                      imageIndex === index ? { ...entry, url: event.target.value } : entry,
                    ),
                  })
                }
                placeholder="Image URL"
              />
              <Input
                value={image.caption || ""}
                onChange={(event) =>
                  onChange({
                    ...content,
                    images: (content.images || []).map((entry: any, imageIndex: number) =>
                      imageIndex === index ? { ...entry, caption: event.target.value } : entry,
                    ),
                  })
                }
                placeholder="Caption"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (block.block_type === "before_after") {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        {(["before", "after"] as const).map((side) => (
          <div key={side} className="space-y-3">
            <p className="font-medium capitalize">{side}</p>
            <ImageUploader
              context="blocks"
              projectId={projectId}
              value={content[side]?.url}
              onChange={(value) =>
                onChange({
                  ...content,
                  [side]: {
                    ...content[side],
                    url: value,
                  },
                })
              }
            />
            <Input
              value={content[side]?.caption || ""}
              onChange={(event) =>
                onChange({
                  ...content,
                  [side]: {
                    ...content[side],
                    caption: event.target.value,
                  },
                })
              }
              placeholder={`${side} caption`}
            />
          </div>
        ))}
      </div>
    );
  }

  if (block.block_type === "metric_row") {
    const metrics = content.metrics || [];
    return (
      <div className="space-y-3">
        {metrics.map((metric: any, index: number) => (
          <div key={index} className="grid gap-3 md:grid-cols-3">
            <Input
              value={metric.value || ""}
              onChange={(event) =>
                onChange({
                  ...content,
                  metrics: metrics.map((entry: any, metricIndex: number) =>
                    metricIndex === index ? { ...entry, value: event.target.value } : entry,
                  ),
                })
              }
              placeholder="Value"
            />
            <Input
              value={metric.label || ""}
              onChange={(event) =>
                onChange({
                  ...content,
                  metrics: metrics.map((entry: any, metricIndex: number) =>
                    metricIndex === index ? { ...entry, label: event.target.value } : entry,
                  ),
                })
              }
              placeholder="Label"
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                onChange({
                  ...content,
                  metrics: metrics.filter((_: any, metricIndex: number) => metricIndex !== index),
                })
              }
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            onChange({
              ...content,
              metrics: [...metrics, { value: "", label: "" }],
            })
          }
        >
          Add metric
        </Button>
      </div>
    );
  }

  if (block.block_type === "callout") {
    return (
      <div className="grid gap-3">
        <Input
          value={content.value || ""}
          onChange={(event) => onChange({ ...content, value: event.target.value })}
          placeholder="Value"
        />
        <Input
          value={content.label || ""}
          onChange={(event) => onChange({ ...content, label: event.target.value })}
          placeholder="Label"
        />
        <Textarea
          value={content.description || ""}
          onChange={(event) => onChange({ ...content, description: event.target.value })}
          placeholder="Description"
        />
      </div>
    );
  }

  if (block.block_type === "image") {
    return (
      <div className="space-y-3">
        <ImageUploader
          context="blocks"
          projectId={projectId}
          value={content.url}
          onChange={(value) => onChange({ ...content, url: value })}
        />
        <Input
          value={content.alt || ""}
          onChange={(event) => onChange({ ...content, alt: event.target.value })}
          placeholder="Alt text"
        />
        <Input
          value={content.caption || ""}
          onChange={(event) => onChange({ ...content, caption: event.target.value })}
          placeholder="Caption"
        />
        <Select
          value={content.display || "contained"}
          onValueChange={(value) => onChange({ ...content, display: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose display mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-width">Full width</SelectItem>
            <SelectItem value="contained">Contained</SelectItem>
            <SelectItem value="small">Small</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (block.block_type === "video") {
    return (
      <div className="space-y-3">
        <Input
          value={content.url || ""}
          onChange={(event) => onChange({ ...content, url: event.target.value })}
          placeholder="Video URL"
        />
        <Input
          value={content.caption || ""}
          onChange={(event) => onChange({ ...content, caption: event.target.value })}
          placeholder="Caption"
        />
      </div>
    );
  }

  if (block.block_type === "divider") {
    return (
      <Select
        value={content.style || "thin"}
        onValueChange={(value) => onChange({ ...content, style: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="thin">Thin</SelectItem>
          <SelectItem value="thick">Thick</SelectItem>
          <SelectItem value="dotted">Dotted</SelectItem>
          <SelectItem value="decorative">Decorative</SelectItem>
        </SelectContent>
      </Select>
    );
  }

  if (block.block_type === "spacer") {
    return (
      <Select
        value={content.size || "medium"}
        onValueChange={(value) => onChange({ ...content, size: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="small">Small</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="large">Large</SelectItem>
          <SelectItem value="xlarge">Extra large</SelectItem>
        </SelectContent>
      </Select>
    );
  }

  if (block.block_type === "code") {
    return (
      <div className="space-y-3">
        <Textarea
          className="font-mono"
          value={content.code || ""}
          onChange={(event) => onChange({ ...content, code: event.target.value })}
          placeholder="Paste code"
        />
        <Input
          value={content.language || ""}
          onChange={(event) => onChange({ ...content, language: event.target.value })}
          placeholder="Language"
        />
      </div>
    );
  }

  if (block.block_type === "quote") {
    return (
      <div className="space-y-3">
        <Textarea
          value={content.text || ""}
          onChange={(event) => onChange({ ...content, text: event.target.value })}
          placeholder="Quote"
        />
        <Input
          value={content.attribution || ""}
          onChange={(event) => onChange({ ...content, attribution: event.target.value })}
          placeholder="Attribution"
        />
      </div>
    );
  }

  if (block.block_type === "heading2" || block.block_type === "heading3") {
    return (
      <Input
        value={content.text || ""}
        onChange={(event) => onChange({ ...content, text: event.target.value })}
        placeholder="Section heading"
      />
    );
  }

  return (
    <Textarea
      value={(content.html || "").replace(/<[^>]*>/g, "")}
      onChange={(event) => onChange({ ...content, html: `<p>${event.target.value}</p>` })}
      placeholder="Start typing..."
    />
  );
}

export function BlockEditor({
  initialBlocks,
  projectId,
  onSave,
  className,
}: {
  initialBlocks: ProjectBlockRecord[];
  projectId?: string;
  onSave: (blocks: ProjectBlockRecord[]) => Promise<void>;
  className?: string;
}) {
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [isPending, startTransition] = useTransition();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const editor = useBlockEditor(initialBlocks, projectId);

  const ids = useMemo(() => editor.blocks.map((block) => block.id), [editor.blocks]);

  useAutoSave({
    value: editor.blocks,
    delay: 3000,
    onSave: async (blocks) => {
      setSaveState("saving");
      try {
        await onSave(blocks);
        setSaveState("saved");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Could not save blocks");
        setSaveState("idle");
      }
    },
  });

  function saveNow() {
    startTransition(async () => {
      setSaveState("saving");
      await onSave(editor.blocks);
      setSaveState("saved");
      toast.success("Blocks saved");
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const from = editor.blocks.findIndex((block) => block.id === active.id);
    const to = editor.blocks.findIndex((block) => block.id === over.id);
    editor.moveBlock(from, to);
  }

  return (
    <div className={className}>
      <div className="mb-4 flex items-center justify-between">
        <BlockTypePicker onSelect={(type) => editor.addBlock(type)} />
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {saveState === "saving" && <Loader2 className="h-4 w-4 animate-spin" />}
          {saveState === "saved" && <Check className="h-4 w-4 text-primary" />}
          <span>
            {saveState === "saving"
              ? "Saving..."
              : saveState === "saved"
                ? "Saved"
                : "Unsaved changes"}
          </span>
          <Button type="button" variant="outline" size="sm" onClick={saveNow} disabled={isPending}>
            Save now
          </Button>
        </div>
      </div>
      {editor.blocks.length === 0 ? (
        <Card className="flex min-h-72 flex-col items-center justify-center gap-4 border-dashed text-center">
          <p className="font-display text-3xl">Start building your case study</p>
          <p className="max-w-md text-sm text-muted-foreground">
            Add your first block and shape the narrative section by section.
          </p>
          <BlockTypePicker onSelect={(type) => editor.addBlock(type)} />
        </Card>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            <div className="space-y-5">
              {editor.blocks.map((block, index) => (
                <div key={block.id} className="space-y-3">
                  <div className="flex justify-center">
                    <BlockTypePicker onSelect={(type) => editor.addBlock(type, index)} />
                  </div>
                  <SortableBlock
                    block={block}
                    index={index}
                    total={editor.blocks.length}
                    onDuplicate={editor.duplicateBlock}
                    onDelete={editor.deleteBlock}
                    onMove={editor.moveBlock}
                  >
                    <BlockFields
                      block={block}
                      projectId={projectId}
                      onChange={(content) => editor.updateBlock(block.id, content)}
                    />
                  </SortableBlock>
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
      {editor.blocks.length > 0 && (
        <div className="mt-5 flex justify-center">
          <BlockTypePicker onSelect={(type) => editor.addBlock(type)} />
        </div>
      )}
    </div>
  );
}
