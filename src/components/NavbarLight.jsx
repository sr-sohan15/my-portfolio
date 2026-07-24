import React, { useState } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Research', href: '#research' },
];

const NavbarLight = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 px-6 py-4 shadow-sm transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* 🌟 লোগো (ডে-মোড) */}
        <a href="#about" className="group focus:outline-none">
          <span className="text-xl font-black font-mono tracking-tight text-sky-600">
            sohan<span className="text-slate-900">.dev</span>
          </span>
        </a>

        {/* 🔗 নেভিগেশন লিঙ্কসমূহ (স্পষ্ট ও ডার্ক টেক্সট) */}
        <div className="hidden md:flex items-center gap-2 text-sm font-bold font-mono text-slate-700">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-2 hover:text-sky-600 transition-colors duration-200 z-10"
            >
              {hoveredIndex === index && (
                <motion.span
                  layoutId="hoverBackgroundLight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                  className="absolute inset-0 bg-sky-100 border border-sky-300/60 rounded-lg -z-10"
                />
              )}
              {link.name}
            </a>
          ))}

          {/* 🔘 কন্টাক্ট বাটন */}
          <a 
            href="#contact" 
            className="ml-3 px-4 py-1.5 rounded-lg bg-sky-600 text-white hover:bg-sky-500 transition-all duration-300 text-xs font-bold shadow-sm"
          >
            Contact
          </a>
        </div>

      </div>
    </nav>
  );
};

export default NavbarLight;