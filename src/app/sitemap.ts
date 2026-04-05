import type { MetadataRoute } from "next";

import { getProjectSlugs } from "@/lib/queries/projects";
import { siteMetadata } from "@/lib/constants/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProjectSlugs();
  const routes = ["", "/works", "/lab", "/about"];

  return [
    ...routes.map((route) => ({
      url: `${siteMetadata.siteUrl}${route}`,
      lastModified: new Date(),
    })),
    ...slugs.map((slug) => ({
      url: `${siteMetadata.siteUrl}/works/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
