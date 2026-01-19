import React from 'react';

const UnderworldRealm = () => {
  return (
    <div className="underworld-realm bg-gradient-to-b from-gray-800 to-black text-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Underworld Realm</h2>
      <p className="mb-6">
        Welcome to the Underworld Realm, a mystical place where shadows dance and secrets dwell. Here, the essence of life and death intertwines, creating a balance that sustains the mythical world.
      </p>
      <div className="features grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="feature bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-semibold">Mystical Shadows</h3>
          <p>Explore the depths of the shadows, where ancient spirits whisper and guide you through the mysteries of existence.</p>
        </div>
        <div className="feature bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-semibold">Ethereal Creatures</h3>
          <p>Encounter mythical creatures that inhabit the underworld, each with their own stories and powers.</p>
        </div>
        <div className="feature bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-semibold">Rituals of the Ancients</h3>
          <p>Participate in ancient rituals that connect you to the essence of the underworld and its timeless wisdom.</p>
        </div>
        <div className="feature bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-semibold">Gateway to the Unknown</h3>
          <p>Discover portals that lead to other realms, each offering unique experiences and challenges.</p>
        </div>
      </div>
    </div>
  );
};

export default UnderworldRealm;