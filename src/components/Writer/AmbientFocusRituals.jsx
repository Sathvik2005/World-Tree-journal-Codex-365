import React, { useState, useEffect } from 'react';

/**
 * Ambient Focus Rituals - Progress rewards
 * Grows leaves every 15 mins, mist settles when idle, pulse on return
 */
const AmbientFocusRituals = ({ isWriting }) => {
  const [leaves, setLeaves] = useState([]);
  const [mistLevel, setMistLevel] = useState(0);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Track writing activity
  useEffect(() => {
    if (isWriting) {
      setLastActivity(Date.now());
      setMistLevel(0);
      setShowWelcomeBack(false);
    }
  }, [isWriting]);

  // Add leaf every 15 minutes of writing
  useEffect(() => {
    if (!isWriting) return;

    const leafTimer = setInterval(() => {
      const newLeaf = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
      };
      setLeaves(prev => [...prev, newLeaf]);
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(leafTimer);
  }, [isWriting]);

  // Increase mist when idle
  useEffect(() => {
    const mistTimer = setInterval(() => {
      const idleTime = Date.now() - lastActivity;
      
      if (idleTime > 60000) { // 1 minute idle
        setMistLevel(prev => Math.min(prev + 0.1, 1));
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(mistTimer);
  }, [lastActivity]);

  // Welcome back pulse
  useEffect(() => {
    if (isWriting && mistLevel > 0.5) {
      setShowWelcomeBack(true);
      setTimeout(() => setShowWelcomeBack(false), 3000);
    }
  }, [isWriting, mistLevel]);

  return (
    <div className="ambient-focus-rituals fixed inset-0 pointer-events-none z-40">
      {/* Floating Leaves */}
      {leaves.map(leaf => (
        <div
          key={leaf.id}
          className="absolute text-2xl animate-float opacity-70"
          style={{
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
            animationDuration: `${3 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          🍃
        </div>
      ))}

      {/* Settling Mist */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-astral/20 to-transparent transition-opacity duration-1000"
        style={{ opacity: mistLevel }}
      />

      {/* Welcome Back Pulse */}
      {showWelcomeBack && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse-glow text-6xl">
            ✦
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      {leaves.length > 0 && (
        <div className="absolute bottom-8 right-8 mythic-border glass-effect rounded-full px-6 py-3 pointer-events-auto">
          <span className="text-cyan-mist font-montserrat font-bold flex items-center gap-2">
            <span>🍃</span>
            {leaves.length} {leaves.length === 1 ? 'leaf' : 'leaves'} grown
          </span>
        </div>
      )}
    </div>
  );
};

export default AmbientFocusRituals;
