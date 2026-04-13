import { useState } from "react";
import Icon from "./Icon";

export default function ExperienceCard({ company }) {
  const [open, setOpen] = useState(false);

  const formatDate = (d) => {
    if (!d) return "";
    const [y, m] = d.split("/");
    return m ? `${m}/${y}` : y;
  };

  return (
    <div className="relative">

      {/* timeline dot */}
      <div className="absolute -left-[34px] top-2 w-3 h-3 rounded-full bg-gray-400" />

      {/* HEADER */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          
          {/* ICON */}
          <div className="w-8 h-8">
            <Icon icon={company.icon} />
          </div>

          {/* TITLE */}
          <div>
            <h3 className="text-lg font-semibold">
              {company.title}
            </h3>
            <p className="text-sm text-gray-400">
              {company.department}
            </p>
          </div>
        </div>

        <span className="text-gray-400 text-sm">
          {open ? "−" : "+"}
        </span>
      </button>

      {/* EXPANDED ROLES */}
      {open && (
        <div className="mt-4 ml-11 space-y-6 border-l border-gray-800 pl-4">

          {company.roles.map((role, i) => (
            <div key={i} className="space-y-1">

              {/* ROLE TITLE */}
              <h4 className="font-medium text-gray-200">
                {role.title}
              </h4>

              {/* DATES */}
              <p className="text-xs text-gray-400">
                {formatDate(role.date_start)}
                {role.date_end && ` → ${formatDate(role.date_end)}`}
              </p>

              {/* DESCRIPTION */}
              {Array.isArray(role.description) ? (
                role.description.map((line, idx) => (
                  <p key={idx} className="text-sm text-gray-300">
                    {line}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-300">
                  {role.description}
                </p>
              )}
            </div>
          ))}

        </div>
      )}
    </div>
  );
}