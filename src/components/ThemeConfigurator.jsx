import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeConfigurator({ isDarkMode, setIsDarkMode }) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`p-3.5 rounded-full border-2 shadow-lg backdrop-blur-lg transition-all duration-300 active:scale-90 cursor-pointer flex items-center justify-center group ${
          isDarkMode 
            ? 'bg-slate-900/90 border-sky-500/50 text-amber-400 hover:border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]' 
            : 'bg-white/90 border-sky-400/80 text-sky-600 hover:border-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.3)]'
        }`}
        title={isDarkMode ? "Switch to Day Mode" : "Switch to Night Mode"}
      >
        {isDarkMode ? (
          <Sun size={22} className="transition-transform duration-300 group-hover:rotate-45 text-amber-400" />
        ) : (
          <Moon size={22} className="transition-transform duration-300 group-hover:-rotate-12 text-sky-600" />
        )}
      </button>
    </div>
  );
}