import React from 'react';

const Footer = ({ isDarkMode = true }) => {
  return (
    <footer
      className={`w-full py-6 text-center space-y-1 border-t transition-colors duration-300 ${
        isDarkMode
          ? 'bg-slate-950/80 border-slate-800/80 text-slate-400'
          : 'bg-white/80 border-slate-200 text-slate-600'
      }`}
    >
      <p className="text-xs sm:text-sm font-mono">
        © {new Date().getFullYear()}{' '}
        <span
          className={`font-semibold ${
            isDarkMode ? 'text-cyan-400' : 'text-sky-600'
          }`}
        >
          Md. Saidur Rahman Sohan
        </span>
        . All rights reserved.
      </p>
      <p className="text-[11px] text-slate-500 font-mono">
        Designed & Built with React.js & Tailwind CSS
      </p>
    </footer>
  );
};

export default Footer;