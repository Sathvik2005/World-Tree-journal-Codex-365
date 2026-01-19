import React, { useState, useEffect } from 'react';
import { useMythical } from '../contexts/MythicalContext';
import FireflyStars from '../components/Mythic/FireflyStars';
import SeasonalOverlay from '../components/Mythic/SeasonalOverlay';
import SpiritWisps from '../components/Mythic/SpiritWisps';
import ParallaxLayers from '../components/Mythic/ParallaxLayers';

/**
 * Mytho-Log - Story mode journal with page-turn animation
 * Paginated codex view of journal entries
 */
const MythoLog = () => {
  const { journalEntries } = useMythical();
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('forward');

  const ENTRIES_PER_PAGE = 2; // Two entries visible at once (left/right pages)
  const totalPages = Math.ceil(journalEntries.length / ENTRIES_PER_PAGE);

  const turnPage = (direction) => {
    if (isFlipping) return;

    if (direction === 'next' && currentPage < totalPages - 1) {
      setFlipDirection('forward');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 600);
    } else if (direction === 'prev' && currentPage > 0) {
      setFlipDirection('backward');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') turnPage('next');
      if (e.key === 'ArrowLeft') turnPage('prev');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, isFlipping]);

  const leftEntry = journalEntries[currentPage * ENTRIES_PER_PAGE];
  const rightEntry = journalEntries[currentPage * ENTRIES_PER_PAGE + 1];

  return (
    <ParallaxLayers>
      <div className="min-h-screen bg-midnight text-starlight relative overflow-hidden">
        <FireflyStars count={30} speed="slow" />
        <SeasonalOverlay season="autumn" intensity={0.2} />
        <SpiritWisps count={2} />

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold font-montserrat text-cyan-mist mb-4 glow-text">
              📖 Mytho-Log
            </h1>
            <p className="text-starlight/70 font-inter">
              Your journey through the pages of legend
            </p>
          </div>

          {/* Book Container */}
          <div className="max-w-6xl mx-auto perspective-1000">
            <div className={`codex-book relative ${isFlipping ? 'flipping' : ''} ${flipDirection}`}>
              {/* Left Page */}
              <div className="page left-page mythic-border glass-effect rounded-l-2xl p-8 min-h-[600px]">
                {leftEntry ? (
                  <div className="h-full flex flex-col">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold font-montserrat text-astral mb-2">
                        {leftEntry.title || 'Untitled Entry'}
                      </h2>
                      <div className="flex gap-2 text-sm text-starlight/50 font-inter">
                        <span>{new Date(leftEntry.timestamp).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{leftEntry.emotion}</span>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      <p className="text-starlight/90 font-inter leading-relaxed whitespace-pre-wrap">
                        {leftEntry.content}
                      </p>
                    </div>
                    {leftEntry.rune && (
                      <div className="mt-4 pt-4 border-t border-starlight/10 text-center">
                        <span className="text-3xl">{leftEntry.rune}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-starlight/30">
                    <div className="text-center">
                      <div className="text-6xl mb-4 opacity-30">📜</div>
                      <p>This page awaits your story</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Page */}
              <div className="page right-page mythic-border glass-effect rounded-r-2xl p-8 min-h-[600px]">
                {rightEntry ? (
                  <div className="h-full flex flex-col">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold font-montserrat text-astral mb-2">
                        {rightEntry.title || 'Untitled Entry'}
                      </h2>
                      <div className="flex gap-2 text-sm text-starlight/50 font-inter">
                        <span>{new Date(rightEntry.timestamp).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{rightEntry.emotion}</span>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      <p className="text-starlight/90 font-inter leading-relaxed whitespace-pre-wrap">
                        {rightEntry.content}
                      </p>
                    </div>
                    {rightEntry.rune && (
                      <div className="mt-4 pt-4 border-t border-starlight/10 text-center">
                        <span className="text-3xl">{rightEntry.rune}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-starlight/30">
                    <div className="text-center">
                      <div className="text-6xl mb-4 opacity-30">📜</div>
                      <p>This page awaits your story</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Page Spine Shadow */}
              <div className="spine-shadow"></div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => turnPage('prev')}
                disabled={currentPage === 0 || isFlipping}
                className="px-6 py-3 mythic-border glass-effect hover:glow-box rounded-xl font-montserrat transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              <div className="text-center">
                <div className="text-sm text-starlight/70 font-inter">
                  Page {currentPage + 1} of {totalPages}
                </div>
                <div className="text-xs text-starlight/50 font-inter mt-1">
                  {journalEntries.length} entries total
                </div>
              </div>

              <button
                onClick={() => turnPage('next')}
                disabled={currentPage >= totalPages - 1 || isFlipping}
                className="px-6 py-3 mythic-border glass-effect hover:glow-box rounded-xl font-montserrat transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>

            {/* Keyboard Hints */}
            <div className="text-center mt-6 text-xs text-starlight/40 font-inter">
              Use arrow keys (← →) to turn pages
            </div>
          </div>
        </div>

        {/* Custom Styles */}
        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }

          .codex-book {
            display: flex;
            gap: 0;
            transform-style: preserve-3d;
            transition: transform 0.6s ease-in-out;
          }

          .page {
            width: 50%;
            transition: transform 0.6s ease-in-out;
            transform-origin: center;
            backface-visibility: hidden;
          }

          .codex-book.flipping.forward .right-page {
            animation: pageFlipForward 0.6s ease-in-out;
          }

          .codex-book.flipping.backward .left-page {
            animation: pageFlipBackward 0.6s ease-in-out;
          }

          .spine-shadow {
            position: absolute;
            top: 0;
            left: 50%;
            width: 2px;
            height: 100%;
            background: linear-gradient(to right, 
              rgba(0,0,0,0.3), 
              transparent, 
              rgba(0,0,0,0.3)
            );
            transform: translateX(-50%);
          }

          @keyframes pageFlipForward {
            0% { transform: rotateY(0deg); }
            50% { transform: rotateY(-90deg); }
            100% { transform: rotateY(0deg); }
          }

          @keyframes pageFlipBackward {
            0% { transform: rotateY(0deg); }
            50% { transform: rotateY(90deg); }
            100% { transform: rotateY(0deg); }
          }
        `}</style>
      </div>
    </ParallaxLayers>
  );
};

export default MythoLog;
