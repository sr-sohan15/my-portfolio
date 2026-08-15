import React, { useEffect, useState } from 'react';

const CyberGridBackground = ({ isDarkMode }) => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base Grid Pattern */}
      <div 
        className={`absolute inset-0 ${
          isDarkMode
            ? 'bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,#e2e8f060_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f060_1px,transparent_1px)]'
        } bg-[size:3.5rem_3.5rem]`}
      />

      {/* Interactive Mouse Spotlight Flare */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: isDarkMode
            ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.12), transparent 80%)`
            : `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(2, 132, 199, 0.1), transparent 80%)`,
        }}
      />

      {/* Static Ambient Aurora Orbs */}
      <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl animate-pulse ${
        isDarkMode ? 'bg-cyan-500/10' : 'bg-sky-200/40'
      }`} />
      <div className={`absolute top-1/2 -right-40 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
        isDarkMode ? 'bg-sky-500/10' : 'bg-blue-200/40'
      }`} />
    </div>
  );
};

export default CyberGridBackground;