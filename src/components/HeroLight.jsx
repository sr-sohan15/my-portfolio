import React, { useState, useEffect, useRef } from 'react';

export default function HeroLight() {
  const [cardTilt, setCardTilt] = useState({ rx: 0, ry: 0, glowX: 50, glowY: 50 });
  const [isTapped, setIsTapped] = useState(false);
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

    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setCardTilt({ rx: rotateX, ry: rotateY, glowX, glowY });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ rx: 0, ry: 0, glowX: 50, glowY: 50 });
  };

  return (
    <section className="relative w-full flex items-center justify-center px-6 md:px-12 lg:px-16 pt-24 pb-20 overflow-hidden min-h-[580px]">
      
      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* 👈 বাম দিকের কন্টেন্ট */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 border border-cyan-400 text-cyan-950 text-[11px] font-mono font-bold tracking-wide shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600"></span>
            </span>
            Available for Intern / Junior Roles
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              <span className="text-[#0f172a] font-black block">
                Md. Saidur Rahman
              </span>
              <span className="text-[#0284c7] font-black">
                Sohan
              </span>
            </h1>
            
            <h2 className="text-lg sm:text-xl font-bold text-[#0369a1] font-mono flex items-center gap-0.5 min-h-[32px] pt-1">
              <span>{currentText}</span>
              <span className="w-[2px] h-5 bg-[#0369a1] animate-pulse inline-block ml-1"></span>
            </h2>
          </div>

          <p className="text-[#334155] text-xs sm:text-sm leading-relaxed max-w-lg font-semibold">
            CSE Graduate specializing in building high-performance, responsive, and visually appealing web interfaces using <strong className="text-[#0f172a] font-black underline decoration-sky-400">React.js</strong> and <strong className="text-[#0f172a] font-black underline decoration-sky-400">Tailwind CSS</strong>. Skilled in component architecture, state management, and Linux environments.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a 
              href="#contact" 
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-md active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Contact Me 
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a 
              href="https://github.com/sohan-15" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-[#0f172a] border border-slate-300 font-bold text-xs sm:text-sm transition-all duration-300 shadow-sm active:scale-95"
            >
              <svg className="w-3.5 h-3.5 fill-[#0f172a]" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>

            <a 
              href="https://www.linkedin.com/in/sr-sohan-9a3641250/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-[#0f172a] border border-slate-300 hover:border-[#0284c7] font-bold text-xs sm:text-sm transition-all duration-300 shadow-sm active:scale-95"
            >
              <svg className="w-3.5 h-3.5 fill-[#0284c7]" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
          </div>

        </div>

        {/* 👉 ডান পাশের ছবি (ব্রাইটনেস বাড়িয়ে ও অতিরিক্ত লালচে কালার এডজাস্ট করে) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div 
            ref={cardRef}
            onClick={() => setIsTapped(!isTapped)}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`,
              transition: cardTilt.rx === 0 ? 'transform 0.5s ease-out' : 'none'
            }}
            className="relative group w-[220px] sm:w-[250px] aspect-[4/5] rounded-2xl overflow-hidden border-4 border-white bg-white shadow-2xl transition-all duration-300 cursor-pointer ring-1 ring-slate-200"
          >
            {/* 🎯 ব্রাইটনেস ১০৮% এবং সেচুরেশন ফিল্টার নিউট্রাল করে দেওয়া হয়েছে */}
            <img 
              src={`${import.meta.env.BASE_URL}sohan.jpeg`} 
              alt="Md. Saidur Rahman Sohan" 
              style={{ 
                filter: 'brightness(108%) contrast(98%) saturate(95%)', 
                WebkitFilter: 'brightness(108%) contrast(98%) saturate(95%)' 
              }}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

      </div>

    </section>
  );
}