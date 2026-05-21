"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

import {
  createClientAction,
  deleteClientAction,
  updateClientAction,
} from "@/lib/actions/clients";
import type { ClientRecord } from "@/lib/types/database";
import { useImageUpload } from "@/hooks/use-image-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ClientFormState {
  name: string;
  logo_url: string;
  website_url: string;
  sort_order: number;
  is_published: boolean;
}

function recordToForm(client: ClientRecord): ClientFormState {
  return {
    name: client.name,
    logo_url: client.logo_url ?? "",
    website_url: client.website_url ?? "",
    sort_order: client.sort_order,
    is_published: client.is_published,
  };
}

export function ClientsManager({ clients }: { clients: ClientRecord[] }) {
  const { upload, uploading } = useImageUpload();
  const [isPending, startTransition] = useTransition();
  const [drafts, setDrafts] = useState<Record<string, ClientFormState>>(() =>
    Object.fromEntries(clients.map((client) => [client.id, recordToForm(client)])),
  );

  function patchDraft(id: string, patch: Partial<ClientFormState>) {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  async function uploadLogo(id: string, file: File | null) {
    if (!file) return;
    try {
      const result = await upload({ file, context: "clients" });
      patchDraft(id, { logo_url: result.url });
      const draft = { ...drafts[id], logo_url: result.url };
      const save = await updateClientAction(id, draft);
      if (!save.success) throw new Error(save.error);
      toast.success("Logo uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    }
  }

  function saveClient(id: string) {
    const draft = drafts[id];
    if (!draft) return;
    startTransition(async () => {
      const result = await updateClientAction(id, draft);
      if (!result.success) {
        toast.error(result.error || "Could not save client");
        return;
      }
      toast.success("Client saved");
    });
  }

  function deleteClient(id: string) {
    if (!confirm("Delete this client?")) return;
    startTransition(async () => {
      const result = await deleteClientAction(id);
      if (!result.success) {
        toast.error(result.error || "Could not delete client");
        return;
      }
      toast.success("Client deleted");
    });
  }

  function createClient() {
    startTransition(async () => {
      const nextOrder = clients.length;
      const result = await createClientAction({
        name: "New client",
        logo_url: "",
        website_url: "",
        sort_order: nextOrder,
        is_published: false,
      });
      if (!result.success) {
        toast.error(result.error || "Could not create client");
        return;
      }
      toast.success("Client created");
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Clients</CardTitle>
            <p className="text-sm text-muted-foreground">
              Logos shown on the homepage. Upload SVG or PNG with transparent background for best results.
            </p>
          </div>
          <Button type="button" onClick={createClient} disabled={isPending}>
            <Plus className="h-4 w-4" />
            Add client
          </Button>
        </CardHeader>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        {clients.map((client) => {
          const draft = drafts[client.id] ?? recordToForm(client);
          return (
            <Card key={client.id}>
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-32 shrink-0 overflow-hidden rounded-md border border-border bg-secondary">
                    {draft.logo_url ? (
                      <Image src={draft.logo_url} alt={draft.name} fill className="object-contain p-2" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        No logo
                      </div>
                    )}
                  </div>
                  <label className="inline-flex cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => uploadLogo(client.id, e.target.files?.[0] || null)}
                    />
                    <Button type="button" asChild variant="outline">
                      <span>
                        <Upload className="h-4 w-4" />
                        {uploading ? "Uploading..." : "Upload logo"}
                      </span>
                    </Button>
                  </label>
                </div>

                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={draft.name}
                    onChange={(e) => patchDraft(client.id, { name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input
                    type="url"
                    value={draft.website_url}
                    onChange={(e) => patchDraft(client.id, { website_url: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Sort order</Label>
                    <Input
                      type="number"
                      value={draft.sort_order}
                      onChange={(e) =>
                        patchDraft(client.id, { sort_order: parseInt(e.target.value, 10) || 0 })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-3">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={draft.is_published}
                      onCheckedChange={(checked) => patchDraft(client.id, { is_published: checked })}
                    />
                    <span className="text-sm text-muted-foreground">
                      {draft.is_published ? "Published" : "Hidden"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="ghost" size="icon" onClick={() => deleteClient(client.id)} disabled={isPending}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button type="button" onClick={() => saveClient(client.id)} disabled={isPending}>
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
