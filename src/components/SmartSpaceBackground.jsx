import React, { useEffect, useRef } from 'react';

const SmartSpaceBackground = ({ isDarkMode = true }) => {
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
      initNodes(); 
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000, maxRadius: 140 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const maxDistance = 160; 
    let nodes = [];

    class Node {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        // প্রফেশনাল লুকের জন্য ছোট ব্যাসার্ধ এবং ধীর গতি
        this.radius = Math.random() * 1.2 + 0.8; 
        this.vx = (Math.random() - 0.5) * 0.25; 
        this.vy = (Math.random() - 0.5) * 0.25;
        this.pulse = Math.random() * Math.PI;
        this.pulseSpeed = 0.02 + Math.random() * 0.015;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        const currentPulse = Math.sin(this.pulse) * 0.3 + 0.7;
        
        // কালার অপাসিটি কমিয়ে সফট করা হয়েছে
        ctx.fillStyle = isDarkMode
          ? `rgba(56, 189, 248, ${0.35 * currentPulse})`
          : `rgba(14, 165, 233, ${0.25 * currentPulse})`;

        ctx.fill();
      }

      update() {
        this.pulse += this.pulseSpeed;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
    }

    const initNodes = () => {
      nodes = [];
      // গ্রিড সাইজ বড় করে নোডের ঘনত্ব (Density) কমানো হয়েছে
      const cols = Math.max(5, Math.floor(width / 200));
      const rows = Math.max(3, Math.floor(height / 200));
      const cellWidth = width / cols;
      const cellHeight = height / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellWidth + Math.random() * cellWidth;
          const y = r * cellHeight + Math.random() * cellHeight;
          nodes.push(new Node(x, y));
        }
      }
    };

    initNodes();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        nodes[i].draw();
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // লাইনের অপাসিটি এবং প্রস্থ (Width) অনেক সফট করা হয়েছে
            const alpha = (1 - dist / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = isDarkMode
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(14, 165, 233, ${alpha * 0.8})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        const mDx = nodes[i].x - mouse.x;
        const mDy = nodes[i].y - mouse.y;
        const mDist = Math.sqrt(mDx * mDx + mDy * mDy);

        if (mDist < mouse.maxRadius) {
          // মাউস ইন্টার‍্যাকশন সফট করা হয়েছে
          const mAlpha = (1 - mDist / mouse.maxRadius) * 0.25;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isDarkMode
            ? `rgba(6, 182, 212, ${mAlpha})`
            : `rgba(2, 132, 199, ${mAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* অত্যন্ত সফট নেবুলা গ্লো (কন্টেন্ট রিডেবিলিটির জন্য) */}
      <div className={`absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[140px] transition-all duration-700 ${
        isDarkMode ? 'bg-cyan-600/10' : 'bg-sky-200/30'
      }`} />
      <div className={`absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full blur-[150px] transition-all duration-700 ${
        isDarkMode ? 'bg-indigo-600/5' : 'bg-blue-100/40'
      }`} />
      <div className={`absolute -bottom-32 left-1/3 w-[550px] h-[550px] rounded-full blur-[160px] transition-all duration-700 ${
        isDarkMode ? 'bg-teal-600/5' : 'bg-cyan-100/30'
      }`} />

      {/* সফট মেস মাস্ক */}
      <div 
        className={`absolute inset-0 ${
          isDarkMode
            ? 'bg-[radial-gradient(#1e293b50_1px,transparent_1px)]'
            : 'bg-[radial-gradient(#cbd5e140_1px,transparent_1px)]'
        } bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]`}
      />

      {/* ক্যানভাস */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default SmartSpaceBackground;