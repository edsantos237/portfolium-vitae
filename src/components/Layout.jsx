import { useEffect, useState } from "react";
import Cover from "./Cover";
import SidebarNav from "./SidebarNav";
import MobileTopBar from "./MobileTopBar";
import About from "./About";

import Projects from "./Projects";
import Publications from "./Publications";
import Activities from "./Activities";
import Skills from "./Skills";
import Experience from "./Experience";
import Education from "./Education";
import Contact from "./Contact";

import { sections } from "../config/sections";
import { heroBackgroundStyle } from "../config/heroTheme";

export default function Layout() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const [focusedSkill, setFocusedSkill] = useState(null);

  useEffect(() => {
    const sentinel = document.getElementById("cover-content-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsPastHero(!entry.isIntersecting),
      { threshold: 1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrolling) return;

      // Choose the section that currently has the largest visible height
      let bestId = sections[0].id;
      let bestVisible = -1;

      const vh = window.innerHeight || document.documentElement.clientHeight;

      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        // compute visible vertical overlap between element and viewport
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, vh);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > bestVisible) {
          bestVisible = visibleHeight;
          bestId = s.id;
        }
      }

      // Always update active section (React will bail out if same)
      setActiveSection(bestId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isManualScrolling]);

  const jumpTo = (id) => {
    setIsManualScrolling(true);
    setActiveSection(id);

    const el = document.getElementById(id);
    if (!el) return;

    // Use explicit scrollTo with computed absolute offset for better
    // reliability across mobile browsers (address bar, transforms, etc.)
    const rect = el.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    // Subtract any visible sticky header (mobile top bar) height so the
    // target section isn't hidden under it after layout shifts.
    const mobileBar = document.getElementById("mobile-top-bar");
    const headerOffset = mobileBar ? mobileBar.offsetHeight : 0;
    const target = Math.max(0, absoluteTop - headerOffset);
    window.scrollTo({ top: target, behavior: "smooth" });

    let t;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        setIsManualScrolling(false);
        window.removeEventListener("scroll", onScroll);
      }, 600);
    };

    window.addEventListener("scroll", onScroll);
  };

  const showProjectsForSkill = (skillId) => {
    setFocusedSkill(skillId);
    jumpTo("projects");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      
      {/* ================= HERO (with background image) ================= */}
      <div className="relative">
        {/* Background image */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={heroBackgroundStyle}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 -z-10 bg-black/60" />


        {/* Cover */}
        <Cover
          activeSection={activeSection}
          onJump={jumpTo}
        />
      </div>

      {/* Mobile Top Bar (anchored below cover, fades in) */}
      <MobileTopBar
        activeSection={activeSection}
        onJump={jumpTo}
        visible={isPastHero}
      />

      {/* ================= MAIN LAYOUT ================= */}
      <div className="lg:grid lg:grid-cols-[260px,1fr]">
        
        {/* Sidebar */}
        <SidebarNav
          activeSection={activeSection}
          visible={isPastHero}
          onJump={jumpTo}
        />

        {/* MAIN CONTENT */}
        <main className="w-full pb-6">
            <section id="about-me" className={`px-6 lg:px-10 py-16 border-b border-gray-800 transition-colors duration-300 ${
              activeSection === "about-me" ? "bg-gray-900/25" : ""
            }`}>
              <div className="max-w-6xl mx-auto">
                <About isActive={activeSection === "about-me"} />
              </div>
            </section>

            <section id="skills" className={`px-6 lg:px-10 py-16 border-b border-gray-800 transition-colors duration-300 ${
              activeSection === "skills" ? "bg-gray-900/25" : ""
            }`}>
              <div className="max-w-6xl mx-auto">
                <Skills onShowProjects={showProjectsForSkill} isActive={activeSection === "skills"} />
              </div>
            </section>

            <section id="experience" className={`px-6 lg:px-10 py-16 border-b border-gray-800 transition-colors duration-300 ${
              activeSection === "experience" ? "bg-gray-900/25" : ""
            }`}>
              <div className="max-w-6xl mx-auto">
                <Experience isActive={activeSection === "experience"} />
              </div>
            </section>

            <section id="education" className={`px-6 lg:px-10 py-16 border-b border-gray-800 transition-colors duration-300 ${
              activeSection === "education" ? "bg-gray-900/25" : ""
            }`}>
              <div className="max-w-6xl mx-auto">
                <Education isActive={activeSection === "education"} />
              </div>
            </section>

            <section id="projects" className={`px-6 lg:px-10 py-16 border-b border-gray-800 transition-colors duration-300 ${
              activeSection === "projects" ? "bg-gray-900/25" : ""
            }`}>
              <div className="max-w-6xl mx-auto">
                <Projects focusedSkill={focusedSkill} setFocusedSkill={setFocusedSkill} isActive={activeSection === "projects"} />
              </div>
            </section>

            <section id="publications" className={`px-6 lg:px-10 py-16 border-b border-gray-800 transition-colors duration-300 ${
              activeSection === "publications" ? "bg-gray-900/25" : ""
            }`}>
              <div className="max-w-6xl mx-auto">
                <Publications isActive={activeSection === "publications"} />
              </div>
            </section>

            <section id="activities" className={`px-6 lg:px-10 py-16 border-b border-gray-800 transition-colors duration-300 ${
              activeSection === "activities" ? "bg-gray-900/25" : ""
            }`}>
              <div className="max-w-6xl mx-auto">
                <Activities isActive={activeSection === "activities"} />
              </div>
            </section>

            <section id="contact" className={`px-6 lg:px-10 py-20 transition-colors duration-300 ${
              activeSection === "contact" ? "bg-gray-900/25" : ""
            }`}>
              <div className="max-w-6xl mx-auto">
                <Contact />
              </div>
            </section>
        </main>
      </div>


    </div>
  );
}