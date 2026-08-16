import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageSquare } from 'lucide-react';

const NavbarLight = ({ openResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Research", href: "#research", id: "research" },
  ];

  // নাইট মোডের মতো সেইম সফট ভেসে ওঠার ট্রানজিশন হ্যান্ডলার
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

  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <a 
          href="#about" 
          onClick={(e) => scrollToSection(e, 'about')}
          className="text-xl font-bold font-mono tracking-tight text-slate-900 group flex items-center cursor-pointer"
        >
          <span>sohan</span>
          <span className="text-sky-600 group-hover:text-cyan-500 transition-colors">.dev</span>
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
                      ? 'text-sky-600 font-bold drop-shadow-sm'
                      : 'text-slate-600 hover:text-sky-600'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full animate-in fade-in duration-300"></span>
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
            {/* Desktop Guestbook Button */}
            <a
              href="#guestbook"
              onClick={(e) => scrollToSection(e, 'guestbook')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-semibold font-mono transition duration-200 active:scale-95 cursor-pointer ${
                activeSection === 'guestbook'
                  ? 'border-sky-500 bg-sky-50 text-sky-700 shadow-sm font-bold'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:text-sky-600 hover:border-slate-300'
              }`}
            >
              <MessageSquare size={13} className="text-sky-600" />
              Guestbook
            </a>

            {/* Desktop Contact Button */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold transition duration-200 active:scale-95 cursor-pointer ${
                activeSection === 'contact'
                  ? 'border-sky-500 bg-sky-50 text-sky-700 shadow-sm font-bold'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-sky-400'
              }`}
            >
              Contact
            </a>

            {/* Desktop Smart Resume Button */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-xl blur-md opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse"></div>

              <button
                type="button"
                onClick={openResume}
                className="relative flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white border border-sky-400 text-sky-700 font-mono text-xs font-bold shadow-md hover:bg-sky-50 transition-all duration-300 active:scale-95 cursor-pointer overflow-hidden"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>

                <span className="tracking-wide">Resume</span>
                <ArrowUpRight size={13} className="text-sky-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Header Actions */}
        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            onClick={openResume}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-sky-300 text-sky-700 font-mono text-xs font-bold shadow-sm active:scale-90 transition-transform cursor-pointer"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span className="tracking-wide">Resume</span>
            <ArrowUpRight size={12} className="text-sky-600" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 active:scale-95 transition-transform cursor-pointer"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`block text-sm font-medium py-1 transition-colors cursor-pointer ${
                  isActive ? 'text-sky-600 font-bold pl-2 border-l-2 border-sky-600' : 'text-slate-600 hover:text-sky-600'
                }`}
              >
                {link.name}
              </a>
            );
          })}

          {/* Mobile Menu Guestbook & Contact */}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#guestbook"
              onClick={(e) => scrollToSection(e, 'guestbook')}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold font-mono border transition cursor-pointer ${
                activeSection === 'guestbook'
                  ? 'bg-sky-100 border-sky-400 text-sky-800 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <MessageSquare size={13} className="text-sky-600" />
              Guestbook
            </a>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className={`block text-center px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeSection === 'contact'
                  ? 'bg-sky-600 text-white font-bold'
                  : 'bg-sky-50 border border-sky-200 text-sky-700'
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

export default NavbarLight;