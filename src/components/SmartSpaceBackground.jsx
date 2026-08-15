import React, { useEffect, useRef } from 'react';

const SmartSpaceBackground = ({ isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Generate balanced Stars
    const starCount = Math.min(Math.floor((width * height) / 10000), 90);
    const stars = [];

    class Star {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random();
        this.opacitySpeed = (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1);
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.depth = Math.random() * 0.03 + 0.01;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode 
          ? `rgba(56, 189, 248, ${Math.abs(this.opacity) * 0.85})` 
          : `rgba(2, 132, 199, ${Math.abs(this.opacity) * 0.65})`;
        ctx.shadowBlur = isDarkMode ? 6 : 2;
        ctx.shadowColor = isDarkMode ? '#38bdf8' : '#0284c7';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      update() {
        // Twinkle Animation
        this.opacity += this.opacitySpeed;
        if (this.opacity > 1 || this.opacity < 0.1) {
          this.opacitySpeed = -this.opacitySpeed;
        }

        // Natural Float
        this.x += this.speedX;
        this.y += this.speedY;

        // Subtle Parallax towards mouse position
        this.x += (mouse.x - width / 2) * this.depth * 0.02;
        this.y += (mouse.y - height / 2) * this.depth * 0.02;

        // Wrap around borders
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }
    }

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    const animate = () => {
      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        stars[i].draw();
        stars[i].update();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Deep Glow Nebula */}
      <div className={`absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-700 ${
        isDarkMode ? 'bg-cyan-500/15' : 'bg-sky-200/50'
      }`} />
      <div className={`absolute top-1/3 -right-32 w-[450px] h-[450px] rounded-full blur-[130px] transition-all duration-700 ${
        isDarkMode ? 'bg-indigo-600/12' : 'bg-blue-200/40'
      }`} />
      <div className={`absolute -bottom-32 left-1/3 w-[550px] h-[550px] rounded-full blur-[140px] transition-all duration-700 ${
        isDarkMode ? 'bg-sky-600/10' : 'bg-cyan-100/50'
      }`} />

      {/* Cyber Dot Matrix Mask */}
      <div 
        className={`absolute inset-0 ${
          isDarkMode
            ? 'bg-[radial-gradient(#1e293b70_1px,transparent_1px)]'
            : 'bg-[radial-gradient(#cbd5e180_1px,transparent_1px)]'
        } bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_40%,#000_65%,transparent_100%)]`}
      />

      {/* Interactive Twinkling Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default SmartSpaceBackground;