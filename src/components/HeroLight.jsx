import React, { useState, useEffect } from 'react';

const HeroLight = () => {
  const roles = ["Software Engineer", "React Specialist", "Frontend Developer", "Full-Stack Developer", "UI/UX Craftsman"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayedText(
          isDeleting
            ? currentRole.substring(0, displayedText.length - 1)
            : currentRole.substring(0, displayedText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section id="about" className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-4 md:pb-6 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        
        {/* Left Content */}
        <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          
          {/* Mobile-Only Avatar */}
          <div className="md:hidden pt-2 flex justify-center">
            <div 
              className="relative group cursor-pointer"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <div className={`absolute -inset-2 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full blur-lg transition duration-500 ${isZoomed ? 'opacity-80 scale-105' : 'opacity-45'}`}></div>
              <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-sky-500 bg-white shadow-xl active:scale-95 transition duration-300">
                <img 
                  src={`${import.meta.env.BASE_URL}sohan.jpeg`} 
                  alt="Md. Saidur Rahman Sohan" 
                  className={`w-full h-full object-cover object-top transition duration-500 ease-out ${
                    isZoomed ? 'scale-125' : 'scale-110'
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            Available for Intern / Junior Roles
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Md. Saidur Rahman <br />
              <span className="text-sky-600">Sohan</span>
            </h1>
            <p className="text-base sm:text-xl font-mono text-sky-600 h-7 flex items-center justify-center md:justify-start">
              <span>{displayedText}</span>
              <span className="animate-pulse ml-0.5">|</span>
            </p>
          </div>

          {/* Mature & Impact-Driven Bio Description */}
          <p className="max-w-lg text-slate-600 text-xs sm:text-sm leading-relaxed">
            CSE Graduate specializing in building fast, scalable, and responsive web applications using <strong className="text-slate-900">React.js</strong>, <strong className="text-slate-900">Next.js</strong>, and modern frontend architectures. Passionate about writing clean, maintainable code, optimizing user experience, and developing full-stack solutions.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a 
              href="#contact" 
              className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition active:scale-95 shadow-md shadow-sky-600/20"
            >
              Contact Me
            </a>
            <a 
              href="https://github.com/sr-sohan15" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs transition hover:bg-slate-50 shadow-sm"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/sr-sohan15/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs transition hover:bg-slate-50 shadow-sm"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Desktop Image */}
        <div className="hidden md:flex md:col-span-5 justify-center md:justify-end">
          <div 
            className="relative group cursor-pointer"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <div className={`absolute -inset-1.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-3xl blur-xl transition duration-500 ${isZoomed ? 'opacity-55 scale-105' : 'opacity-25 group-hover:opacity-50'}`}></div>
            <div className="relative w-60 h-76 lg:w-72 lg:h-[350px] rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
              <img 
                src={`${import.meta.env.BASE_URL}sohan.jpeg`} 
                alt="Md. Saidur Rahman Sohan" 
                className={`w-full h-full object-cover object-top transition duration-500 ease-out ${
                  isZoomed ? 'scale-115' : 'scale-100 group-hover:scale-105'
                }`}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroLight;