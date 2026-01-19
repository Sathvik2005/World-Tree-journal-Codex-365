import React, { useState, useEffect } from 'react';

/**
 * Achievement System with Badges
 * Gamification system with visual rewards for user milestones
 */
const AchievementSystem = () => {
  const [userAchievements, setUserAchievements] = useState([]);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(null);

  // Define all achievements
  const achievements = [
    // Writing Milestones
    { id: 'first_entry', name: 'First Steps', description: 'Write your first journal entry', xp: 10, icon: '🌱', category: 'writing' },
    { id: 'streak_7', name: 'Week Warrior', description: '7 day writing streak', xp: 50, icon: '🔥', category: 'consistency' },
    { id: 'streak_30', name: 'Monthly Maven', description: '30 day writing streak', xp: 200, icon: '⭐', category: 'consistency' },
    { id: 'streak_100', name: 'Centurion', description: '100 day writing streak', xp: 1000, icon: '💎', category: 'consistency' },
    { id: 'words_1000', name: 'Wordsmith', description: 'Write 1,000 total words', xp: 30, icon: '✍️', category: 'writing' },
    { id: 'words_10000', name: 'Scribe Master', description: 'Write 10,000 total words', xp: 150, icon: '📝', category: 'writing' },
    { id: 'words_50000', name: 'Novel Length', description: 'Write 50,000 words (novel length!)', xp: 500, icon: '📚', category: 'writing' },
    
    // Journal Variety
    { id: 'multimedia_5', name: 'Media Maven', description: 'Add 5 photos/voice notes', xp: 40, icon: '📸', category: 'multimedia' },
    { id: 'templates_all', name: 'Template Explorer', description: 'Try all 8 journal templates', xp: 80, icon: '📋', category: 'exploration' },
    { id: 'mood_30', name: 'Emotion Tracker', description: 'Track mood for 30 days', xp: 100, icon: '😊', category: 'reflection' },
    
    // Reflection & Growth
    { id: 'ai_reflection_10', name: 'Deep Thinker', description: 'Complete 10 AI reflections', xp: 60, icon: '🧠', category: 'reflection' },
    { id: 'shadow_work_5', name: 'Shadow Explorer', description: 'Complete 5 shadow work sessions', xp: 120, icon: '🌓', category: 'reflection' },
    { id: 'gratitude_50', name: 'Gratitude Guru', description: 'Write 50 gratitude entries', xp: 150, icon: '🙏', category: 'reflection' },
    { id: 'glimmers_25', name: 'Joy Collector', description: 'Collect 25 glimmers of joy', xp: 80, icon: '✨', category: 'reflection' },
    
    // Creative Writing
    { id: 'manuscript_1', name: 'Story Starter', description: 'Complete your first manuscript', xp: 100, icon: '📖', category: 'creative' },
    { id: 'manuscript_5', name: 'Prolific Writer', description: 'Complete 5 manuscripts', xp: 300, icon: '📚', category: 'creative' },
    { id: 'character_10', name: 'Character Creator', description: 'Create 10 characters', xp: 80, icon: '👥', category: 'creative' },
    { id: 'world_building', name: 'World Builder', description: 'Add 20 lore entries', xp: 120, icon: '🌍', category: 'creative' },
    
    // Special Achievements
    { id: 'night_owl', name: 'Night Owl', description: 'Write after midnight 5 times', xp: 50, icon: '🦉', category: 'special' },
    { id: 'early_bird', name: 'Early Bird', description: 'Write before 6 AM 5 times', xp: 50, icon: '🌅', category: 'special' },
    { id: 'year_complete', name: 'Year Journey', description: 'Journal for 365 days', xp: 2000, icon: '🏆', category: 'special' },
    { id: 'explorer', name: 'Feature Explorer', description: 'Use all 24 tools', xp: 200, icon: '🗺️', category: 'exploration' },
  ];

  // XP thresholds for levels
  const getLevelThreshold = (lvl) => lvl * 100 + (lvl - 1) * 50;

  useEffect(() => {
    loadAchievements();
    checkForNewAchievements();
  }, []);

  /**
   * Load achievements from localStorage
   */
  const loadAchievements = () => {
    const saved = localStorage.getItem('mythical_achievements');
    const savedLevel = localStorage.getItem('mythical_level');
    const savedXp = localStorage.getItem('mythical_xp');
    
    if (saved) setUserAchievements(JSON.parse(saved));
    if (savedLevel) setLevel(parseInt(savedLevel));
    if (savedXp) setXp(parseInt(savedXp));
  };

  /**
   * Check if user has unlocked new achievements
   */
  const checkForNewAchievements = () => {
    const stats = getUserStats();
    const unlocked = [];

    achievements.forEach(achievement => {
      if (userAchievements.includes(achievement.id)) return;

      let shouldUnlock = false;

      // Check achievement conditions
      switch (achievement.id) {
        case 'first_entry':
          shouldUnlock = stats.totalEntries >= 1;
          break;
        case 'streak_7':
          shouldUnlock = stats.currentStreak >= 7;
          break;
        case 'streak_30':
          shouldUnlock = stats.currentStreak >= 30;
          break;
        case 'streak_100':
          shouldUnlock = stats.currentStreak >= 100;
          break;
        case 'words_1000':
          shouldUnlock = stats.totalWords >= 1000;
          break;
        case 'words_10000':
          shouldUnlock = stats.totalWords >= 10000;
          break;
        case 'words_50000':
          shouldUnlock = stats.totalWords >= 50000;
          break;
        case 'multimedia_5':
          shouldUnlock = stats.multimediaEntries >= 5;
          break;
        case 'mood_30':
          shouldUnlock = stats.moodTrackedDays >= 30;
          break;
        case 'gratitude_50':
          shouldUnlock = stats.gratitudeEntries >= 50;
          break;
        case 'manuscript_1':
          shouldUnlock = stats.manuscripts >= 1;
          break;
        case 'manuscript_5':
          shouldUnlock = stats.manuscripts >= 5;
          break;
        default:
          break;
      }

      if (shouldUnlock) {
        unlocked.push(achievement);
      }
    });

    // Unlock achievements
    unlocked.forEach(achievement => {
      unlockAchievement(achievement);
    });
  };

  /**
   * Get user statistics
   */
  const getUserStats = () => {
    try {
      const entries = JSON.parse(localStorage.getItem('mythical_journal_entries') || '[]');
      const manuscripts = JSON.parse(localStorage.getItem('mythical_manuscripts') || '[]');
      const moodHistory = JSON.parse(localStorage.getItem('mythical_mood_history') || '[]');
      const progress = JSON.parse(localStorage.getItem('mythical_progress') || '{}');

      return {
        totalEntries: entries.length,
        currentStreak: progress.currentStreak || 0,
        totalWords: progress.totalWords || 0,
        multimediaEntries: entries.filter(e => e.attachments?.length > 0).length,
        moodTrackedDays: moodHistory.length,
        gratitudeEntries: entries.filter(e => e.tags?.includes('gratitude')).length,
        manuscripts: manuscripts.length
      };
    } catch (e) {
      return {
        totalEntries: 0,
        currentStreak: 0,
        totalWords: 0,
        multimediaEntries: 0,
        moodTrackedDays: 0,
        gratitudeEntries: 0,
        manuscripts: 0
      };
    }
  };

  /**
   * Unlock achievement
   */
  const unlockAchievement = (achievement) => {
    const newAchievements = [...userAchievements, achievement.id];
    setUserAchievements(newAchievements);
    localStorage.setItem('mythical_achievements', JSON.stringify(newAchievements));

    // Add XP
    const newXp = xp + achievement.xp;
    setXp(newXp);
    localStorage.setItem('mythical_xp', newXp.toString());

    // Check for level up
    const threshold = getLevelThreshold(level);
    if (newXp >= threshold) {
      levelUp();
    }

    // Show unlock animation
    setShowUnlockAnimation(achievement);
    setTimeout(() => setShowUnlockAnimation(null), 4000);
  };

  /**
   * Level up
   */
  const levelUp = () => {
    const newLevel = level + 1;
    setLevel(newLevel);
    localStorage.setItem('mythical_level', newLevel.toString());
  };

  /**
   * Get progress to next level
   */
  const getLevelProgress = () => {
    const threshold = getLevelThreshold(level);
    const previousThreshold = level > 1 ? getLevelThreshold(level - 1) : 0;
    const progress = xp - previousThreshold;
    const required = threshold - previousThreshold;
    return (progress / required) * 100;
  };

  /**
   * Group achievements by category
   */
  const groupedAchievements = achievements.reduce((groups, achievement) => {
    const category = achievement.category;
    if (!groups[category]) groups[category] = [];
    groups[category].push(achievement);
    return groups;
  }, {});

  const categoryNames = {
    writing: 'Writing Milestones',
    consistency: 'Consistency Rewards',
    reflection: 'Reflection & Growth',
    creative: 'Creative Achievements',
    multimedia: 'Media Maven',
    exploration: 'Explorer Badges',
    special: 'Special Achievements'
  };

  return (
    <div className="min-h-screen bg-midnight p-6">
      {/* Unlock Animation */}
      {showUnlockAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fadeIn">
          <div className="text-center animate-bounceIn">
            <div className="text-8xl mb-4 animate-pulse">{showUnlockAnimation.icon}</div>
            <h2 className="text-3xl font-bold text-starlight mb-2">Achievement Unlocked!</h2>
            <p className="text-xl text-astral mb-2">{showUnlockAnimation.name}</p>
            <p className="text-starlight/70">{showUnlockAnimation.description}</p>
            <div className="mt-4 text-yellow-500 font-bold">+{showUnlockAnimation.xp} XP</div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-starlight mb-2">Achievements</h1>
        <p className="text-starlight/60">Track your progress and unlock rewards</p>
      </div>

      {/* Level Card */}
      <div className="max-w-6xl mx-auto mb-8 p-6 bg-gradient-to-br from-astral to-purple-600 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-5xl font-bold text-white mb-1">Level {level}</div>
            <div className="text-white/80">{xp} / {getLevelThreshold(level)} XP</div>
          </div>
          <div className="text-6xl">🏆</div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500"
            style={{ width: `${getLevelProgress()}%` }}
          />
        </div>
        
        <div className="mt-3 text-white/70 text-sm">
          {userAchievements.length} / {achievements.length} achievements unlocked
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="max-w-6xl mx-auto space-y-8">
        {Object.entries(groupedAchievements).map(([category, categoryAchievements]) => (
          <div key={category}>
            <h2 className="text-2xl font-bold text-starlight mb-4">
              {categoryNames[category]}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryAchievements.map(achievement => {
                const unlocked = userAchievements.includes(achievement.id);
                
                return (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      unlocked
                        ? 'bg-midnight-light border-astral shadow-lg shadow-astral/20'
                        : 'bg-midnight-dark border-midnight-lighter opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`text-4xl ${!unlocked && 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-starlight mb-1">
                          {achievement.name}
                        </h3>
                        <p className="text-sm text-starlight/60 mb-2">
                          {achievement.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-yellow-500 font-medium">
                            +{achievement.xp} XP
                          </span>
                          {unlocked && (
                            <span className="text-xs text-green-500 font-medium">
                              ✓ Unlocked
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementSystem;
