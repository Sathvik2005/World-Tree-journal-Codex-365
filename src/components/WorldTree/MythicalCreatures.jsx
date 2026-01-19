import React from 'react';

/**
 * MythicalCreatures Component
 * Displays various mythical creatures that inhabit the world tree.
 */
export const MythicalCreatures = () => {
  const creatures = [
    { name: 'Phoenix', description: 'A fiery bird that symbolizes rebirth.' },
    { name: 'Unicorn', description: 'A majestic horse with a single horn, representing purity.' },
    { name: 'Dragon', description: 'A powerful creature that embodies strength and wisdom.' },
    { name: 'Fairy', description: 'A small, magical being that brings joy and mischief.' },
    { name: 'Griffin', description: 'A majestic creature with the body of a lion and the head of an eagle.' },
  ];

  return (
    <div className="mythical-creatures">
      <h2 className="text-2xl font-bold text-center mb-4">Mythical Creatures of the World Tree</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creatures.map((creature, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-xl font-semibold">{creature.name}</h3>
            <p className="text-gray-600">{creature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MythicalCreatures;