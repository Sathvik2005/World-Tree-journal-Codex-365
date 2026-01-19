import React, { useState, useEffect } from 'react';
import { useMythical } from '../../contexts/MythicalContext';

/**
 * Writer's Sanctuary - Distraction-free writing mode
 * Fullscreen, fading UI, tree silhouette background, cursor glow
 */
const WriterSanctuary = ({ isActive, onClose, initialContent = '' }) => {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState('');
  const [showUI, setShowUI] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const { addJournalEntry } = useMythical();

  // Auto-hide UI after 3 seconds of inactivity
  useEffect(() => {
    if (!isActive) return;

    const timer = setTimeout(() => {
      if (Date.now() - lastActivity > 3000) {
        setShowUI(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [lastActivity, isActive]);

  const handleActivity = () => {
    setLastActivity(Date.now());
    setShowUI(true);
  };

  const handleSave = () => {
    if (content.trim()) {
      addJournalEntry({
        title: title.trim() || 'Sanctuary Writing',
        content: content.trim(),
        emotion: 'contemplative',
      });
      setContent('');
      setTitle('');
      onClose();
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-midnight">
      {/* Tree Silhouette Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <svg className="w-96 h-96 animate-breathe" viewBox="0 0 200 300" fill="none" stroke="currentColor">
          <path d="M100 280 L100 150 M100 150 Q80 140 60 130 M100 150 Q120 140 140 130 M100 150 L100 80 M100 80 Q70 70 50 60 M100 80 Q130 70 150 60 M100 80 L100 40 M100 40 Q85 35 70 30 M100 40 Q115 35 130 30" strokeWidth="2" className="text-starlight/20" />
          <circle cx="100" cy="30" r="15" fill="currentColor" className="text-cyan-mist/30 animate-pulse-glow" />
        </svg>
      </div>

      {/* Top UI Bar - Fades out */}
      <div 
        className={`absolute top-0 left-0 right-0 p-6 flex items-center justify-between transition-opacity duration-700 ${
          showUI ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={handleActivity}
          placeholder="Title (optional)"
          className="bg-transparent border-b border-starlight/20 text-2xl font-montserrat text-starlight focus:outline-none focus:border-cyan-mist w-96"
        />
        
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-2 mythic-border glass-effect hover:glow-box text-cyan-mist font-montserrat rounded-lg transition-all duration-300"
          >
            Save & Exit
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 mythic-border glass-effect hover:glow-box text-starlight/70 font-montserrat rounded-lg transition-all duration-300"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Writing Area */}
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          handleActivity();
        }}
        onMouseMove={handleActivity}
        onKeyDown={handleActivity}
        placeholder="Let the words flow like roots deepening into the earth..."
        className="absolute inset-0 pt-32 pb-20 px-32 bg-transparent text-starlight font-inter text-xl leading-relaxed resize-none focus:outline-none sanctuary-cursor"
        autoFocus
      />

      {/* Bottom Stats - Fades out */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-6 flex items-center justify-center gap-8 text-starlight/50 text-sm font-inter transition-opacity duration-700 ${
          showUI ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span>{content.trim().split(/\s+/).filter(w => w).length} words</span>
        <span>•</span>
        <span>{content.length} characters</span>
        <span>•</span>
        <span>{Math.ceil(content.trim().split(/\s+/).filter(w => w).length / 200)} min read</span>
      </div>

      <style jsx>{`
        .sanctuary-cursor {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><circle cx="10" cy="10" r="8" fill="%2367E8F9" opacity="0.3"/><circle cx="10" cy="10" r="2" fill="%2367E8F9"/></svg>') 10 10, text;
        }
      `}</style>
    </div>
  );
};

export default WriterSanctuary;
