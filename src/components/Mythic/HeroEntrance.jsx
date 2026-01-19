import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * HeroEntrance - Dramatic intro sequence
 * Tree draws itself from roots to crown, then star ignites
 */
const HeroEntrance = ({ onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const timeline = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
          if (onComplete) {
            setTimeout(onComplete, 500);
          }
        }
      });

      // Fade in from darkness
      timeline.from(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      });

      // Draw roots
      timeline.from('.entrance-roots path', {
        strokeDashoffset: 500,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power2.out'
      }, '+=0.3');

      // Draw trunk
      timeline.from('.entrance-trunk', {
        strokeDashoffset: 300,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.5');

      // Draw branches
      timeline.from('.entrance-branches path', {
        strokeDashoffset: 400,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.4');

      // Ignite star
      timeline.from('.entrance-star', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(2)'
      });

      timeline.to('.entrance-star', {
        scale: 1.3,
        opacity: 1,
        duration: 0.5,
        yoyo: true,
        repeat: 1
      });

      // Fade out entrance
      timeline.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      }, '+=0.5');
    }
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div 
      ref={containerRef}
      className="hero-entrance fixed inset-0 z-50 bg-midnight flex items-center justify-center"
    >
      <svg viewBox="0 0 400 600" className="w-full max-w-md h-auto">
        <defs>
          <linearGradient id="entranceGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#67E8F9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
          </linearGradient>

          <filter id="entranceGlowFilter">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Roots */}
        <g className="entrance-roots" stroke="url(#entranceGlow)" strokeWidth="3" fill="none" filter="url(#entranceGlowFilter)">
          <path 
            d="M 200 450 Q 180 500 160 550"
            strokeDasharray="500"
          />
          <path 
            d="M 200 450 Q 220 500 240 550"
            strokeDasharray="500"
          />
          <path 
            d="M 160 500 Q 130 520 100 540"
            strokeDasharray="500"
          />
          <path 
            d="M 240 500 Q 270 520 300 540"
            strokeDasharray="500"
          />
        </g>

        {/* Trunk */}
        <path 
          className="entrance-trunk"
          d="M 200 450 L 200 200"
          stroke="url(#entranceGlow)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          filter="url(#entranceGlowFilter)"
          strokeDasharray="300"
        />

        {/* Branches */}
        <g className="entrance-branches" stroke="url(#entranceGlow)" strokeWidth="4" fill="none" filter="url(#entranceGlowFilter)">
          <path 
            d="M 200 300 Q 150 250 100 200"
            strokeDasharray="400"
          />
          <path 
            d="M 200 300 Q 250 250 300 200"
            strokeDasharray="400"
          />
          <path 
            d="M 200 250 Q 160 220 120 180"
            strokeDasharray="400"
          />
          <path 
            d="M 200 250 Q 240 220 280 180"
            strokeDasharray="400"
          />
        </g>

        {/* Crown Star */}
        <g className="entrance-star" filter="url(#entranceGlowFilter)">
          <circle
            cx="200"
            cy="150"
            r="12"
            fill="#F8FAFC"
          />
          <line x1="200" y1="138" x2="200" y2="162" stroke="#67E8F9" strokeWidth="2" />
          <line x1="188" y1="150" x2="212" y2="150" stroke="#67E8F9" strokeWidth="2" />
          <line x1="191" y1="141" x2="209" y2="159" stroke="#67E8F9" strokeWidth="2" />
          <line x1="191" y1="159" x2="209" y2="141" stroke="#67E8F9" strokeWidth="2" />
        </g>
      </svg>

      <style jsx>{`
        .hero-entrance {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default HeroEntrance;
