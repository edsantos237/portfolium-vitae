export default function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 text-sm rounded-full border
        transition-all duration-200
        ${
          active
            ? "bg-white text-black border-white"
            : "bg-gray-900 text-gray-300 border-gray-700 hover:border-gray-500 hover:text-white"
        }
      `}
    >
      {label}
    </button>
  );
}