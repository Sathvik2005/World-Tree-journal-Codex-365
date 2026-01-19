import React, { useMemo } from 'react';
import { useMythical } from '../../contexts/MythicalContext';

/**
 * AnimatedTree - A Living Organism
 * 
 * Visual changes respond to:
 * - Journal volume
 * - Realm exploration
 * - Spirit bonds
 * - Dominant themes
 */

const AnimatedTree = () => {
  const { 
    treeGrowth, 
    branchDensity, 
    glowIntensity, 
    particleDensity,
    dominantTheme,
    totalEntries,
    bondedSpirits,
    treeStage,
  } = useMythical();

  // Theme-based colors - Dark Blue & Green system
  const themeColors = {
    wisdom: { primary: '#3B82F6', secondary: '#60A5FA', glow: '#93c5fd' },
    courage: { primary: '#f87171', secondary: '#fb923c', glow: '#fca5a5' },
    fate: { primary: '#6366F1', secondary: '#a78bfa', glow: '#c4b5fd' },
    balance: { primary: '#10B981', secondary: '#34D399', glow: '#6ee7b7' },
    shadow: { primary: '#6366F1', secondary: '#312E81', glow: '#a78bfa' },
  };

  const currentColors = themeColors[dominantTheme] || themeColors.balance;

  // Calculate dimensions based on growth
  const treeHeight = useMemo(() => 300 + (treeGrowth * 3), [treeGrowth]);
  const trunkWidth = useMemo(() => 40 + (treeGrowth * 0.5), [treeGrowth]);
  const branchCount = useMemo(() => Math.floor(3 + (totalEntries * 0.5)), [totalEntries]);

  // Generate branch positions
  const branches = useMemo(() => {
    const generated = [];
    for (let i = 0; i < Math.min(branchCount, 20); i++) {
      const angle = (i / branchCount) * 360;
      const length = 80 + (Math.random() * 120) * branchDensity;
      const width = 3 + (treeGrowth * 0.1);
      const delay = i * 0.1;
      
      generated.push({
        id: i,
        angle,
        length,
        width,
        delay,
        yOffset: 50 + (i * (treeHeight / branchCount)),
      });
    }
    return generated;
  }, [branchCount, branchDensity, treeGrowth, treeHeight]);

  // Particle system
  const particles = useMemo(() => {
    const count = Math.floor(20 * particleDensity);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
    }));
  }, [particleDensity]);

  return (
    <div className="relative w-full h-[600px] flex items-end justify-center overflow-hidden">
      {/* Background Glow */}
      <div 
        className="absolute inset-0 opacity-30 blur-3xl transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 80%, ${currentColors.glow}, transparent 70%)`,
          opacity: glowIntensity * 0.5,
        }}
      />

      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: currentColors.primary,
            boxShadow: `0 0 ${particle.size * 2}px ${currentColors.glow}`,
            animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            opacity: glowIntensity,
          }}
        />
      ))}

      {/* Tree Container */}
      <div className="relative" style={{ height: `${treeHeight}px` }}>
        {/* Roots */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          {[...Array(5)].map((_, i) => (
            <div
              key={`root-${i}`}
              className="absolute bottom-0 origin-top"
              style={{
                width: `${trunkWidth * 0.6}px`,
                height: `${100 + treeGrowth}px`,
                background: `linear-gradient(to bottom, ${currentColors.secondary}, transparent)`,
                transform: `rotate(${(i - 2) * 15}deg) translateX(-50%)`,
                borderRadius: '50%',
                opacity: 0.6,
                left: '50%',
                animation: `pulse ${3 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Main Trunk */}
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-1000"
          style={{
            width: `${trunkWidth}px`,
            height: `${treeHeight}px`,
            background: `linear-gradient(to top, ${currentColors.secondary}, ${currentColors.primary})`,
            borderRadius: `${trunkWidth / 2}px ${trunkWidth / 2}px 0 0`,
            boxShadow: `0 0 ${30 * glowIntensity}px ${currentColors.glow}`,
          }}
        >
          {/* Trunk Glow Pulse */}
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              background: `linear-gradient(to top, transparent, ${currentColors.glow})`,
              opacity: glowIntensity * 0.3,
              borderRadius: 'inherit',
            }}
          />
        </div>

        {/* Branches */}
        {branches.map(branch => (
          <div
            key={branch.id}
            className="absolute left-1/2 origin-left transition-all duration-500"
            style={{
              width: `${branch.length}px`,
              height: `${branch.width}px`,
              background: `linear-gradient(to right, ${currentColors.primary}, transparent)`,
              bottom: `${branch.yOffset}px`,
              transform: `rotate(${branch.angle}deg)`,
              borderRadius: '50%',
              boxShadow: `0 0 ${10 * glowIntensity}px ${currentColors.glow}`,
              animation: `sway ${4 + branch.id % 3}s ease-in-out infinite`,
              animationDelay: `${branch.delay}s`,
              opacity: 0.8,
            }}
          />
        ))}

        {/* Canopy */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000"
          style={{
            top: '0',
            width: `${150 + treeGrowth * 2}px`,
            height: `${150 + treeGrowth * 2}px`,
            background: `radial-gradient(circle, ${currentColors.primary}, ${currentColors.secondary}, transparent)`,
            borderRadius: '50%',
            opacity: 0.6 + (glowIntensity * 0.4),
            boxShadow: `0 0 ${50 * glowIntensity}px ${currentColors.glow}`,
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />

        {/* Bonded Spirits Orbiting */}
        {bondedSpirits.slice(0, 5).map((spirit, i) => (
          <div
            key={spirit.id}
            className="absolute left-1/2 top-1/2"
            style={{
              animation: `orbit ${10 + i * 2}s linear infinite`,
              animationDelay: `${i * -2}s`,
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-2xl opacity-70"
              style={{
                background: currentColors.glow,
                boxShadow: `0 0 20px ${currentColors.primary}`,
                transform: 'translate(-50%, -50%)',
              }}
            >
            </div>
          </div>
        ))}
      </div>

      {/* Info Display */}
      <div className="absolute top-4 left-4 text-text-primary bg-cosmos bg-opacity-80 px-4 py-2 rounded-lg backdrop-blur-md border border-green-mystic shadow-glow-green">
        <div className="text-sm font-mono">
          <div>Stage: <span className="text-green-glow capitalize font-semibold">{treeStage}</span></div>
          <div>Growth: <span className="text-cyan-rune font-semibold">{Math.floor(treeGrowth)}%</span></div>
          <div>Theme: <span className="text-emerald-flare capitalize font-semibold">{dominantTheme}</span></div>
          <div>Spirits: <span className="text-teal-spirit font-semibold">{bondedSpirits.length}</span></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTree;
