import { companies } from "../data/experience";
import ExperienceCard from "./ExperienceCard";

export default function Experience() {
  // flatten + sort by most recent role
  const sorted = [...companies].sort((a, b) => {
    const aDate = a.roles?.[0]?.date_start || "";
    const bDate = b.roles?.[0]?.date_start || "";
    return bDate.localeCompare(aDate);
  });

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-10">Experience</h2>

      <div className="relative border-l border-gray-700 pl-6 space-y-10">
        {sorted.map((company) => (
          <ExperienceCard key={company.id} company={company} />
        ))}
      </div>
    </section>
  );
}