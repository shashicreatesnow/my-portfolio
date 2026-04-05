import Link from "next/link";
import { Plus } from "lucide-react";

import { ProjectList } from "@/components/admin/projects/project-list";
import { Button } from "@/components/ui/button";
import { getAllProjects } from "@/lib/queries/projects";

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4" />
            New project
          </Link>
        </Button>
      </div>
      <ProjectList projects={projects} />
    </div>
  );
}
