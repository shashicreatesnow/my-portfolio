/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/incompatible-library */

"use client";

import { useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { defaultSiteSettings } from "@/lib/constants/site";
import {
  aboutSettingsSchema,
  contactSettingsSchema,
  heroSettingsSchema,
  navigationSettingsSchema,
  seoSettingsSchema,
} from "@/lib/schemas/settings";
import {
  saveAboutSettingsAction,
  saveContactSettingsAction,
  saveHeroSettingsAction,
  saveNavigationSettingsAction,
  saveSeoSettingsAction,
} from "@/lib/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/shared/image-uploader";

export function SettingsTabs({ settings }: { settings: typeof defaultSiteSettings }) {
  const [isPending, startTransition] = useTransition();

  const heroForm = useForm({
    resolver: zodResolver(heroSettingsSchema),
    defaultValues: settings.hero,
  });
  const contactForm = useForm({
    resolver: zodResolver(contactSettingsSchema),
    defaultValues: settings.contact,
  });
  const seoForm = useForm({
    resolver: zodResolver(seoSettingsSchema),
    defaultValues: settings.seo,
  });
  const navigationForm = useForm({
    resolver: zodResolver(navigationSettingsSchema),
    defaultValues: settings.navigation,
  });
  const aboutForm = useForm({
    resolver: zodResolver(aboutSettingsSchema),
    defaultValues: settings.about,
  });

  const navigationFieldArray = useFieldArray({
    control: navigationForm.control,
    name: "items",
  });

  function submit(task: () => Promise<any>, message: string) {
    startTransition(async () => {
      const result = await task();
      if (!result.success) {
        toast.error(result.error || "Could not save settings");
        return;
      }
      toast.success(message);
    });
  }

  return (
    <Tabs defaultValue="hero" className="space-y-6">
      <TabsList>
        <TabsTrigger value="hero">Hero</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
        <TabsTrigger value="seo">SEO</TabsTrigger>
        <TabsTrigger value="navigation">Navigation</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
      </TabsList>

      <TabsContent value="hero">
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input {...heroForm.register("title")} />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Textarea {...heroForm.register("subtitle")} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>CTA text</Label>
                <Input {...heroForm.register("cta_text")} />
              </div>
              <div className="space-y-2">
                <Label>CTA link</Label>
                <Input {...heroForm.register("cta_link")} />
              </div>
            </div>
            <Button disabled={isPending} onClick={heroForm.handleSubmit((values) => submit(() => saveHeroSettingsAction(values), "Hero settings saved"))}>
              Save hero
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="contact">
        <Card>
          <CardContent className="grid gap-4 p-6 md:grid-cols-2">
            {(["email", "linkedin", "behance", "twitter", "github"] as const).map((field) => (
              <div key={field} className="space-y-2">
                <Label>{field}</Label>
                <Input {...contactForm.register(field)} />
              </div>
            ))}
            <div className="md:col-span-2">
              <Button disabled={isPending} onClick={contactForm.handleSubmit((values) => submit(() => saveContactSettingsAction(values), "Contact settings saved"))}>
                Save contact
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="seo">
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label>Site title</Label>
              <Input {...seoForm.register("site_title")} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea {...seoForm.register("site_description")} />
            </div>
            <div className="space-y-2">
              <Label>Default OG image</Label>
              <ImageUploader
                context="general"
                value={seoForm.watch("og_image_url")}
                onChange={(value) => seoForm.setValue("og_image_url", value, { shouldDirty: true })}
              />
            </div>
            <Button disabled={isPending} onClick={seoForm.handleSubmit((values) => submit(() => saveSeoSettingsAction(values), "SEO settings saved"))}>
              Save SEO
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="navigation">
        <Card>
          <CardContent className="space-y-4 p-6">
            {navigationFieldArray.fields.map((field, index) => (
              <div key={field.id} className="grid gap-3 rounded-[24px] border border-border p-4 md:grid-cols-[1fr_1fr_auto]">
                <Input {...navigationForm.register(`items.${index}.label`)} placeholder="Label" />
                <Input {...navigationForm.register(`items.${index}.href`)} placeholder="/route" />
                <Button type="button" variant="ghost" onClick={() => navigationFieldArray.remove(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigationFieldArray.append({ label: "New item", href: "/" })}
              >
                Add item
              </Button>
              <Button
                disabled={isPending}
                onClick={navigationForm.handleSubmit((values) =>
                  submit(() => saveNavigationSettingsAction(values), "Navigation settings saved"),
                )}
              >
                Save navigation
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="about">
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label>Headline</Label>
              <Input {...aboutForm.register("headline")} />
            </div>
            <div className="space-y-2">
              <Label>Subheadline</Label>
              <Textarea {...aboutForm.register("subheadline")} />
            </div>
            <div className="space-y-2">
              <Label>Profile image</Label>
              <ImageUploader
                context="about"
                value={aboutForm.watch("profile_image_url")}
                onChange={(value) => aboutForm.setValue("profile_image_url", value, { shouldDirty: true })}
              />
            </div>
            <Button disabled={isPending} onClick={aboutForm.handleSubmit((values) => submit(() => saveAboutSettingsAction(values), "About settings saved"))}>
              Save about settings
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
