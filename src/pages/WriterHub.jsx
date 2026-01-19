import React, { useState } from 'react';
import WriterSanctuary from '../components/Writer/WriterSanctuary';
import ChapterForge from '../components/Writer/ChapterForge';
import IdeaSeeds from '../components/Writer/IdeaSeeds';
import RootArchive from '../components/Writer/RootArchive';
import RuneEditorToolbar from '../components/Writer/RuneEditorToolbar';
import AmbientFocusRituals from '../components/Writer/AmbientFocusRituals';
import ConstellationBoard from '../components/Writer/ConstellationBoard';
import TimelineSpiral from '../components/Writer/TimelineSpiral';
import LoreDrawer from '../components/Writer/LoreDrawer';
import CharacterDNA from '../components/Writer/CharacterDNA';
import RitualTimer from '../components/Writer/RitualTimer';
import BranchToBook from '../components/Writer/BranchToBook';
import SparkVault from '../components/Writer/SparkVault';
import FireflyStars from '../components/Mythic/FireflyStars';
import SeasonalOverlay from '../components/Mythic/SeasonalOverlay';

/**
 * Writer's Hub - Creative writing ecosystem
 * Central hub for all writer tools
 */
const WriterHub = () => {
  const [activeView, setActiveView] = useState('sanctuary');
  const [sanctuaryOpen, setSanctuaryOpen] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  const views = [
    { id: 'sanctuary', icon: '✍️', label: 'Sanctuary', component: null }, // Opens modal
    { id: 'chapters', icon: '🌿', label: 'Chapters', component: ChapterForge },
    { id: 'characters', icon: '👤', label: 'Characters', component: CharacterDNA },
    { id: 'worldbuilding', icon: '🌌', label: 'Worldbuilding', component: ConstellationBoard },
    { id: 'timeline', icon: '🌀', label: 'Timeline', component: TimelineSpiral },
    { id: 'lore', icon: '🗃️', label: 'Lore', component: LoreDrawer },
    { id: 'sparks', icon: '🍎', label: 'Sparks', component: SparkVault },
    { id: 'prompts', icon: '✨', label: 'Prompts', component: IdeaSeeds },
    { id: 'timer', icon: '⏳', label: 'Timer', component: RitualTimer },
    { id: 'export', icon: '📖', label: 'Export', component: BranchToBook },
  ];

  const ActiveComponent = views.find(v => v.id === activeView)?.component;

  return (
    <div className="min-h-screen bg-midnight text-starlight relative overflow-hidden">
      {/* Atmospheric Effects */}
      <FireflyStars />
      <SeasonalOverlay />
      <AmbientFocusRituals isWriting={isWriting} />

      {/* Writer Sanctuary Modal */}
      {sanctuaryOpen && (
        <WriterSanctuary onClose={() => {
          setSanctuaryOpen(false);
          setIsWriting(false);
        }} />
      )}

      {/* Header */}
      <div className="relative z-10">
        <div className="container mx-auto px-8 py-8">
          <div className="mythic-border glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold font-montserrat text-cyan-mist mb-2 flex items-center gap-3">
                  <span className="text-5xl">🌳</span> Writer's Realm
                </h1>
                <p className="text-starlight/70 font-inter">
                  Your creative writing sanctuary beneath the World Tree
                </p>
              </div>

              <div className="flex gap-3">
                <RootArchive />
                <button
                  onClick={() => {
                    setSanctuaryOpen(true);
                    setIsWriting(true);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-astral to-cyan-mist text-midnight font-montserrat font-semibold rounded-xl hover:shadow-xl hover:shadow-cyan-mist/30 transition-all duration-300 flex items-center gap-2"
                >
                  <span className="text-xl">✍️</span>
                  Enter Sanctuary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 sticky top-0 bg-midnight/80 backdrop-blur-lg border-b border-starlight/10">
        <div className="container mx-auto px-8">
          <div className="flex gap-2 overflow-x-auto py-4">
            {views.map(view => (
              <button
                key={view.id}
                onClick={() => {
                  if (view.id === 'sanctuary') {
                    setSanctuaryOpen(true);
                    setIsWriting(true);
                  } else {
                    setActiveView(view.id);
                  }
                }}
                className={`px-6 py-3 rounded-xl font-inter font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                  activeView === view.id
                    ? 'bg-cyan-mist/20 text-cyan-mist border-2 border-cyan-mist'
                    : 'bg-midnight-deep/50 text-starlight/70 hover:text-starlight hover:bg-midnight-deep border-2 border-transparent'
                }`}
              >
                <span className="text-xl">{view.icon}</span>
                {view.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-8 py-8">
        <div className="h-[calc(100vh-24rem)]">
          {ActiveComponent ? (
            <ActiveComponent />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center mythic-border glass-effect rounded-2xl p-12 max-w-2xl">
                <div className="text-8xl mb-6 opacity-30">🌳</div>
                <h2 className="text-3xl font-bold font-montserrat text-cyan-mist mb-4">
                  Welcome to Your Writing Realm
                </h2>
                <p className="text-starlight/70 font-inter leading-relaxed mb-6">
                  A complete creative writing ecosystem inspired by the World Tree. Build stories with mystical tools
                  for chapters, characters, worldbuilding, timelines, and more.
                </p>
                <button
                  onClick={() => {
                    setSanctuaryOpen(true);
                    setIsWriting(true);
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-astral to-cyan-mist text-midnight font-montserrat font-semibold rounded-xl hover:shadow-xl hover:shadow-cyan-mist/30 transition-all duration-300 text-lg"
                >
                  Begin Your Journey
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="relative z-10 border-t border-starlight/10 bg-midnight/80 backdrop-blur-lg">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="text-starlight/50 font-inter">
              Mythical World Tree • Creative Writing Ecosystem
            </div>
            <div className="flex gap-6 text-starlight/70 font-inter">
              <span>{JSON.parse(localStorage.getItem('mythical_chapters') || '[]').length} Chapters</span>
              <span>{JSON.parse(localStorage.getItem('mythical_characters') || '[]').length} Characters</span>
              <span>{JSON.parse(localStorage.getItem('mythical_sparks') || '[]').length} Sparks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriterHub;
