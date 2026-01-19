import React, { useState, useEffect } from 'react';
import { useMythical } from '../../contexts/MythicalContext';

/**
 * WritingGoals - Goal tracking and productivity insights
 * Set daily/weekly/monthly writing goals and track progress
 */
const WritingGoals = () => {
  const { entries, totalEntries } = useMythical();
  
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('mythical_writing_goals');
    return saved ? JSON.parse(saved) : {
      daily: { target: 1, enabled: true },
      weekly: { target: 5, enabled: true },
      monthly: { target: 20, enabled: true },
      wordCount: { target: 300, enabled: false },
    };
  });

  const [showSettings, setShowSettings] = useState(false);

  // Save goals to localStorage
  useEffect(() => {
    localStorage.setItem('mythical_writing_goals', JSON.stringify(goals));
  }, [goals]);

  // Calculate progress
  const progress = React.useMemo(() => {
    const now = new Date();
    const today = now.toDateString();
    
    // Week start (Monday)
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
    weekStart.setHours(0, 0, 0, 0);
    
    // Month start
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Count entries
    const todayEntries = entries.filter(e => 
      new Date(e.timestamp).toDateString() === today
    ).length;
    
    const weekEntries = entries.filter(e => 
      new Date(e.timestamp) >= weekStart
    ).length;
    
    const monthEntries = entries.filter(e => 
      new Date(e.timestamp) >= monthStart
    ).length;
    
    // Today's word count
    const todayWords = entries
      .filter(e => new Date(e.timestamp).toDateString() === today)
      .reduce((sum, entry) => sum + entry.content.trim().split(/\s+/).length, 0);
    
    return {
      daily: {
        current: todayEntries,
        target: goals.daily.target,
        percentage: Math.min((todayEntries / goals.daily.target) * 100, 100),
        achieved: todayEntries >= goals.daily.target,
      },
      weekly: {
        current: weekEntries,
        target: goals.weekly.target,
        percentage: Math.min((weekEntries / goals.weekly.target) * 100, 100),
        achieved: weekEntries >= goals.weekly.target,
      },
      monthly: {
        current: monthEntries,
        target: goals.monthly.target,
        percentage: Math.min((monthEntries / goals.monthly.target) * 100, 100),
        achieved: monthEntries >= goals.monthly.target,
      },
      wordCount: {
        current: todayWords,
        target: goals.wordCount.target,
        percentage: Math.min((todayWords / goals.wordCount.target) * 100, 100),
        achieved: todayWords >= goals.wordCount.target,
      },
    };
  }, [entries, goals]);

  const updateGoal = (type, value) => {
    setGoals(prev => ({
      ...prev,
      [type]: { ...prev[type], target: parseInt(value) || 1 },
    }));
  };

  const toggleGoal = (type) => {
    setGoals(prev => ({
      ...prev,
      [type]: { ...prev[type], enabled: !prev[type].enabled },
    }));
  };

  return (
    <div className="writing-goals mythic-border glass-effect rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold font-montserrat text-cyan-mist flex items-center gap-2">
          <span className="text-3xl">ᚷ</span> Writing Goals
        </h3>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-starlight/70 hover:text-cyan-mist transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {showSettings ? (
        /* Settings View */
        <div className="space-y-4">
          {[
            { key: 'daily', label: 'Daily Entries', unit: 'entries' },
            { key: 'weekly', label: 'Weekly Entries', unit: 'entries' },
            { key: 'monthly', label: 'Monthly Entries', unit: 'entries' },
            { key: 'wordCount', label: 'Daily Words', unit: 'words' },
          ].map(goal => (
            <div key={goal.key} className="flex items-center gap-4 p-4 bg-midnight-deep rounded-lg">
              <input
                type="checkbox"
                checked={goals[goal.key].enabled}
                onChange={() => toggleGoal(goal.key)}
                className="w-5 h-5 rounded border-2 border-cyan-mist bg-midnight text-cyan-mist focus:ring-2 focus:ring-cyan-mist"
              />
              <div className="flex-1">
                <label className="text-starlight font-inter">{goal.label}</label>
              </div>
              <input
                type="number"
                min="1"
                value={goals[goal.key].target}
                onChange={(e) => updateGoal(goal.key, e.target.value)}
                disabled={!goals[goal.key].enabled}
                className="w-20 px-3 py-2 bg-midnight border-2 border-starlight/20 rounded-lg text-starlight text-center focus:outline-none focus:border-cyan-mist disabled:opacity-50 font-inter"
              />
              <span className="text-starlight/60 text-sm font-inter">{goal.unit}</span>
            </div>
          ))}
          <button
            onClick={() => setShowSettings(false)}
            className="w-full py-3 mythic-border glass-effect hover:glow-box text-cyan-mist font-bold font-montserrat rounded-lg transition-all duration-300"
          >
            Save & Close
          </button>
        </div>
      ) : (
        /* Progress View */
        <div className="space-y-6">
          {[
            { key: 'daily', label: 'Today', icon: '☀️' },
            { key: 'weekly', label: 'This Week', icon: '📅' },
            { key: 'monthly', label: 'This Month', icon: '🗓️' },
            { key: 'wordCount', label: "Today's Words", icon: '✍️' },
          ].map(goal => {
            if (!goals[goal.key].enabled) return null;
            
            const data = progress[goal.key];
            
            return (
              <div key={goal.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-starlight font-inter flex items-center gap-2">
                    <span>{goal.icon}</span>
                    {goal.label}
                  </span>
                  <span className={`font-bold font-montserrat ${
                    data.achieved ? 'text-cyan-mist' : 'text-starlight'
                  }`}>
                    {data.current} / {data.target}
                  </span>
                </div>
                
                <div className="relative w-full h-3 bg-midnight-deep rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-700 ${
                      data.achieved 
                        ? 'bg-gradient-to-r from-cyan-mist to-astral glow-box' 
                        : 'bg-gradient-to-r from-astral/60 to-cyan-mist/60'
                    }`}
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>
                
                {data.achieved && (
                  <div className="text-cyan-mist text-sm font-inter flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Goal achieved!
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Motivational Footer */}
      {!showSettings && (
        <div className="mt-8 pt-6 border-t border-starlight/10 text-center">
          <p className="text-starlight/70 font-inter italic">
            {Object.values(progress).filter(p => p.achieved).length > 0
              ? '"Every goal achieved strengthens the World Tree"'
              : '"Small steps lead to great journeys"'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default WritingGoals;
