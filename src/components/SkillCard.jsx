import Icon from "./Icon";

export default function SkillCard({ skill, highlighted = false, connected = false, onClick }) {
  const shapeClass = connected ? 'rounded-t-lg rounded-b-none border-b-0 relative z-10' : 'rounded-lg';
  const stateClass = highlighted ? 'section-control-active' : 'section-control-idle';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group flex items-center gap-3 px-3 py-2
        ${shapeClass}
        border transition-colors duration-200 text-left w-full h-full
        ${stateClass}
      `}
      title={skill.title}
    >
      <div
        className={`flex-shrink-0 transition ${
          highlighted ? "" : "text-gray-300 group-hover:text-white"
        }`}
        style={highlighted ? { color: "var(--section-accent-text)" } : undefined}
      >
        <Icon icon={skill.icon} />
      </div>

      <span className="text-sm font-medium">{skill.title}</span>
    </button>
  );
}