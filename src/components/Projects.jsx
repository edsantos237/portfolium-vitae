import { projects } from "../data/projects";
import { tagMap } from "../data/tagRegistry";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl font-bold mb-8">Projects</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}