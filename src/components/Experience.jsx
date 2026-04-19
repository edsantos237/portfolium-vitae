import { companies } from "../data/experience";
import ExperienceCard from "./ExperienceCard";

export default function Experience({ isActive }) {
  // flatten + sort by most recent role
  const sorted = [...companies].sort((a, b) => {
    const aDate = a.roles?.[0]?.date?.start || "";
    const bDate = b.roles?.[0]?.date?.start || "";
    return bDate.localeCompare(aDate);
  });

  return (
    <section className="py-16">
      {/* Sticky header */}
      <div className="sticky top-12 lg:top-0 z-40 bg-gray-950/95 backdrop-blur border-b border-gray-800 mb-10 relative">
        <div className={`absolute inset-0 transition-colors duration-300 ${isActive ? "bg-gray-900/25" : ""}`} />
        <div className="relative pt-4 pb-2">
          <h2 className="text-3xl font-bold">Experience</h2>
        </div>
      </div>

      <div className="relative border-l border-gray-700 pl-6 space-y-10">
        {sorted.map((company) => (
          <ExperienceCard key={company.id} company={company} />
        ))}
      </div>
    </section>
  );
}