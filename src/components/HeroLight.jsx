import React, { useState, useEffect, useRef } from 'react';

export default function HeroLight() {
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
            
            <h2 className="text-lg sm:text-xl font-bold text-[#0369a1] font-mono flex items-center justify-center lg:justify-start gap-0.5 min-h-[32px] pt-1">
              <span>{currentText}</span>
              <span className="w-[2px] h-5 bg-[#0369a1] animate-pulse inline-block ml-1"></span>
            </h2>
          </div>

          {/* মোবাইলে ডেসক্রিপশন ও বাটন ছবির নিচে থাকবে */}
          <p className="hidden lg:block text-[#334155] text-xs sm:text-sm leading-relaxed max-w-lg font-semibold">
            CSE Graduate specializing in building high-performance, responsive, and visually appealing web interfaces using <strong className="text-[#0f172a] font-black underline decoration-sky-400">React.js</strong> and <strong className="text-[#0f172a] font-black underline decoration-sky-400">Tailwind CSS</strong>. Skilled in component architecture, state management, and Linux environments.
          </p>

          <div className="hidden lg:flex flex-wrap items-center gap-3 pt-2">
            <a href="#contact" className="px-5 py-2.5 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm transition shadow-md">
              Contact Me
            </a>
            <a href="https://github.com/sohan-15" target="_blank" rel="noreferrer" className="px-4 py-2.5 rounded-lg bg-white text-[#0f172a] border border-slate-300 font-bold text-xs sm:text-sm shadow-sm">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/sr-sohan-9a3641250/" target="_blank" rel="noreferrer" className="px-4 py-2.5 rounded-lg bg-white text-[#0f172a] border border-slate-300 font-bold text-xs sm:text-sm shadow-sm">
              LinkedIn
            </a>
          </div>

        </div>

        {/* 👉 ছবির সেকশন (মোবাইলে ২য় পজিশনে পারফেক্টলি বসবে) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end order-2">
          <div 
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`,
              transition: cardTilt.rx === 0 ? 'transform 0.5s ease-out' : 'none'
            }}
            className="relative w-[200px] sm:w-[240px] aspect-[4/5] rounded-2xl overflow-hidden border-4 border-white bg-white shadow-xl transition-all duration-300 cursor-pointer ring-1 ring-slate-200"
          >
            <img 
              src={`${import.meta.env.BASE_URL}sohan.jpeg`} 
              alt="Md. Saidur Rahman Sohan" 
              style={{ 
                filter: 'brightness(108%) contrast(98%) saturate(95%)', 
                WebkitFilter: 'brightness(108%) contrast(98%) saturate(95%)' 
              }}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* 📱 মোবাইলের জন্য নিচের ডেসক্রিপশন ও বাটন (Order 3) */}
        <div className="lg:hidden flex flex-col items-center text-center space-y-4 order-3">
          <p className="text-[#334155] text-xs sm:text-sm leading-relaxed font-semibold px-2">
            CSE Graduate specializing in building high-performance, responsive, and visually appealing web interfaces using <strong className="text-[#0f172a] font-black underline decoration-sky-400">React.js</strong> and <strong className="text-[#0f172a] font-black underline decoration-sky-400">Tailwind CSS</strong>. Skilled in component architecture, state management, and Linux environments.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <a href="#contact" className="px-4 py-2 rounded-lg bg-[#0284c7] text-white font-bold text-xs shadow-md">
              Contact Me
            </a>
            <a href="https://github.com/sohan-15" target="_blank" rel="noreferrer" className="px-3.5 py-2 rounded-lg bg-white text-[#0f172a] border border-slate-300 font-bold text-xs shadow-sm">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/sr-sohan-9a3641250/" target="_blank" rel="noreferrer" className="px-3.5 py-2 rounded-lg bg-white text-[#0f172a] border border-slate-300 font-bold text-xs shadow-sm">
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}