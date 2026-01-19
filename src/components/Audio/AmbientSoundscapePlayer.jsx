import React, { useState, useRef, useEffect } from 'react';

/**
 * Ambient Soundscape Player
 * Immersive audio environment for focused writing and journaling
 */
const AmbientSoundscapePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSounds, setActiveSounds] = useState([]);
  const [volume, setVolume] = useState(0.5);
  const [customMix, setCustomMix] = useState('forest');
  
  const audioContextRef = useRef(null);
  const audioNodesRef = useRef({});

  // Define sound library
  const soundLibrary = {
    nature: [
      { id: 'forest', name: 'Forest Ambience', icon: '🌲', file: '/sounds/forest.mp3', baseVolume: 0.6 },
      { id: 'rain', name: 'Gentle Rain', icon: '🌧️', file: '/sounds/rain.mp3', baseVolume: 0.7 },
      { id: 'ocean', name: 'Ocean Waves', icon: '🌊', file: '/sounds/ocean.mp3', baseVolume: 0.5 },
      { id: 'stream', name: 'Flowing Stream', icon: '💧', file: '/sounds/stream.mp3', baseVolume: 0.6 },
      { id: 'thunder', name: 'Distant Thunder', icon: '⛈️', file: '/sounds/thunder.mp3', baseVolume: 0.4 },
      { id: 'birds', name: 'Bird Songs', icon: '🐦', file: '/sounds/birds.mp3', baseVolume: 0.5 },
      { id: 'wind', name: 'Gentle Wind', icon: '💨', file: '/sounds/wind.mp3', baseVolume: 0.4 },
      { id: 'crickets', name: 'Night Crickets', icon: '🦗', file: '/sounds/crickets.mp3', baseVolume: 0.5 },
    ],
    mystical: [
      { id: 'chimes', name: 'Wind Chimes', icon: '🎐', file: '/sounds/chimes.mp3', baseVolume: 0.4 },
      { id: 'bells', name: 'Temple Bells', icon: '🔔', file: '/sounds/bells.mp3', baseVolume: 0.3 },
      { id: 'harp', name: 'Celtic Harp', icon: '🎵', file: '/sounds/harp.mp3', baseVolume: 0.4 },
      { id: 'flute', name: 'Bamboo Flute', icon: '🎶', file: '/sounds/flute.mp3', baseVolume: 0.4 },
      { id: 'choir', name: 'Ethereal Choir', icon: '✨', file: '/sounds/choir.mp3', baseVolume: 0.3 },
      { id: 'singing_bowl', name: 'Singing Bowl', icon: '🪔', file: '/sounds/bowl.mp3', baseVolume: 0.5 },
    ],
    ambient: [
      { id: 'cafe', name: 'Coffee Shop', icon: '☕', file: '/sounds/cafe.mp3', baseVolume: 0.5 },
      { id: 'library', name: 'Library', icon: '📚', file: '/sounds/library.mp3', baseVolume: 0.4 },
      { id: 'fireplace', name: 'Crackling Fire', icon: '🔥', file: '/sounds/fire.mp3', baseVolume: 0.6 },
      { id: 'night', name: 'Night Ambience', icon: '🌙', file: '/sounds/night.mp3', baseVolume: 0.5 },
      { id: 'white_noise', name: 'White Noise', icon: '📻', file: '/sounds/white.mp3', baseVolume: 0.5 },
      { id: 'brown_noise', name: 'Brown Noise', icon: '🎧', file: '/sounds/brown.mp3', baseVolume: 0.5 },
    ]
  };

  // Preset mixes
  const presetMixes = {
    forest: {
      name: 'Enchanted Forest',
      icon: '🌳',
      sounds: ['forest', 'birds', 'stream'],
      description: 'Deep forest with birds and water'
    },
    storm: {
      name: 'Cozy Storm',
      icon: '⛈️',
      sounds: ['rain', 'thunder', 'fireplace'],
      description: 'Rainy day by the fire'
    },
    mystical: {
      name: 'Mystical Realm',
      icon: '✨',
      sounds: ['chimes', 'choir', 'harp'],
      description: 'Ethereal and magical'
    },
    night: {
      name: 'Peaceful Night',
      icon: '🌙',
      sounds: ['night', 'crickets', 'wind'],
      description: 'Calm night atmosphere'
    },
    focus: {
      name: 'Deep Focus',
      icon: '🎧',
      sounds: ['brown_noise', 'cafe'],
      description: 'Concentration boost'
    },
    meditation: {
      name: 'Meditation',
      icon: '🧘',
      sounds: ['singing_bowl', 'stream', 'birds'],
      description: 'Mindful and centered'
    }
  };

  /**
   * Initialize Web Audio API
   */
  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    return () => {
      stopAllSounds();
    };
  }, []);

  /**
   * Load preset mix
   */
  const loadPreset = (presetName) => {
    const preset = presetMixes[presetName];
    if (!preset) return;

    stopAllSounds();
    setActiveSounds(preset.sounds);
    setCustomMix(presetName);
    
    // Start playing if was already playing
    if (isPlaying) {
      preset.sounds.forEach(soundId => playSound(soundId));
    }
  };

  /**
   * Play a sound
   */
  const playSound = async (soundId) => {
    // Note: In production, load actual audio files
    // For demo, we'll simulate audio playback
    
    const sound = Object.values(soundLibrary)
      .flat()
      .find(s => s.id === soundId);
    
    if (!sound) return;

    console.log(`Playing sound: ${sound.name}`);
    
    // In production:
    // const response = await fetch(sound.file);
    // const arrayBuffer = await response.arrayBuffer();
    // const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
    // const source = audioContextRef.current.createBufferSource();
    // source.buffer = audioBuffer;
    // source.loop = true;
    // const gainNode = audioContextRef.current.createGain();
    // gainNode.gain.value = sound.baseVolume * volume;
    // source.connect(gainNode);
    // gainNode.connect(audioContextRef.current.destination);
    // source.start(0);
    // audioNodesRef.current[soundId] = { source, gainNode };
  };

  /**
   * Stop a sound
   */
  const stopSound = (soundId) => {
    if (audioNodesRef.current[soundId]) {
      audioNodesRef.current[soundId].source.stop();
      delete audioNodesRef.current[soundId];
    }
  };

  /**
   * Stop all sounds
   */
  const stopAllSounds = () => {
    Object.keys(audioNodesRef.current).forEach(soundId => {
      stopSound(soundId);
    });
    setActiveSounds([]);
    setIsPlaying(false);
  };

  /**
   * Toggle sound on/off
   */
  const toggleSound = (soundId) => {
    if (activeSounds.includes(soundId)) {
      setActiveSounds(activeSounds.filter(s => s !== soundId));
      if (isPlaying) stopSound(soundId);
    } else {
      setActiveSounds([...activeSounds, soundId]);
      if (isPlaying) playSound(soundId);
    }
  };

  /**
   * Toggle play/pause
   */
  const togglePlayback = () => {
    if (isPlaying) {
      stopAllSounds();
    } else {
      setIsPlaying(true);
      activeSounds.forEach(soundId => playSound(soundId));
    }
  };

  /**
   * Update volume
   */
  const updateVolume = (newVolume) => {
    setVolume(newVolume);
    
    // Update all active gain nodes
    Object.values(audioNodesRef.current).forEach(node => {
      if (node.gainNode) {
        node.gainNode.gain.value = newVolume;
      }
    });
  };

  /**
   * Save custom mix
   */
  const saveCustomMix = () => {
    const name = prompt('Name your custom mix:');
    if (!name) return;

    const customMixes = JSON.parse(localStorage.getItem('mythical_custom_mixes') || '{}');
    customMixes[name] = {
      sounds: activeSounds,
      volume
    };
    localStorage.setItem('mythical_custom_mixes', JSON.stringify(customMixes));
    alert(`Mix "${name}" saved!`);
  };

  return (
    <div className="min-h-screen bg-midnight p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-starlight mb-2">Ambient Soundscapes</h1>
          <p className="text-starlight/60">
            Create the perfect atmosphere for focused writing and journaling
          </p>
        </div>

        {/* Playback Controls */}
        <div className="mb-8 p-6 bg-midnight-light rounded-2xl border border-midnight-lighter">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-starlight">
                {presetMixes[customMix]?.name || 'Custom Mix'}
              </h2>
              <p className="text-sm text-starlight/60">
                {activeSounds.length} sounds active
              </p>
            </div>
            
            <button
              onClick={togglePlayback}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all ${
                isPlaying
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-astral hover:bg-astral/80'
              }`}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
          </div>

          {/* Volume Control */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-starlight/70">Volume</span>
              <span className="text-sm text-astral font-medium">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => updateVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-midnight-dark rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Save Custom Mix */}
          {activeSounds.length > 0 && (
            <button
              onClick={saveCustomMix}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              💾 Save Custom Mix
            </button>
          )}
        </div>

        {/* Preset Mixes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-starlight mb-4">Preset Mixes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(presetMixes).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => loadPreset(key)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  customMix === key
                    ? 'bg-astral border-astral text-white'
                    : 'bg-midnight-light border-midnight-lighter text-starlight hover:border-astral/50'
                }`}
              >
                <div className="text-4xl mb-2">{preset.icon}</div>
                <div className="text-sm font-medium">{preset.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sound Library */}
        {Object.entries(soundLibrary).map(([category, sounds]) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold text-starlight mb-4 capitalize">
              {category} Sounds
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {sounds.map(sound => {
                const isActive = activeSounds.includes(sound.id);
                
                return (
                  <button
                    key={sound.id}
                    onClick={() => toggleSound(sound.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isActive
                        ? 'bg-astral/20 border-astral shadow-lg shadow-astral/20'
                        : 'bg-midnight-light border-midnight-lighter hover:border-astral/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{sound.icon}</div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-starlight">{sound.name}</div>
                        {isActive && (
                          <div className="text-xs text-astral mt-1">● Playing</div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Tips */}
        <div className="mt-8 p-4 bg-midnight-light rounded-lg border border-midnight-lighter">
          <h3 className="text-lg font-bold text-starlight mb-2">💡 Tips</h3>
          <ul className="text-sm text-starlight/70 space-y-1">
            <li>• Combine up to 3-4 sounds for the best experience</li>
            <li>• Use brown noise for deep focus and concentration</li>
            <li>• Mix rain with fireplace for ultimate coziness</li>
            <li>• Save your favorite combinations as custom mixes</li>
            <li>• Lower volume for background ambience (30-50%)</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default AmbientSoundscapePlayer;
