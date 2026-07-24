import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import NavbarLight from './components/NavbarLight';
import Hero from './components/Hero';
import HeroLight from './components/HeroLight';
import Skills from './components/Skills';
import SkillsLight from './components/SkillsLight';
import Projects from './components/Projects';
import ProjectsLight from './components/ProjectsLight';
import Research from './components/Research';
import ResearchLight from './components/ResearchLight'; // 👈 রিসার্চ লাইট ইম্পোর্ট
import Contact from './components/Contact';
import ContactLight from './components/ContactLight';
import ThemeConfigurator from './components/ThemeConfigurator';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particleCount = 75;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1,
      baseRadius: Math.random() * 2 + 1,
    }));

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMoveWindow = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMoveWindow);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x -= (dx / dist) * force * 1.8;
          p.y -= (dy / dist) * force * 1.8;
          p.radius = p.baseRadius * (1 + force * 1.5);
        } else {
          p.radius = p.baseRadius;
        }

        const particleColor = isDarkMode 
          ? (dist < 150 ? 'rgba(6, 182, 212, 0.85)' : 'rgba(14, 165, 233, 0.45)')
          : (dist < 150 ? 'rgba(2, 132, 199, 0.85)' : 'rgba(14, 165, 233, 0.35)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distance < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDarkMode 
              ? `rgba(14, 165, 233, ${0.22 * (1 - distance / 130)})`
              : `rgba(2, 132, 199, ${0.25 * (1 - distance / 130)})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMoveWindow);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-[#0b0f19] text-slate-100' 
        : 'bg-[#f0f7ff] text-slate-900'
    }`}>
      
      {/* 🌌 ক্যানভাস ব্যাকগ্রাউন্ড */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* 💡 মাউস গ্লো */}
      <div 
        className={`fixed w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none transition-transform duration-150 ease-out z-0 -translate-x-1/2 -translate-y-1/2 ${
          isDarkMode ? 'bg-cyan-500/05' : 'bg-sky-400/20'
        }`}
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      {/* 🚀 পোর্টফোলিও কন্টেন্ট */}
      <div className="relative z-10 space-y-4">
        {isDarkMode ? <Navbar /> : <NavbarLight />}
        {isDarkMode ? <Hero /> : <HeroLight />}
        {isDarkMode ? <Skills /> : <SkillsLight />}
        {isDarkMode ? <Projects /> : <ProjectsLight />}
        
        {/* 🎯 থিম অনুযায়ী রিসার্চ সেকশন সোয়াপ */}
        {isDarkMode ? <Research /> : <ResearchLight />}
        
        {isDarkMode ? <Contact /> : <ContactLight />}
        <ThemeConfigurator isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>

    </div>
  );
}

export default App;