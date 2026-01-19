import React, { useState } from 'react';

/**
 * Idea Seeds - Interactive writing prompts
 * Seeds expand into prompts, categorized by type
 */
const IdeaSeeds = ({ onSelectPrompt }) => {
  const [expandedSeed, setExpandedSeed] = useState(null);

  const seeds = {
    character: [
      "A warrior who refuses to fight",
      "Someone who can see the future but cannot change it",
      "A villain who believes they're the hero",
      "A child with an ancient soul",
      "Someone cursed to forget every person they meet"
    ],
    world: [
      "A city built inside a sleeping giant",
      "A forest where time flows differently",
      "Islands that sink and rise with the tides of magic",
      "A world where music is magic",
      "Ruins that rebuild themselves at night"
    ],
    conflict: [
      "Two allies must become enemies to save everyone",
      "A prophecy that contradicts itself",
      "The cost of power is memory",
      "Saving one world means destroying another",
      "A peace treaty that triggers a worse war"
    ],
    theme: [
      "What we inherit vs. what we choose",
      "The weight of forgotten names",
      "Power as a form of loneliness",
      "Truth as a living, changing thing",
      "The cost of immortality"
    ],
    magic: [
      "Magic powered by sacrifice of senses",
      "Spells written in blood that fade with lies",
      "A language only the dead can speak",
      "Magic that requires bargaining with your past self",
      "Power drawn from constellations"
    ]
  };

  const seedIcons = {
    character: '👤',
    world: '🌍',
    conflict: '⚔️',
    theme: '💭',
    magic: '✨'
  };

  const handleSeedClick = (category, promptIndex) => {
    const seedKey = `${category}-${promptIndex}`;
    if (expandedSeed === seedKey) {
      setExpandedSeed(null);
    } else {
      setExpandedSeed(seedKey);
    }
  };

  const handleUsePrompt = (prompt) => {
    if (onSelectPrompt) {
      onSelectPrompt(prompt);
    }
    setExpandedSeed(null);
  };

  return (
    <div className="idea-seeds mythic-border glass-effect rounded-2xl p-8">
      <h3 className="text-2xl font-bold font-montserrat text-cyan-mist mb-6 flex items-center gap-2">
        <span className="text-3xl">🌱</span> Idea Seeds
      </h3>

      <div className="space-y-6">
        {Object.entries(seeds).map(([category, prompts]) => (
          <div key={category}>
            <h4 className="text-lg font-semibold font-montserrat text-astral capitalize mb-3 flex items-center gap-2">
              <span>{seedIcons[category]}</span>
              {category}
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {prompts.map((prompt, index) => {
                const seedKey = `${category}-${index}`;
                const isExpanded = expandedSeed === seedKey;
                
                return (
                  <div key={index} className="relative">
                    <button
                      onClick={() => handleSeedClick(category, index)}
                      className={`w-full aspect-square rounded-lg transition-all duration-500 ${
                        isExpanded
                          ? 'bg-cyan-mist/30 border-2 border-cyan-mist scale-110'
                          : 'bg-midnight-deep border-2 border-starlight/20 hover:border-astral hover:scale-105'
                      }`}
                    >
                      <div className="flex items-center justify-center h-full">
                        <span className={`text-3xl transition-all duration-500 ${
                          isExpanded ? 'animate-pulse-glow' : ''
                        }`}>
                          🌱
                        </span>
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 z-10 animate-fade-in">
                        <div className="mythic-border glass-effect rounded-lg p-4 shadow-lg">
                          <p className="text-starlight font-inter text-sm mb-3 leading-relaxed">
                            {prompt}
                          </p>
                          <button
                            onClick={() => handleUsePrompt(prompt)}
                            className="w-full py-2 mythic-border glass-effect hover:glow-box text-cyan-mist text-sm font-montserrat rounded transition-all duration-300"
                          >
                            Use This Seed
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdeaSeeds;
