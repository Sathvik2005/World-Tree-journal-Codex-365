import React from 'react';

const AnimatedGlow = ({ children, className }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-50 blur-lg animate-pulse"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedGlow;