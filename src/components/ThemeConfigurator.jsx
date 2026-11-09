import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeConfigurator({ isDarkMode, toggleTheme }) {
  return (
    <div className="fixed bottom-20 right-6 z-40">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className={`p-3.5 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 active:scale-90 cursor-pointer flex items-center justify-center group ${
          isDarkMode
            ? 'bg-slate-900/90 border-cyan-500/40 text-amber-400 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
            : 'bg-white/90 border-slate-200 text-sky-600 hover:border-sky-500 hover:bg-slate-50 shadow-slate-200/80 hover:shadow-[0_0_20px_rgba(14,165,233,0.25)]'
        }`}
        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDarkMode ? (
          <Sun size={20} className="transition-transform duration-500 group-hover:rotate-90 text-amber-400" />
        ) : (
          <Moon size={20} className="transition-transform duration-500 group-hover:-rotate-12 text-sky-600" />
        )}
      </button>
    </div>
  );
}