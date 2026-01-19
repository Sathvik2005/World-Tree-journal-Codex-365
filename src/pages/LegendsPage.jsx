import React, { useEffect } from 'react';
import { useMythical } from '../contexts/MythicalContext';
import { useMythicalJourney } from '../hooks/useMythicalJourney';
import MythicalCard from '../components/UI/MythicalCard';
import FireflyStars from '../components/Mythic/FireflyStars';
import SeasonalOverlay from '../components/Mythic/SeasonalOverlay';
import SpiritWisps from '../components/Mythic/SpiritWisps';
import RuneHoverRevealContainer from '../components/Mythic/RuneTooltip';

const LegendsPage = () => {
  const { legends, loading } = useMythicalJourney();
  const { totalEntries, unlockedLegends, unlockLegend, themes } = useMythical();

  // Auto-unlock legends based on progression
  useEffect(() => {
    if (totalEntries >= 1 && !unlockedLegends.includes('beginning')) {
      unlockLegend('beginning');
    }
    if (totalEntries >= 3 && !unlockedLegends.includes('first-encounter')) {
      unlockLegend('first-encounter');
    }
    if (totalEntries >= 5 && !unlockedLegends.includes('awakening')) {
      unlockLegend('awakening');
    }
    if (themes.wisdom && themes.wisdom >= 10 && !unlockedLegends.includes('wisdom-path')) {
      unlockLegend('wisdom-path');
    }
    if (themes.courage && themes.courage >= 10 && !unlockedLegends.includes('courage-path')) {
      unlockLegend('courage-path');
    }
  }, [totalEntries, themes, unlockedLegends, unlockLegend]);

  // All possible legends with unlock requirements
  const allLegends = [
    {
      id: 'beginning',
      title: 'The Beginning',
      description: 'Your journey through the mythical realms begins with a single step. The World Tree stirs, sensing a new chronicler has arrived.',
      unlocked: unlockedLegends.includes('beginning') || totalEntries >= 1,
      requirement: 'Write your first journal entry',
    },
    {
      id: 'first-encounter',
      title: 'First Encounter',
      description: 'As you deepen your connection to the World Tree, the first spirits begin to notice your presence. They watch, curious about this new seeker.',
      unlocked: unlockedLegends.includes('first-encounter') || totalEntries >= 3,
      requirement: 'Write 3 journal entries',
    },
    {
      id: 'awakening',
      title: 'The Awakening',
      description: 'The tree responds to your dedication. Its branches glow brighter, its roots delve deeper. You are no longer just an observer—you are part of its story.',
      unlocked: unlockedLegends.includes('awakening') || totalEntries >= 5,
      requirement: 'Write 5 journal entries',
    },
    {
      id: 'wisdom-path',
      title: 'Path of the Sage',
      description: 'Your words carry the weight of wisdom. The ancient spirits of knowledge gather around you, drawn to your pursuit of understanding.',
      unlocked: unlockedLegends.includes('wisdom-path') || (themes.wisdom && themes.wisdom >= 10),
      requirement: 'Accumulate 10 Wisdom points',
    },
    {
      id: 'courage-path',
      title: 'Path of the Warrior',
      description: 'Your entries speak of strength and bravery. The guardian spirits recognize a kindred soul—one who faces challenges with courage.',
      unlocked: unlockedLegends.includes('courage-path') || (themes.courage && themes.courage >= 10),
      requirement: 'Accumulate 10 Courage points',
    },
  ];

  // Additional legendary tales
  const additionalLegends = [
    { 
      id: 'dragon-awakening',
      title: 'The Dragon\'s Awakening', 
      description: 'When the ancient dragon stirred from its thousand-year slumber, the realms trembled. Only the bravest heroes dared to seek its wisdom.',
      unlocked: true,
    },
    { 
      id: 'unicorn-gift',
      title: 'The Unicorn\'s Gift', 
      description: 'A pure-hearted maiden once saved a unicorn from dark sorcerers. In gratitude, it blessed her with eternal wisdom and compassion.',
      unlocked: true,
    },
    {
      id: 'phoenix-rising',
      title: 'The Phoenix Rising', 
      description: 'From the ashes of the old world, the Phoenix emerged, bringing hope and renewal to all who witnessed its magnificent rebirth.',
      unlocked: true,
    },
  ];

  const combinedLegends = [...allLegends, ...additionalLegends];
  const unlockedCount = combinedLegends.filter(l => l.unlocked).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight text-starlight flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-cyan-mist mb-4 glow-box"></div>
        <p className="text-2xl font-montserrat glow-text">Loading ancient legends...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight text-starlight p-8 relative overflow-hidden">
      {/* Mythic Atmosphere */}
      <FireflyStars count={45} speed="slow" />
      <SeasonalOverlay season="autumn" intensity={0.3} />
      <SpiritWisps count={4} />
      
      {/* Legend Runes */}
      <RuneHoverRevealContainer runes={[
        { symbol: 'ᛚ', lore: 'Lore', x: 8, y: 20 },
        { symbol: 'ᛋ', lore: 'Story', x: 88, y: 18 },
        { symbol: 'ᚷ', lore: 'Gift', x: 10, y: 78 },
        { symbol: 'ᚠ', lore: 'Fate', x: 85, y: 80 }
      ]} />

      <div className="container mx-auto relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-astral via-cyan-mist to-starlight mb-4 glow-text">
            Legends Awakened by Your Journey
          </h1>
          <p className="text-xl font-inter text-starlight/80 max-w-3xl mx-auto mb-6">
            Ancient tales unlock as you deepen your connection to the World Tree. 
            Your memories awaken new stories, revealing the mythology that grows with you.
          </p>
          <div className="text-lg text-text-primary">
            <span className="font-bold text-cyan-rune text-2xl">{unlockedCount}</span> of {combinedLegends.length} legends unlocked
          </div>
        </div>

        {/* Legends Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {combinedLegends.map((legend, index) => (
            <div key={legend.id || index} className="transform hover:scale-102 transition-all duration-700">
              {legend.unlocked ? (
                <div className="bg-gradient-to-br from-blue-deep to-violet-omen rounded-xl p-6 border-2 border-cyan-rune shadow-glow-rune hover:shadow-glow-violet h-full">
                  <h3 className="text-2xl font-bold mb-3 text-text-glow">{legend.title}</h3>
                  <p className="text-text-primary">{legend.description}</p>
                </div>
              ) : (
                <div className="bg-cosmos bg-opacity-60 rounded-xl p-6 border-2 border-dashed border-blue-mystic text-center h-full flex flex-col items-center justify-center hover:border-violet-omen transition-all duration-700">
                  <div className="text-6xl mb-4 opacity-0"></div>
                  <h3 className="text-xl font-semibold text-text-muted mb-3">Legend Locked</h3>
                  <p className="text-text-secondary text-sm">
                    {legend.requirement}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-green-mystic via-blue-mystic to-violet-omen text-text-primary rounded-3xl p-12 shadow-glow-violet border-2 border-cyan-rune">
          <h2 className="text-4xl font-bold mb-4 text-text-glow">Write Your Own Legend</h2>
          <p className="text-xl mb-6 text-text-secondary">
            Every journey through the World Tree creates new stories. 
            What legend will you become?
          </p>
          <button className="bg-green-ethereal text-green-deep font-bold text-lg px-8 py-4 rounded-full hover:bg-emerald-flare hover:text-text-glow transition-all duration-700 shadow-glow-green transform hover:scale-102">
            Begin Your Tale
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegendsPage;