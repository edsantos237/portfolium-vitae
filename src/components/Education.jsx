import { useState } from "react";
import { schools } from "../data/education";
import EducationCard from "./EducationCard";

export default function Education({ isActive }) {
  const [openId, setOpenId] = useState(null);

  const sorted = [...schools].sort((a, b) => {
    return (b.date?.start || "").localeCompare(a.date?.start || "");
  });

  return (
    <section className="py-16">
      {/* Sticky header */}
      <div className="sticky top-12 lg:top-0 z-40 bg-gray-950/95 backdrop-blur border-b border-gray-800 mb-10 relative">
        <div className={`absolute inset-0 transition-colors duration-300 ${isActive ? "bg-gray-900/25" : ""}`} />
        <div className="relative pt-4 pb-2">
          <h2 className="text-3xl font-bold">Education</h2>
        </div>
      </div>

      <div className="relative border-l border-gray-700 pl-6 space-y-10">
        {sorted.map((school) => (
          <EducationCard
            key={school.id}
            school={school}
            open={openId === school.id}
            onToggle={() =>
              setOpenId(openId === school.id ? null : school.id)
            }
          />
        ))}
      </div>
    </section>
  );
}