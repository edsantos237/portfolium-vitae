import { skills } from "../data/skills";
import SkillCard from "./SkillCard";

const typeOrder = [
  "language",
  "framework",
  "tool",
  "platform",
  "domain",
];

const typeLabels = {
  language: "Languages",
  framework: "Frameworks",
  tool: "Tools",
  platform: "Platforms",
  domain: "Domains",
};

export default function Skills() {
  // group skills by type
  const grouped = skills.reduce((acc, skill) => {
    const type = skill.type || "tool";
    if (!acc[type]) acc[type] = [];
    acc[type].push(skill);
    return acc;
  }, {});

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-10">Skills</h2>

      <div className="space-y-10">
        {typeOrder.map((type) => {
          const group = grouped[type];
          if (!group || group.length === 0) return null;

          return (
            <div key={type}>
              {/* GROUP TITLE */}
              <h3 className="text-xl font-semibold text-gray-300 mb-4">
                {typeLabels[type]}
              </h3>

              {/* GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {group.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}