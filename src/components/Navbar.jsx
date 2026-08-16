import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const Navbar = ({ openResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Research", href: "#research", id: "research" },
  ];

  // ScrollSpy: ব্যবহারকারী কোন সেকশনে আছেন তা স্বয়ংক্রিয়ভাবে ট্র্যাক করা
  useEffect(() => {
    const sectionIds = ['about', 'skills', 'projects', 'research', 'contact'];
    
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

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <a href="#about" className="text-xl font-bold font-mono tracking-tight text-slate-100 group flex items-center">
          <span>sohan</span>
          <span className="text-cyan-400 group-hover:text-sky-300 transition-colors">.dev</span>
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
                  className={`text-sm font-medium transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                      : 'text-slate-400 hover:text-cyan-400'
                  }`}
                >
                  {link.name}
                  {/* Active Underline Indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-sky-400 rounded-full animate-in fade-in duration-300"></span>
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4 pl-2 border-l border-slate-800">
            <a
              href="#contact"
              className={`px-4 py-1.5 rounded-lg border text-xs font-semibold transition duration-200 ${
                activeSection === 'contact'
                  ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/40 hover:border-cyan-400'
              }`}
            >
              Contact
            </a>

            {/* Desktop Smart Cyber Pulse Resume Button */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-xl blur-md opacity-50 group-hover:opacity-100 group-hover:blur-lg transition duration-500 animate-pulse"></div>

              <button
                type="button"
                onClick={openResume}
                className="relative flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-950 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold shadow-inner group-hover:text-white group-hover:border-cyan-300 transition-all duration-300 active:scale-95 cursor-pointer overflow-hidden"
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
          
          {/* Mobile Ultra-Dynamic Glowing Resume Pill */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-lg blur-xs opacity-75 animate-pulse"></div>
            
            <button
              type="button"
              onClick={openResume}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/90 border border-cyan-400/60 text-cyan-300 font-mono text-xs font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)] active:scale-90 transition-transform cursor-pointer overflow-hidden backdrop-blur-md"
            >
              <span className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></span>

              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              
              <span className="tracking-wide">Resume</span>
              <ArrowUpRight size={12} className="text-cyan-400" />
            </button>
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 active:scale-95 transition-transform cursor-pointer"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-6 py-4 space-y-3 backdrop-blur-xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block text-sm font-medium py-1 transition-colors ${
                  isActive ? 'text-cyan-400 font-bold pl-2 border-l-2 border-cyan-400' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className={`block text-center mt-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeSection === 'contact'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-cyan-950/60 border border-cyan-500/30 text-cyan-400'
            }`}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;