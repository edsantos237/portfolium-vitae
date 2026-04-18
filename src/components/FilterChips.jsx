export default function FilterChips({
  professional = [],
  academic = [],
  personal = false,
  skills = [],
  onRemoveProfessional,
  onRemoveAcademic,
  onRemovePersonal,
  onRemoveSkill,
}) {
  const hasAny =
    professional.length ||
    academic.length ||
    personal ||
    skills.length;

  if (!hasAny) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6 text-xs text-gray-300 items-center">
      
      {/* PROFESSIONAL */}
      {professional.map((c) => (
        <span
          key={c.id}
          className="px-2 py-1 border border-gray-700 rounded flex items-center gap-1"
        >
          {c.title}
          <button
            onClick={() => onRemoveProfessional(c.id)}
            className="text-gray-400 hover:text-red-400"
          >
            ×
          </button>
        </span>
      ))}

      {professional.length > 0 &&
        (academic.length > 0 || personal || skills.length > 0) && (
          <span className="text-gray-600">|</span>
        )}

      {/* ACADEMIC */}
      {academic.map((s) => (
        <span
          key={s.id}
          className="px-2 py-1 border border-gray-700 rounded flex items-center gap-1"
        >
          {s.title}
          <button
            onClick={() => onRemoveAcademic(s.id)}
            className="text-gray-400 hover:text-red-400"
          >
            ×
          </button>
        </span>
      ))}

      {academic.length > 0 &&
        (personal || skills.length > 0) && (
          <span className="text-gray-600">|</span>
        )}

      {/* PERSONAL */}
      {personal && (
        <>
          <span className="px-2 py-1 border border-gray-700 rounded flex items-center gap-1">
            Personal
            <button
              onClick={onRemovePersonal}
              className="text-gray-400 hover:text-red-400"
            >
              ×
            </button>
          </span>

          {skills.length > 0 && (
            <span className="text-gray-600">|</span>
          )}
        </>
      )}

      {/* SKILLS */}
      {skills.map((s) => (
        <span
          key={s.id}
          className="px-2 py-1 border border-gray-700 rounded flex items-center gap-1"
        >
          {s.title}
          <button
            onClick={() => onRemoveSkill(s.id)}
            className="text-gray-400 hover:text-red-400"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
}