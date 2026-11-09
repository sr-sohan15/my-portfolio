import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Code2, 
  Award, 
  Briefcase, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

// static data outside component to prevent re-creation
const ROLES = [
  "MERN Stack Developer",
  "Full-Stack Developer",
  "React & Next.js Specialist",
  "Frontend Engineer",
  "AI-Assisted Workflow Expert"
];

const Hero = ({ isDarkMode = true }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isColored, setIsColored] = useState(false);

  // 3D Tilt Effect State
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
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

  // Interactive 3D Card Hover Logic
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-12 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        
        {/* Left Content Column */}
        <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-6 w-full">
          
          {/* Mobile Avatar (Click to toggle Grayscale / Color) */}
          <div className="md:hidden pt-2 pb-1 flex justify-center">
            <div 
              className="relative group cursor-pointer"
              onClick={() => setIsColored(!isColored)}
            >
              <div className={`absolute -inset-2 bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-500 rounded-full blur-xl transition duration-500 ${isColored ? 'opacity-90 scale-105' : 'opacity-40'}`}></div>
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-cyan-500/80 bg-white dark:bg-slate-900 shadow-2xl active:scale-95 transition duration-300">
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

          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs font-mono backdrop-blur-md shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 dark:bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600 dark:bg-cyan-400"></span>
            </span>
            <span>Available for Intern / Junior Roles</span>
          </div>

          {/* Heading & Typewriter Role */}
          <div className="space-y-2 w-full">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
              Md. Saidur Rahman <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-500 to-teal-600 dark:from-cyan-400 dark:via-sky-400 dark:to-teal-300">
                Sohan
              </span>
            </h1>
            
            <div className="min-h-[32px] flex items-center justify-center md:justify-start">
              <p className="text-base sm:text-xl font-mono text-cyan-700 dark:text-cyan-300 flex items-center font-semibold">
                <span>{displayedText}</span>
                <span className="animate-pulse ml-0.5 text-cyan-600 dark:text-cyan-400 font-bold">|</span>
              </p>
            </div>
          </div>

          {/* Bio Description */}
          <p className="max-w-xl text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
            CSE Graduate & <strong className="text-slate-900 dark:text-slate-200 font-semibold">Frontend-focused MERN Stack Developer</strong> specializing in building fast, scalable, and responsive web applications using <strong className="text-slate-900 dark:text-slate-200 font-semibold">React.js</strong>, <strong className="text-slate-900 dark:text-slate-200 font-semibold">Next.js</strong>, and modern API architectures. Passionate about writing clean code, optimizing UX, and leveraging <strong className="text-slate-900 dark:text-slate-200 font-semibold">AI-assisted workflows</strong> to build robust, high-performance solutions.
          </p>

          {/* Dynamic Impact Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg pt-1">
            
            {/* Clickable Research Card */}
            <button
              onClick={() => scrollToSection('research')}
              className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-amber-400 dark:hover:border-amber-500/50 hover:bg-amber-50/50 dark:hover:bg-slate-900/90 flex flex-col items-start gap-1 shadow-sm shadow-slate-200/50 dark:shadow-none backdrop-blur-sm transition-all duration-200 group text-left cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <Award size={14} className="text-amber-500 dark:text-amber-400 group-hover:scale-110 transition duration-200" />
                  <span>Research Paper</span>
                </div>
                <ChevronRight size={12} className="text-slate-400 dark:text-slate-600 group-hover:text-amber-500 dark:group-hover:text-amber-400 group-hover:translate-x-0.5 transition" />
              </div>
              <span className="text-xs sm:text-sm font-bold font-sans text-amber-700 dark:text-amber-300 pl-5 tracking-wide">
                1x IEEE
              </span>
            </button>

            {/* Specialization Card */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex flex-col items-start gap-1 shadow-sm shadow-slate-200/50 dark:shadow-none backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <Code2 size={14} className="text-cyan-600 dark:text-cyan-400" />
                <span>Specialization</span>
              </div>
              <span className="text-xs sm:text-sm font-bold font-sans text-slate-900 dark:text-slate-100 pl-5 tracking-wide">
                MERN & Next.js
              </span>
            </div>

            {/* Availability Card */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex flex-col items-start gap-1 shadow-sm shadow-slate-200/50 dark:shadow-none backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <Briefcase size={14} className="text-emerald-600 dark:text-emerald-400" />
                <span>Availability</span>
              </div>
              <span className="text-xs sm:text-sm font-bold font-sans text-emerald-700 dark:text-emerald-300 pl-5 tracking-wide">
                Immediate
              </span>
            </div>

          </div>

          {/* Call to Actions (CTAs) */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2 w-full">
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs transition active:scale-95 shadow-lg shadow-sky-600/20 dark:shadow-cyan-500/20 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles size={14} /> Contact Me
            </button>

            <a 
              href="https://github.com/sr-sohan15" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 shadow-sm shadow-slate-200/50 dark:shadow-none"
            >
              GitHub <ExternalLink size={12} className="text-slate-400" />
            </a>

            <a 
              href="https://www.linkedin.com/in/sr-sohan15/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 shadow-sm shadow-slate-200/50 dark:shadow-none"
            >
              LinkedIn <ExternalLink size={12} className="text-slate-400" />
            </a>
          </div>

        </div>

        {/* Desktop Image with Smooth 3D Tilt & Lighting */}
        <div className="hidden md:flex md:col-span-5 justify-center md:justify-end">
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transition: 'transform 0.15s ease-out',
              willChange: 'transform'
            }}
            className="relative group cursor-pointer"
          >
            <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500 via-sky-500 to-emerald-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition duration-500"></div>
            
            <div className="relative w-64 h-80 lg:w-72 lg:h-[370px] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/60 dark:shadow-2xl bg-white dark:bg-slate-900/90">
              <img 
                src={`${import.meta.env.BASE_URL}sohan.jpeg`} 
                alt="Md. Saidur Rahman Sohan" 
                className="w-full h-full object-cover object-top grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-500"
              />
              
              {/* Dynamic Overlay Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;