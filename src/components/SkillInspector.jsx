import Icon from "./Icon";

export default function SkillInspector({ skill, usage, onShowProjects }) {
  if (!skill) {
    return (
      <aside className="lg:sticky lg:top-24">
        <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-5 text-sm text-gray-400">
          Select a skill to inspect where it was used.
        </div>
      </aside>
    );
  }

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-5 space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 bg-gray-900">
            <Icon icon={skill.icon} />
          </div>

          <div>
            <h3 className="text-lg font-semibold">{skill.title}</h3>
            <p className="text-xs text-gray-400 capitalize">
              {(skill.tags?.[0] || "tool")}{" "}
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-300">
          Used in{" "}
          <span className="font-semibold text-white">
            {usage?.projects?.length || 0}
          </span>{" "}
          project{usage?.projects?.length === 1 ? "" : "s"}.
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-2">
              Professional
            </h4>
            {usage?.professional?.length ? (
              <div className="flex flex-wrap gap-2">
                {usage.professional.map((item) => (
                  <span
                    key={item.id}
                    className="px-2 py-1 rounded border border-gray-700 text-xs text-gray-300"
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">None</p>
            )}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-2">
              Academic
            </h4>
            {usage?.academic?.length ? (
              <div className="flex flex-wrap gap-2">
                {usage.academic.map((item) => (
                  <span
                    key={item.id}
                    className="px-2 py-1 rounded border border-gray-700 text-xs text-gray-300"
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">None</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onShowProjects(skill.id)}
          className="w-full rounded-lg bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-gray-200"
        >
          Show projects
        </button>
      </div>
    </aside>
  );
}