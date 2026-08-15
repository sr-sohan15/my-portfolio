import React, { useEffect, useRef } from 'react';

const NeuralBackground = ({ isDarkMode }) => {
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

    const touchPoint = {
      x: null,
      y: null,
      radius: 140
    };

    // Desktop Mouse Move
    const handleMouseMove = (e) => {
      touchPoint.x = e.clientX;
      touchPoint.y = e.clientY;
    };

    const handleMouseLeave = () => {
      touchPoint.x = null;
      touchPoint.y = null;
    };

    // Mobile Touch Events
    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        touchPoint.x = e.touches[0].clientX;
        touchPoint.y = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        touchPoint.x = e.touches[0].clientX;
        touchPoint.y = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      touchPoint.x = null;
      touchPoint.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.2 + 0.8;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode 
          ? 'rgba(6, 182, 212, 0.45)' 
          : 'rgba(2, 132, 199, 0.4)';
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Screen boundary bounce
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Repel / Push away on Mouse Hover or Mobile Touch
        if (touchPoint.x != null && touchPoint.y != null) {
          const dx = touchPoint.x - this.x;
          const dy = touchPoint.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < touchPoint.radius && distance > 0) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (touchPoint.radius - distance) / touchPoint.radius;
            
            // Negative force to repel away
            const directionX = -forceDirectionX * force * 3;
            const directionY = -forceDirectionY * force * 3;

            this.x += directionX;
            this.y += directionY;
          }
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 115) {
            const opacity = (1 - distance / 115) * 0.15;
            ctx.strokeStyle = isDarkMode
              ? `rgba(6, 182, 212, ${opacity})`
              : `rgba(2, 132, 199, ${opacity * 1.2})`;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default NeuralBackground;