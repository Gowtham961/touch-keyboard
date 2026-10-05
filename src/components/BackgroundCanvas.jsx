import React, { useEffect, useRef } from 'react';

export default function BackgroundCanvas({ accent = 'cyan' }) {
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

    // Particle nodes for digital signal grid
    const numParticles = Math.min(Math.floor((width * height) / 18000), 70);
    const particles = [];

    const getColors = () => {
      if (accent === 'purple') {
        return { primary: 'rgba(157, 78, 221, 0.4)', link: 'rgba(157, 78, 221, 0.12)' };
      }
      if (accent === 'emerald') {
        return { primary: 'rgba(16, 185, 129, 0.4)', link: 'rgba(16, 185, 129, 0.12)' };
      }
      return { primary: 'rgba(0, 242, 254, 0.4)', link: 'rgba(0, 242, 254, 0.12)' };
    };

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const colors = getColors();

      // Draw subtle background waveform (Digital Signal Processing motif)
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = colors.link;
      const waveY = height * 0.35;
      for (let x = 0; x < width; x += 10) {
        // Combination of sine and harmonic sawtooth ripple
        const y = waveY + Math.sin(x * 0.005 + time) * 30 + Math.sin(x * 0.015 - time * 0.5) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second harmonic wave lower down
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.link;
      const waveY2 = height * 0.75;
      for (let x = 0; x < width; x += 15) {
        const y = waveY2 + Math.cos(x * 0.004 - time * 0.8) * 40;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw and connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Interaction with mouse
        const dxMouse = mouseX - p.x;
        const dyMouse = mouseY - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 120) {
          p.x -= (dxMouse / distMouse) * 1.5;
          p.y -= (dyMouse / distMouse) * 1.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.primary;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = colors.link;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [accent]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
}
