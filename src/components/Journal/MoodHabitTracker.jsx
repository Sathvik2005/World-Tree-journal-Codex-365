import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Smile, Frown, Meh, Heart, Zap, Coffee, Book, Target } from 'lucide-react';

/**
 * MoodHabitTracker Component
 * Visual mood tracker + habit calendar showing activity-happiness correlation
 * Inspired by Daylio and Fhynix apps
 */

const MoodHabitTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todayMood, setTodayMood] = useState(null);
  const [todayActivities, setTodayActivities] = useState([]);
  const [moodHistory, setMoodHistory] = useState({});
  const [activityHistory, setActivityHistory] = useState({});
  const [showStats, setShowStats] = useState(false);

  const moods = [
    { value: 5, label: 'Radiant', icon: '😄', color: 'cyan-400', emoji: '✨' },
    { value: 4, label: 'Happy', icon: '😊', color: 'green-400', emoji: '🌟' },
    { value: 3, label: 'Neutral', icon: '😐', color: 'yellow-400', emoji: '⚖️' },
    { value: 2, label: 'Low', icon: '😔', color: 'orange-400', emoji: '🌧️' },
    { value: 1, label: 'Struggling', icon: '😢', color: 'red-400', emoji: '🌑' },
  ];

  const activities = [
    { id: 'exercise', label: 'Exercise', icon: Zap, color: 'cyan' },
    { id: 'reading', label: 'Reading', icon: Book, color: 'purple' },
    { id: 'social', label: 'Social Time', icon: Heart, color: 'pink' },
    { id: 'work', label: 'Productive Work', icon: Target, color: 'blue' },
    { id: 'relax', label: 'Relaxation', icon: Coffee, color: 'amber' },
    { id: 'creative', label: 'Creative Work', icon: '🎨', color: 'violet' },
    { id: 'nature', label: 'Outdoors', icon: '🌲', color: 'green' },
    { id: 'sleep', label: 'Good Sleep', icon: '😴', color: 'indigo' },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const moods = JSON.parse(localStorage.getItem('mythical_mood_history') || '{}');
    const activities = JSON.parse(localStorage.getItem('mythical_activity_history') || '{}');
    setMoodHistory(moods);
    setActivityHistory(activities);

    const today = getDateKey(new Date());
    setTodayMood(moods[today] || null);
    setTodayActivities(activities[today] || []);
  };

  const getDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const saveMood = (moodValue) => {
    const dateKey = getDateKey(new Date());
    const updated = { ...moodHistory, [dateKey]: moodValue };
    setMoodHistory(updated);
    setTodayMood(moodValue);
    localStorage.setItem('mythical_mood_history', JSON.stringify(updated));
  };

  const toggleActivity = (activityId) => {
    const dateKey = getDateKey(new Date());
    const current = todayActivities.includes(activityId)
      ? todayActivities.filter(id => id !== activityId)
      : [...todayActivities, activityId];

    const updated = { ...activityHistory, [dateKey]: current };
    setActivityHistory(updated);
    setTodayActivities(current);
    localStorage.setItem('mythical_activity_history', JSON.stringify(updated));
  };

  const calculateCorrelation = () => {
    const entries = Object.keys(moodHistory).map(date => ({
      date,
      mood: moodHistory[date],
      activities: activityHistory[date] || [],
    }));

    if (entries.length < 5) return null;

    const activityMoodImpact = {};
    activities.forEach(activity => {
      const withActivity = entries.filter(e => e.activities.includes(activity.id));
      const withoutActivity = entries.filter(e => !e.activities.includes(activity.id));

      if (withActivity.length > 0 && withoutActivity.length > 0) {
        const avgWith = withActivity.reduce((sum, e) => sum + e.mood, 0) / withActivity.length;
        const avgWithout = withoutActivity.reduce((sum, e) => sum + e.mood, 0) / withoutActivity.length;
        const impact = avgWith - avgWithout;

        activityMoodImpact[activity.id] = {
          label: activity.label,
          impact: impact.toFixed(2),
          avgMood: avgWith.toFixed(1),
          count: withActivity.length,
        };
      }
    });

    return Object.entries(activityMoodImpact)
      .sort(([, a], [, b]) => b.impact - a.impact);
  };

  const getMoodTrend = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return getDateKey(date);
    }).reverse();

    return last7Days.map(date => ({
      date,
      mood: moodHistory[date] || 0,
      activities: activityHistory[date] || [],
    }));
  };

  const getAvgMood = (days = 7) => {
    const trend = getMoodTrend();
    const validMoods = trend.filter(d => d.mood > 0);
    if (validMoods.length === 0) return 0;
    return (validMoods.reduce((sum, d) => sum + d.mood, 0) / validMoods.length).toFixed(1);
  };

  const renderCalendar = () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startPadding = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startPadding; i++) {
      days.push(<div key={`pad-${i}`} className="h-12" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(today.getFullYear(), today.getMonth(), day);
      const dateKey = getDateKey(date);
      const mood = moodHistory[dateKey];
      const isToday = day === today.getDate();

      days.push(
        <div
          key={day}
          className={`h-12 rounded-lg flex items-center justify-center cursor-pointer transition-all ${
            isToday ? 'ring-2 ring-cyan-400' : ''
          }`}
          style={{
            backgroundColor: mood
              ? moods.find(m => m.value === mood)?.color
                ? `var(--color-${moods.find(m => m.value === mood)?.color}, #3B82F6)`
                : 'rgba(59, 130, 246, 0.2)'
              : 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <span className="text-sm font-medium">{day}</span>
          {mood && (
            <span className="ml-1 text-xs">{moods.find(m => m.value === mood)?.emoji}</span>
          )}
        </div>
      );
    }

    return days;
  };

  const correlation = calculateCorrelation();
  const trend = getMoodTrend();
  const avgMood = getAvgMood();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
          Mood & Habit Tracker
        </h2>
        <p className="text-gray-300">See how your activities shape your happiness</p>
      </div>

      {/* Today's Mood */}
      <div className="glass-effect mythic-border p-6 rounded-2xl">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Smile className="text-cyan-400" size={24} />
          How are you feeling today?
        </h3>
        <div className="flex gap-3 justify-center flex-wrap">
          {moods.map(mood => (
            <button
              key={mood.value}
              onClick={() => saveMood(mood.value)}
              className={`flex flex-col items-center p-4 rounded-xl transition-all hover:scale-110 ${
                todayMood === mood.value
                  ? 'bg-cyan-500/30 ring-2 ring-cyan-400'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <span className="text-4xl mb-2">{mood.icon}</span>
              <span className="text-sm font-medium">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Activities */}
      <div className="glass-effect mythic-border p-6 rounded-2xl">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Target className="text-cyan-400" size={24} />
          What did you do today?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {activities.map(activity => {
            const Icon = activity.icon;
            const isSelected = todayActivities.includes(activity.id);
            return (
              <button
                key={activity.id}
                onClick={() => toggleActivity(activity.id)}
                className={`p-4 rounded-xl transition-all hover:scale-105 ${
                  isSelected
                    ? 'bg-cyan-500/30 ring-2 ring-cyan-400'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  {typeof Icon === 'string' ? (
                    <span className="text-2xl">{Icon}</span>
                  ) : (
                    <Icon size={28} className="text-cyan-400" />
                  )}
                  <span className="text-sm font-medium text-center">{activity.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mood Calendar */}
      <div className="glass-effect mythic-border p-6 rounded-2xl">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="text-cyan-400" size={24} />
          Mood Calendar
        </h3>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-400">
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-300 mt-4">
          <span>Mood Scale:</span>
          {moods.reverse().map(mood => (
            <div key={mood.value} className="flex items-center gap-1">
              <span>{mood.icon}</span>
              <span className="text-xs">{mood.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Trend */}
      <div className="glass-effect mythic-border p-6 rounded-2xl">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="text-cyan-400" size={24} />
          7-Day Mood Trend
        </h3>
        <div className="space-y-3">
          {trend.map((day, idx) => (
            <div key={day.date} className="flex items-center gap-4">
              <span className="text-sm text-gray-400 w-24">
                {idx === 6 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
              <div className="flex-1 bg-white/5 rounded-full h-8 relative overflow-hidden">
                {day.mood > 0 && (
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center transition-all duration-500"
                    style={{ width: `${(day.mood / 5) * 100}%` }}
                  >
                    <span className="text-sm font-bold">
                      {moods.find(m => m.value === day.mood)?.icon}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-sm font-semibold w-16 text-right">
                {day.mood > 0 ? `${day.mood}/5` : '-'}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center p-4 bg-cyan-500/10 rounded-xl">
          <p className="text-sm text-gray-300">
            Your average mood this week: <span className="text-2xl font-bold text-cyan-400">{avgMood}/5</span>
          </p>
        </div>
      </div>

      {/* Activity Impact Analysis */}
      {correlation && correlation.length > 0 && (
        <div className="glass-effect mythic-border p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Heart className="text-cyan-400" size={24} />
            What Makes You Happiest?
          </h3>
          <div className="space-y-3">
            {correlation.map(([activityId, data]) => (
              <div
                key={activityId}
                className={`p-4 rounded-xl ${
                  parseFloat(data.impact) > 0 ? 'bg-green-500/10' : 'bg-red-500/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {activities.find(a => a.id === activityId)?.icon}
                    </span>
                    <div>
                      <p className="font-semibold">{data.label}</p>
                      <p className="text-sm text-gray-400">
                        Average mood: {data.avgMood}/5 ({data.count} days)
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-2xl font-bold ${
                        parseFloat(data.impact) > 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {parseFloat(data.impact) > 0 ? '+' : ''}{data.impact}
                    </p>
                    <p className="text-xs text-gray-400">mood impact</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-400 text-center">
            💡 Based on {Object.keys(moodHistory).length} days of tracking
          </p>
        </div>
      )}

      {/* Insights */}
      {Object.keys(moodHistory).length < 5 && (
        <div className="text-center p-6 bg-cyan-500/10 rounded-xl">
          <p className="text-gray-300">
            ✨ Track your mood for 5+ days to unlock personalized insights!
          </p>
        </div>
      )}
    </div>
  );
};

export default MoodHabitTracker;
