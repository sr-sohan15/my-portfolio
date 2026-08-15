import React, { useState } from 'react';
import Navbar from './components/Navbar';
import NavbarLight from './components/NavbarLight';
import Hero from './components/Hero';
import HeroLight from './components/HeroLight';
import Skills from './components/Skills';
import SkillsLight from './components/SkillsLight';
import Projects from './components/Projects';
import ProjectsLight from './components/ProjectsLight';
import Research from './components/Research';
import ResearchLight from './components/ResearchLight';
import Contact from './components/Contact';
import ContactLight from './components/ContactLight';
import ThemeConfigurator from './components/ThemeConfigurator';
import ResumeModal from './components/ResumeModal';
import SmartSpaceBackground from './components/SmartSpaceBackground';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleOpenResume = () => {
    setIsResumeOpen(true);
  };

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden transition-colors duration-300 ${
        isDarkMode
          ? 'bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200'
          : 'bg-[#f8fafc] text-slate-900 selection:bg-sky-500/20 selection:text-sky-800'
      }`}
    >
      {/* Smart Space & Nebula Glow Background */}
      <SmartSpaceBackground isDarkMode={isDarkMode} />

      {/* Main Foreground Content Layer */}
      <div className="relative z-10">
        {isDarkMode ? (
          <>
            <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} openResume={handleOpenResume} />
            <main className="space-y-6 md:space-y-10 pb-16">
              <Hero />
              <Skills />
              <Projects />
              <Research />
              <Contact />
            </main>
          </>
        ) : (
          <>
            <NavbarLight isDarkMode={isDarkMode} toggleTheme={toggleTheme} openResume={handleOpenResume} />
            <main className="space-y-6 md:space-y-10 pb-16">
              <HeroLight />
              <SkillsLight />
              <ProjectsLight />
              <ResearchLight />
              <ContactLight />
            </main>
          </>
        )}
      </div>

      {/* Floating Theme Switcher */}
      <ThemeConfigurator isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* Resume Viewer Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}

export default App;