import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * InteractiveRoots - Root system that responds to cursor
 * Lights shift subtly toward mouse position
 */
const InteractiveRoots = ({ className = '' }) => {
  const rootsRef = useRef(null);
  const lightsRef = useRef([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!rootsRef.current) return;

    lightsRef.current.forEach((light, index) => {
      if (!light) return;

      const rect = light.getBoundingClientRect();
      const lightX = rect.left + rect.width / 2;
      const lightY = rect.top + rect.height / 2;

      const dx = mousePos.x - lightX;
      const dy = mousePos.y - lightY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 300;

      if (distance < maxDistance) {
        const influence = (1 - distance / maxDistance) * 20;
        const angle = Math.atan2(dy, dx);
        
        gsap.to(light, {
          x: Math.cos(angle) * influence,
          y: Math.sin(angle) * influence,
          scale: 1 + (1 - distance / maxDistance) * 0.5,
          opacity: 0.6 + (1 - distance / maxDistance) * 0.4,
          duration: 0.6,
          ease: 'power2.out'
        });
      } else {
        gsap.to(light, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 0.4,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
    });
  }, [mousePos]);

  // Root light positions
  const rootLights = [
    { x: '30%', y: '20%' },
    { x: '45%', y: '35%' },
    { x: '55%', y: '35%' },
    { x: '70%', y: '20%' },
    { x: '25%', y: '50%' },
    { x: '50%', y: '60%' },
    { x: '75%', y: '50%' },
    { x: '35%', y: '70%' },
    { x: '65%', y: '70%' }
  ];

  return (
    <div ref={rootsRef} className={`interactive-roots ${className}`}>
      <svg viewBox="0 0 800 600" className="w-full h-full opacity-30">
        <defs>
          <radialGradient id="rootGlow">
            <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Root structure paths */}
        <path
          d="M 400 0 Q 350 100 320 200 Q 290 300 250 400"
          stroke="rgba(103, 232, 249, 0.2)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 400 0 Q 450 100 480 200 Q 510 300 550 400"
          stroke="rgba(103, 232, 249, 0.2)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 400 0 Q 380 150 360 300 Q 340 450 300 600"
          stroke="rgba(103, 232, 249, 0.15)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 400 0 Q 420 150 440 300 Q 460 450 500 600"
          stroke="rgba(103, 232, 249, 0.15)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Interactive lights */}
      {rootLights.map((pos, index) => (
        <div
          key={index}
          ref={el => lightsRef.current[index] = el}
          className="root-light"
          style={{
            left: pos.x,
            top: pos.y
          }}
        />
      ))}

      <style jsx>{`
        .interactive-roots {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }

        .root-light {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: radial-gradient(circle, #F8FAFC 0%, #67E8F9 50%, transparent 100%);
          box-shadow: 
            0 0 15px rgba(103, 232, 249, 0.8),
            0 0 30px rgba(59, 130, 246, 0.6);
          transform: translate(-50%, -50%);
          opacity: 0.4;
          will-change: transform, opacity, scale;
        }
      `}</style>
    </div>
  );
};

export default InteractiveRoots;
