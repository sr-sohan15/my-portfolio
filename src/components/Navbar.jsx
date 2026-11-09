import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageSquare, Sun, Moon } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleTheme, openResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Research", href: "#research", id: "research" },
  ];

  // স্মুথ টেলিপোর্ট ও সফট ভেসে ওঠার ট্রানজিশন হ্যান্ডলার
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    setIsOpen(false);

    const navHeight = 70;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = Math.max(0, elementPosition - navHeight);

    window.scrollTo({
      top: offsetPosition,
      behavior: 'auto'
    });

    element.style.transition = 'none';
    element.style.opacity = '0';
    element.style.transform = 'translateY(16px)';

    void element.offsetHeight;

    element.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';

    setTimeout(() => {
      element.style.transition = '';
      element.style.transform = '';
      element.style.opacity = '';
    }, 450);
  };

  // ScrollSpy এবং স্ক্রল প্রগ্রেস ট্র্যাকিং
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}`;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll);

    const sectionIds = ['about', 'skills', 'projects', 'research', 'guestbook', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Top Scroll Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-400 dark:from-cyan-500 dark:via-sky-400 dark:to-cyan-300 transition-all duration-150 z-50 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <a 
          href="#about" 
          onClick={(e) => scrollToSection(e, 'about')}
          className="text-xl font-bold font-mono tracking-tight text-slate-900 dark:text-slate-100 group flex items-center cursor-pointer"
        >
          <span>sohan</span>
          <span className="text-sky-600 dark:text-cyan-400 group-hover:text-sky-500 dark:group-hover:text-sky-300 transition-colors">.dev</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={`text-sm font-medium transition-all duration-200 relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-sky-600 dark:text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                      : 'text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-cyan-400'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-sky-500 to-cyan-400 dark:from-cyan-500 dark:to-sky-400 rounded-full animate-in fade-in duration-300"></span>
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
            {/* Guestbook Button */}
            <a
              href="#guestbook"
              onClick={(e) => scrollToSection(e, 'guestbook')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-semibold font-mono transition duration-200 active:scale-95 cursor-pointer ${
                activeSection === 'guestbook'
                  ? 'border-sky-400 dark:border-cyan-500 bg-sky-50 dark:bg-cyan-950/60 text-sky-700 dark:text-cyan-300 shadow-2xs'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-400 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
              }`}
            >
              <MessageSquare size={13} className="text-sky-600 dark:text-cyan-400" />
              Guestbook
            </a>

            {/* Contact Button */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold transition duration-200 active:scale-95 cursor-pointer ${
                activeSection === 'contact'
                  ? 'bg-sky-600 border-sky-600 text-white dark:bg-cyan-500 dark:border-cyan-500 dark:text-slate-950 shadow-md'
                  : 'border-sky-500/50 dark:border-cyan-500/40 text-sky-600 dark:text-cyan-400 hover:bg-sky-50 dark:hover:bg-cyan-950/40 hover:border-sky-500 dark:hover:border-cyan-500'
              }`}
            >
              Contact
            </a>

            {/* Resume Button */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-xl blur-md opacity-40 group-hover:opacity-100 group-hover:blur-lg transition duration-500 animate-pulse"></div>

              <button
                type="button"
                onClick={openResume}
                className="relative flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-950 border border-cyan-400/60 text-cyan-300 font-mono text-xs font-bold shadow-inner group-hover:text-white group-hover:border-cyan-300 transition-all duration-300 active:scale-95 cursor-pointer overflow-hidden"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>

                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>

                <span className="tracking-wide">Resume</span>
                <ArrowUpRight size={13} className="text-cyan-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Header Actions */}
        <div className="flex md:hidden items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-lg blur-xs opacity-75 animate-pulse"></div>
            
            <button
              type="button"
              onClick={openResume}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-950/90 border border-cyan-400/60 text-cyan-300 font-mono text-xs font-bold shadow-md active:scale-90 transition-transform cursor-pointer overflow-hidden backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="tracking-wide">Resume</span>
              <ArrowUpRight size={12} className="text-cyan-400" />
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 active:scale-95 transition-transform cursor-pointer shadow-2xs"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 px-6 py-4 space-y-3 backdrop-blur-xl transition-colors duration-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`block text-sm font-medium py-1 transition-colors cursor-pointer ${
                  isActive 
                    ? 'text-sky-600 dark:text-cyan-400 font-bold pl-2 border-l-2 border-sky-500 dark:border-cyan-400' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-400'
                }`}
              >
                {link.name}
              </a>
            );
          })}

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#guestbook"
              onClick={(e) => scrollToSection(e, 'guestbook')}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold font-mono border transition cursor-pointer ${
                activeSection === 'guestbook'
                  ? 'bg-sky-50 dark:bg-cyan-950/80 border-sky-400 dark:border-cyan-400 text-sky-700 dark:text-cyan-300 font-bold'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <MessageSquare size={13} className="text-sky-600 dark:text-cyan-400" />
              Guestbook
            </a>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className={`block text-center px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeSection === 'contact'
                  ? 'bg-sky-600 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold'
                  : 'bg-sky-50 dark:bg-cyan-950/60 border border-sky-300 dark:border-cyan-500/30 text-sky-700 dark:text-cyan-400'
              }`}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;