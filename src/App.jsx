import { useEffect, useState } from "react";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function CoverSection({ activeSection, onJump }) {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="w-full max-w-5xl text-center">
        <div className="flex justify-center mb-6">
          <img
            src="/res/profile_torso.png"
            alt="Eduardo Santos"
            className="w-40 h-40 sm:w-52 sm:h-52 rounded-3xl object-cover border border-gray-800 shadow-2xl"
          />
        </div>

        <p className="text-sm uppercase tracking-[0.25em] text-gray-500 mb-3">
          Portfolium Vitae
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
          Eduardo Santos
        </h1>

        <p className="mt-4 text-lg text-gray-300">
          Unity & Backend Developer @ CCG/ZGDV Institute.
          <br />
          MSc in Telecommunications and Informatics Engineering @ University
          of Minho.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onJump(section.id)}
              className={`px-4 py-2 rounded-lg border text-sm ${activeSection === section.id
                ? "bg-white text-black border-white"
                : "bg-gray-900 text-gray-300 border-gray-700"
                }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SidebarNav({ activeSection, visible, onJump }) {
  return (
    <aside
      className={`hidden lg:flex flex-col items-center text-center gap-5 border-r border-gray-800 bg-gray-950 p-6 transition-all duration-500 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      {/* Sticky wrapper */}
      <div className="sticky top-0 flex flex-col items-center gap-5 pt-6">
        <img
          src="/res/profile_torso.png"
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
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onJump(section.id)}
              className={`text-left px-3 py-2 rounded-lg border text-sm ${activeSection === section.id
                ? "bg-white text-black border-white"
                : "bg-gray-900 text-gray-300 border-gray-700"
                }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function MobileTopBar({ activeSection, onJump }) {
  return (
    <div className="lg:hidden sticky top-0 z-50 border-b border-gray-800 bg-gray-950">
      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onJump(section.id)}
            className={`px-3 py-1.5 rounded-lg border text-xs whitespace-nowrap ${activeSection === section.id
              ? "bg-white text-black border-white"
              : "bg-gray-900 text-gray-300 border-gray-700"
              }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [isPastHero, setIsPastHero] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("about");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsPastHero(!entry.isIntersecting),
      { threshold: 0.4 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrolling) return;

      let current = sections[0].id;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= 120) {
          current = section.id;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isManualScrolling]);

  const jumpTo = (id) => {
    setIsManualScrolling(true);
    setActiveSection(id);

    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // 🔥 Wait until scroll STOPS (not a fixed timeout)
    let scrollTimeout;

    const handleScrollEnd = () => {
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        setIsManualScrolling(false);
        window.removeEventListener("scroll", handleScrollEnd);
      }, 120); // fires after scrolling settles
    };

    window.addEventListener("scroll", handleScrollEnd);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <MobileTopBar activeSection={activeSection} onJump={jumpTo} />

      {/* COVER */}
      <CoverSection activeSection={activeSection} onJump={jumpTo} />

      {/* DOCKED LAYOUT */}
      <div className="hidden lg:grid lg:grid-cols-[260px,1fr]">
        <SidebarNav
          activeSection={activeSection}
          visible={isPastHero}
          onJump={jumpTo}
        />

        <main className="px-6 lg:px-10 py-6 w-full">
          <div className="max-w-6xl mx-auto">
            <section id="skills" className="py-16">
              <Skills onShowProjects={() => jumpTo("projects")} />
            </section>

            <section id="experience" className="py-16">
              <Experience />
            </section>

            <section id="education" className="py-16">
              <Education />
            </section>

            <section id="projects" className="py-16">
              <Projects />
            </section>

            <section id="contact" className="py-20">
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p className="text-gray-300">Your contact info here</p>
            </section>
          </div>
        </main>
      </div>

      {/* MOBILE CONTENT */}
      <div className="lg:hidden px-6">
        <section id="skills" className="py-16">
          <Skills onShowProjects={() => jumpTo("projects")} />
        </section>

        <section id="experience" className="py-16">
          <Experience />
        </section>

        <section id="education" className="py-16">
          <Education />
        </section>

        <section id="projects" className="py-16">
          <Projects />
        </section>

        <section id="contact" className="py-20">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        </section>
      </div>
    </div>
  );
}