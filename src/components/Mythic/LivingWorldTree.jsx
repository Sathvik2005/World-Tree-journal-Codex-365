import React, { useEffect, useRef, useState } from 'react';

/**
 * LivingWorldTree - Fully animated centerpiece hero element
 * Features:
 * - Roots grow and spread on page load
 * - Branches animate upward with flowing light
 * - Leaves/glyphs appear like sparks
 * - Soft pulsing aura around trunk
 * - Seamless loop, slow and mythic
 */
const LivingWorldTree = ({ className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const svgRef = useRef(null);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`living-tree-container relative ${className}`}>
      {/* Pulsing Aura Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="tree-aura"></div>
      </div>

      {/* Main SVG Tree */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 1000"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full"
        style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))' }}
      >
        <defs>
          {/* Luminous gradient for veins */}
          <linearGradient id="lightFlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8">
              <animate
                attributeName="stop-color"
                values="#3B82F6;#67E8F9;#3B82F6"
                dur="6s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.4">
              <animate
                attributeName="stop-color"
                values="#F8FAFC;#3B82F6;#F8FAFC"
                dur="6s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Animated light flow for branches */}
          <linearGradient id="branchFlow" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0">
              <animate
                attributeName="offset"
                values="0;1;0"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#67E8F9" stopOpacity="0.8">
              <animate
                attributeName="offset"
                values="0.5;1;0.5"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ROOT SYSTEM - Grows and spreads on load */}
        <g className={`roots ${isLoaded ? 'animate-roots-grow' : 'opacity-0'}`}>
          {/* Main root */}
          <path
            d="M 400 800 Q 400 850 380 900 Q 360 950 340 1000"
            stroke="url(#lightFlow)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          
          {/* Left root system */}
          <path
            d="M 400 800 Q 350 830 300 870 Q 250 910 200 950"
            stroke="url(#lightFlow)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ animationDelay: '0.3s' }}
          />
          
          <path
            d="M 300 870 Q 250 890 200 920 Q 150 950 100 980"
            stroke="url(#lightFlow)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ animationDelay: '0.5s' }}
          />

          <path
            d="M 340 900 Q 300 920 250 950 Q 200 980 150 1000"
            stroke="url(#lightFlow)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ animationDelay: '0.7s' }}
          />

          {/* Right root system */}
          <path
            d="M 400 800 Q 450 830 500 870 Q 550 910 600 950"
            stroke="url(#lightFlow)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ animationDelay: '0.4s' }}
          />

          <path
            d="M 500 870 Q 550 890 600 920 Q 650 950 700 980"
            stroke="url(#lightFlow)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ animationDelay: '0.6s' }}
          />

          <path
            d="M 460 900 Q 500 920 550 950 Q 600 980 650 1000"
            stroke="url(#lightFlow)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ animationDelay: '0.8s' }}
          />

          {/* Fine root tendrils */}
          <path
            d="M 200 920 Q 170 940 140 970"
            stroke="#3B82F6"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
            style={{ animationDelay: '1s' }}
          />
          <path
            d="M 600 920 Q 630 940 660 970"
            stroke="#3B82F6"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
            style={{ animationDelay: '1.1s' }}
          />
        </g>

        {/* TRUNK - Pulsing with light */}
        <g className={`trunk ${isLoaded ? 'animate-trunk-glow' : 'opacity-0'}`}>
          <path
            d="M 380 800 Q 390 600 395 400 Q 400 200 400 50"
            stroke="url(#lightFlow)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          <path
            d="M 420 800 Q 410 600 405 400 Q 400 200 400 50"
            stroke="url(#lightFlow)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
          />
        </g>

        {/* BRANCHES - Animate upward with flowing light */}
        <g className={`branches ${isLoaded ? 'animate-branches-rise' : 'opacity-0'}`}>
          {/* Main left branch */}
          <path
            d="M 400 300 Q 350 280 300 250 Q 250 220 200 180"
            stroke="url(#branchFlow)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          
          {/* Secondary left branches */}
          <path
            d="M 300 250 Q 280 230 250 200 Q 220 170 180 130"
            stroke="url(#branchFlow)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ animationDelay: '0.5s' }}
          />
          
          <path
            d="M 250 200 Q 230 180 200 150 Q 170 120 140 80"
            stroke="url(#branchFlow)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ animationDelay: '0.8s' }}
          />

          {/* Main right branch */}
          <path
            d="M 400 300 Q 450 280 500 250 Q 550 220 600 180"
            stroke="url(#branchFlow)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ animationDelay: '0.3s' }}
          />

          {/* Secondary right branches */}
          <path
            d="M 500 250 Q 520 230 550 200 Q 580 170 620 130"
            stroke="url(#branchFlow)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ animationDelay: '0.6s' }}
          />

          <path
            d="M 550 200 Q 570 180 600 150 Q 630 120 660 80"
            stroke="url(#branchFlow)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ animationDelay: '0.9s' }}
          />

          {/* Top branches forming canopy */}
          <path
            d="M 400 150 Q 380 130 360 100 Q 340 70 320 40"
            stroke="url(#branchFlow)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ animationDelay: '0.4s' }}
          />

          <path
            d="M 400 150 Q 420 130 440 100 Q 460 70 480 40"
            stroke="url(#branchFlow)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ animationDelay: '0.7s' }}
          />

          {/* Fine branch tendrils */}
          <path
            d="M 200 180 Q 180 160 160 130 Q 140 100 120 60"
            stroke="url(#branchFlow)"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
            style={{ animationDelay: '1s' }}
          />

          <path
            d="M 600 180 Q 620 160 640 130 Q 660 100 680 60"
            stroke="url(#branchFlow)"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
            style={{ animationDelay: '1.2s' }}
          />
        </g>

        {/* LEAVES/GLYPHS - Appear like sparks of living memory */}
        <g className={`leaves ${isLoaded ? 'animate-leaves-spark' : 'opacity-0'}`}>
          {/* Left canopy leaves */}
          {[...Array(12)].map((_, i) => (
            <circle
              key={`leaf-left-${i}`}
              cx={200 - Math.random() * 100}
              cy={180 - i * 15}
              r="3"
              fill="#67E8F9"
              opacity="0"
              filter="url(#glow)"
              className="animate-leaf-appear"
              style={{ 
                animationDelay: `${1 + i * 0.15}s`,
                animationDuration: '2s',
                animationFillMode: 'forwards'
              }}
            >
              <animate
                attributeName="opacity"
                values="0;0.8;0.6;0.8"
                dur="4s"
                begin={`${1 + i * 0.15}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Right canopy leaves */}
          {[...Array(12)].map((_, i) => (
            <circle
              key={`leaf-right-${i}`}
              cx={600 + Math.random() * 100}
              cy={180 - i * 15}
              r="3"
              fill="#67E8F9"
              opacity="0"
              filter="url(#glow)"
              className="animate-leaf-appear"
              style={{ 
                animationDelay: `${1.2 + i * 0.15}s`,
                animationDuration: '2s',
                animationFillMode: 'forwards'
              }}
            >
              <animate
                attributeName="opacity"
                values="0;0.8;0.6;0.8"
                dur="4s"
                begin={`${1.2 + i * 0.15}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Top crown leaves */}
          {[...Array(8)].map((_, i) => (
            <circle
              key={`leaf-top-${i}`}
              cx={400 + (Math.random() - 0.5) * 120}
              cy={40 + i * 10}
              r="2.5"
              fill="#F8FAFC"
              opacity="0"
              filter="url(#glow)"
              className="animate-leaf-appear"
              style={{ 
                animationDelay: `${1.5 + i * 0.1}s`,
                animationDuration: '2s',
                animationFillMode: 'forwards'
              }}
            >
              <animate
                attributeName="opacity"
                values="0;1;0.8;1"
                dur="3s"
                begin={`${1.5 + i * 0.1}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Glowing glyphs scattered in canopy */}
          <g opacity="0.8" className="glyphs">
            {/* Ancient symbols */}
            <text
              x="150"
              y="140"
              fill="#3B82F6"
              fontSize="16"
              fontFamily="serif"
              opacity="0"
              filter="url(#glow)"
              style={{ animationDelay: '2s' }}
              className="animate-glyph-pulse"
            >
              ᚱ
            </text>
            <text
              x="650"
              y="140"
              fill="#3B82F6"
              fontSize="16"
              fontFamily="serif"
              opacity="0"
              filter="url(#glow)"
              style={{ animationDelay: '2.3s' }}
              className="animate-glyph-pulse"
            >
              ᛟ
            </text>
            <text
              x="380"
              y="80"
              fill="#67E8F9"
              fontSize="20"
              fontFamily="serif"
              opacity="0"
              filter="url(#glow)"
              style={{ animationDelay: '2.6s' }}
              className="animate-glyph-pulse"
            >
              ᛉ
            </text>
          </g>
        </g>

        {/* Crown Star - Final spark */}
        <g className={`crown-star ${isLoaded ? 'animate-star-ignite' : 'opacity-0'}`}>
          <circle
            cx="400"
            cy="20"
            r="8"
            fill="#F8FAFC"
            filter="url(#glow)"
            opacity="0"
            style={{ animationDelay: '3s' }}
          >
            <animate
              attributeName="opacity"
              values="0;1;0.7;1"
              dur="4s"
              begin="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="8;10;8"
              dur="4s"
              begin="3s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Star rays */}
          <path
            d="M 400 12 L 400 28 M 392 20 L 408 20 M 394 14 L 406 26 M 394 26 L 406 14"
            stroke="#67E8F9"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0"
            style={{ animationDelay: '3.2s' }}
          >
            <animate
              attributeName="opacity"
              values="0;0.8;0.5;0.8"
              dur="4s"
              begin="3.2s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </svg>

      <style jsx>{`
        .living-tree-container {
          width: 100%;
          max-width: 600px;
          height: 100vh;
          max-height: 800px;
          margin: 0 auto;
        }

        .tree-aura {
          width: 400px;
          height: 400px;
          background: radial-gradient(
            circle,
            rgba(59, 130, 246, 0.15) 0%,
            rgba(59, 130, 246, 0.05) 40%,
            transparent 70%
          );
          animation: pulse-aura 6s ease-in-out infinite;
        }

        @keyframes pulse-aura {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.8;
          }
        }

        .animate-roots-grow path {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw-root 3s ease-out forwards;
        }

        @keyframes draw-root {
          to {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        .animate-trunk-glow {
          animation: fade-in 2s ease-out forwards;
        }

        .animate-branches-rise path {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: draw-branch 4s ease-out forwards;
        }

        @keyframes draw-branch {
          to {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        .animate-glyph-pulse {
          animation: glyph-appear 3s ease-out forwards;
        }

        @keyframes glyph-appear {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
        }

        .animate-star-ignite circle,
        .animate-star-ignite path {
          animation: star-ignite 2s ease-out forwards;
        }

        @keyframes star-ignite {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          70% {
            opacity: 1;
            transform: scale(1.3);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LivingWorldTree;
