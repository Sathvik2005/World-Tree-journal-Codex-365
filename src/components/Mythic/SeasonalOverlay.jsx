import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * SeasonalOverlay - Subtle seasonal effects based on progress
 * Spring → Summer → Autumn → Winter
 */
const SeasonalOverlay = ({ season = 'spring', intensity = 0.5 }) => {
  const overlayRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!overlayRef.current) return;

    // Clear previous particles
    particlesRef.current.forEach(p => p.remove());
    particlesRef.current = [];

    // Generate seasonal particles
    const particleCount = season === 'winter' ? 30 : 20;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = `seasonal-particle ${season}-particle`;
      
      const startX = Math.random() * window.innerWidth;
      const startY = -50;
      
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      
      overlayRef.current.appendChild(particle);
      particlesRef.current.push(particle);
      
      animateSeasonalParticle(particle, season, i);
    }

    return () => {
      particlesRef.current.forEach(p => {
        gsap.killTweensOf(p);
        p.remove();
      });
    };
  }, [season]);

  const animateSeasonalParticle = (particle, currentSeason, index) => {
    const delay = Math.random() * 10;
    const duration = 15 + Math.random() * 10;
    
    switch(currentSeason) {
      case 'spring':
        // Green sparkles appear
        gsap.to(particle, {
          y: window.innerHeight + 100,
          x: `+=${(Math.random() - 0.5) * 200}`,
          rotation: Math.random() * 720,
          opacity: 0.6,
          duration: duration,
          delay: delay,
          repeat: -1,
          ease: 'sine.inOut'
        });
        break;
        
      case 'summer':
        // Brighter glow + energy lines
        gsap.to(particle, {
          y: window.innerHeight + 100,
          x: `+=${(Math.random() - 0.5) * 150}`,
          scale: 1 + Math.random() * 0.5,
          opacity: 0.8,
          duration: duration * 0.8,
          delay: delay,
          repeat: -1,
          ease: 'power1.inOut'
        });
        break;
        
      case 'autumn':
        // Gold/blue drifting leaves
        gsap.to(particle, {
          y: window.innerHeight + 100,
          x: `+=${(Math.random() - 0.5) * 300}`,
          rotation: Math.random() * 1080,
          opacity: 0.5,
          duration: duration * 1.2,
          delay: delay,
          repeat: -1,
          ease: 'sine.inOut'
        });
        break;
        
      case 'winter':
        // Frost shimmer
        gsap.to(particle, {
          y: window.innerHeight + 100,
          x: `+=${(Math.random() - 0.5) * 100}`,
          rotation: Math.random() * 360,
          opacity: 0.4,
          duration: duration * 1.5,
          delay: delay,
          repeat: -1,
          ease: 'power1.inOut'
        });
        
        // Add shimmer effect
        gsap.to(particle, {
          scale: 0.8 + Math.random() * 0.4,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
        break;
    }
  };

  return (
    <>
      <div 
        ref={overlayRef} 
        className={`seasonal-overlay fixed inset-0 pointer-events-none z-1 ${season}-overlay`}
        style={{ opacity: intensity }}
      />
      
      <style jsx>{`
        .seasonal-particle {
          position: absolute;
          pointer-events: none;
          will-change: transform, opacity;
        }

        .spring-particle {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: radial-gradient(circle, #67E8F9 0%, #3B82F6 100%);
          box-shadow: 0 0 10px rgba(103, 232, 249, 0.8);
        }

        .summer-particle {
          width: 3px;
          height: 20px;
          background: linear-gradient(180deg, #F8FAFC 0%, #67E8F9 100%);
          box-shadow: 0 0 15px rgba(248, 250, 252, 0.9);
          border-radius: 2px;
        }

        .autumn-particle {
          width: 12px;
          height: 12px;
          background: linear-gradient(135deg, #F8FAFC 0%, #3B82F6 50%, #67E8F9 100%);
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          box-shadow: 0 0 12px rgba(103, 232, 249, 0.6);
        }

        .winter-particle {
          width: 6px;
          height: 6px;
          background: #F8FAFC;
          clip-path: polygon(
            50% 0%, 61% 35%, 98% 35%, 68% 57%, 
            79% 91%, 50% 70%, 21% 91%, 32% 57%, 
            2% 35%, 39% 35%
          );
          box-shadow: 0 0 10px rgba(248, 250, 252, 0.9);
        }

        .spring-overlay {
          background: radial-gradient(circle at 50% 50%, rgba(103, 232, 249, 0.05) 0%, transparent 50%);
        }

        .summer-overlay {
          background: radial-gradient(circle at 50% 50%, rgba(248, 250, 252, 0.08) 0%, transparent 60%);
        }

        .autumn-overlay {
          background: linear-gradient(180deg, rgba(59, 130, 246, 0.03) 0%, transparent 100%);
        }

        .winter-overlay {
          background: linear-gradient(180deg, rgba(248, 250, 252, 0.05) 0%, transparent 100%);
        }
      `}</style>
    </>
  );
};

export default SeasonalOverlay;
