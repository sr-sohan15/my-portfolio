import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NavbarLight = ({ openResume }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Research", href: "#research" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <a href="#about" className="text-xl font-bold font-mono tracking-tight text-slate-900 group flex items-center">
          <span>sohan</span>
          <span className="text-sky-600 group-hover:text-blue-500 transition-colors">.dev</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 pl-2 border-l border-slate-200">
            <a
              href="#contact"
              className="px-4 py-1.5 rounded-lg border border-sky-300 text-sky-700 hover:bg-sky-50 text-xs font-semibold transition duration-200"
            >
              Contact
            </a>

            {/* Desktop Light Glow Button */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl blur-md opacity-35 group-hover:opacity-75 transition duration-500"></div>

              <button
                type="button"
                onClick={openResume}
                className="relative flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white border border-sky-400 text-sky-700 font-mono text-xs font-bold shadow-sm group-hover:bg-sky-50 transition-all duration-300 active:scale-95 cursor-pointer overflow-hidden"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-sky-300/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>

                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600"></span>
                </span>

                <span className="tracking-wide">Resume</span>
                <ArrowUpRight size={13} className="text-sky-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Header Actions */}
        <div className="flex md:hidden items-center gap-3">
          
          {/* Mobile Ultra-Dynamic Glowing Resume Pill */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg blur-xs opacity-50 animate-pulse"></div>
            
            <button
              type="button"
              onClick={openResume}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-sky-400/80 text-sky-700 font-mono text-xs font-bold shadow-sm active:scale-90 transition-transform cursor-pointer overflow-hidden backdrop-blur-md"
            >
              <span className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-sky-300/20 to-transparent"></span>

              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600"></span>
              </span>
              
              <span className="tracking-wide">Resume</span>
              <ArrowUpRight size={12} className="text-sky-600" />
            </button>
          </div>

          {/* Menu Button */}
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
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-slate-700 hover:text-sky-600 py-1"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block text-center mt-2 px-4 py-2 rounded-lg bg-sky-50 border border-sky-300 text-sky-700 text-xs font-semibold"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavbarLight;