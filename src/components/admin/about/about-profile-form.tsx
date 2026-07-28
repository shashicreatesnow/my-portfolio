"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { defaultSiteSettings } from "@/lib/constants/site";
import { aboutSettingsSchema, contactSettingsSchema } from "@/lib/schemas/settings";
import { saveAboutSettingsAction, saveContactSettingsAction } from "@/lib/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/shared/image-uploader";

export function AboutProfileForm({ settings }: { settings: typeof defaultSiteSettings }) {
  const [isPending, startTransition] = useTransition();

  const aboutForm = useForm({
    resolver: zodResolver(aboutSettingsSchema),
    defaultValues: settings.about,
  });
  const contactForm = useForm({
    resolver: zodResolver(contactSettingsSchema),
    defaultValues: settings.contact,
  });

  function saveAll() {
    aboutForm.handleSubmit((aboutValues) =>
      contactForm.handleSubmit((contactValues) => {
        startTransition(async () => {
          const [aboutResult, contactResult] = await Promise.all([
            saveAboutSettingsAction(aboutValues),
            saveContactSettingsAction(contactValues),
          ]);
          if (!aboutResult.success || !contactResult.success) {
            toast.error(aboutResult.error || contactResult.error || "Could not save profile");
            return;
          }
          toast.success("About profile saved");
        });
      })(),
    )();
  }

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div>
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="text-sm text-muted-foreground">
            Photo, name, role, and contact details shown at the top of the About page.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          <div className="space-y-2">
            <Label>Profile photo</Label>
            <ImageUploader
              context="about"
              value={aboutForm.watch("profile_image_url")}
              onChange={(value) => aboutForm.setValue("profile_image_url", value, { shouldDirty: true })}
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input {...aboutForm.register("headline")} placeholder="Shashi Pratap Singh" />
            </div>
            <div className="space-y-2">
              <Label>What I do</Label>
              <Textarea
                {...aboutForm.register("subheadline")}
                placeholder="Product & brand designer building AI systems…"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Phone number</Label>
                <Input {...contactForm.register("phone")} placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input {...contactForm.register("email")} placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input {...contactForm.register("linkedin")} />
              </div>
              <div className="space-y-2">
                <Label>Behance URL</Label>
                <Input {...contactForm.register("behance")} />
              </div>
            </div>
          </div>
        </div>

        <Button disabled={isPending} onClick={saveAll}>
          {isPending ? "Saving…" : "Save profile"}
        </Button>
      </CardContent>
    </Card>
  );
}
