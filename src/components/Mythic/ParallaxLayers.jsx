import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ParallaxLayers - Three-layer parallax system
 * Background starscape, midground tree, foreground runes
 */
const ParallaxLayers = ({ children }) => {
  const bgRef = useRef(null);
  const midRef = useRef(null);
  const fgRef = useRef(null);

  useEffect(() => {
    // Background layer (slowest)
    gsap.to(bgRef.current, {
      y: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Midground layer (medium speed)
    gsap.to(midRef.current, {
      y: '15%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5
      }
    });

    // Foreground layer (fastest)
    gsap.to(fgRef.current, {
      y: '-10%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.2
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="parallax-container relative">
      {/* Background Layer - Deep Starscape */}
      <div 
        ref={bgRef}
        className="parallax-bg fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-starlight rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                opacity: Math.random() * 0.8
              }}
            />
          ))}
        </div>
      </div>

      {/* Midground Layer - Main Content */}
      <div 
        ref={midRef}
        className="parallax-mid relative"
        style={{ zIndex: 10 }}
      >
        {children}
      </div>

      {/* Foreground Layer - Floating Runes */}
      <div 
        ref={fgRef}
        className="parallax-fg fixed inset-0 pointer-events-none"
        style={{ zIndex: 30 }}
      >
        {['ᚱ', 'ᛟ', 'ᛉ', '✦'].map((rune, i) => (
          <div
            key={i}
            className="absolute text-4xl text-astral opacity-10"
            style={{
              left: `${20 + i * 25}%`,
              top: `${30 + i * 15}%`
            }}
          >
            {rune}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParallaxLayers;
