import React, { useEffect, useRef } from 'react';

/**
 * World Tree Logo - Custom SVG
 * Minimal linework design: Circle + Tree + 365 dots + Star
 */
export const WorldTreeLogo = ({ size = 200, className = '', animate = false }) => {
  const logoRef = useRef(null);

  useEffect(() => {
    if (animate && logoRef.current) {
      logoRef.current.style.animation = 'breathe 6s ease-in-out infinite';
    }
  }, [animate]);

  return (
    <svg
      ref={logoRef}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* 365 Day Dots - Root Ring */}
      {[...Array(36)].map((_, i) => {
        const angle = (i / 36) * Math.PI * 2;
        const x = 100 + Math.cos(angle) * 85;
        const y = 100 + Math.sin(angle) * 85;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="1.2"
            fill="currentColor"
            opacity="0.4"
          />
        );
      })}

      {/* Tree Trunk */}
      <line
        x1="100"
        y1="140"
        x2="100"
        y2="80"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Left Branches */}
      <line
        x1="100"
        y1="100"
        x2="75"
        y2="85"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="75"
        y1="85"
        x2="60"
        y2="75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="75"
        y1="85"
        x2="65"
        y2="95"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Right Branches */}
      <line
        x1="100"
        y1="100"
        x2="125"
        y2="85"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="125"
        y1="85"
        x2="140"
        y2="75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="125"
        y1="85"
        x2="135"
        y2="95"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Center Upper Branch */}
      <line
        x1="100"
        y1="90"
        x2="100"
        y2="70"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="100"
        y1="75"
        x2="90"
        y2="65"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="100"
        y1="75"
        x2="110"
        y2="65"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Roots */}
      <line
        x1="100"
        y1="140"
        x2="90"
        y2="155"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />
      <line
        x1="100"
        y1="140"
        x2="110"
        y2="155"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />
      <line
        x1="90"
        y1="155"
        x2="80"
        y2="165"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="110"
        y1="155"
        x2="120"
        y2="165"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Star Above */}
      <path
        d="M100,45 L103,53 L111,53 L105,58 L107,66 L100,61 L93,66 L95,58 L89,53 L97,53 Z"
        fill="currentColor"
        opacity="0.8"
      />

      {/* Inner Glow Effect */}
      <circle
        cx="100"
        cy="100"
        r="70"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.2"
      />
    </svg>
  );
};

export default WorldTreeLogo;
