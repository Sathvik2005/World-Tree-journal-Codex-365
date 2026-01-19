import React, { useState } from 'react';
import { useMythical } from '../../contexts/MythicalContext';

/**
 * JournalEngine - The Heart of Growth
 * 
 * Every entry written here becomes:
 * - A memory in the World Tree
 * - A rune etched in the realms
 * - A growth event that changes the world
 */

const JournalEngine = ({ onEntryComplete }) => {
  const { addJournalEntry, activeRealm, dominantTheme, totalEntries, treeStage } = useMythical();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState('neutral');
  const [isWriting, setIsWriting] = useState(false);
  const [showRune, setShowRune] = useState(false);
  const [lastRune, setLastRune] = useState(null);

  const realmPrompts = {
    sky: [
      'What vision guides your path forward?',
      'What destiny calls to you from the heavens?',
      'What clarity have you gained today?',
    ],
    midgard: [
      'What growth have you witnessed in yourself?',
      'What challenge shaped you today?',
      'What balance are you seeking?',
    ],
    underworld: [
      'What shadow have you explored within?',
      'What forgotten memory resurfaces?',
      'What truth lies beneath the surface?',
    ],
  };

  const getPrompt = () => {
    const prompts = realmPrompts[activeRealm] || realmPrompts.midgard;
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    
    setIsWriting(true);
    
    // Simulate writing animation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const entry = addJournalEntry({
      title: title.trim() || 'Untitled Memory',
      content: content.trim(),
      emotion,
    });
    
    setLastRune(entry.rune);
    setShowRune(true);
    
    // Clear form
    setTitle('');
    setContent('');
    setEmotion('neutral');
    setIsWriting(false);
    
    // Show rune for 3 seconds
    setTimeout(() => {
      setShowRune(false);
      if (onEntryComplete) onEntryComplete(entry);
    }, 3000);
  };

  const emotions = [
    { value: 'joy', icon: '', color: 'text-yellow-400' },
    { value: 'wonder', icon: '', color: 'text-purple-400' },
    { value: 'calm', icon: '', color: 'text-blue-400' },
    { value: 'strength', icon: '', color: 'text-red-400' },
    { value: 'contemplative', icon: '', color: 'text-gray-400' },
    { value: 'neutral', icon: '', color: 'text-green-400' },
  ];

  if (showRune) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-void bg-opacity-90 backdrop-blur-md">
        <div className="text-center">
          <div className="text-9xl mb-8 rune-glow animate-pulse">
            {lastRune}
          </div>
          <p className="text-text-glow text-2xl font-light">
            Your memory has been inscribed
          </p>
          <p className="text-cyan-rune text-lg mt-4 glow">
            The World Tree grows stronger
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Journal Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-ethereal via-emerald-flare to-cyan-rune mb-2 glow">
          Chronicle Your Journey
        </h2>
        <p className="text-text-secondary text-lg mb-4 italic">
          "{getPrompt()}"
        </p>
        <div className="flex justify-center gap-8 text-sm text-text-muted flex-wrap">
          <span>Realm: <span className="text-blue-glow capitalize">{activeRealm}</span></span>
          <span>Tree: <span className="text-green-glow capitalize">{treeStage}</span></span>
          <span>Entries: <span className="text-cyan-rune">{totalEntries}</span></span>
          <span>Theme: <span className="text-emerald-flare capitalize">{dominantTheme}</span></span>
        </div>
      </div>

      {/* Journal Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-text-primary text-sm font-semibold mb-2">
            Memory Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give this moment a name..."
            className="w-full px-4 py-3 bg-cosmos bg-opacity-60 border-2 border-green-mystic rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-green-ethereal focus:ring-2 focus:ring-green-ethereal focus:ring-opacity-50 transition shadow-glow-green"
            maxLength={100}
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-text-primary text-sm font-semibold mb-2">
            Your Memory
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts, experiences, and reflections... Let the words flow like roots deepening into the earth..."
            className="w-full px-4 py-3 bg-cosmos bg-opacity-60 border-2 border-green-mystic rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-green-ethereal focus:ring-2 focus:ring-green-ethereal focus:ring-opacity-50 transition resize-none shadow-glow-green"
            rows={8}
            required
          />
          <p className="text-text-muted text-sm mt-2">
            {content.length} characters • The tree grows with every word
          </p>
        </div>

        {/* Emotion Selector */}
        <div>
          <label className="block text-text-primary text-sm font-semibold mb-3">
            Emotional Essence
          </label>
          <div className="flex flex-wrap gap-3">
            {emotions.map((emo) => (
              <button
                key={emo.value}
                type="button"
                onClick={() => setEmotion(emo.value)}
                className={`px-4 py-2 rounded-full transition-all duration-700 transform ${
                  emotion === emo.value
                    ? 'bg-gradient-to-r from-green-mystic to-blue-mystic scale-110 shadow-glow-green border-2 border-cyan-rune'
                    : 'bg-cosmos bg-opacity-60 hover:bg-opacity-80 hover:scale-102 border-2 border-blue-mystic'
                }`}
              >
                <span className={`w-6 h-6 rounded-full inline-block ${emo.color}`} style={{backgroundColor: 'currentColor'}}></span>
                <span className={`ml-2 text-sm ${emotion === emo.value ? 'text-text-glow' : 'text-text-muted'}`}>
                  {emo.value}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isWriting || !content.trim()}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-700 transform ${
            isWriting
              ? 'bg-cosmos cursor-not-allowed opacity-60'
              : 'bg-gradient-to-r from-green-mystic via-green-ethereal to-emerald-flare hover:from-emerald-flare hover:to-cyan-rune hover:scale-102 shadow-glow-green hover:shadow-glow-rune'
          } text-text-glow`}
        >
          {isWriting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Inscribing Memory...
            </span>
          ) : (
            <>Inscribe This Memory into the Tree</>
          )}
        </button>
      </form>

      {/* Tips */}
      <div className="mt-12 p-6 bg-gradient-to-br from-blue-deep to-green-deep bg-opacity-40 rounded-xl border border-green-ethereal border-opacity-50 shadow-glow-green">
        <h3 className="text-lg font-semibold text-green-glow mb-3">Journal Tips</h3>
        <ul className="space-y-2 text-text-primary text-sm">
          <li>• <strong className="text-text-glow">Write freely</strong> - Your entries shape the tree's growth</li>
          <li>• <strong className="text-text-glow">Use keywords</strong> - Words like "wisdom", "courage", "balance" influence your path</li>
          <li>• <strong className="text-text-glow">Explore themes</strong> - Each theme unlocks different spirits and world states</li>
          <li>• <strong className="text-text-glow">Be consistent</strong> - Regular journaling strengthens your connection</li>
          <li>• <strong className="text-text-glow">Switch realms</strong> - Different realms inspire different reflections</li>
        </ul>
      </div>
    </div>
  );
};

export default JournalEngine;
