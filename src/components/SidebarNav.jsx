import { sections } from "../config/sections";
import { HERO_BG_IMAGE } from "../config/heroTheme";
import { heroBackgroundStyle } from "../config/heroTheme";

export default function SidebarNav({ activeSection, visible, onJump }) {
  return (
    <aside
      className={`relative hidden lg:flex flex-col items-center text-center gap-5 border-r border-gray-800 bg-gray-950 bg-cover bg-center bg-no-repeat p-6 transition-all duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={heroBackgroundStyle}
    >
      {/* DARK OVERLAY for readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10 sticky top-0 flex flex-col items-center gap-5 pt-6">
        <img
          src="res/profile_torso.png"
          alt="Eduardo Santos"
          className="w-20 h-20 rounded-2xl object-cover border border-gray-800"
        />

        <div>
          <h2 className="text-lg font-semibold">Eduardo Santos</h2>
          <p className="text-sm text-gray-400">
            Unity & Backend Developer
          </p>
        </div>

        <nav className="w-full flex flex-col gap-2 mt-4">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => onJump(s.id)}
              className={`text-left px-3 py-2 rounded-lg border text-sm ${
                activeSection === s.id
                  ? "bg-white text-black border-white"
                  : "bg-gray-900 text-gray-300 border-gray-700"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}