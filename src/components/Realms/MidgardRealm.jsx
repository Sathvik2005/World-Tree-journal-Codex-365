import React from 'react';

const MidgardRealm = () => {
  return (
    <div className="midgard-realm bg-gradient-to-b from-green-300 to-green-600 p-8 rounded-lg shadow-xl">
      <h2 className="text-4xl font-bold text-center mb-6 text-white">Midgard Realm</h2>
      <p className="text-center text-white text-lg mb-6">
        The realm of balance, where humans and nature coexist in harmony.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm text-white">
          <h3 className="text-xl font-semibold mb-2">Lush Forests</h3>
          <p className="text-sm">Ancient woods filled with life and magic</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm text-white">
          <h3 className="text-xl font-semibold mb-2">Majestic Mountains</h3>
          <p className="text-sm">Towering peaks touching the sky realms</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm text-white">
          <h3 className="text-xl font-semibold mb-2">Crystal Rivers</h3>
          <p className="text-sm">Pure waters flowing with elemental energy</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm text-white">
          <h3 className="text-xl font-semibold mb-2">Wildlife Spirits</h3>
          <p className="text-sm">Creatures imbued with natural magic</p>
        </div>
      </div>
    </div>
  );
};

export default MidgardRealm;