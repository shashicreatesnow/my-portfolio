import { createProjectAndRedirectAction } from "@/lib/actions/projects";

export default async function NewProjectPage() {
  await createProjectAndRedirectAction();
  return null;
}
