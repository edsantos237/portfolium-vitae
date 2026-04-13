import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur border-b border-gray-800">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-lg font-bold">Portfolium Vitae</h1>

          <div className="flex gap-4 text-sm text-gray-300">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#skills" className="hover:text-white">Skills</a>
            <a href="#experience" className="hover:text-white">Experience</a>
            <a href="#education" className="hover:text-white">Education</a>
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </nav>
      </header>

      {/* PAGE CONTENT */}
      <main className="max-w-6xl mx-auto px-6">

        {/* HERO / ABOUT */}
        <section id="about" className="py-20">
          <h2 className="text-4xl font-bold mb-4">
            Hi, I'm Eduardo Santos
          </h2>

          <p className="text-gray-300 max-w-2xl">
            Unity & Backend Developer @ CCG/ZGDV Institute.  
            MSc in Telecommunications and Informatics Engineering @ University of Minho.
          </p>
        </section>

        {/* SKILLS (placeholder for now) */}
        <section id="skills" className="py-16">
          <Skills />
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-16">
          <Experience />
        </section>

        {/* EDUCATION */}
        <section id="education" className="py-16">
          <Education />
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-16">
          <Projects />
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>

          <div className="text-gray-300 space-y-2">
            <p>Email: edsantos237@outlook.com</p>
            <p>GitHub: github.com/edsantos237</p>
            <p>LinkedIn: linkedin.com/in/edsantos237</p>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Eduardo Santos
      </footer>

    </div>
  );
}

export default App;