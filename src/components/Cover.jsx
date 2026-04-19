import { sections } from "../config/sections";
import { heroBackgroundStyle } from "../config/heroTheme";

export default function Cover({ activeSection, onJump, sidebarVisible }) {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* BACKGROUND IMAGE (fixed) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat "
        style={heroBackgroundStyle}
      />

      {/* DARK OVERLAY for readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-5xl text-center">
        <div className="flex justify-center mb-6">
          <img
            src="res/profile_torso.png"
            alt="Eduardo Santos"
            className="w-40 h-40 sm:w-52 sm:h-52 rounded-3xl object-cover border border-gray-800 shadow-2xl"
          />
        </div>

        <p className="text-sm uppercase tracking-[0.25em] text-gray-400 mb-3">
          Portfolium Vitae
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
          Eduardo Santos
        </h1>

        <p className="mt-4 text-lg text-gray-300">
          Unity & Backend Developer @ CCG/ZGDV Institute.
          <br />
          MSc in Telecommunications and Informatics Engineering @ University of Minho.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => onJump(s.id)}
              className={`px-4 py-2 rounded-lg border text-sm ${
                activeSection === s.id
                  ? "bg-white text-black border-white"
                  : "bg-gray-900 text-gray-300 border-gray-700"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* SEPARATOR */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gray-800 ${sidebarVisible ? 'lg:left-[260px]' : ''}`} />
    </section>
  );
}