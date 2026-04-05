import { notFound } from "next/navigation";

import { ProjectEditor } from "@/components/admin/projects/project-editor";
import { getProjectById } from "@/lib/queries/projects";
import { createPreviewToken } from "@/lib/utils/preview-token";

interface AdminProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminProjectPage({ params }: AdminProjectPageProps) {
  const { id } = await params;
  const entry = await getProjectById(id);

  if (!entry) {
    notFound();
  }

  const previewHref =
    entry.project.status === "published"
      ? `/works/${entry.project.slug}`
      : process.env.REVALIDATION_SECRET
        ? `/works/${entry.project.slug}?preview=true&token=${createPreviewToken(
            entry.project.slug,
            process.env.REVALIDATION_SECRET,
          )}`
        : `/works/${entry.project.slug}`;

  return (
    <ProjectEditor
      project={entry.project}
      blocks={entry.blocks}
      previewHref={previewHref}
    />
  );
}
