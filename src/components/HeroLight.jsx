import React, { useState, useEffect, useRef } from 'react';
import { Code2, Award, Briefcase, ExternalLink } from 'lucide-react';

const HeroLight = () => {
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

  // 3D Tilt Effect State
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

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

  // Interactive 3D Card Hover Logic
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  // Dynamic Impact Metrics
  const quickStats = [
    { label: "Research Paper", value: "1x IEEE", icon: Award, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Specialization", value: "MERN & Next.js", icon: Code2, color: "text-sky-600", bg: "bg-sky-50" },
    { label: "Availability", value: "Immediate", icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <section id="about" className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-4 md:pb-6 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        
        {/* Left Content */}
        <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-5 w-full">
          
          {/* Mobile-Only Avatar */}
          <div className="md:hidden pt-2 pb-1 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full blur-lg opacity-40"></div>
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-sky-400 bg-white shadow-xl">
                <img 
                  src={`${import.meta.env.BASE_URL}sohan.jpeg`} 
                  alt="Md. Saidur Rahman Sohan" 
                  className="w-full h-full object-cover object-top scale-110"
                />
              </div>
            </div>
          </div>

          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono font-medium shadow-xs">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            Available for Intern / Junior Roles
          </div>

          {/* Heading & Role */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Md. Saidur Rahman <br />
              <span className="text-sky-600">Sohan</span>
            </h1>
            <p className="text-base sm:text-xl font-mono text-sky-700 font-medium h-7 flex items-center justify-center md:justify-start">
              <span>{displayedText}</span>
              <span className="animate-pulse ml-0.5">|</span>
            </p>
          </div>

          {/* Bio Description */}
          <p className="max-w-lg text-slate-600 text-xs sm:text-sm leading-relaxed">
            CSE Graduate & <strong className="text-slate-800">Frontend-focused MERN Stack Developer</strong> specializing in building fast, scalable, and responsive web applications using <strong className="text-slate-800">React.js</strong>, <strong className="text-slate-800">Next.js</strong>, and modern frontend architectures. Passionate about writing clean, maintainable code, optimizing user experience, and leveraging <strong className="text-slate-800">AI-assisted workflows</strong> to build robust, high-performance solutions.
          </p>

          {/* Responsive Impact Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-lg pt-1">
            {quickStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx} 
                  className="p-3 sm:p-2.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-between sm:flex-col sm:items-start sm:justify-start gap-2 shadow-xs backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
                    <div className={`p-1 rounded-md ${stat.bg}`}>
                      <Icon size={13} className={stat.color} />
                    </div>
                    <span>{stat.label}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold font-mono text-slate-900">{stat.value}</span>
                </div>
              );
            })}
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3 pt-2 w-full">
            <a 
              href="#contact" 
              className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition active:scale-95 shadow-md shadow-sky-500/20"
            >
              Contact Me
            </a>
            <a 
              href="https://github.com/sr-sohan15" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center gap-1.5 shadow-xs"
            >
              GitHub <ExternalLink size={12} className="text-slate-400" />
            </a>
            <a 
              href="https://www.linkedin.com/in/sr-sohan15/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center gap-1.5 shadow-xs"
            >
              LinkedIn <ExternalLink size={12} className="text-slate-400" />
            </a>
          </div>
        </div>

        {/* Desktop Image with 3D Tilt */}
        <div className="hidden md:flex md:col-span-5 justify-center md:justify-end">
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="relative group cursor-pointer"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative w-64 h-80 lg:w-72 lg:h-[360px] rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
              <img 
                src={`${import.meta.env.BASE_URL}sohan.jpeg`} 
                alt="Md. Saidur Rahman Sohan" 
                className="w-full h-full object-cover object-top hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroLight;