import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * SpiritWisps - Slow-moving spirit trails of light
 * Appear occasionally and fade like memory
 */
const SpiritWisps = ({ count = 5 }) => {
  const containerRef = useRef(null);
  const wispsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const createWisp = () => {
      const wisp = document.createElement('div');
      wisp.className = 'spirit-wisp';
      
      // Random starting position (from edges)
      const side = Math.floor(Math.random() * 4);
      let startX, startY, endX, endY;
      
      switch(side) {
        case 0: // from left
          startX = -100;
          startY = Math.random() * window.innerHeight;
          endX = window.innerWidth + 100;
          endY = Math.random() * window.innerHeight;
          break;
        case 1: // from top
          startX = Math.random() * window.innerWidth;
          startY = -100;
          endX = Math.random() * window.innerWidth;
          endY = window.innerHeight + 100;
          break;
        case 2: // from right
          startX = window.innerWidth + 100;
          startY = Math.random() * window.innerHeight;
          endX = -100;
          endY = Math.random() * window.innerHeight;
          break;
        default: // from bottom
          startX = Math.random() * window.innerWidth;
          startY = window.innerHeight + 100;
          endX = Math.random() * window.innerWidth;
          endY = -100;
      }
      
      wisp.style.left = `${startX}px`;
      wisp.style.top = `${startY}px`;
      
      // Create SVG path for trail
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '100');
      svg.setAttribute('height', '100');
      svg.style.overflow = 'visible';
      
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M 0 50 Q 25 30, 50 50 T 100 50');
      path.setAttribute('stroke', 'rgba(248, 250, 252, 0.6)');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      path.style.filter = 'blur(1px)';
      
      svg.appendChild(path);
      wisp.appendChild(svg);
      containerRef.current.appendChild(wisp);
      
      // Animate wisp
      const timeline = gsap.timeline({
        onComplete: () => {
          wisp.remove();
        }
      });
      
      timeline
        .to(wisp, {
          opacity: 0.8,
          duration: 2,
          ease: 'power1.in'
        })
        .to(wisp, {
          x: endX - startX,
          y: endY - startY,
          duration: 20 + Math.random() * 10,
          ease: 'sine.inOut'
        }, 0)
        .to(wisp, {
          opacity: 0,
          duration: 3,
          ease: 'power1.out'
        }, '-=5');
    };

    // Create wisps at intervals
    const interval = setInterval(() => {
      if (Math.random() > 0.5) { // 50% chance
        createWisp();
      }
    }, 8000 + Math.random() * 12000);
    
    // Create initial wisp
    setTimeout(createWisp, 2000);

    return () => {
      clearInterval(interval);
      wispsRef.current.forEach(wisp => {
        gsap.killTweensOf(wisp);
        wisp.remove();
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={containerRef} 
        className="spirit-wisp-container fixed inset-0 pointer-events-none z-1 overflow-hidden"
      />
      
      <style jsx>{`
        .spirit-wisp {
          position: absolute;
          opacity: 0;
          pointer-events: none;
          will-change: transform, opacity;
        }
      `}</style>
    </>
  );
};

export default SpiritWisps;
