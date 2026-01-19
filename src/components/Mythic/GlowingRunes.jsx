import React, { useEffect, useState } from 'react';

/**
 * GlowingRunes - Ancient glyphs that subtly light up in the background
 * Features:
 * - Faint background runes that occasionally illuminate
 * - Do not overpower text or UI
 * - Whisper forgotten knowledge through light
 * - Placement: hero, story sections, dividers
 */
const GlowingRunes = ({ section = 'hero', density = 'medium' }) => {
  const [activeRunes, setActiveRunes] = useState(new Set());

  // Ancient rune symbols (Nordic/Elder Futhark inspired)
  const runeSymbols = [
    'ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ',
    'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ',
    'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛟ', 'ᛞ'
  ];

  // Density settings
  const densityConfig = {
    low: 5,
    medium: 8,
    high: 12
  };

  const runeCount = densityConfig[density] || densityConfig.medium;

  // Generate rune positions based on section
  const generateRunePositions = () => {
    return Array.from({ length: runeCount }, (_, i) => ({
      id: i,
      symbol: runeSymbols[Math.floor(Math.random() * runeSymbols.length)],
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: 1.5 + Math.random() * 1.5, // rem
      delay: Math.random() * 5, // seconds
      duration: 8 + Math.random() * 4 // seconds
    }));
  };

  const [runes] = useState(generateRunePositions);

  // Randomly activate runes
  useEffect(() => {
    const activateRandomRune = () => {
      const randomRune = Math.floor(Math.random() * runes.length);
      setActiveRunes(prev => {
        const next = new Set(prev);
        next.add(randomRune);
        return next;
      });

      // Deactivate after duration
      setTimeout(() => {
        setActiveRunes(prev => {
          const next = new Set(prev);
          next.delete(randomRune);
          return next;
        });
      }, 3000 + Math.random() * 2000);
    };

    // Activate runes at intervals
    const interval = setInterval(activateRandomRune, 2000 + Math.random() * 3000);
    
    // Initial activation
    setTimeout(activateRandomRune, 1000);

    return () => clearInterval(interval);
  }, [runes]);

  return (
    <div className={`glowing-runes-container absolute inset-0 overflow-hidden pointer-events-none ${section}`}>
      {runes.map((rune) => (
        <div
          key={rune.id}
          className={`rune-symbol absolute transition-all duration-1000 ${
            activeRunes.has(rune.id) ? 'rune-active' : 'rune-dormant'
          }`}
          style={{
            left: `${rune.x}%`,
            top: `${rune.y}%`,
            fontSize: `${rune.size}rem`,
            animationDelay: `${rune.delay}s`,
            animationDuration: `${rune.duration}s`,
          }}
        >
          {rune.symbol}
        </div>
      ))}

      <style jsx>{`
        .glowing-runes-container {
          z-index: 1;
        }

        .rune-symbol {
          font-family: 'Times New Roman', serif;
          color: rgba(59, 130, 246, 0.15);
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
          user-select: none;
          transform: translate(-50%, -50%);
        }

        .rune-dormant {
          opacity: 0.15;
          filter: blur(1px);
        }

        .rune-active {
          opacity: 0.5;
          color: rgba(103, 232, 249, 0.6);
          text-shadow: 
            0 0 10px rgba(103, 232, 249, 0.6),
            0 0 20px rgba(59, 130, 246, 0.4),
            0 0 30px rgba(59, 130, 246, 0.2);
          filter: blur(0);
          animation: rune-pulse 3s ease-in-out;
        }

        @keyframes rune-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        /* Section-specific positioning tweaks */
        .hero .rune-symbol {
          color: rgba(59, 130, 246, 0.1);
        }

        .story .rune-symbol {
          color: rgba(59, 130, 246, 0.12);
        }

        .divider .rune-symbol {
          color: rgba(103, 232, 249, 0.15);
        }
      `}</style>
    </div>
  );
};

/**
 * RuneDivider - Decorative rune line separator
 */
export const RuneDivider = ({ className = '' }) => {
  const dividerRunes = ['ᛟ', '·', 'ᛉ', '·', 'ᚱ', '·', 'ᛟ'];

  return (
    <div className={`rune-divider flex items-center justify-center gap-3 my-12 ${className}`}>
      {dividerRunes.map((rune, i) => (
        <span
          key={i}
          className="rune-divider-symbol text-cyan-400 opacity-40 animate-rune-fade"
          style={{
            animationDelay: `${i * 0.2}s`,
            fontSize: rune === '·' ? '0.75rem' : '1.25rem'
          }}
        >
          {rune}
        </span>
      ))}

      <style jsx>{`
        .rune-divider-symbol {
          font-family: 'Times New Roman', serif;
          text-shadow: 0 0 10px rgba(103, 232, 249, 0.5);
        }

        @keyframes rune-fade {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-rune-fade {
          animation: rune-fade 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default GlowingRunes;
