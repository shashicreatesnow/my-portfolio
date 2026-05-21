import { SkillsManager } from "@/components/admin/skills/skills-manager";
import { getAllSkills } from "@/lib/queries/skills";

export default async function AdminSkillsPage() {
  const skills = await getAllSkills();
  return <SkillsManager skills={skills} />;
}
