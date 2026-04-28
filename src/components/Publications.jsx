import { publications } from "@datapack/publications";
import { getSectionTheme } from "../config/sections";
import { companies } from "@datapack/experience";
import { schools } from "@datapack/education";
import { projects } from "@datapack/projects";
import Icon from "./Icon";

import { groupDescriptionItems, renderGroups } from "../utils/descriptionRenderer.jsx";
import { formatSingle } from "../utils/dateFormat.js";



export default function Publications({ isActive, onPublicationClick }) {
  const sectionTheme = getSectionTheme("publications");

  return (
    <section id="publications" className="py-16">
      <div
        className="sticky top-12 lg:top-0 z-40 backdrop-blur border-b mb-6 relative transition-colors duration-300"
        style={{
          backgroundColor: isActive ? 'var(--section-active-bg)' : 'var(--section-base-bg)',
          borderBottomColor: isActive ? sectionTheme.accentBorder : sectionTheme.controlBorder
        }}
      >
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{ backgroundColor: isActive ? sectionTheme.stickyActiveOverlay : "transparent" }}
        />
        <div className="relative pt-4">
          <h2 className="text-3xl font-bold mb-2">Publications</h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {publications.map((pub, idx) => (
          <div
            key={`${pub.title}-${idx}`}
            className="p-4 rounded-lg border h-full flex flex-col section-card cursor-pointer transition-colors section-soft-hover"
            onClick={() => onPublicationClick?.(pub.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onPublicationClick?.(pub.id); }}
          >
            <div className="mb-2">
              <h3 className="font-semibold text-white">{pub.title}</h3>
              {pub.publisher && (
                <p className="text-sm text-gray-400 mt-1">{pub.publisher}</p>
              )}
              {pub.date && (
                <p className="text-xs text-gray-500">{formatSingle(pub.date)}</p>
              )}
            </div>
            {/** Origin pills: resolve companies/schools/personal from tags (ignore 'arcticle') */}
            {pub.tags && (
              <div className="flex flex-wrap gap-2 mb-3">
                {pub.tags.flatMap((t) => String(t).split(",").map(s => s.trim())).filter(Boolean).map((tag) => {
                  if (tag.toLowerCase() === "arcticle") return null;

                  const company = companies.find((c) => c.id === tag);
                  if (company) {
                    return (
                      <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs rounded border whitespace-nowrap section-chip">
                        <Icon icon={company.icon} />
                        {company.label ?? company.title}
                      </span>
                    );
                  }

                  const school = schools.find((s) => s.id === tag);
                  if (school) {
                    const schoolLabel = school.label ?? school.title;
                    return (
                      <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs rounded border whitespace-nowrap section-chip">
                        <Icon icon={school.icon} />
                        {schoolLabel}
                      </span>
                    );
                  }

                  const project = projects.find((p) => p.id === tag);
                  if (project) {
                    const projectOriginIcon = (() => {
                      for (const ptag of (project.tags || [])) {
                        const c = companies.find((co) => co.id === ptag);
                        if (c) return c.icon;
                        const s = schools.find((sc) => sc.id === ptag);
                        if (s) return s.icon;
                      }
                      return project.icon;
                    })();
                    return (
                      <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs rounded border whitespace-nowrap section-chip">
                        {projectOriginIcon && <Icon icon={projectOriginIcon} />}
                        {project.label ?? project.title}
                      </span>
                    );
                  }

                  if (tag.toLowerCase() === "personal") {
                    return (
                      <span key={tag} className="px-2 py-1 text-xs rounded border whitespace-nowrap section-chip">
                        Personal
                      </span>
                    );
                  }

                  // fallback: render the cleaned tag text
                  return (
                    <span key={tag} className="px-2 py-1 text-xs rounded border whitespace-nowrap section-chip">
                      {tag}
                    </span>
                  );
                })}
              </div>
            )}

            <div className="text-sm text-gray-400 mb-4 flex-1">
              {Array.isArray(pub.summary)
                ? renderGroups(groupDescriptionItems(pub.summary), `pub-summary-${pub.id ?? pub.title}`)
                : <p>{pub.summary}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
