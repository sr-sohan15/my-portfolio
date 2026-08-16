import React, { useState, useEffect } from 'react';
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
import Guestbook from './components/Guestbook';
import Contact from './components/Contact';
import ContactLight from './components/ContactLight';
import Footer from './components/Footer';
import ThemeConfigurator from './components/ThemeConfigurator';
import ResumeModal from './components/ResumeModal';
import SmartSpaceBackground from './components/SmartSpaceBackground';
import ScrollToTop from './components/ScrollToTop';

function App() {
  // সুরক্ষিত থিম লোডার
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme === null) return true;
      if (savedTheme === 'light') return false;
      if (savedTheme === 'dark') return true;
      return JSON.parse(savedTheme);
    } catch {
      return true;
    }
  });

  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const nextTheme = !prev;
      localStorage.setItem('portfolio-theme', JSON.stringify(nextTheme));
      return nextTheme;
    });
  };

  const handleOpenResume = () => {
    setIsResumeOpen(true);
  };

  useEffect(() => {
    document.title = "Md. Saidur Rahman Sohan | Portfolio";
  }, []);

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
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        {isDarkMode ? (
          <>
            <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} openResume={handleOpenResume} />
            <main className="space-y-6 md:space-y-10 pb-6 flex-grow">
              <Hero />
              <Skills />
              <Projects />
              <Research />
              <Guestbook isDarkMode={isDarkMode} />
              <Contact />
            </main>
          </>
        ) : (
          <>
            <NavbarLight isDarkMode={isDarkMode} toggleTheme={toggleTheme} openResume={handleOpenResume} />
            <main className="space-y-6 md:space-y-10 pb-6 flex-grow">
              <HeroLight />
              <SkillsLight />
              <ProjectsLight />
              <ResearchLight />
              <Guestbook isDarkMode={isDarkMode} />
              <ContactLight />
            </main>
          </>
        )}

        {/* Global Unified Footer */}
        <Footer isDarkMode={isDarkMode} />
      </div>

      {/* Floating Back to Top Button */}
      <ScrollToTop isDarkMode={isDarkMode} />

      {/* Floating Theme Switcher */}
      <ThemeConfigurator isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* Resume Viewer Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}

export default App;