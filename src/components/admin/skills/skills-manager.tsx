"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  createSkillAction,
  deleteSkillAction,
  updateSkillAction,
} from "@/lib/actions/skills";
import type { SkillRecord } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const ICON_OPTIONS = [
  { value: "product", label: "Product (browser/window)" },
  { value: "ai", label: "AI (atom/circle)" },
  { value: "brand", label: "Brand (chart/spark)" },
];

interface SkillFormState {
  title: string;
  description: string;
  icon_key: string;
  sort_order: number;
  is_published: boolean;
}

function recordToForm(skill: SkillRecord): SkillFormState {
  return {
    title: skill.title,
    description: skill.description ?? "",
    icon_key: (skill.icon_key as string) ?? "",
    sort_order: skill.sort_order,
    is_published: skill.is_published,
  };
}

export function SkillsManager({ skills }: { skills: SkillRecord[] }) {
  const [isPending, startTransition] = useTransition();
  const [drafts, setDrafts] = useState<Record<string, SkillFormState>>(() =>
    Object.fromEntries(skills.map((skill) => [skill.id, recordToForm(skill)])),
  );

  function patchDraft(id: string, patch: Partial<SkillFormState>) {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  function saveSkill(id: string) {
    const draft = drafts[id];
    if (!draft) return;
    startTransition(async () => {
      const result = await updateSkillAction(id, draft);
      if (!result.success) {
        toast.error(result.error || "Could not save skill");
        return;
      }
      toast.success("Skill saved");
    });
  }

  function deleteSkill(id: string) {
    if (!confirm("Delete this skill?")) return;
    startTransition(async () => {
      const result = await deleteSkillAction(id);
      if (!result.success) {
        toast.error(result.error || "Could not delete skill");
        return;
      }
      toast.success("Skill deleted");
    });
  }

  function createSkill() {
    startTransition(async () => {
      const nextOrder = skills.length;
      const result = await createSkillAction({
        title: "New skill",
        description: "",
        icon_key: "product",
        sort_order: nextOrder,
        is_published: false,
      });
      if (!result.success) {
        toast.error(result.error || "Could not create skill");
        return;
      }
      toast.success("Skill created");
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Skills</CardTitle>
            <p className="text-sm text-muted-foreground">
              The 3-column block on the homepage. Re-order by changing the sort number.
            </p>
          </div>
          <Button type="button" onClick={createSkill} disabled={isPending}>
            <Plus className="h-4 w-4" />
            Add skill
          </Button>
        </CardHeader>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        {skills.map((skill) => {
          const draft = drafts[skill.id] ?? recordToForm(skill);
          return (
            <Card key={skill.id}>
              <CardContent className="space-y-4 p-5">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={draft.title}
                    onChange={(e) => patchDraft(skill.id, { title: e.target.value })}
                    placeholder="Product Design"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={draft.description}
                    onChange={(e) => patchDraft(skill.id, { description: e.target.value })}
                    placeholder="Short paragraph describing this skill"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <select
                      value={draft.icon_key}
                      onChange={(e) => patchDraft(skill.id, { icon_key: e.target.value })}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    >
                      <option value="">— None —</option>
                      {ICON_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sort order</Label>
                    <Input
                      type="number"
                      value={draft.sort_order}
                      onChange={(e) =>
                        patchDraft(skill.id, { sort_order: parseInt(e.target.value, 10) || 0 })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-3">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={draft.is_published}
                      onCheckedChange={(checked) => patchDraft(skill.id, { is_published: checked })}
                    />
                    <span className="text-sm text-muted-foreground">
                      {draft.is_published ? "Published" : "Hidden"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="ghost" size="icon" onClick={() => deleteSkill(skill.id)} disabled={isPending}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button type="button" onClick={() => saveSkill(skill.id)} disabled={isPending}>
                      Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
