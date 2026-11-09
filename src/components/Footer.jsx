import React from 'react';

const Footer = ({ isDarkMode }) => {
  return (
    <footer
      className="w-full py-6 text-center space-y-1.5 border-t bg-white/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 backdrop-blur-md transition-colors duration-300"
    >
      <p className="text-xs sm:text-sm font-mono">
        © {new Date().getFullYear()}{' '}
        <span className="font-semibold text-cyan-600 dark:text-cyan-400">
          Md. Saidur Rahman Sohan
        </span>
        . All rights reserved.
      </p>
      <p className="text-[11px] text-slate-500 dark:text-slate-500 font-mono tracking-wide">
        Designed & Built with React.js & Tailwind CSS
      </p>
    </footer>
  );
};

export default Footer;