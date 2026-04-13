import Icon from "./Icon";

export default function SkillCard({ skill }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-600 transition">
      
      {/* ICON */}
      <div className="text-gray-200">
        <Icon icon={skill.icon} />
      </div>

      {/* TITLE */}
      <span className="text-sm font-medium text-gray-200">
        {skill.title}
      </span>
    </div>
  );
}