import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Research from './components/Research';
import Guestbook from './components/Guestbook';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeConfigurator from './components/ThemeConfigurator';
import ResumeModal from './components/ResumeModal';
import SmartSpaceBackground from './components/SmartSpaceBackground';
import ScrollToTop from './components/ScrollToTop';

function App() {
  // সুরক্ষিত থিম লোডার (Light / Dark Mode State)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme === null) return true; // Default Dark Mode
      if (savedTheme === 'light' || savedTheme === 'false') return false;
      if (savedTheme === 'dark' || savedTheme === 'true') return true;
      return JSON.parse(savedTheme);
    } catch {
      return true;
    }
  });

  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const nextTheme = !prev;
      localStorage.setItem('portfolio-theme', nextTheme ? 'dark' : 'light');
      return nextTheme;
    });
  };

  const handleOpenResume = () => {
    setIsResumeOpen(true);
  };

  // পোর্টফোলিও ডকুমেন্ট টাইটেল
  useEffect(() => {
    document.title = "Md. Saidur Rahman Sohan | Portfolio";
  }, []);

  // Tailwind Dark Mode Class & Mobile Meta Theme Color Sync
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // মোবাইল ব্রাউজার স্ট্যাটাস বার হেডার কালার সিঙ্ক
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDarkMode ? '#030712' : '#f8fafc');
    }
  }, [isDarkMode]);

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
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} openResume={handleOpenResume} />

        <main className="space-y-6 md:space-y-10 pb-6 flex-grow">
          <Hero isDarkMode={isDarkMode} />
          <Skills isDarkMode={isDarkMode} />
          <Projects isDarkMode={isDarkMode} />
          <Research isDarkMode={isDarkMode} />
          <Guestbook isDarkMode={isDarkMode} />
          <Contact isDarkMode={isDarkMode} />
        </main>

        {/* Global Unified Footer */}
        <Footer isDarkMode={isDarkMode} />
      </div>

      {/* Floating Back to Top Button */}
      <ScrollToTop isDarkMode={isDarkMode} />

      {/* Floating Theme Switcher */}
      <ThemeConfigurator isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* Resume Viewer Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default App;