import { useState } from "react";
import { activities } from "../data/activities";
import { companies } from "../data/experience";
import { schools } from "../data/education";
import Icon from "./Icon";
import { formatRange } from "../utils/dateFormat";

export default function Activities({ isActive }) {
  const [openId, setOpenId] = useState(null);

  const sorted = [...activities].sort((a, b) => {
    const aDate = a.roles?.[0]?.date?.start || "";
    const bDate = b.roles?.[0]?.date?.start || "";
    return bDate.localeCompare(aDate);
  });

  

  return (
    <section id="activities" className="py-16">
      <div className="sticky top-12 lg:top-0 z-40 bg-gray-950/95 backdrop-blur border-b border-gray-800 mb-10 relative">
        <div className={`absolute inset-0 transition-colors duration-300 ${isActive ? "bg-gray-900/25" : ""}`} />
        <div className="relative pt-4 pb-2">
          <h2 className="text-3xl font-bold">Activities</h2>
        </div>
      </div>

      <div className="relative border-l border-gray-700 pl-6 space-y-10">
        {sorted.map((act, i) => (
          <div key={act.title} className="relative">
            <div className="absolute -left-[34px] top-2 w-3 h-3 rounded-full bg-gray-400" />

            <button
              onClick={() => setOpenId(openId === act.title ? null : act.title)}
              className="w-full text-left flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-semibold">{act.title}</h3>
                {/** Origins (company / school / personal / raw tags) */}
                {act.tags && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {act.tags.map((tag) => {
                      const company = companies.find((c) => c.id === tag);
                      if (company) {
                        return (
                          <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs rounded border border-gray-700 bg-gray-900 whitespace-nowrap">
                            <Icon icon={company.icon} />
                            {company.title}
                          </span>
                        );
                      }

                      const school = schools.find((s) => s.id === tag);
                      if (school) {
                        return (
                          <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs rounded border border-gray-700 bg-gray-900 whitespace-nowrap">
                            <Icon icon={school.icon} />
                            {school.title}
                          </span>
                        );
                      }

                      if (tag === "personal") {
                        return (
                          <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs rounded border border-gray-700 bg-gray-900 whitespace-nowrap">
                            <Icon icon="user" />
                            Personal
                          </span>
                        );
                      }

                      if (tag === "volunteering") {
                        return (
                          <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs rounded border border-gray-700 bg-gray-900 whitespace-nowrap">
                            <Icon icon="user" />
                            Volunteering
                          </span>
                        );
                      }

                      // fallback: render raw tag label
                      return (
                        <span key={tag} className="px-2 py-1 text-xs rounded border border-gray-700 bg-gray-900 whitespace-nowrap">
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              <span className="text-gray-400 text-sm">{openId === act.title ? '−' : '+'}</span>
            </button>

            {openId === act.title && (
              <div className="mt-4 ml-11 space-y-6 border-l border-gray-800 pl-4">
                {act.roles.map((role, idx) => (
                  <div key={idx} className="space-y-1">
                    {role.title && <h4 className="font-medium text-gray-200">{role.title}</h4>}

                    <p className="text-xs text-gray-400">
                      {formatRange(role.date)}
                    </p>

                    {Array.isArray(role.description)
                      ? role.description.map((line, j) => (
                          <p key={j} className="text-sm text-gray-300">{line}</p>
                        ))
                      : <p className="text-sm text-gray-300">{role.description}</p>
                    }
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
