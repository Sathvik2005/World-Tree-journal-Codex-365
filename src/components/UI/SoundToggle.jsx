import React, { useState } from 'react';

/**
 * Sound Toggle - Ambient audio control
 * Opt-in subtle background sounds
 */
const SoundToggle = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('mythical_sound_enabled') === 'true';
  });
  const [volume, setVolume] = useState(() => {
    return parseFloat(localStorage.getItem('mythical_sound_volume') || '0.3');
  });

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('mythical_sound_enabled', newState.toString());

    if (newState) {
      // Play ambient sound
      playAmbientSound();
    } else {
      // Stop ambient sound
      stopAmbientSound();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem('mythical_sound_volume', newVolume.toString());
    
    // Update audio element volume if playing
    const audio = document.getElementById('ambient-audio');
    if (audio) audio.volume = newVolume;
  };

  const playAmbientSound = () => {
    // Create audio element if doesn't exist
    let audio = document.getElementById('ambient-audio');
    if (!audio) {
      audio = new Audio();
      audio.id = 'ambient-audio';
      audio.loop = true;
      audio.volume = volume;
      // Note: You'll need to add actual audio file to public folder
      // audio.src = '/sounds/forest-ambient.mp3';
      document.body.appendChild(audio);
    }
    audio.play().catch(err => console.log('Audio play failed:', err));
  };

  const stopAmbientSound = () => {
    const audio = document.getElementById('ambient-audio');
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="mythic-border glass-effect rounded-xl p-4 flex items-center gap-3">
        {/* Toggle Button */}
        <button
          onClick={toggleSound}
          className="w-12 h-12 rounded-full mythic-border glass-effect hover:glow-box transition-all duration-300 flex items-center justify-center"
          aria-label={soundEnabled ? 'Disable ambient sound' : 'Enable ambient sound'}
        >
          <span className="text-2xl">
            {soundEnabled ? '🔊' : '🔇'}
          </span>
        </button>

        {/* Volume Slider */}
        {soundEnabled && (
          <div className="flex items-center gap-2 animate-fade-in">
            <span className="text-starlight/70 font-inter text-xs">Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-midnight-deep rounded-lg appearance-none cursor-pointer accent-cyan-mist"
              aria-label="Ambient sound volume"
            />
            <span className="text-starlight/70 font-inter text-xs">
              {Math.round(volume * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoundToggle;
