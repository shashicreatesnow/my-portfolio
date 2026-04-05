import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { ProjectRecord } from "@/lib/types/projects";

export function ProjectNavigation({
  previous,
  next,
}: {
  previous?: ProjectRecord | null;
  next?: ProjectRecord | null;
}) {
  return (
    <div className="editorial-panel mt-20 flex flex-col gap-5 rounded-[30px] px-6 py-7 md:flex-row md:items-center md:justify-between">
      <Link href="/works" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to all works
      </Link>
      <div className="flex flex-col gap-3 md:flex-row">
        {previous && (
          <Link href={`/works/${previous.slug}`} className="inline-flex items-center gap-2 text-sm hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Previous project
          </Link>
        )}
        {next && (
          <Link href={`/works/${next.slug}`} className="inline-flex items-center gap-2 text-sm hover:text-primary">
            Next project
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
