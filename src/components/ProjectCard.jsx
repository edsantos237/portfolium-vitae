import { tagMap } from "../data/tagRegistry";
import Icon from "./Icon";

export default function ProjectCard({ project }) {
  const formatDate = (date) => {
    if (!date) return null;
    const [year, month] = date.split("-");
    return `${month}-${year}`;
  };

  return (
    <div className="rounded-xl border border-gray-700 p-5 bg-gray-900 hover:bg-gray-800 transition">
      
      {/* TITLE */}
      <h3 className="text-xl font-semibold mb-2">
        {project.title}
      </h3>

      {/* DATE */}
      {project.date_start && (
        <p className="text-sm text-gray-400 mb-3">
          {formatDate(project.date_start)}
          {project.date_end && ` → ${formatDate(project.date_end)}`}
        </p>
      )}

      {/* DESCRIPTION */}
      <div className="text-sm text-gray-300 space-y-1 mb-4">
        {Array.isArray(project.description) ? (
          project.description.map((line, i) => (
            <p key={i}>{line}</p>
          ))
        ) : (
          <p>{project.description}</p>
        )}
      </div>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tagId) => {
          const tag = tagMap[tagId];
          if (!tag) return null;

          return (
            <div
              key={tagId}
              className="flex items-center gap-1 text-xs bg-gray-700 px-2 py-1 rounded"
            >
              <Icon icon={tag.icon} />
              <span>{tag.title}</span>
            </div>
          );
        })}
      </div>

      {/* LINKS */}
      {project.links?.length > 0 && (
        <div className="flex gap-3">
          {project.links.map((link, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 text-sm hover:underline"
            >
              Link {i + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}