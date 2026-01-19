import React, { useState, useEffect } from 'react';

/**
 * Seasonal Challenges System
 * Rotating writing challenges tied to seasons, holidays, and special events
 */
const SeasonalChallenges = () => {
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [currentSeason, setCurrentSeason] = useState('');

  useEffect(() => {
    loadChallenges();
    determineSeason();
  }, []);

  /**
   * Determine current season
   */
  const determineSeason = () => {
    const month = new Date().getMonth(); // 0-11
    let season = '';
    
    if (month >= 2 && month <= 4) season = 'spring';
    else if (month >= 5 && month <= 7) season = 'summer';
    else if (month >= 8 && month <= 10) season = 'autumn';
    else season = 'winter';
    
    setCurrentSeason(season);
  };

  /**
   * All seasonal challenges
   */
  const allChallenges = {
    spring: [
      {
        id: 'spring_awakening',
        name: 'Spring Awakening',
        description: 'Write about renewal and new beginnings for 7 days',
        duration: 7,
        reward: { xp: 150, badge: '🌸' },
        prompts: [
          'What are you leaving behind this season?',
          'Describe something new you want to nurture',
          'What does renewal mean to you?'
        ]
      },
      {
        id: 'growth_spurt',
        name: 'Growth Spurt',
        description: 'Journal every day for 21 days (habit formation)',
        duration: 21,
        reward: { xp: 300, badge: '🌱' },
        prompts: ['Track one habit you\'re building']
      },
      {
        id: 'bloom_where_planted',
        name: 'Bloom Where You\'re Planted',
        description: 'Write 500 words daily for 14 days',
        duration: 14,
        reward: { xp: 250, badge: '🌺' },
        prompts: []
      }
    ],
    summer: [
      {
        id: 'summer_story',
        name: 'Summer Story Sprint',
        description: 'Write a complete short story (2000+ words)',
        duration: 30,
        reward: { xp: 400, badge: '☀️' },
        prompts: ['Setting: summer day', 'Theme: adventure']
      },
      {
        id: 'sun_gratitude',
        name: 'Sunshine Gratitude',
        description: 'List 3 things you\'re grateful for, 30 days',
        duration: 30,
        reward: { xp: 200, badge: '🌻' },
        prompts: ['Focus on small joys']
      },
      {
        id: 'adventure_log',
        name: 'Adventure Log',
        description: 'Document 10 outdoor experiences',
        duration: 60,
        reward: { xp: 180, badge: '🏖️' },
        prompts: []
      }
    ],
    autumn: [
      {
        id: 'harvest_reflection',
        name: 'Harvest Reflection',
        description: 'Reflect on what you\'ve "harvested" this year (14 days)',
        duration: 14,
        reward: { xp: 220, badge: '🍂' },
        prompts: [
          'What lessons have you learned?',
          'What accomplishments are you proud of?'
        ]
      },
      {
        id: 'cozy_chronicles',
        name: 'Cozy Chronicles',
        description: 'Write cozy, comforting entries for 21 days',
        duration: 21,
        reward: { xp: 250, badge: '🍁' },
        prompts: ['What makes you feel safe and warm?']
      },
      {
        id: 'november_novel',
        name: 'November Novel',
        description: 'Write 50,000 words in November (NaNoWriMo)',
        duration: 30,
        reward: { xp: 1000, badge: '📚' },
        prompts: []
      }
    ],
    winter: [
      {
        id: 'winter_solstice',
        name: 'Winter Solstice',
        description: 'Write about darkness, rest, and inner light (14 days)',
        duration: 14,
        reward: { xp: 200, badge: '❄️' },
        prompts: ['What do you need to rest from?', 'Where is your inner light?']
      },
      {
        id: 'year_in_review',
        name: 'Year in Review',
        description: 'Complete a comprehensive year review (10 prompts)',
        duration: 31,
        reward: { xp: 300, badge: '🎆' },
        prompts: [
          'Best moment of the year',
          'Biggest challenge overcome',
          'Most important lesson learned',
          'Person who influenced you most',
          'Goal you\'re proudest of achieving'
        ]
      },
      {
        id: 'fresh_start',
        name: 'Fresh Start',
        description: 'Set intentions for new year (write daily in January)',
        duration: 31,
        reward: { xp: 350, badge: '🎊' },
        prompts: ['What do you want to create this year?']
      }
    ],
    special: [
      {
        id: 'love_letters',
        name: 'Love Letters',
        description: 'Write letters to 5 people you appreciate (February)',
        duration: 28,
        reward: { xp: 150, badge: '💌' },
        prompts: []
      },
      {
        id: 'spooky_stories',
        name: 'Spooky Stories',
        description: 'Write a horror/mystery story for Halloween',
        duration: 31,
        reward: { xp: 250, badge: '🎃' },
        prompts: []
      },
      {
        id: 'poetry_month',
        name: 'Poetry April',
        description: 'Write one poem every day in April',
        duration: 30,
        reward: { xp: 400, badge: '📝' },
        prompts: []
      }
    ]
  };

  /**
   * Load challenges from localStorage
   */
  const loadChallenges = () => {
    const active = JSON.parse(localStorage.getItem('mythical_active_challenges') || '[]');
    const completed = JSON.parse(localStorage.getItem('mythical_completed_challenges') || '[]');
    setActiveChallenges(active);
    setCompletedChallenges(completed);
  };

  /**
   * Start a challenge
   */
  const startChallenge = (challenge) => {
    const newChallenge = {
      ...challenge,
      startDate: Date.now(),
      progress: 0,
      entries: []
    };

    const updated = [...activeChallenges, newChallenge];
    setActiveChallenges(updated);
    localStorage.setItem('mythical_active_challenges', JSON.stringify(updated));
  };

  /**
   * Update challenge progress
   */
  const updateProgress = (challengeId) => {
    const updated = activeChallenges.map(c => {
      if (c.id === challengeId) {
        const newProgress = c.progress + 1;
        const isComplete = newProgress >= c.duration;

        if (isComplete) {
          completeChallenge(c);
        }

        return { ...c, progress: newProgress };
      }
      return c;
    });

    setActiveChallenges(updated.filter(c => c.progress < c.duration));
    localStorage.setItem('mythical_active_challenges', JSON.stringify(updated));
  };

  /**
   * Complete a challenge
   */
  const completeChallenge = (challenge) => {
    const completed = {
      ...challenge,
      completedDate: Date.now()
    };

    const updated = [...completedChallenges, completed];
    setCompletedChallenges(updated);
    localStorage.setItem('mythical_completed_challenges', JSON.stringify(updated));

    // Award XP (integrate with achievement system)
    const currentXp = parseInt(localStorage.getItem('mythical_xp') || '0');
    localStorage.setItem('mythical_xp', (currentXp + challenge.reward.xp).toString());

    // Show completion notification
    alert(`🎉 Challenge Complete! You earned ${challenge.reward.xp} XP and the ${challenge.reward.badge} badge!`);
  };

  /**
   * Abandon challenge
   */
  const abandonChallenge = (challengeId) => {
    if (!confirm('Are you sure you want to abandon this challenge?')) return;

    const updated = activeChallenges.filter(c => c.id !== challengeId);
    setActiveChallenges(updated);
    localStorage.setItem('mythical_active_challenges', JSON.stringify(updated));
  };

  const seasonColors = {
    spring: 'from-pink-500 to-green-500',
    summer: 'from-yellow-400 to-orange-500',
    autumn: 'from-orange-500 to-red-600',
    winter: 'from-blue-400 to-purple-600'
  };

  const currentSeasonChallenges = allChallenges[currentSeason] || [];
  const specialChallenges = allChallenges.special || [];

  return (
    <div className="min-h-screen bg-midnight p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-starlight mb-2">Seasonal Challenges</h1>
        <p className="text-starlight/60">
          Complete writing challenges to earn XP and exclusive badges
        </p>
      </div>

      {/* Active Challenges */}
      {activeChallenges.length > 0 && (
        <div className="max-w-6xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-starlight mb-4">Active Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeChallenges.map(challenge => (
              <div 
                key={challenge.id}
                className="p-6 bg-midnight-light rounded-xl border-2 border-astral"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-starlight mb-1">
                      {challenge.name} {challenge.reward.badge}
                    </h3>
                    <p className="text-sm text-starlight/60">{challenge.description}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-starlight/70">Progress</span>
                    <span className="text-astral font-medium">
                      {challenge.progress} / {challenge.duration} days
                    </span>
                  </div>
                  <div className="w-full h-3 bg-midnight-dark rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-astral to-cyan-400 transition-all duration-500"
                      style={{ width: `${(challenge.progress / challenge.duration) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => updateProgress(challenge.id)}
                    className="flex-1 px-4 py-2 bg-astral text-white rounded-lg font-medium hover:bg-astral/80 transition-colors"
                  >
                    ✓ Log Progress
                  </button>
                  <button
                    onClick={() => abandonChallenge(challenge.id)}
                    className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg font-medium hover:bg-red-600/30 transition-colors"
                  >
                    Abandon
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Season Challenges */}
      <div className="max-w-6xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-starlight mb-4">
          {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)} Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentSeasonChallenges.map(challenge => {
            const isActive = activeChallenges.some(c => c.id === challenge.id);
            const isCompleted = completedChallenges.some(c => c.id === challenge.id);

            return (
              <div 
                key={challenge.id}
                className={`p-6 rounded-xl border-2 ${
                  isCompleted 
                    ? 'bg-green-900/20 border-green-500/50' 
                    : isActive
                    ? 'bg-astral/10 border-astral'
                    : 'bg-midnight-light border-midnight-lighter'
                }`}
              >
                <div className="text-4xl mb-3">{challenge.reward.badge}</div>
                <h3 className="text-xl font-bold text-starlight mb-2">{challenge.name}</h3>
                <p className="text-sm text-starlight/60 mb-3">{challenge.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-starlight/50">{challenge.duration} days</span>
                  <span className="text-xs text-yellow-500 font-medium">+{challenge.reward.xp} XP</span>
                </div>

                {isCompleted ? (
                  <div className="text-center py-2 text-green-500 font-medium">
                    ✓ Completed
                  </div>
                ) : isActive ? (
                  <div className="text-center py-2 text-astral font-medium">
                    In Progress...
                  </div>
                ) : (
                  <button
                    onClick={() => startChallenge(challenge)}
                    className="w-full px-4 py-2 bg-astral text-white rounded-lg font-medium hover:bg-astral/80 transition-colors"
                  >
                    Start Challenge
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Special Challenges */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-starlight mb-4">Special Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {specialChallenges.map(challenge => {
            const isActive = activeChallenges.some(c => c.id === challenge.id);
            const isCompleted = completedChallenges.some(c => c.id === challenge.id);

            return (
              <div 
                key={challenge.id}
                className={`p-6 rounded-xl border-2 ${
                  isCompleted 
                    ? 'bg-green-900/20 border-green-500/50' 
                    : 'bg-midnight-light border-midnight-lighter'
                }`}
              >
                <div className="text-4xl mb-3">{challenge.reward.badge}</div>
                <h3 className="text-xl font-bold text-starlight mb-2">{challenge.name}</h3>
                <p className="text-sm text-starlight/60 mb-3">{challenge.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-starlight/50">{challenge.duration} days</span>
                  <span className="text-xs text-yellow-500 font-medium">+{challenge.reward.xp} XP</span>
                </div>

                {isCompleted ? (
                  <div className="text-center py-2 text-green-500 font-medium">
                    ✓ Completed
                  </div>
                ) : (
                  <button
                    onClick={() => startChallenge(challenge)}
                    disabled={isActive}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {isActive ? 'In Progress' : 'Start Challenge'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SeasonalChallenges;
