import Icon from "./Icon";

export default function SkillCard({ skill, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group flex items-center gap-3 px-3 py-2 rounded-lg border
        transition-all duration-200 text-left w-full h-full
        ${
          active
            ? "bg-white text-black border-white"
            : "bg-gray-900 border-gray-800 hover:border-gray-600 hover:bg-gray-800"
        }
      `}
      title={skill.title}
    >
      <div
        className={`flex-shrink-0 transition ${
          active ? "text-black" : "text-gray-300 group-hover:text-white"
        }`}
      >
        <Icon icon={skill.icon} />
      </div>

      <span className="text-sm font-medium">{skill.title}</span>
    </button>
  );
}