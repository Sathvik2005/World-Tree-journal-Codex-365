import React, { useEffect, useState } from 'react';
import { useMythical } from '../contexts/MythicalContext';
import JournalEngine from '../components/Journal/JournalEngine';
import JournalAnalytics from '../components/Journal/JournalAnalytics';
import WritingHeatmap from '../components/Journal/WritingHeatmap';
import SearchAndFilter from '../components/Journal/SearchAndFilter';
import WritingGoals from '../components/Journal/WritingGoals';
import ExportOptions from '../components/Journal/ExportOptions';
import FireflyStars from '../components/Mythic/FireflyStars';
import SeasonalOverlay from '../components/Mythic/SeasonalOverlay';
import SpiritWisps from '../components/Mythic/SpiritWisps';
import InteractiveRoots from '../components/Mythic/InteractiveRoots';
import GrowthTracker from '../components/Mythic/GrowthTracker';
import { RuneHoverRevealContainer } from '../components/Mythic/RuneTooltip';
import ParallaxLayers from '../components/Mythic/ParallaxLayers';

const JournalPage = () => {
  const { entries, totalEntries, treeGrowth, dominantTheme } = useMythical();
  const [season, setSeason] = useState('spring');
  const [activeTab, setActiveTab] = useState('write'); // write, entries, analytics, export
  const [filteredEntries, setFilteredEntries] = useState(entries);

  // Determine season based on entries
  useEffect(() => {
    if (totalEntries < 30) setSeason('spring');
    else if (totalEntries < 100) setSeason('summer');
    else if (totalEntries < 200) setSeason('autumn');
    else setSeason('winter');
  }, [totalEntries]);

  // Update filtered entries when entries change
  useEffect(() => {
    setFilteredEntries(entries);
  }, [entries]);

  return (
    <ParallaxLayers>
      <div className="min-h-screen bg-midnight relative overflow-hidden">
        {/* Mythic Atmosphere */}
        <FireflyStars count={50} speed="slow" />
        <SeasonalOverlay season={season} intensity={0.3} />
        <SpiritWisps count={3} />
        <InteractiveRoots />
        
        {/* Rune Tooltips */}
        <RuneHoverRevealContainer runes={[
          { symbol: 'ᚱ', lore: 'Memory', x: 5, y: 15 },
          { symbol: 'ᛟ', lore: 'Growth', x: 90, y: 20 },
          { symbol: 'ᛉ', lore: 'Origin', x: 15, y: 85 },
          { symbol: '✦', lore: 'Journey', x: 85, y: 75 }
        ]} />
        
        {/* Growth Tracker */}
        <GrowthTracker progress={treeGrowth} totalDays={totalEntries} />

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Page Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-6xl font-bold mb-4 glow-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <span className="text-shimmer">Your Living Journal</span>
            </h1>
            <p className="text-xl text-starlight-dim max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Every word you write becomes a root, a branch, a leaf in your World Tree.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {[
              { key: 'write', label: 'Write', icon: '✍️' },
              { key: 'entries', label: 'Entries', icon: '📖' },
              { key: 'analytics', label: 'Analytics', icon: '📊' },
              { key: 'export', label: 'Export', icon: '💾' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-xl font-bold font-montserrat transition-all duration-500 ${
                  activeTab === tab.key
                    ? 'mythic-border glass-effect glow-box text-cyan-mist'
                    : 'mythic-border glass-effect text-starlight hover:text-cyan-mist'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Write Tab */}
            {activeTab === 'write' && (
              <div className="space-y-12">
                <JournalEngine />
                <WritingGoals />
              </div>
            )}

            {/* Entries Tab */}
            {activeTab === 'entries' && (
              <div className="space-y-8">
                <SearchAndFilter onResultsChange={setFilteredEntries} />
                
                {filteredEntries.length > 0 ? (
                  <div className="space-y-6 max-w-4xl mx-auto">
                    {filteredEntries.map((entry, index) => (
                      <div
                        key={entry.id}
                        className="glass-effect rounded-xl p-6 mythic-border hover:glow-box transition-all duration-700 transform hover:scale-102"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-semibold text-cyan-mist" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            {entry.title}
                          </h3>
                          <span className="text-3xl glow-text">{entry.rune}</span>
                        </div>
                        <p className="text-starlight-dim mb-4 whitespace-pre-wrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {entry.content}
                        </p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-starlight/60 font-inter">
                            <span className="capitalize text-astral font-medium">{entry.realm}</span> • 
                            <span className="ml-2">{new Date(entry.timestamp).toLocaleDateString()}</span> •
                            <span className="ml-2 capitalize">{entry.emotion}</span>
                          </span>
                          <div className="flex gap-3">
                            {entry.themes && Object.entries(entry.themes)
                              .filter(([_, value]) => value > 0)
                              .map(([theme, value]) => (
                                <span key={theme} className="capitalize text-cyan-mist font-semibold font-inter">
                                  {theme} +{value}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 max-w-2xl mx-auto">
                    <div className="text-6xl mb-4 opacity-30">🔍</div>
                    <h3 className="text-2xl font-bold text-cyan-mist mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      No Entries Found
                    </h3>
                    <p className="text-starlight-dim" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Try adjusting your filters to see more results
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-8 max-w-6xl mx-auto">
                <JournalAnalytics />
                <WritingHeatmap />
              </div>
            )}

            {/* Export Tab */}
            {activeTab === 'export' && (
              <div className="max-w-3xl mx-auto">
                <ExportOptions />
              </div>
            )}
          </div>

          {/* Empty State (only show on write tab when no entries) */}
          {activeTab === 'write' && entries.length === 0 && (
            <div className="mt-16 text-center max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-8xl mb-6 opacity-0 animate-float">
                <svg className="w-32 h-32 mx-auto opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-cyan-mist mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Your Journey Begins with a Single Word
              </h3>
              <p className="text-starlight-dim text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                The World Tree awaits your first memory. 
                Write above to plant the seed of your mythical journey.
              </p>
            </div>
          )}
        </div>
      </div>
    </ParallaxLayers>
  );
};

export default JournalPage;
