import React, { useState } from 'react';
import { useMythical } from '../contexts/MythicalContext';
import SkyRealm from '../components/Realms/SkyRealm';
import MidgardRealm from '../components/Realms/MidgardRealm';
import UnderworldRealm from '../components/Realms/UnderworldRealm';
import FireflyStars from '../components/Mythic/FireflyStars';
import SeasonalOverlay from '../components/Mythic/SeasonalOverlay';
import SpiritWisps from '../components/Mythic/SpiritWisps';
import RuneHoverRevealContainer from '../components/Mythic/RuneTooltip';

/**
 * Realms Page Component
 * Showcases different realms within the mythical world.
 * Realms are states of mind - influenced by your journey.
 */
const RealmsPage = () => {
  const { activeRealm, changeRealm, realmAffinities } = useMythical();
  const [selectedRealm, setSelectedRealm] = useState(activeRealm);

  const handleRealmChange = (realm) => {
    setSelectedRealm(realm);
    changeRealm(realm);
  };

  // Get season based on active realm
  const getRealmSeason = () => {
    if (selectedRealm === 'sky') return 'spring';
    if (selectedRealm === 'midgard') return 'summer';
    return 'winter';
  };

  return (
    <div className="min-h-screen bg-midnight text-starlight p-8 relative overflow-hidden">
      {/* Mythic Atmosphere */}
      <FireflyStars count={50} speed="medium" />
      <SeasonalOverlay season={getRealmSeason()} intensity={0.35} />
      <SpiritWisps count={6} />
      
      {/* Realm-Specific Runes */}
      <RuneHoverRevealContainer runes={[
        { symbol: 'ᚺ', lore: 'Sky', x: 10, y: 20 },
        { symbol: 'ᛗ', lore: 'Earth', x: 50, y: 15 },
        { symbol: 'ᚾ', lore: 'Shadow', x: 85, y: 25 },
        { symbol: 'ᚹ', lore: 'Balance', x: 50, y: 85 }
      ]} />

      <div className="container mx-auto relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-astral via-cyan-mist to-starlight mb-4 glow-text">
            Realms of the Mind & Myth
          </h1>
          <p className="text-xl font-inter text-starlight/80 max-w-3xl mx-auto">
            Each realm reflects a state of being. Your affinity grows with exploration and journaling.
            The realms respond to your journey, shifting and evolving with your experiences.
          </p>
        </div>

        {/* Realm Affinities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="mythic-border glass-effect rounded-xl p-6 text-center hover:glow-box transition-all duration-700 transform hover:scale-102">
            <div className="text-lg font-semibold font-montserrat text-astral">Sky Realm</div>
            <div className="text-3xl font-bold mt-2 text-cyan-mist">{realmAffinities.sky}</div>
            <div className="text-sm font-inter text-starlight/60">Affinity Level</div>
          </div>
          <div className="mythic-border glass-effect rounded-xl p-6 text-center hover:glow-box transition-all duration-700 transform hover:scale-102">
            <div className="text-lg font-semibold font-montserrat text-astral">Midgard Realm</div>
            <div className="text-3xl font-bold mt-2 text-cyan-mist">{realmAffinities.midgard}</div>
            <div className="text-sm font-inter text-starlight/60">Affinity Level</div>
          </div>
          <div className="mythic-border glass-effect rounded-xl p-6 text-center hover:glow-box transition-all duration-700 transform hover:scale-102">
            <div className="text-lg font-semibold font-montserrat text-astral">Underworld Realm</div>
            <div className="text-3xl font-bold mt-2 text-cyan-mist">{realmAffinities.underworld}</div>
            <div className="text-sm font-inter text-starlight/60">Affinity Level</div>
          </div>
        </div>

        {/* Realm Selector */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => handleRealmChange('sky')}
            className={`px-8 py-4 rounded-xl text-xl font-bold font-montserrat transition-all duration-700 transform hover:scale-102 ${
              selectedRealm === 'sky'
                ? 'mythic-border glass-effect glow-box text-cyan-mist'
                : 'mythic-border glass-effect text-starlight hover:text-cyan-mist'
            }`}
          >
            Sky Realm
          </button>
          <button
            onClick={() => handleRealmChange('midgard')}
            className={`px-8 py-4 rounded-xl text-xl font-bold font-montserrat transition-all duration-700 transform hover:scale-102 ${
              selectedRealm === 'midgard'
                ? 'mythic-border glass-effect glow-box text-cyan-mist'
                : 'mythic-border glass-effect text-starlight hover:text-cyan-mist'
            }`}
          >
            Midgard Realm
          </button>
          <button
            onClick={() => handleRealmChange('underworld')}
            className={`px-8 py-4 rounded-xl text-xl font-bold font-montserrat transition-all duration-700 transform hover:scale-102 ${
              selectedRealm === 'underworld'
                ? 'mythic-border glass-effect glow-box text-cyan-mist'
                : 'mythic-border glass-effect text-starlight hover:text-cyan-mist'
            }`}
          >
            Underworld Realm
          </button>
        </div>

        {/* Realm Display */}
        <div className="animate-fade-in">
          {selectedRealm === 'sky' && <SkyRealm />}
          {selectedRealm === 'midgard' && <MidgardRealm />}
          {selectedRealm === 'underworld' && <UnderworldRealm />}
        </div>

        {/* All Realms Overview */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-text-glow text-center mb-8">All Realms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="realm-card transform hover:scale-102 transition-transform duration-700">
              <SkyRealm />
            </div>
            <div className="realm-card transform hover:scale-102 transition-transform duration-700">
              <MidgardRealm />
            </div>
            <div className="realm-card transform hover:scale-102 transition-transform duration-700">
              <UnderworldRealm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealmsPage;