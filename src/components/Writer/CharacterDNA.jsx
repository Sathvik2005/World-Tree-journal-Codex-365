import React, { useState, useEffect } from 'react';

/**
 * Character DNA Builder
 * Core traits: name, motive, flaw, secret, arc
 */
const CharacterDNA = () => {
  const [characters, setCharacters] = useState(() => {
    const saved = localStorage.getItem('mythical_characters');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    localStorage.setItem('mythical_characters', JSON.stringify(characters));
  }, [characters]);

  const archetypes = [
    { icon: '🛡️', label: 'Hero', color: '#3B82F6' },
    { icon: '🧙', label: 'Mentor', color: '#8B5CF6' },
    { icon: '👑', label: 'Ruler', color: '#F59E0B' },
    { icon: '🗡️', label: 'Warrior', color: '#EF4444' },
    { icon: '🎭', label: 'Trickster', color: '#10B981' },
    { icon: '💔', label: 'Tragic', color: '#6B7280' },
  ];

  const addCharacter = () => {
    const newCharacter = {
      id: Date.now(),
      name: 'New Character',
      archetype: 'Hero',
      motive: '',
      flaw: '',
      secret: '',
      arc: '',
      relationships: [],
      notes: '',
    };
    setCharacters([newCharacter, ...characters]);
    setSelectedCharacter(newCharacter.id);
  };

  const updateCharacter = (id, updates) => {
    setCharacters(characters.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCharacter = (id) => {
    setCharacters(characters.filter(c => c.id !== id));
    setSelectedCharacter(null);
  };

  const selected = characters.find(c => c.id === selectedCharacter);

  return (
    <div className="character-dna h-full">
      <div className="flex gap-6 h-full">
        {/* Character List */}
        <div className="w-80 mythic-border glass-effect rounded-2xl p-6 space-y-4 overflow-y-auto">
          <div className="flex items-center justify-between sticky top-0 bg-midnight/90 backdrop-blur-sm pb-4 z-10">
            <h3 className="text-2xl font-bold font-montserrat text-cyan-mist flex items-center gap-2">
              <span className="text-3xl">🧬</span> Character DNA
            </h3>
            <button
              onClick={addCharacter}
              className="w-10 h-10 mythic-border glass-effect hover:glow-box rounded-lg transition-all duration-300 text-2xl"
            >
              +
            </button>
          </div>

          {characters.length === 0 ? (
            <div className="text-center py-12 text-starlight/50 font-inter text-sm">
              No characters yet. Create your first one!
            </div>
          ) : (
            characters.map(character => {
              const archetype = archetypes.find(a => a.label === character.archetype) || archetypes[0];
              return (
                <div
                  key={character.id}
                  onClick={() => setSelectedCharacter(character.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedCharacter === character.id
                      ? 'bg-cyan-mist/20 border-2 border-cyan-mist'
                      : 'bg-midnight-deep hover:bg-midnight-deep/70 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{archetype.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-starlight font-montserrat font-semibold truncate">
                        {character.name}
                      </h4>
                      <p className="text-starlight/50 font-inter text-xs">
                        {character.archetype}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Character Editor */}
        <div className="flex-1 mythic-border glass-effect rounded-2xl p-6 space-y-6 overflow-y-auto">
          {selected ? (
            <>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={selected.name}
                  onChange={(e) => updateCharacter(selected.id, { name: e.target.value })}
                  className="flex-1 text-3xl font-bold font-montserrat text-cyan-mist bg-transparent border-b-2 border-starlight/20 focus:border-cyan-mist focus:outline-none pb-2"
                  placeholder="Character Name"
                />
                <button
                  onClick={() => deleteCharacter(selected.id)}
                  className="text-red-400 hover:text-red-300 text-sm font-inter ml-4"
                >
                  Delete
                </button>
              </div>

              {/* Archetype */}
              <div>
                <label className="block text-sm font-semibold font-montserrat text-starlight/70 mb-3">
                  Archetype
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {archetypes.map(arch => (
                    <button
                      key={arch.label}
                      onClick={() => updateCharacter(selected.id, { archetype: arch.label })}
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        selected.archetype === arch.label
                          ? 'bg-cyan-mist/20 border-2 border-cyan-mist'
                          : 'bg-midnight-deep hover:bg-midnight-deep/70 border-2 border-transparent'
                      }`}
                    >
                      <div className="text-2xl mb-1">{arch.icon}</div>
                      <div className="text-xs font-inter text-starlight">{arch.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Core DNA Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold font-montserrat text-starlight/70 mb-2">
                    🎯 Core Motive
                  </label>
                  <textarea
                    value={selected.motive}
                    onChange={(e) => updateCharacter(selected.id, { motive: e.target.value })}
                    placeholder="What drives them? What do they want most?"
                    className="w-full bg-midnight-deep border-2 border-starlight/20 rounded-lg px-4 py-2 text-starlight font-inter resize-none focus:outline-none focus:border-cyan-mist h-20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold font-montserrat text-starlight/70 mb-2">
                    ⚠️ Fatal Flaw
                  </label>
                  <textarea
                    value={selected.flaw}
                    onChange={(e) => updateCharacter(selected.id, { flaw: e.target.value })}
                    placeholder="Their greatest weakness or blind spot"
                    className="w-full bg-midnight-deep border-2 border-starlight/20 rounded-lg px-4 py-2 text-starlight font-inter resize-none focus:outline-none focus:border-cyan-mist h-20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold font-montserrat text-starlight/70 mb-2">
                    🤫 Hidden Secret
                  </label>
                  <textarea
                    value={selected.secret}
                    onChange={(e) => updateCharacter(selected.id, { secret: e.target.value })}
                    placeholder="What are they hiding? Past trauma, hidden identity, etc."
                    className="w-full bg-midnight-deep border-2 border-starlight/20 rounded-lg px-4 py-2 text-starlight font-inter resize-none focus:outline-none focus:border-cyan-mist h-20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold font-montserrat text-starlight/70 mb-2">
                    📈 Character Arc
                  </label>
                  <textarea
                    value={selected.arc}
                    onChange={(e) => updateCharacter(selected.id, { arc: e.target.value })}
                    placeholder="How will they change? What will they learn or lose?"
                    className="w-full bg-midnight-deep border-2 border-starlight/20 rounded-lg px-4 py-2 text-starlight font-inter resize-none focus:outline-none focus:border-cyan-mist h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold font-montserrat text-starlight/70 mb-2">
                    📝 Additional Notes
                  </label>
                  <textarea
                    value={selected.notes}
                    onChange={(e) => updateCharacter(selected.id, { notes: e.target.value })}
                    placeholder="Physical description, backstory, quirks, speech patterns..."
                    className="w-full bg-midnight-deep border-2 border-starlight/20 rounded-lg px-4 py-2 text-starlight font-inter resize-none focus:outline-none focus:border-cyan-mist h-32"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <div className="text-6xl mb-4 opacity-30">👤</div>
                <p className="text-starlight/70 font-inter text-sm">
                  Create or select a character
                </p>
                <p className="text-starlight/50 font-inter text-xs mt-2">
                  Build deep characters with core motives, flaws, secrets, and arcs
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterDNA;
