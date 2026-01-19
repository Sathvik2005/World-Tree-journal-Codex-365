import React from 'react';
import { useMythical } from '../contexts/MythicalContext';
import AnimatedTree from '../components/WorldTree/AnimatedTree';
import { TreeSpirit } from '../components/Spirits/TreeSpirit';
import { MythicalCreatures } from '../components/WorldTree/MythicalCreatures';
import { RealmPortal } from '../components/UI/RealmPortal';
import { Link } from 'react-router-dom';
import FireflyStars from '../components/Mythic/FireflyStars';
import SeasonalOverlay from '../components/Mythic/SeasonalOverlay';
import SpiritWisps from '../components/Mythic/SpiritWisps';
import InteractiveRoots from '../components/Mythic/InteractiveRoots';
import RuneHoverRevealContainer from '../components/Mythic/RuneTooltip';

const WorldTreePage = () => {
  const { totalEntries, treeStage, bondedSpirits, treeGrowth } = useMythical();

  // Determine season based on tree growth
  const getSeason = () => {
    if (treeGrowth < 25) return 'spring';
    if (treeGrowth < 50) return 'summer';
    if (treeGrowth < 75) return 'autumn';
    return 'winter';
  };

  return (
    <div className="min-h-screen bg-midnight text-starlight relative overflow-hidden">
      {/* Mythic Atmosphere */}
      <FireflyStars count={40} speed="medium" />
      <SeasonalOverlay season={getSeason()} intensity={0.3} />
      <SpiritWisps count={4} />
      <InteractiveRoots />
      
      {/* Rune Tooltips */}
      <RuneHoverRevealContainer runes={[
        { symbol: 'ᚣ', lore: 'Life', x: 10, y: 15 },
        { symbol: 'ᛏ', lore: 'Growth', x: 85, y: 20 },
        { symbol: 'ᛒ', lore: 'Roots', x: 15, y: 80 },
        { symbol: 'ᚦ', lore: 'Branches', x: 80, y: 75 }
      ]} />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-astral via-cyan-mist to-starlight mb-4 glow-text">
            The Living World Tree
          </h1>
          <p className="text-xl font-inter text-starlight/80 max-w-3xl mx-auto">
            Behold Yggdrasil, the World Tree that grows with your journey.
            Every journal entry strengthens its roots, every bond illuminates its branches.
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
          <div className="mythic-border glass-effect rounded-xl p-6 text-center transform hover:glow-box transition-all duration-700">
            <div className="text-3xl font-bold font-montserrat text-cyan-mist">{totalEntries}</div>
            <div className="text-sm font-inter text-starlight/70">Memories Inscribed</div>
          </div>
          <div className="mythic-border glass-effect rounded-xl p-6 text-center transform hover:glow-box transition-all duration-700">
            <div className="text-3xl font-bold font-montserrat text-astral capitalize">{treeStage}</div>
            <div className="text-sm font-inter text-starlight/70">Tree Stage</div>
          </div>
          <div className="mythic-border glass-effect rounded-xl p-6 text-center transform hover:glow-box transition-all duration-700">
            <div className="text-3xl font-bold font-montserrat text-cyan-mist">{bondedSpirits.length}</div>
            <div className="text-sm font-inter text-starlight/70">Bonded Spirits</div>
          </div>
          <div className="mythic-border glass-effect rounded-xl p-6 text-center transform hover:glow-box transition-all duration-700">
            <div className="text-3xl font-bold font-montserrat text-astral">{Math.floor(treeGrowth)}%</div>
            <div className="text-sm font-inter text-starlight/70">Growth Progress</div>
          </div>
        </div>

        {/* Call to Journal */}
        {totalEntries === 0 && (
          <div className="mb-12 max-w-3xl mx-auto mythic-border glass-effect rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold font-montserrat mb-4 text-cyan-mist">Your Tree Awaits Its First Memory</h2>
            <p className="text-lg mb-6 font-inter text-starlight/80">
              The World Tree cannot grow without your stories. 
              Write your first journal entry to begin the transformation.
            </p>
            <Link 
              to="/journal"
              className="inline-block bg-green-ethereal text-green-deep font-bold text-lg px-8 py-4 rounded-full hover:bg-emerald-flare hover:shadow-glow-rune transition-all duration-700 shadow-glow-green transform hover:scale-102"
            >
              Write Your First Entry
            </Link>
          </div>
        )}

        {/* Animated Tree Visualization */}
        <div className="mb-12 bg-forest bg-opacity-40 rounded-3xl p-8 backdrop-blur-sm border-2 border-green-mystic shadow-glow-green">
          <AnimatedTree />
        </div>

        {/* Tree Spirit Section */}
        <div className="mb-12">
          <TreeSpirit />
        </div>

        {/* Mythical Creatures Section */}
        <div className="mb-12">
          <MythicalCreatures />
        </div>

        {/* Realm Portal Section */}
        <div className="mb-12 bg-cosmos backdrop-blur-lg rounded-3xl p-8 shadow-glow-blue border-2 border-blue-mystic">
          <RealmPortal />
        </div>
      </div>
    </div>
  );
};

export default WorldTreePage;