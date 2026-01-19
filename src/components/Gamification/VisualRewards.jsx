import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Visual Rewards System
 * Unlockable tree branches, constellations, and decorations based on user progress
 */
const VisualRewards = ({ level, achievements, totalEntries }) => {
  const [unlockedRewards, setUnlockedRewards] = useState([]);
  const [showNewReward, setShowNewReward] = useState(null);

  // Define all unlockable rewards
  const rewards = {
    branches: [
      { id: 'branch_1', name: 'First Branch', unlockAt: { entries: 5 }, icon: '🌿', color: '#4ade80' },
      { id: 'branch_2', name: 'Growth Branch', unlockAt: { entries: 10 }, icon: '🍃', color: '#22c55e' },
      { id: 'branch_3', name: 'Wisdom Branch', unlockAt: { entries: 25 }, icon: '🌳', color: '#16a34a' },
      { id: 'branch_4', name: 'Ancient Branch', unlockAt: { level: 5 }, icon: '🌲', color: '#15803d' },
      { id: 'branch_5', name: 'Celestial Branch', unlockAt: { level: 10 }, icon: '✨', color: '#fbbf24' },
      { id: 'branch_6', name: 'Eternal Branch', unlockAt: { achievements: 10 }, icon: '🌠', color: '#818cf8' },
    ],
    constellations: [
      { id: 'star_1', name: 'Writer Star', unlockAt: { entries: 15 }, icon: '⭐', position: { x: 20, y: 15 } },
      { id: 'star_2', name: 'Reflection Star', unlockAt: { entries: 30 }, icon: '🌟', position: { x: 70, y: 25 } },
      { id: 'star_3', name: 'Growth Constellation', unlockAt: { level: 3 }, icon: '✨', position: { x: 50, y: 10 } },
      { id: 'star_4', name: 'Wisdom Constellation', unlockAt: { level: 7 }, icon: '💫', position: { x: 80, y: 40 } },
      { id: 'star_5', name: 'Galaxy Cluster', unlockAt: { achievements: 15 }, icon: '🌌', position: { x: 30, y: 50 } },
    ],
    decorations: [
      { id: 'flower_1', name: 'Cherry Blossom', unlockAt: { entries: 7 }, icon: '🌸', layer: 'canopy' },
      { id: 'flower_2', name: 'Lotus Flower', unlockAt: { entries: 20 }, icon: '🪷', layer: 'roots' },
      { id: 'bird_1', name: 'Songbird', unlockAt: { entries: 12 }, icon: '🐦', layer: 'canopy' },
      { id: 'butterfly', name: 'Butterfly', unlockAt: { level: 4 }, icon: '🦋', layer: 'branches' },
      { id: 'firefly', name: 'Fireflies', unlockAt: { level: 6 }, icon: '✨', layer: 'branches' },
      { id: 'owl', name: 'Wise Owl', unlockAt: { achievements: 8 }, icon: '🦉', layer: 'canopy' },
      { id: 'phoenix', name: 'Phoenix', unlockAt: { achievements: 20 }, icon: '🔥', layer: 'canopy' },
      { id: 'dragon', name: 'Spirit Dragon', unlockAt: { level: 15 }, icon: '🐉', layer: 'roots' },
    ],
    special: [
      { id: 'moon', name: 'Harvest Moon', unlockAt: { entries: 50 }, icon: '🌕', glow: true },
      { id: 'aurora', name: 'Aurora Borealis', unlockAt: { level: 12 }, icon: '🌌', effect: 'shimmer' },
      { id: 'rainbow', name: 'Rainbow Bridge', unlockAt: { achievements: 25 }, icon: '🌈', effect: 'arc' },
      { id: 'portal', name: 'Realm Portal', unlockAt: { level: 20 }, icon: '🌀', effect: 'swirl' },
    ]
  };

  useEffect(() => {
    checkForNewRewards();
  }, [level, achievements, totalEntries]);

  /**
   * Check if new rewards should be unlocked
   */
  const checkForNewRewards = () => {
    const newlyUnlocked = [];
    
    // Check all reward types
    Object.keys(rewards).forEach(category => {
      rewards[category].forEach(reward => {
        if (unlockedRewards.includes(reward.id)) return;

        const { entries: requiredEntries, level: requiredLevel, achievements: requiredAchievements } = reward.unlockAt;

        const shouldUnlock = 
          (requiredEntries && totalEntries >= requiredEntries) ||
          (requiredLevel && level >= requiredLevel) ||
          (requiredAchievements && achievements >= requiredAchievements);

        if (shouldUnlock) {
          newlyUnlocked.push({ ...reward, category });
        }
      });
    });

    if (newlyUnlocked.length > 0) {
      const updated = [...unlockedRewards, ...newlyUnlocked.map(r => r.id)];
      setUnlockedRewards(updated);
      localStorage.setItem('mythical_visual_rewards', JSON.stringify(updated));

      // Show unlock animation for first new reward
      setShowNewReward(newlyUnlocked[0]);
      setTimeout(() => setShowNewReward(null), 3000);

      // Animate unlock
      animateRewardUnlock(newlyUnlocked[0]);
    }
  };

  /**
   * Animate reward unlock
   */
  const animateRewardUnlock = (reward) => {
    const element = document.getElementById(`reward-${reward.id}`);
    if (element) {
      gsap.fromTo(element, 
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }
      );
    }
  };

  /**
   * Load saved rewards
   */
  useEffect(() => {
    const saved = localStorage.getItem('mythical_visual_rewards');
    if (saved) {
      setUnlockedRewards(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-midnight via-midnight-light to-midnight overflow-hidden">
      {/* Unlock Notification */}
      {showNewReward && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-lg shadow-2xl animate-slideDown">
          <div className="text-center">
            <div className="text-4xl mb-2">{showNewReward.icon}</div>
            <div className="text-white font-bold">Reward Unlocked!</div>
            <div className="text-white/80 text-sm">{showNewReward.name}</div>
          </div>
        </div>
      )}

      {/* World Tree Visualization with Rewards */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Constellations (Background) */}
        <div className="absolute inset-0">
          {rewards.constellations
            .filter(star => unlockedRewards.includes(star.id))
            .map(star => (
              <div
                key={star.id}
                id={`reward-${star.id}`}
                className="absolute text-4xl animate-twinkle"
                style={{
                  left: `${star.position.x}%`,
                  top: `${star.position.y}%`,
                  animation: 'twinkle 2s infinite'
                }}
              >
                {star.icon}
              </div>
            ))}
        </div>

        {/* Tree Structure */}
        <div className="relative z-10">
          {/* Canopy */}
          <div className="relative mb-8">
            <div className="text-9xl text-center mb-4">🌳</div>
            
            {/* Canopy Decorations */}
            <div className="absolute inset-0 flex items-center justify-center">
              {rewards.decorations
                .filter(dec => dec.layer === 'canopy' && unlockedRewards.includes(dec.id))
                .map((dec, idx) => (
                  <div
                    key={dec.id}
                    id={`reward-${dec.id}`}
                    className="absolute text-3xl animate-float"
                    style={{
                      left: `${30 + idx * 25}%`,
                      animationDelay: `${idx * 0.3}s`
                    }}
                  >
                    {dec.icon}
                  </div>
                ))}
            </div>
          </div>

          {/* Branches */}
          <div className="flex justify-center gap-4 mb-8">
            {rewards.branches
              .filter(branch => unlockedRewards.includes(branch.id))
              .map(branch => (
                <div
                  key={branch.id}
                  id={`reward-${branch.id}`}
                  className="text-5xl transform hover:scale-110 transition-transform cursor-pointer"
                  style={{ filter: `drop-shadow(0 0 10px ${branch.color})` }}
                  title={branch.name}
                >
                  {branch.icon}
                </div>
              ))}
          </div>

          {/* Branch Layer Decorations */}
          <div className="relative">
            {rewards.decorations
              .filter(dec => dec.layer === 'branches' && unlockedRewards.includes(dec.id))
              .map((dec, idx) => (
                <div
                  key={dec.id}
                  id={`reward-${dec.id}`}
                  className="inline-block text-2xl mx-2 animate-bounce"
                  style={{ animationDelay: `${idx * 0.4}s` }}
                >
                  {dec.icon}
                </div>
              ))}
          </div>

          {/* Roots */}
          <div className="text-center mt-8">
            <div className="text-6xl">🌿</div>
            
            {/* Root Decorations */}
            {rewards.decorations
              .filter(dec => dec.layer === 'roots' && unlockedRewards.includes(dec.id))
              .map(dec => (
                <div
                  key={dec.id}
                  id={`reward-${dec.id}`}
                  className="inline-block text-3xl mx-4 animate-pulse"
                >
                  {dec.icon}
                </div>
              ))}
          </div>
        </div>

        {/* Special Effects */}
        {rewards.special
          .filter(special => unlockedRewards.includes(special.id))
          .map(special => (
            <div
              key={special.id}
              id={`reward-${special.id}`}
              className={`absolute text-6xl ${
                special.effect === 'shimmer' ? 'animate-shimmer' :
                special.effect === 'arc' ? 'top-1/4' :
                special.effect === 'swirl' ? 'animate-spin-slow' :
                'top-10'
              }`}
              style={
                special.glow ? { filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.8))' } : {}
              }
            >
              {special.icon}
            </div>
          ))}
      </div>

      {/* Rewards Gallery */}
      <div className="fixed bottom-0 left-0 right-0 bg-midnight-light/90 backdrop-blur-sm border-t border-midnight-lighter p-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-bold text-starlight mb-3">Unlocked Rewards ({unlockedRewards.length})</h3>
          
          <div className="flex gap-4 overflow-x-auto pb-2">
            {Object.keys(rewards).map(category => (
              <div key={category} className="flex gap-2">
                {rewards[category]
                  .filter(reward => unlockedRewards.includes(reward.id))
                  .map(reward => (
                    <div
                      key={reward.id}
                      className="flex-shrink-0 w-16 h-16 bg-midnight rounded-lg border-2 border-astral flex items-center justify-center text-2xl hover:scale-110 transition-transform cursor-pointer"
                      title={reward.name}
                    >
                      {reward.icon}
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* Progress Info */}
          <div className="mt-3 text-sm text-starlight/60 text-center">
            Keep journaling to unlock {Object.values(rewards).flat().length - unlockedRewards.length} more rewards!
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        @keyframes slideDown {
          from { transform: translate(-50%, -100%); }
          to { transform: translate(-50%, 0); }
        }
        .animate-twinkle { animation: twinkle 2s infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 10s linear infinite; }
        .animate-slideDown { animation: slideDown 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default VisualRewards;
