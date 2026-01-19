import React, { useState, useEffect } from 'react';

/**
 * Ritual Writing Timer
 * Mystical Pomodoro with runic chimes
 */
const RitualTimer = () => {
  const [duration, setDuration] = useState(25); // minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60); // seconds
  const [isActive, setIsActive] = useState(false);
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('mythical_ritual_sessions');
    return saved ? JSON.parse(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('mythical_ritual_sessions', sessions.toString());
  }, [sessions]);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      // Timer complete - play chime effect
      setIsActive(false);
      setSessions(s => s + 1);
      // In a full implementation, play audio chime here
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  const presets = [15, 25, 45, 60, 90];

  return (
    <div className="ritual-timer mythic-border glass-effect rounded-2xl p-8 max-w-md mx-auto">
      <h3 className="text-2xl font-bold font-montserrat text-cyan-mist text-center mb-6 flex items-center justify-center gap-2">
        <span className="text-3xl">⏳</span> Writing Ritual
      </h3>

      {/* Timer Display */}
      <div className="relative mb-8">
        <svg className="w-64 h-64 mx-auto" viewBox="0 0 200 200">
          {/* Background Circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(248, 250, 252, 0.1)"
            strokeWidth="8"
          />
          
          {/* Progress Circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#67E8F9"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 90}`}
            strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
            transform="rotate(-90 100 100)"
            className="transition-all duration-1000"
            style={{
              filter: `drop-shadow(0 0 ${8 + progress / 10}px #67E8F9)`,
            }}
          />

          {/* Runic Markers */}
          {[0, 90, 180, 270].map((angle, i) => {
            const radian = (angle * Math.PI) / 180;
            const x = 100 + 95 * Math.cos(radian);
            const y = 100 + 95 * Math.sin(radian);
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#67E8F9"
                fontSize="16"
                opacity="0.5"
              >
                ᚱ
              </text>
            );
          })}
        </svg>

        {/* Time Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold font-montserrat text-starlight mb-2">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="text-sm text-starlight/50 font-inter">
            {isActive ? 'Writing...' : 'Ready to begin'}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={toggleTimer}
          className={`flex-1 py-4 mythic-border glass-effect hover:glow-box font-montserrat rounded-xl transition-all duration-300 text-lg ${
            isActive ? 'text-cyan-mist' : 'text-starlight'
          }`}
        >
          {isActive ? '⏸ Pause' : '▶ Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-4 mythic-border glass-effect hover:glow-box font-montserrat rounded-xl transition-all duration-300 text-starlight"
        >
          ↻ Reset
        </button>
      </div>

      {/* Duration Presets */}
      <div className="mb-6">
        <label className="block text-sm font-semibold font-montserrat text-starlight/70 mb-2 text-center">
          Ritual Duration
        </label>
        <div className="flex gap-2 justify-center flex-wrap">
          {presets.map(preset => (
            <button
              key={preset}
              onClick={() => !isActive && setDuration(preset)}
              disabled={isActive}
              className={`px-4 py-2 rounded-lg font-inter text-sm transition-all duration-300 ${
                duration === preset
                  ? 'bg-cyan-mist text-midnight font-semibold'
                  : 'bg-midnight-deep text-starlight/70 hover:text-starlight disabled:opacity-30'
              }`}
            >
              {preset}m
            </button>
          ))}
        </div>
      </div>

      {/* Session Counter */}
      <div className="text-center pt-6 border-t border-starlight/10">
        <div className="text-2xl font-bold font-montserrat text-astral mb-1">
          {sessions}
        </div>
        <div className="text-xs text-starlight/50 font-inter">
          Rituals Completed
        </div>
      </div>
    </div>
  );
};

export default RitualTimer;
