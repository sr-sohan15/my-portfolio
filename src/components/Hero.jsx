import React, { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [cardTilt, setCardTilt] = useState({ rx: 0, ry: 0 });
  const cardRef = useRef(null);

  const roles = [
    "MERN Enthusiast", 
    "React Specialist", 
    "Frontend Developer", 
    "UI/UX Craftsperson"
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === targetText) {
        setTimeout(() => setIsDeleting(true), 1600);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setCurrentText(
          targetText.substring(0, currentText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex]);

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setCardTilt({ rx: rotateX, ry: rotateY });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ rx: 0, ry: 0 });
  };

  return (
    <section className="relative w-full flex items-center justify-center px-6 md:px-12 lg:px-16 pt-28 pb-16 overflow-hidden">
      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* 👈 নাম ও পরিচয় সেকশন */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 order-1">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-[11px] font-mono tracking-wide shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Available for Intern / Junior Roles
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              <span className="text-slate-100 font-black block">
                Md. Saidur Rahman
              </span>
              <span className="text-sky-400 font-black">
                Sohan
              </span>
            </h1>
            
            <h2 className="text-lg sm:text-xl font-bold text-sky-300 font-mono flex items-center justify-center lg:justify-start gap-0.5 min-h-[32px] pt-1">
              <span>{currentText}</span>
              <span className="w-[2px] h-5 bg-sky-400 animate-pulse inline-block ml-1"></span>
            </h2>
          </div>

          <p className="hidden lg:block text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg">
            CSE Graduate specializing in building high-performance, responsive, and visually appealing web interfaces using <strong className="text-slate-200">React.js</strong> and <strong className="text-slate-200">Tailwind CSS</strong>. Skilled in component architecture, state management, and Linux environments.
          </p>

          <div className="hidden lg:flex flex-wrap items-center gap-3 pt-2">
            <a href="#contact" className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium text-xs sm:text-sm transition shadow-lg shadow-sky-500/20">
              Contact Me
            </a>
            <a href="https://github.com/sohan-15" target="_blank" rel="noreferrer" className="px-4 py-2.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 hover:border-slate-700 font-medium text-xs sm:text-sm transition">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/sr-sohan-9a3641250/" target="_blank" rel="noreferrer" className="px-4 py-2.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 hover:border-slate-700 font-medium text-xs sm:text-sm transition">
              LinkedIn
            </a>
          </div>

        </div>

        {/* 👉 ছবির সেকশন (মাউস/টাচে ব্ল্যাক-অ্যান্ড-হোয়াইট থেকে ফুল কালারফুল হবে) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end order-2">
          <div 
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`,
              transition: cardTilt.rx === 0 ? 'transform 0.5s ease-out' : 'none'
            }}
            className="relative group w-[200px] sm:w-[240px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-slate-800 hover:border-sky-500/60 bg-slate-900 shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <img 
              src={`${import.meta.env.BASE_URL}sohan.jpeg`} 
              alt="Md. Saidur Rahman Sohan" 
              className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
            />
          </div>
        </div>

        {/* 📱 মোবাইলের জন্য ডেসক্রিপশন ও বাটন (Order 3) */}
        <div className="lg:hidden flex flex-col items-center text-center space-y-4 order-3">
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed px-2">
            CSE Graduate specializing in building high-performance, responsive, and visually appealing web interfaces using <strong className="text-slate-200">React.js</strong> and <strong className="text-slate-200">Tailwind CSS</strong>. Skilled in component architecture, state management, and Linux environments.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <a href="#contact" className="px-4 py-2 rounded-lg bg-sky-500 text-white font-medium text-xs shadow-md">
              Contact Me
            </a>
            <a href="https://github.com/sohan-15" target="_blank" rel="noreferrer" className="px-3.5 py-2 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 font-medium text-xs">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/sr-sohan-9a3641250/" target="_blank" rel="noreferrer" className="px-3.5 py-2 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 font-medium text-xs">
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}