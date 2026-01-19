import React, { useState } from 'react';
import { gsap } from 'gsap';

/**
 * RuneTooltip - Hoverable runes that reveal lore
 * Shows micro-lore text on hover
 */
const RuneTooltip = ({ rune, lore, position = 'top' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="rune-tooltip-container inline-block relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`rune-symbol text-2xl cursor-help transition-all duration-300 ${
        isHovered ? 'text-cyan-mist glow-text scale-110' : 'text-astral opacity-40'
      }`}>
        {rune}
      </span>
      
      {isHovered && (
        <div className={`rune-tooltip-popup absolute ${
          position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
        } left-1/2 transform -translate-x-1/2 whitespace-nowrap
          glass-effect px-3 py-2 rounded-md text-sm text-starlight
          animate-fade-in pointer-events-none`}
          style={{
            boxShadow: '0 0 20px rgba(103, 232, 249, 0.4)',
            border: '1px solid rgba(103, 232, 249, 0.3)'
          }}
        >
          {lore}
          <div className={`absolute left-1/2 transform -translate-x-1/2 ${
            position === 'top' ? 'top-full' : 'bottom-full'
          } w-2 h-2 bg-midnight-deep border border-cyan-mist/30 rotate-45`}></div>
        </div>
      )}
    </div>
  );
};

/**
 * RuneHoverReveal - Scatter runes across interface that light up on hover
 */
export const RuneHoverRevealContainer = ({ runes = [] }) => {
  const defaultRunes = runes.length > 0 ? runes : [
    { symbol: 'ᚱ', lore: 'Memory', x: 10, y: 20 },
    { symbol: 'ᛟ', lore: 'Growth', x: 85, y: 15 },
    { symbol: 'ᛉ', lore: 'Origin', x: 50, y: 80 },
    { symbol: '✦', lore: 'Future', x: 20, y: 70 },
    { symbol: 'ᛊ', lore: 'Wisdom', x: 75, y: 60 }
  ];

  return (
    <div className="rune-hover-container absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
      {defaultRunes.map((runeData, index) => (
        <div
          key={index}
          className="absolute pointer-events-auto"
          style={{
            left: `${runeData.x}%`,
            top: `${runeData.y}%`
          }}
        >
          <RuneTooltip 
            rune={runeData.symbol} 
            lore={runeData.lore}
            position={runeData.y > 50 ? 'top' : 'bottom'}
          />
        </div>
      ))}
    </div>
  );
};

export default RuneTooltip;
