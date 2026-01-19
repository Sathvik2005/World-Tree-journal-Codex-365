import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * FireflyStars - Magical firefly-like stars that drift across the page
 * Replaces cosmic particles with more mystical firefly behavior
 */
const FireflyStars = ({ count = 60 }) => {
  const containerRef = useRef(null);
  const firefliesRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    firefliesRef.current = [];

    // Create fireflies
    for (let i = 0; i < count; i++) {
      const firefly = document.createElement('div');
      firefly.className = 'firefly';
      
      // Random starting position
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      
      firefly.style.left = `${startX}px`;
      firefly.style.top = `${startY}px`;
      
      // Random size (fireflies vary)
      const size = 2 + Math.random() * 3;
      firefly.style.width = `${size}px`;
      firefly.style.height = `${size}px`;
      
      container.appendChild(firefly);
      firefliesRef.current.push(firefly);
      
      // Animate each firefly
      animateFirefly(firefly, i);
    }

    return () => {
      // Cleanup
      firefliesRef.current.forEach(firefly => {
        gsap.killTweensOf(firefly);
        firefly.remove();
      });
    };
  }, [count]);

  const animateFirefly = (firefly, index) => {
    // Random movement pattern
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * 5;
    
    // Create organic movement path
    const moveX = (Math.random() - 0.5) * 400;
    const moveY = (Math.random() - 0.5) * 400;
    
    // Pulse glow effect
    gsap.to(firefly, {
      opacity: 0.2 + Math.random() * 0.6,
      duration: 1 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: delay
    });
    
    // Movement animation
    gsap.to(firefly, {
      x: `+=${moveX}`,
      y: `+=${moveY}`,
      duration: duration,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: delay,
      onRepeat: () => {
        // Randomize next movement
        const newMoveX = (Math.random() - 0.5) * 400;
        const newMoveY = (Math.random() - 0.5) * 400;
        gsap.to(firefly, {
          x: `+=${newMoveX}`,
          y: `+=${newMoveY}`,
          duration: 8 + Math.random() * 12,
          ease: 'sine.inOut'
        });
      }
    });
    
    // Scale pulse (breathing effect)
    gsap.to(firefly, {
      scale: 0.8 + Math.random() * 0.4,
      duration: 2 + Math.random() * 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: delay + 0.5
    });
  };

  return (
    <>
      <div 
        ref={containerRef} 
        className="firefly-container fixed inset-0 pointer-events-none z-0 overflow-hidden"
      />
      
      <style jsx>{`
        .firefly-container {
          perspective: 1000px;
        }
        
        .firefly {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, #F8FAFC 0%, #67E8F9 50%, transparent 100%);
          box-shadow: 
            0 0 10px rgba(248, 250, 252, 0.8),
            0 0 20px rgba(103, 232, 249, 0.6),
            0 0 30px rgba(59, 130, 246, 0.4);
          filter: blur(1px);
          pointer-events: none;
          will-change: transform, opacity;
        }
      `}</style>
    </>
  );
};

export default FireflyStars;
