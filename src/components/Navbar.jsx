import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full bg-[#0a0f1d]/85 backdrop-blur-md border-b border-slate-800/80 z-50 px-6 py-4 shadow-lg shadow-black/20"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Only Text Logo */}
        <a 
          href="#about" 
          className="group focus:outline-none"
        >
          <span className="text-xl font-bold font-mono tracking-tight bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent group-hover:from-sky-300 group-hover:to-indigo-300 transition-all duration-300">
            sohan<span className="text-sky-400 font-semibold">.dev</span>
          </span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium font-mono text-slate-400">
          <a href="#about" className="hover:text-sky-400 transition-colors duration-200">About</a>
          <a href="#skills" className="hover:text-sky-400 transition-colors duration-200">Skills</a>
          <a href="#projects" className="hover:text-sky-400 transition-colors duration-200">Projects</a>
          <a href="#research" className="hover:text-sky-400 transition-colors duration-200">Research</a>
          <a 
            href="#contact" 
            className="px-4 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500 hover:text-white transition-all duration-300 text-xs font-semibold"
          >
            Contact
          </a>
        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;