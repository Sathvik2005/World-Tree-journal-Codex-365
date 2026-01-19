import React from 'react';

const SkyRealm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-600 flex items-center justify-center rounded-lg shadow-xl p-8">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Sky Realm</h1>
        <p className="text-lg mb-6">A realm of endless possibilities and celestial wonders.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Celestial Beings</h3>
            <p className="text-sm">Majestic creatures that soar through the clouds</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Floating Islands</h3>
            <p className="text-sm">Ancient lands suspended in the endless sky</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Thunder Magic</h3>
            <p className="text-sm">Powerful energy crackling through the atmosphere</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Starlight Essence</h3>
            <p className="text-sm">Pure magic drawn from the cosmos above</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkyRealm;