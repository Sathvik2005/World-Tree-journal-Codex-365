import React, { useEffect, useRef, useState } from 'react';

/**
 * CosmicParticles - Drifting dust field with parallax depth
 * Features:
 * - Three depth layers (foreground, mid, deep space)
 * - Particles react to scroll and mouse movement
 * - Slow, graceful drift with varying speeds
 */
const CosmicParticles = ({ 
  count = 80, 
  enableMouseReaction = true,
  enableScrollReaction = true 
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const animationRef = useRef(null);

  // Particle class with depth layers
  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.reset();
      // Start at random position
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }

    reset() {
      // Depth layer: 1 (foreground), 2 (mid), 3 (deep space)
      this.depth = Math.floor(Math.random() * 3) + 1;
      
      // Size based on depth (closer = larger)
      this.size = this.depth === 1 ? 2 + Math.random() * 1.5 
                : this.depth === 2 ? 1.2 + Math.random() * 1 
                : 0.5 + Math.random() * 0.8;
      
      // Speed based on depth (closer = faster)
      this.baseSpeedX = (Math.random() - 0.5) * (4 - this.depth) * 0.15;
      this.baseSpeedY = (Math.random() - 0.5) * (4 - this.depth) * 0.15;
      
      // Opacity based on depth
      this.opacity = this.depth === 1 ? 0.6 + Math.random() * 0.4
                   : this.depth === 2 ? 0.4 + Math.random() * 0.3
                   : 0.2 + Math.random() * 0.2;
      
      // Twinkle phase
      this.twinklePhase = Math.random() * Math.PI * 2;
      this.twinkleSpeed = 0.02 + Math.random() * 0.03;
      
      // Color variations
      this.colorVariant = Math.random();
    }

    update(mouse, scroll, deltaTime) {
      const canvas = this.canvas;
      
      // Base drift
      this.x += this.baseSpeedX * deltaTime;
      this.y += this.baseSpeedY * deltaTime;
      
      // Mouse influence (stronger for foreground particles)
      if (mouse) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;
        
        if (distance < maxDistance) {
          const influence = (1 - distance / maxDistance) * (4 - this.depth) * 0.5;
          this.x += (dx / distance) * influence * deltaTime;
          this.y += (dy / distance) * influence * deltaTime;
        }
      }
      
      // Scroll parallax (different speeds per layer)
      if (scroll !== null) {
        const parallaxSpeed = (4 - this.depth) * 0.1;
        this.y -= scroll * parallaxSpeed;
      }
      
      // Wrap around edges
      if (this.x < -10) this.x = canvas.width + 10;
      if (this.x > canvas.width + 10) this.x = -10;
      if (this.y < -10) this.y = canvas.height + 10;
      if (this.y > canvas.height + 10) this.y = -10;
      
      // Twinkle animation
      this.twinklePhase += this.twinkleSpeed * deltaTime;
    }

    draw(ctx) {
      // Calculate twinkling opacity
      const twinkle = Math.sin(this.twinklePhase) * 0.3 + 0.7;
      const currentOpacity = this.opacity * twinkle;
      
      // Color selection (mostly white/cyan with blue accents)
      let color;
      if (this.colorVariant < 0.6) {
        color = `rgba(248, 250, 252, ${currentOpacity})`; // Starlight white
      } else if (this.colorVariant < 0.85) {
        color = `rgba(103, 232, 249, ${currentOpacity})`; // Cosmic cyan
      } else {
        color = `rgba(59, 130, 246, ${currentOpacity})`; // Astral blue
      }
      
      // Draw particle with glow
      ctx.save();
      
      // Outer glow
      if (this.depth === 1) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
      } else if (this.depth === 2) {
        ctx.shadowBlur = 4;
        ctx.shadowColor = color;
      }
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }
  }

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reinitialize particles on resize
      particlesRef.current = Array.from(
        { length: count }, 
        () => new Particle(canvas)
      );
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e) => {
      if (enableMouseReaction) {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      }
    };
    
    // Scroll tracking
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (enableScrollReaction) {
        const currentScrollY = window.scrollY;
        scrollRef.current = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Animation loop
    let lastTime = performance.now();
    
    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 16; // Normalize to ~60fps
      lastTime = currentTime;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      const mouse = enableMouseReaction ? mouseRef.current : null;
      const scroll = enableScrollReaction ? scrollRef.current : null;
      
      particlesRef.current.forEach(particle => {
        particle.update(mouse, scroll, deltaTime);
        particle.draw(ctx);
      });
      
      // Reset scroll delta
      scrollRef.current = 0;
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, enableMouseReaction, enableScrollReaction]);

  return (
    <canvas
      ref={canvasRef}
      className="cosmic-particles-canvas fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default CosmicParticles;
