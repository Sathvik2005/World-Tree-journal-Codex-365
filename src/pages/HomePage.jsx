import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MythicLogo from '../components/Mythic/MythicLogo';
import FireflyStars from '../components/Mythic/FireflyStars';
import SeasonalOverlay from '../components/Mythic/SeasonalOverlay';
import SpiritWisps from '../components/Mythic/SpiritWisps';
import RuneHoverRevealContainer from '../components/Mythic/RuneTooltip';
import HeroEntrance from '../components/Mythic/HeroEntrance';
import ParallaxLayers from '../components/Mythic/ParallaxLayers';
import TiltCard from '../components/Mythic/TiltCard';
import GrowthTracker from '../components/Mythic/GrowthTracker';
import InteractiveRoots from '../components/Mythic/InteractiveRoots';

const HomePage = () => {
  const [showEntrance, setShowEntrance] = useState(true);

  return (
    <ParallaxLayers>
      <div className="min-h-screen bg-midnight text-starlight relative overflow-hidden">
        {/* Hero Entrance Animation */}
        {showEntrance && (
          <HeroEntrance onComplete={() => setShowEntrance(false)} />
        )}

        {/* Mythic Atmosphere */}
        <FireflyStars count={55} speed="slow" />
        <SeasonalOverlay season="spring" intensity={0.25} />
        <SpiritWisps count={3} />
        <InteractiveRoots />
        <GrowthTracker progress={50} totalDays={180} />
      
        {/* Home Runes */}
        <RuneHoverRevealContainer runes={[
          { symbol: 'ᚺ', lore: 'Home', x: 12, y: 25 },
          { symbol: 'ᛃ', lore: 'Journey', x: 85, y: 22 },
          { symbol: 'ᛞ', lore: 'Day', x: 15, y: 75 },
          { symbol: 'ᚾ', lore: 'Night', x: 82, y: 78 }
        ]} />

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center mb-16">
            {/* Logo */}
            <div className="flex justify-center mb-8 animate-fade-in">
              <MythicLogo size={200} animate showTimeRings />
            </div>
          
            <h1 className="text-6xl md:text-8xl font-bold mb-6 glow-text animate-fade-in-up" style={{ fontFamily: 'Montserrat, sans-serif', animationDelay: '0.3s' }}>
              Mythical World Tree
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-cyan-mist animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              Journey Through the Realms of Legend
            </p>
            <p className="text-xl text-starlight-dim max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              Embark on an epic adventure through mystical realms, encounter legendary creatures, 
              and discover the ancient secrets of the World Tree.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Writer's Realm Card */}
            <TiltCard>
              <Link to="/writer" className="block group h-full">
                <div className="glass-effect rounded-2xl p-8 shadow-2xl border border-astral/20 hover:border-cyan-mist/50 hover:shadow-glow-cyan relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-cyan-mist/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="text-5xl mb-4 text-center relative z-10">🌳</div>
                  <h2 className="text-2xl font-bold mb-4 text-center text-starlight relative z-10" style={{ fontFamily: 'Montserrat, sans-serif' }}>Writer's Realm</h2>
                  <p className="text-base text-center text-starlight-dim relative z-10">
                    Complete creative writing ecosystem with 13+ tools for worldbuilding and storytelling.
                  </p>
                  <div className="mt-6 text-center relative z-10">
                    <span className="inline-block bg-cyan-mist/20 text-cyan-mist px-5 py-2 rounded-full font-semibold text-sm shadow-glow-cyan transition-all duration-500">
                      Create Stories
                    </span>
                  </div>
                </div>
              </Link>
            </TiltCard>

            {/* Mythic Codex Card - PRIMARY (NEW DESIGN) */}
            <TiltCard className="lg:col-span-2">
              <Link to="/mythic" className="block group h-full">
                <div className="glass-effect rounded-2xl p-8 shadow-glow-astral border-2 border-astral/30 hover:border-cyan-mist hover:shadow-glow-cyan h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-astral/10 via-cyan-mist/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="text-6xl mb-4 text-center relative z-10">✦</div>
                  <h2 className="text-3xl font-bold mb-4 text-center text-cyan-mist relative z-10" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Mythic Codex ✨ NEW
                  </h2>
                  <p className="text-lg text-center mb-4 text-starlight-dim relative z-10">
                    Experience the legendary scroll-driven narrative. A living, breathing story where the World Tree 
                    unfolds before you through cosmic animations, ancient runes, and 365 sparks of becoming.
                  </p>
                  <div className="mt-6 text-center relative z-10">
                    <span className="inline-block bg-astral text-starlight px-6 py-3 rounded-full font-semibold text-lg shadow-glow-astral group-hover:shadow-glow-cyan transition-all duration-500">
                      Enter The Legend
                    </span>
                  </div>
                </div>
              </Link>
            </TiltCard>

            {/* Journal Card */}
            <TiltCard>
              <Link to="/journal" className="block group h-full">
                <div className="glass-effect rounded-2xl p-8 shadow-2xl border border-astral/20 hover:border-cyan-mist/50 hover:shadow-glow-cyan relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-astral/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="text-5xl mb-4 text-center relative z-10">📖</div>
                  <h2 className="text-2xl font-bold mb-4 text-center text-starlight relative z-10" style={{ fontFamily: 'Montserrat, sans-serif' }}>Living Journal</h2>
                  <p className="text-base text-center text-starlight-dim relative z-10">
                    Write daily entries that become memories etched into the World Tree, growing branches and awakening spirits.
                  </p>
                  <div className="mt-6 text-center relative z-10">
                    <span className="inline-block bg-cyan-mist/20 text-cyan-mist px-5 py-2 rounded-full font-semibold text-sm shadow-glow-cyan transition-all duration-500">
                      Begin Writing
                    </span>
                  </div>
                </div>
              </Link>
            </TiltCard>

            {/* World Tree Card */}
            <TiltCard>
              <Link to="/world-tree" className="block group h-full">
                <div className="glass-effect rounded-2xl p-8 shadow-2xl border border-astral/20 hover:border-cyan-mist/50 hover:shadow-glow-cyan relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-astral/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="text-5xl mb-4 text-center relative z-10">🌳</div>
                  <h2 className="text-2xl font-bold mb-4 text-center text-starlight relative z-10" style={{ fontFamily: 'Montserrat, sans-serif' }}>The World Tree</h2>
                  <p className="text-base text-center text-starlight-dim relative z-10">
                    Watch Yggdrasil grow and evolve with your journey. See memories transform into living branches.
                  </p>
                  <div className="mt-6 text-center relative z-10">
                    <span className="inline-block bg-cyan-mist/20 text-cyan-mist px-5 py-2 rounded-full font-semibold text-sm shadow-glow-cyan transition-all duration-500">
                      Explore Now
                    </span>
                  </div>
                </div>
              </Link>
            </TiltCard>

            {/* Realms Card */}
            <TiltCard>
              <Link to="/realms" className="block group h-full">
                <div className="glass-effect rounded-2xl p-8 shadow-2xl border border-astral/20 hover:border-cyan-mist/50 hover:shadow-glow-cyan relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-astral/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="text-5xl mb-4 text-center relative z-10">🌌</div>
                  <h2 className="text-2xl font-bold mb-4 text-center text-starlight relative z-10" style={{ fontFamily: 'Montserrat, sans-serif' }}>Mystical Realms</h2>
                  <p className="text-base text-center text-starlight-dim relative z-10">
                    Travel through Sky, Midgard, and Underworld - each realm reflecting different aspects of your journey.
                  </p>
                  <div className="mt-6 text-center relative z-10">
                    <span className="inline-block bg-cyan-mist/20 text-cyan-mist px-5 py-2 rounded-full font-semibold text-sm shadow-glow-cyan transition-all duration-500">
                      Discover Realms
                    </span>
                  </div>
                </div>
              </Link>
            </TiltCard>

            {/* Legends Card */}
            <TiltCard>
              <Link to="/legends" className="block group h-full">
                <div className="glass-effect rounded-2xl p-8 shadow-2xl border border-astral/20 hover:border-cyan-mist/50 hover:shadow-glow-cyan relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-cosmos-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="text-5xl mb-4 text-center relative z-10">📜</div>
                  <h2 className="text-2xl font-bold mb-4 text-center text-starlight relative z-10" style={{ fontFamily: 'Montserrat, sans-serif' }}>Ancient Legends</h2>
                  <p className="text-base text-center text-starlight-dim relative z-10">
                    Unlock mythical stories that respond to your journey, revealing new tales as you grow.
                  </p>
                  <div className="mt-6 text-center relative z-10">
                    <span className="inline-block bg-cosmos-purple/20 text-cosmos-purple px-5 py-2 rounded-full font-semibold text-sm shadow-glow-violet transition-all duration-500">
                      Read Legends
                    </span>
                  </div>
                </div>
              </Link>
            </TiltCard>
          </div>

          {/* Features Section */}
          <div className="mythic-border glass-effect rounded-3xl p-10 mb-16 border shadow-glow-blue scroll-reveal-section">
            <h2 className="text-4xl font-bold text-center mb-10 text-cyan-mist font-montserrat">Experience the Magic</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 hover:bg-astral/20 rounded-xl transition-all duration-700">
                <div className="text-5xl mb-3 opacity-70">🐉</div>
                <h3 className="text-xl font-bold mb-2 text-cyan-mist font-montserrat">Mythical Creatures</h3>
                <p className="text-starlight-dim font-inter">Dragons, phoenixes, unicorns, and more</p>
              </div>
              <div className="text-center p-6 hover:bg-astral/20 rounded-xl transition-all duration-700">
                <div className="text-5xl mb-3 opacity-70">✨</div>
                <h3 className="text-xl font-bold mb-2 text-cyan-mist font-montserrat">Magical Spirits</h3>
                <p className="text-starlight-dim font-inter">Bond with elemental and tree spirits</p>
              </div>
              <div className="text-center p-6 hover:bg-astral/20 rounded-xl transition-all duration-700">
                <div className="text-5xl mb-3 opacity-70">🌠</div>
                <h3 className="text-xl font-bold mb-2 text-cyan-mist font-montserrat">Cosmic Animations</h3>
                <p className="text-starlight-dim font-inter">Stunning visual effects and transitions</p>
              </div>
              <div className="text-center p-6 hover:bg-astral/20 rounded-xl transition-all duration-700">
                <div className="text-5xl mb-3 opacity-70">📝</div>
                <h3 className="text-xl font-bold mb-2 text-cyan-mist font-montserrat">Writer's Tools</h3>
                <p className="text-starlight-dim font-inter">Complete ecosystem for storytelling</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center relative scroll-reveal-section">
            <div className="absolute inset-0 bg-gradient-to-r from-astral to-cyan-mist opacity-20 blur-3xl"></div>
            <h2 className="text-4xl font-bold mb-6 text-cyan-mist font-montserrat relative z-10">Begin Your Living Journey</h2>
            <p className="text-xl text-starlight-dim mb-8 relative z-10 font-inter">
              Your story becomes the tree. Your words become the branches. Your journey becomes legend.
            </p>
            <Link to="/journal" className="relative z-10">
              <button className="bg-gradient-to-r from-astral to-cyan-mist text-midnight text-2xl font-bold px-12 py-4 rounded-full shadow-glow-cyan hover:shadow-glow-astral transform hover:scale-105 transition-all duration-700 font-montserrat">
                Start Your First Entry
              </button>
            </Link>
          </div>
        </div>
      </div>
    </ParallaxLayers>
  );
};

export default HomePage;
