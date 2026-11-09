import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = ({ isDarkMode = true }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-40 p-2.5 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 active:scale-90 cursor-pointer ${
        isDarkMode
          ? 'bg-slate-900/90 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]'
          : 'bg-white/90 border border-slate-200 text-slate-700 hover:bg-sky-600 hover:text-white hover:border-sky-600 shadow-slate-200/80 hover:shadow-sky-600/20'
      }`}
      title="Back to Top"
    >
      <ArrowUp size={18} />
    </button>
  );
};

export default ScrollToTop;