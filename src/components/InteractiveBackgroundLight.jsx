import React, { useEffect, useRef } from 'react';

export default function InteractiveBackgroundLight() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse coordinates directly for default, instantaneous speed
    const mouse = {
      x: width / 2,
      y: height / 2,
      prevX: width / 2,
      prevY: height / 2,
      speed: 0,
      radius: 160,
      active: false,
    };

    const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.5 + 0.8;
        this.density = Math.random() * 20 + 8;
        this.isOrange = Math.random() > 0.45;
        this.alpha = Math.random() * 0.28 + 0.12;
      }

      update() {
        this.baseX += this.vx;
        this.baseY += this.vy;

        if (this.baseX < 0) this.baseX = width;
        if (this.baseX > width) this.baseX = 0;
        if (this.baseY < 0) this.baseY = height;
        if (this.baseY > height) this.baseY = 0;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (mouse.active && distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.radius;
          const force = (maxDistance - distance) / maxDistance;

          const directionX = -forceDirectionX * force * this.density * 0.6;
          const directionY = -forceDirectionY * force * this.density * 0.6;

          this.x += directionX;
          this.y += directionY;
        } else {
          if (this.x !== this.baseX) {
            const dxBack = this.x - this.baseX;
            this.x -= dxBack * 0.08;
          }
          if (this.y !== this.baseY) {
            const dyBack = this.y - this.baseY;
            this.y -= dyBack * 0.08;
          }
        }
      }

      draw() {
        ctx.fillStyle = this.isOrange
          ? `rgba(234, 88, 12, ${this.alpha * 0.85})`
          : `rgba(23, 22, 20, ${this.alpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Direct 1:1 mouse movement with ZERO lag
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const ripples = [];
    const handleClick = (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 6,
        maxRadius: Math.max(width, height) * 0.3,
        alpha: 0.35,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClick);

    const render = () => {
      const deltaX = mouse.x - mouse.prevX;
      const deltaY = mouse.y - mouse.prevY;
      mouse.speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      ctx.clearRect(0, 0, width, height);

      // Instantaneous ambient glow tracking the mouse directly
      if (mouse.active) {
        const glowRadius = Math.min(340 + mouse.speed * 4, 460);
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRadius
        );
        gradient.addColorStop(0, 'rgba(234, 88, 12, 0.08)');
        gradient.addColorStop(0.45, 'rgba(251, 146, 60, 0.02)');
        gradient.addColorStop(1, 'rgba(251, 248, 242, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 3.5;
        rip.alpha *= 0.94;

        ctx.strokeStyle = `rgba(234, 88, 12, ${rip.alpha * 0.4})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.stroke();

        if (rip.alpha < 0.005 || rip.radius > rip.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      // Particle connections
      const maxDist = 100;
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.08;
            ctx.strokeStyle = `rgba(23, 22, 20, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
