import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * ConstellationNav - Star map navigation with connecting lines
 * Constellations link to different chapters/sections
 */
const ConstellationNav = ({ chapters = [], onNavigate }) => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 200;

    // Create constellation stars for each chapter
    const constellations = chapters.map((chapter, index) => {
      const x = (window.innerWidth / (chapters.length + 1)) * (index + 1);
      const y = 100 + Math.sin(index) * 30;
      
      return {
        id: chapter.id,
        x,
        y,
        label: chapter.title,
        active: false,
        satellites: generateSatelliteStars(x, y, 3)
      };
    });

    starsRef.current = constellations;

    function generateSatelliteStars(centerX, centerY, count) {
      return Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const distance = 30 + Math.random() * 20;
        return {
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          size: 1 + Math.random() * 2
        };
      });
    }

    function drawConstellation(constellation, progress = 1) {
      // Draw satellite stars
      constellation.satellites.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(248, 250, 252, 0.6)';
        ctx.fill();
      });

      // Draw connecting lines
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 * progress})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      constellation.satellites.forEach((star, i) => {
        if (i === 0) {
          ctx.moveTo(constellation.x, constellation.y);
        }
        ctx.lineTo(star.x, star.y);
        ctx.moveTo(constellation.x, constellation.y);
      });
      ctx.stroke();

      // Draw center star
      const gradient = ctx.createRadialGradient(
        constellation.x, constellation.y, 0,
        constellation.x, constellation.y, constellation.active ? 12 : 8
      );
      gradient.addColorStop(0, constellation.active ? 'rgba(103, 232, 249, 1)' : 'rgba(248, 250, 252, 1)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(constellation.x, constellation.y, constellation.active ? 12 : 8, 0, Math.PI * 2);
      ctx.fill();

      // Draw label
      if (constellation.active || progress > 0.8) {
        ctx.fillStyle = 'rgba(103, 232, 249, 0.9)';
        ctx.font = '12px Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(constellation.label, constellation.x, constellation.y - 20);
      }
    }

    // Animation loop
    let animationProgress = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      animationProgress += 0.005;
      if (animationProgress > 1) animationProgress = 1;
      
      starsRef.current.forEach(constellation => {
        drawConstellation(constellation, animationProgress);
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();

    // Handle clicks
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      starsRef.current.forEach(constellation => {
        const distance = Math.sqrt(
          Math.pow(x - constellation.x, 2) + Math.pow(y - constellation.y, 2)
        );
        
        if (distance < 15) {
          starsRef.current.forEach(c => c.active = false);
          constellation.active = true;
          if (onNavigate) onNavigate(constellation.id);
        }
      });
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, [chapters, onNavigate]);

  return (
    <div className="constellation-nav fixed top-0 left-0 right-0 z-40 pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="w-full cursor-pointer"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default ConstellationNav;
