import { useState } from "react";
import { schools } from "../data/education";
import EducationCard from "./EducationCard";

export default function Education() {
  const [openId, setOpenId] = useState(null);

  const sorted = [...schools].sort((a, b) => {
    return (b.date_start || "").localeCompare(a.date_start || "");
  });

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-10">Education</h2>

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