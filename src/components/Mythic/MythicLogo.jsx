import React from 'react';

/**
 * MythicLogo - New hero logo with World Tree, time rings, and constellation
 * Features:
 * - Branching World Tree structure
 * - 365 marks forming time rings around the tree
 * - Branches forming constellations
 * - Single star above the crown
 * - Elegant line art with subtle glow
 */
const MythicLogo = ({ 
  size = 300, 
  className = '', 
  showTimeRings = true,
  animate = false 
}) => {
  // Generate 365 time ring markers (shown as dots in circles)
  const generateTimeRings = () => {
    const rings = [];
    const ringCount = 3; // Three concentric rings
    const dotsPerRing = [60, 100, 205]; // Total = 365
    
    for (let ring = 0; ring < ringCount; ring++) {
      const radius = 140 + ring * 15;
      const dots = dotsPerRing[ring];
      
      for (let i = 0; i < dots; i++) {
        const angle = (i / dots) * Math.PI * 2 - Math.PI / 2;
        const x = 200 + Math.cos(angle) * radius;
        const y = 200 + Math.sin(angle) * radius;
        
        rings.push(
          <circle
            key={`ring${ring}-dot${i}`}
            cx={x}
            cy={y}
            r={ring === 0 ? 1.2 : ring === 1 ? 0.9 : 0.6}
            fill="rgba(103, 232, 249, 0.4)"
            className={animate ? 'time-marker animate-marker-glow' : 'time-marker'}
            style={animate ? { animationDelay: `${(i / dots) * 2}s` } : {}}
          />
        );
      }
    }
    
    return rings;
  };

  return (
    <div className={`mythic-logo-container ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Luminous gradient */}
          <linearGradient id="mythicGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.4" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="logoGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Constellation glow */}
          <radialGradient id="starGlow">
            <stop offset="0%" stopColor="#F8FAFC" stopOpacity="1" />
            <stop offset="50%" stopColor="#67E8F9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 365 Time Ring Markers */}
        {showTimeRings && (
          <g className="time-rings" opacity="0.6">
            {generateTimeRings()}
          </g>
        )}

        {/* Outer Circle Frame */}
        <circle
          cx="200"
          cy="200"
          r="180"
          stroke="url(#mythicGlow)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#logoGlow)"
          className={animate ? 'animate-circle-draw' : ''}
        />

        {/* Tree Structure */}
        <g className="tree-structure" filter="url(#logoGlow)">
          {/* Roots */}
          <g className="roots" stroke="url(#mythicGlow)" strokeWidth="2" fill="none" strokeLinecap="round">
            <path d="M 200 280 Q 200 300 190 320" className={animate ? 'animate-root-grow' : ''} />
            <path d="M 200 280 Q 200 300 210 320" className={animate ? 'animate-root-grow' : ''} style={{ animationDelay: '0.2s' }} />
            <path d="M 190 300 Q 180 310 170 325" className={animate ? 'animate-root-grow' : ''} style={{ animationDelay: '0.3s' }} />
            <path d="M 210 300 Q 220 310 230 325" className={animate ? 'animate-root-grow' : ''} style={{ animationDelay: '0.4s' }} />
          </g>

          {/* Trunk */}
          <line
            x1="200"
            y1="280"
            x2="200"
            y2="120"
            stroke="url(#mythicGlow)"
            strokeWidth="4"
            strokeLinecap="round"
            className={animate ? 'animate-trunk-rise' : ''}
          />

          {/* Main Branches */}
          <g className="branches" stroke="url(#mythicGlow)" strokeWidth="2.5" fill="none" strokeLinecap="round">
            {/* Left main branch */}
            <path 
              d="M 200 180 Q 170 160 140 140" 
              className={animate ? 'animate-branch-grow' : ''}
              style={{ animationDelay: '0.5s' }}
            />
            {/* Right main branch */}
            <path 
              d="M 200 180 Q 230 160 260 140" 
              className={animate ? 'animate-branch-grow' : ''}
              style={{ animationDelay: '0.6s' }}
            />
            {/* Upper left branch */}
            <path 
              d="M 200 150 Q 180 135 160 115" 
              className={animate ? 'animate-branch-grow' : ''}
              style={{ animationDelay: '0.7s' }}
            />
            {/* Upper right branch */}
            <path 
              d="M 200 150 Q 220 135 240 115" 
              className={animate ? 'animate-branch-grow' : ''}
              style={{ animationDelay: '0.8s' }}
            />
          </g>

          {/* Fine Branch Tendrils */}
          <g className="tendrils" stroke="url(#mythicGlow)" strokeWidth="1.5" fill="none" opacity="0.7">
            <path d="M 140 140 Q 125 130 110 115" className={animate ? 'animate-branch-grow' : ''} style={{ animationDelay: '0.9s' }} />
            <path d="M 260 140 Q 275 130 290 115" className={animate ? 'animate-branch-grow' : ''} style={{ animationDelay: '1s' }} />
            <path d="M 160 115 Q 150 105 140 90" className={animate ? 'animate-branch-grow' : ''} style={{ animationDelay: '1.1s' }} />
            <path d="M 240 115 Q 250 105 260 90" className={animate ? 'animate-branch-grow' : ''} style={{ animationDelay: '1.2s' }} />
          </g>

          {/* Constellation Stars at Branch Tips */}
          <g className="constellation-stars">
            <circle cx="110" cy="115" r="3" fill="url(#starGlow)" className={animate ? 'animate-star-appear' : ''} style={{ animationDelay: '1.3s' }} />
            <circle cx="290" cy="115" r="3" fill="url(#starGlow)" className={animate ? 'animate-star-appear' : ''} style={{ animationDelay: '1.4s' }} />
            <circle cx="140" cy="90" r="2.5" fill="url(#starGlow)" className={animate ? 'animate-star-appear' : ''} style={{ animationDelay: '1.5s' }} />
            <circle cx="260" cy="90" r="2.5" fill="url(#starGlow)" className={animate ? 'animate-star-appear' : ''} style={{ animationDelay: '1.6s' }} />
            <circle cx="140" cy="140" r="2.5" fill="url(#starGlow)" className={animate ? 'animate-star-appear' : ''} style={{ animationDelay: '1.7s' }} />
            <circle cx="260" cy="140" r="2.5" fill="url(#starGlow)" className={animate ? 'animate-star-appear' : ''} style={{ animationDelay: '1.8s' }} />
          </g>

          {/* Constellation Connection Lines */}
          <g className="constellation-lines" stroke="#3B82F6" strokeWidth="0.5" fill="none" opacity="0.4">
            <line x1="110" y1="115" x2="140" y2="90" className={animate ? 'animate-line-draw' : ''} style={{ animationDelay: '1.9s' }} />
            <line x1="140" y1="90" x2="200" y2="100" className={animate ? 'animate-line-draw' : ''} style={{ animationDelay: '2s' }} />
            <line x1="200" y1="100" x2="260" y2="90" className={animate ? 'animate-line-draw' : ''} style={{ animationDelay: '2.1s' }} />
            <line x1="260" y1="90" x2="290" y2="115" className={animate ? 'animate-line-draw' : ''} style={{ animationDelay: '2.2s' }} />
          </g>
        </g>

        {/* Crown Star */}
        <g className="crown-star" filter="url(#logoGlow)">
          <circle
            cx="200"
            cy="100"
            r="6"
            fill="#F8FAFC"
            className={animate ? 'animate-crown-star' : ''}
            style={{ animationDelay: '2.3s' }}
          >
            <animate
              attributeName="opacity"
              values="0.6;1;0.6"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Star rays */}
          <g stroke="#67E8F9" strokeWidth="1.5" strokeLinecap="round" className={animate ? 'animate-crown-star' : ''} style={{ animationDelay: '2.4s' }}>
            <line x1="200" y1="94" x2="200" y2="106" />
            <line x1="194" y1="100" x2="206" y2="100" />
            <line x1="195.5" y1="95.5" x2="204.5" y2="104.5" />
            <line x1="195.5" y1="104.5" x2="204.5" y2="95.5" />
          </g>
        </g>

        {/* Central Glyph (optional) */}
        <text
          x="200"
          y="210"
          textAnchor="middle"
          fontSize="20"
          fill="rgba(59, 130, 246, 0.3)"
          fontFamily="serif"
          className={animate ? 'animate-glyph-reveal' : ''}
          style={{ animationDelay: '2.5s' }}
        >
          ᛉ
        </text>
      </svg>

      <style jsx>{`
        .mythic-logo-container {
          display: inline-block;
        }

        /* Animation Keyframes */
        @keyframes circle-draw {
          from {
            stroke-dasharray: 1130;
            stroke-dashoffset: 1130;
            opacity: 0;
          }
          to {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes root-grow {
          from {
            stroke-dasharray: 50;
            stroke-dashoffset: 50;
            opacity: 0;
          }
          to {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes trunk-rise {
          from {
            stroke-dasharray: 160;
            stroke-dashoffset: 160;
            opacity: 0;
          }
          to {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes branch-grow {
          from {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            opacity: 0;
          }
          to {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes star-appear {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes line-draw {
          from {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            opacity: 0;
          }
          to {
            stroke-dashoffset: 0;
            opacity: 0.4;
          }
        }

        @keyframes crown-star {
          from {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes glyph-reveal {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.3;
          }
        }

        @keyframes marker-glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        /* Apply animations */
        .animate-circle-draw {
          animation: circle-draw 2s ease-out forwards;
        }

        .animate-root-grow {
          animation: root-grow 1s ease-out forwards;
        }

        .animate-trunk-rise {
          animation: trunk-rise 1.5s ease-out forwards;
        }

        .animate-branch-grow {
          animation: branch-grow 1s ease-out forwards;
        }

        .animate-star-appear {
          animation: star-appear 0.8s ease-out forwards;
          transform-origin: center;
        }

        .animate-line-draw {
          animation: line-draw 0.8s ease-out forwards;
        }

        .animate-crown-star {
          animation: crown-star 1.5s ease-out forwards;
          transform-origin: center;
        }

        .animate-glyph-reveal {
          animation: glyph-reveal 1s ease-out forwards;
        }

        .animate-marker-glow {
          animation: marker-glow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MythicLogo;
