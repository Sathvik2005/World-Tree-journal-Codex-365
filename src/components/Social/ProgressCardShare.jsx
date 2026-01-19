import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

/**
 * Progress Card Sharing Component
 * Generate beautiful shareable cards for social media
 */
const ProgressCardShare = ({ journalData, achievementData }) => {
  const [cardType, setCardType] = useState('journey'); // journey, milestone, quote, stats
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const cardRef = useRef(null);

  const cardTemplates = {
    journey: {
      title: 'My Journaling Journey',
      gradient: 'from-indigo-600 via-purple-600 to-pink-600',
      icon: '🌳'
    },
    milestone: {
      title: 'Achievement Unlocked',
      gradient: 'from-yellow-500 via-orange-500 to-red-500',
      icon: '🏆'
    },
    quote: {
      title: 'Today\'s Reflection',
      gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
      icon: '✨'
    },
    stats: {
      title: 'My Writing Stats',
      gradient: 'from-green-500 via-teal-500 to-cyan-500',
      icon: '📊'
    }
  };

  const getCardContent = () => {
    switch (cardType) {
      case 'journey':
        return {
          mainStat: journalData?.totalEntries || 0,
          label: 'Journal Entries',
          subStats: [
            { value: journalData?.currentStreak || 0, label: 'Day Streak' },
            { value: journalData?.totalWords || 0, label: 'Words Written' }
          ]
        };
      case 'milestone':
        return {
          mainStat: achievementData?.level || 1,
          label: 'Level Reached',
          subStats: [
            { value: achievementData?.achievements || 0, label: 'Achievements' },
            { value: achievementData?.badges || 0, label: 'Badges Earned' }
          ]
        };
      case 'quote':
        return {
          quote: journalData?.favoriteQuote || 'Every entry is a step toward growth',
          author: journalData?.userName || 'Anonymous'
        };
      case 'stats':
        return {
          stats: [
            { value: journalData?.totalEntries || 0, label: 'Total Entries', icon: '📝' },
            { value: journalData?.totalWords || 0, label: 'Words', icon: '✍️' },
            { value: journalData?.currentStreak || 0, label: 'Day Streak', icon: '🔥' },
            { value: achievementData?.level || 1, label: 'Level', icon: '⭐' }
          ]
        };
      default:
        return {};
    }
  };

  /**
   * Generate shareable image from card
   */
  const generateCardImage = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false
      });

      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      const url = URL.createObjectURL(blob);
      setShareUrl(url);
      
      return url;
    } catch (error) {
      console.error('Card generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Share to social media platforms
   */
  const shareToSocial = async (platform) => {
    const imageUrl = shareUrl || await generateCardImage();
    if (!imageUrl) return;

    const shareText = `My World Tree journey: ${journalData?.totalEntries || 0} entries, ${journalData?.currentStreak || 0} day streak! 🌳✨`;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.origin)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.origin)}&description=${encodeURIComponent(shareText)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  /**
   * Download card image
   */
  const downloadCard = async () => {
    const imageUrl = shareUrl || await generateCardImage();
    if (!imageUrl) return;

    const link = document.createElement('a');
    link.download = `worldtree-${cardType}-${Date.now()}.png`;
    link.href = imageUrl;
    link.click();
  };

  /**
   * Copy link to clipboard
   */
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    alert('Link copied to clipboard!');
  };

  const template = cardTemplates[cardType];
  const content = getCardContent();

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Card Type Selector */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-starlight mb-4">Share Your Journey</h2>
        <div className="flex gap-3 flex-wrap">
          {Object.keys(cardTemplates).map(type => (
            <button
              key={type}
              onClick={() => setCardType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                cardType === type
                  ? 'bg-astral text-white scale-105'
                  : 'bg-midnight-light text-starlight hover:bg-astral/20'
              }`}
            >
              {cardTemplates[type].icon} {cardTemplates[type].title}
            </button>
          ))}
        </div>
      </div>

      {/* Card Preview */}
      <div 
        ref={cardRef}
        className={`relative w-full aspect-square rounded-2xl p-8 bg-gradient-to-br ${template.gradient} shadow-2xl overflow-hidden mb-6`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between text-white">
          {/* Header */}
          <div className="text-center">
            <div className="text-6xl mb-4">{template.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{template.title}</h3>
            <div className="text-sm opacity-90">World Tree — Codex 365</div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center">
            {cardType === 'quote' ? (
              <div className="text-center px-6">
                <div className="text-4xl mb-4">"</div>
                <p className="text-xl font-medium mb-4 italic">{content.quote}</p>
                <p className="text-sm opacity-80">— {content.author}</p>
              </div>
            ) : cardType === 'stats' ? (
              <div className="grid grid-cols-2 gap-6 w-full">
                {content.stats?.map((stat, idx) => (
                  <div key={idx} className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold mb-1">{stat.value.toLocaleString()}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <div className="text-7xl font-bold mb-3">{content.mainStat?.toLocaleString()}</div>
                <div className="text-2xl mb-6 opacity-90">{content.label}</div>
                <div className="flex gap-8 justify-center">
                  {content.subStats?.map((stat, idx) => (
                    <div key={idx}>
                      <div className="text-3xl font-semibold">{stat.value.toLocaleString()}</div>
                      <div className="text-sm opacity-80">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-sm opacity-75">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => shareToSocial('twitter')}
            className="flex-1 min-w-[120px] px-4 py-3 bg-[#1DA1F2] text-white rounded-lg font-medium hover:bg-[#1a8cd8] transition-colors"
          >
            🐦 Twitter
          </button>
          <button
            onClick={() => shareToSocial('facebook')}
            className="flex-1 min-w-[120px] px-4 py-3 bg-[#1877F2] text-white rounded-lg font-medium hover:bg-[#166fe5] transition-colors"
          >
            📘 Facebook
          </button>
          <button
            onClick={() => shareToSocial('linkedin')}
            className="flex-1 min-w-[120px] px-4 py-3 bg-[#0A66C2] text-white rounded-lg font-medium hover:bg-[#004182] transition-colors"
          >
            💼 LinkedIn
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={downloadCard}
            disabled={isGenerating}
            className="flex-1 px-4 py-3 bg-astral text-white rounded-lg font-medium hover:bg-astral/80 transition-colors disabled:opacity-50"
          >
            {isGenerating ? '⏳ Generating...' : '📥 Download Image'}
          </button>
          <button
            onClick={copyLink}
            className="flex-1 px-4 py-3 bg-midnight-light text-starlight rounded-lg font-medium hover:bg-midnight-lighter transition-colors"
          >
            🔗 Copy Link
          </button>
        </div>
      </div>

      {/* Usage Note */}
      <div className="mt-6 p-4 bg-midnight-light rounded-lg">
        <p className="text-sm text-starlight/70 text-center">
          Share your progress and inspire others on their journaling journey! 🌟
        </p>
      </div>
    </div>
  );
};

export default ProgressCardShare;
