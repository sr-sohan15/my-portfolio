import React, { useState, useEffect } from 'react';

const Hero = () => {
  const roles = [
    "MERN Stack Developer",
    "Full-Stack Developer",
    "React Specialist",
    "Frontend Engineer",
    "UI/UX Craftsman"
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isColored, setIsColored] = useState(false);

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
          <div className="md:hidden pt-2 pb-1 flex justify-center">
            <div 
              className="relative group cursor-pointer"
              onClick={() => setIsColored(!isColored)}
            >
              <div className={`absolute -inset-2 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-full blur-lg transition duration-500 ${isColored ? 'opacity-85 scale-105' : 'opacity-55'}`}></div>
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-cyan-400/80 bg-slate-900 shadow-2xl active:scale-95 transition duration-200">
                <img 
                  src={`${import.meta.env.BASE_URL}sohan.jpeg`} 
                  alt="Md. Saidur Rahman Sohan" 
                  className={`w-full h-full object-cover object-top scale-110 transition duration-500 ${
                    isColored ? 'grayscale-0 contrast-100' : 'grayscale contrast-125'
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Available for Intern / Junior Roles
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
              Md. Saidur Rahman <br />
              <span className="text-cyan-400">Sohan</span>
            </h1>
            <p className="text-base sm:text-xl font-mono text-cyan-300 h-7 flex items-center justify-center md:justify-start">
              <span>{displayedText}</span>
              <span className="animate-pulse ml-0.5">|</span>
            </p>
          </div>

          {/* Bio Description */}
          <p className="max-w-lg text-slate-400 text-xs sm:text-sm leading-relaxed">
            CSE Graduate & <strong className="text-slate-200">Frontend-focused MERN Stack Developer</strong> specializing in building fast, scalable, and responsive web applications using <strong className="text-slate-200">React.js</strong>, <strong className="text-slate-200">Next.js</strong>, and modern frontend architectures. Passionate about writing clean, maintainable code, optimizing user experience, and leveraging <strong className="text-slate-200">AI-assisted workflows</strong> to build robust, high-performance solutions.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a 
              href="#contact" 
              className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition active:scale-95 shadow-md shadow-sky-500/20"
            >
              Contact Me
            </a>
            <a 
              href="https://github.com/sr-sohan15" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-xs transition"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/sr-sohan15/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-xs transition"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Desktop Image (Night B&W -> Hover Color) */}
        <div className="hidden md:flex md:col-span-5 justify-center md:justify-end">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative w-60 h-76 lg:w-72 lg:h-[350px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
              <img 
                src={`${import.meta.env.BASE_URL}sohan.jpeg`} 
                alt="Md. Saidur Rahman Sohan" 
                className="w-full h-full object-cover object-top grayscale contrast-125 hover:grayscale-0 transition duration-500"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;