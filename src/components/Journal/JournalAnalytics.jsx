import React, { useMemo } from 'react';
import { useMythical } from '../../contexts/MythicalContext';

/**
 * JournalAnalytics - Modern Metrics Dashboard
 * Provides comprehensive writing statistics and insights
 */
const JournalAnalytics = () => {
  const { entries, totalEntries, themes, createdAt } = useMythical();

  // Calculate comprehensive metrics
  const metrics = useMemo(() => {
    if (!entries || entries.length === 0) {
      return {
        totalWords: 0,
        totalCharacters: 0,
        averageWordsPerEntry: 0,
        averageReadingTime: 0,
        longestEntry: null,
        shortestEntry: null,
        writingStreak: 0,
        currentStreak: 0,
        entriesThisWeek: 0,
        entriesThisMonth: 0,
        mostActiveDay: null,
        mostActiveHour: null,
        moodDistribution: {},
        themeDistribution: {},
        wordFrequency: {},
        estimatedTotalTime: 0,
      };
    }

    // Word and character counts
    const totalWords = entries.reduce((sum, entry) => {
      const words = entry.content.trim().split(/\s+/).length;
      return sum + words;
    }, 0);

    const totalCharacters = entries.reduce((sum, entry) => {
      return sum + entry.content.length;
    }, 0);

    const averageWordsPerEntry = Math.round(totalWords / entries.length);
    const averageReadingTime = Math.round(averageWordsPerEntry / 200); // 200 WPM average

    // Find longest and shortest entries
    const entriesWithWordCount = entries.map(entry => ({
      ...entry,
      wordCount: entry.content.trim().split(/\s+/).length
    }));
    const sortedByLength = [...entriesWithWordCount].sort((a, b) => b.wordCount - a.wordCount);
    const longestEntry = sortedByLength[0];
    const shortestEntry = sortedByLength[sortedByLength.length - 1];

    // Calculate writing streaks
    const sortedByDate = [...entries].sort((a, b) => 
      new Date(a.timestamp) - new Date(b.timestamp)
    );
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;
    let lastDate = null;

    sortedByDate.forEach((entry, index) => {
      const entryDate = new Date(entry.timestamp).toDateString();
      
      if (lastDate) {
        const dayDiff = Math.floor(
          (new Date(entryDate) - new Date(lastDate)) / (1000 * 60 * 60 * 24)
        );
        
        if (dayDiff === 1) {
          tempStreak++;
        } else if (dayDiff > 1) {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }
      
      lastDate = entryDate;
      
      // Check if this is today or yesterday for current streak
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      
      if (index === sortedByDate.length - 1) {
        if (entryDate === today || entryDate === yesterday) {
          currentStreak = tempStreak;
        }
        longestStreak = Math.max(longestStreak, tempStreak);
      }
    });

    // Entries this week/month
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const entriesThisWeek = entries.filter(e => 
      new Date(e.timestamp) >= weekAgo
    ).length;
    
    const entriesThisMonth = entries.filter(e => 
      new Date(e.timestamp) >= monthAgo
    ).length;

    // Most active day and hour
    const dayCount = {};
    const hourCount = {};
    
    entries.forEach(entry => {
      const date = new Date(entry.timestamp);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      const hour = date.getHours();
      
      dayCount[day] = (dayCount[day] || 0) + 1;
      hourCount[hour] = (hourCount[hour] || 0) + 1;
    });

    const mostActiveDay = Object.keys(dayCount).reduce((a, b) => 
      dayCount[a] > dayCount[b] ? a : b, Object.keys(dayCount)[0]
    );

    const mostActiveHour = Object.keys(hourCount).reduce((a, b) => 
      hourCount[a] > hourCount[b] ? a : b, Object.keys(hourCount)[0]
    );

    // Mood distribution
    const moodDistribution = {};
    entries.forEach(entry => {
      const emotion = entry.emotion || 'neutral';
      moodDistribution[emotion] = (moodDistribution[emotion] || 0) + 1;
    });

    // Theme distribution (from context themes)
    const themeDistribution = { ...themes };

    // Word frequency (top 10 most used words, excluding common words)
    const commonWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'i',
      'my', 'me', 'is', 'was', 'are', 'been', 'be', 'have', 'has', 'had',
      'do', 'does', 'did', 'will', 'would', 'could', 'should', 'it', 'this',
      'that', 'these', 'those', 'as', 'if', 'when', 'where', 'why', 'how'
    ]);

    const wordFrequency = {};
    entries.forEach(entry => {
      const words = entry.content.toLowerCase().match(/\b\w+\b/g) || [];
      words.forEach(word => {
        if (word.length > 3 && !commonWords.has(word)) {
          wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }
      });
    });

    const topWords = Object.entries(wordFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .reduce((obj, [word, count]) => {
        obj[word] = count;
        return obj;
      }, {});

    // Estimated total time (3 minutes per 100 words)
    const estimatedTotalTime = Math.round((totalWords / 100) * 3);

    return {
      totalWords,
      totalCharacters,
      averageWordsPerEntry,
      averageReadingTime,
      longestEntry,
      shortestEntry,
      longestStreak,
      currentStreak,
      entriesThisWeek,
      entriesThisMonth,
      mostActiveDay,
      mostActiveHour,
      moodDistribution,
      themeDistribution,
      wordFrequency: topWords,
      estimatedTotalTime,
    };
  }, [entries, themes]);

  // Journey age in days
  const journeyAge = useMemo(() => {
    if (!createdAt) return 0;
    const start = new Date(createdAt);
    const now = new Date();
    return Math.floor((now - start) / (1000 * 60 * 60 * 24));
  }, [createdAt]);

  return (
    <div className="journal-analytics space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="mythic-border glass-effect rounded-xl p-6 text-center hover:glow-box transition-all duration-500">
          <div className="text-3xl font-bold font-montserrat text-cyan-mist mb-2">
            {totalEntries}
          </div>
          <div className="text-sm font-inter text-starlight/70">Total Entries</div>
        </div>

        <div className="mythic-border glass-effect rounded-xl p-6 text-center hover:glow-box transition-all duration-500">
          <div className="text-3xl font-bold font-montserrat text-astral mb-2">
            {metrics.totalWords.toLocaleString()}
          </div>
          <div className="text-sm font-inter text-starlight/70">Total Words</div>
        </div>

        <div className="mythic-border glass-effect rounded-xl p-6 text-center hover:glow-box transition-all duration-500">
          <div className="text-3xl font-bold font-montserrat text-cyan-mist mb-2">
            {metrics.currentStreak}
          </div>
          <div className="text-sm font-inter text-starlight/70">Current Streak</div>
        </div>

        <div className="mythic-border glass-effect rounded-xl p-6 text-center hover:glow-box transition-all duration-500">
          <div className="text-3xl font-bold font-montserrat text-astral mb-2">
            {journeyAge}
          </div>
          <div className="text-sm font-inter text-starlight/70">Journey Days</div>
        </div>
      </div>

      {/* Writing Statistics */}
      <div className="mythic-border glass-effect rounded-2xl p-8">
        <h3 className="text-2xl font-bold font-montserrat text-cyan-mist mb-6 flex items-center gap-2">
          <span className="text-3xl">ᚹ</span> Writing Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-starlight/60 text-sm font-inter mb-1">Average Words/Entry</div>
            <div className="text-2xl font-bold font-montserrat text-starlight">
              {metrics.averageWordsPerEntry}
            </div>
          </div>
          <div>
            <div className="text-starlight/60 text-sm font-inter mb-1">Average Read Time</div>
            <div className="text-2xl font-bold font-montserrat text-starlight">
              {metrics.averageReadingTime} min
            </div>
          </div>
          <div>
            <div className="text-starlight/60 text-sm font-inter mb-1">Total Writing Time</div>
            <div className="text-2xl font-bold font-montserrat text-starlight">
              {metrics.estimatedTotalTime} min
            </div>
          </div>
          <div>
            <div className="text-starlight/60 text-sm font-inter mb-1">Longest Entry</div>
            <div className="text-lg font-semibold font-montserrat text-cyan-mist">
              {metrics.longestEntry?.wordCount || 0} words
            </div>
          </div>
          <div>
            <div className="text-starlight/60 text-sm font-inter mb-1">Shortest Entry</div>
            <div className="text-lg font-semibold font-montserrat text-cyan-mist">
              {metrics.shortestEntry?.wordCount || 0} words
            </div>
          </div>
          <div>
            <div className="text-starlight/60 text-sm font-inter mb-1">Total Characters</div>
            <div className="text-lg font-semibold font-montserrat text-cyan-mist">
              {metrics.totalCharacters.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Streaks & Frequency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mythic-border glass-effect rounded-2xl p-8">
          <h3 className="text-2xl font-bold font-montserrat text-cyan-mist mb-6 flex items-center gap-2">
            <span className="text-3xl">ᚠ</span> Writing Streaks
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-starlight/70 font-inter">Current Streak</span>
              <span className="text-2xl font-bold font-montserrat text-astral">
                {metrics.currentStreak} days
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-starlight/70 font-inter">Longest Streak</span>
              <span className="text-2xl font-bold font-montserrat text-cyan-mist">
                {metrics.longestStreak} days
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-starlight/70 font-inter">This Week</span>
              <span className="text-xl font-bold font-montserrat text-starlight">
                {metrics.entriesThisWeek} entries
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-starlight/70 font-inter">This Month</span>
              <span className="text-xl font-bold font-montserrat text-starlight">
                {metrics.entriesThisMonth} entries
              </span>
            </div>
          </div>
        </div>

        <div className="mythic-border glass-effect rounded-2xl p-8">
          <h3 className="text-2xl font-bold font-montserrat text-cyan-mist mb-6 flex items-center gap-2">
            <span className="text-3xl">ᛏ</span> Writing Patterns
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-starlight/70 text-sm font-inter mb-2">Most Active Day</div>
              <div className="text-xl font-bold font-montserrat text-astral">
                {metrics.mostActiveDay || 'N/A'}
              </div>
            </div>
            <div>
              <div className="text-starlight/70 text-sm font-inter mb-2">Most Active Hour</div>
              <div className="text-xl font-bold font-montserrat text-cyan-mist">
                {metrics.mostActiveHour !== null 
                  ? `${metrics.mostActiveHour}:00 - ${parseInt(metrics.mostActiveHour) + 1}:00`
                  : 'N/A'
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emotional Insights */}
      <div className="mythic-border glass-effect rounded-2xl p-8">
        <h3 className="text-2xl font-bold font-montserrat text-cyan-mist mb-6 flex items-center gap-2">
          <span className="text-3xl">ᛖ</span> Emotional Landscape
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(metrics.moodDistribution).map(([mood, count]) => {
            const percentage = ((count / totalEntries) * 100).toFixed(1);
            return (
              <div key={mood} className="glass-effect rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-starlight capitalize font-inter">{mood}</span>
                  <span className="text-cyan-mist font-bold font-montserrat">{count}</span>
                </div>
                <div className="w-full bg-midnight-deep rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-astral to-cyan-mist h-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-xs text-starlight/60 mt-1 font-inter">{percentage}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Theme Distribution */}
      <div className="mythic-border glass-effect rounded-2xl p-8">
        <h3 className="text-2xl font-bold font-montserrat text-cyan-mist mb-6 flex items-center gap-2">
          <span className="text-3xl">ᚦ</span> Thematic Journey
        </h3>
        <div className="space-y-4">
          {Object.entries(metrics.themeDistribution).map(([theme, value]) => {
            const maxTheme = Math.max(...Object.values(metrics.themeDistribution));
            const percentage = maxTheme > 0 ? (value / maxTheme) * 100 : 0;
            return (
              <div key={theme}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-starlight capitalize font-inter text-lg">{theme}</span>
                  <span className="text-cyan-mist font-bold font-montserrat text-xl">{value}</span>
                </div>
                <div className="w-full bg-midnight-deep rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-astral via-cyan-mist to-astral h-full transition-all duration-700 glow-box"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Word Frequency */}
      {Object.keys(metrics.wordFrequency).length > 0 && (
        <div className="mythic-border glass-effect rounded-2xl p-8">
          <h3 className="text-2xl font-bold font-montserrat text-cyan-mist mb-6 flex items-center gap-2">
            <span className="text-3xl">ᚱ</span> Your Voice (Top Words)
          </h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(metrics.wordFrequency).map(([word, count]) => (
              <div 
                key={word} 
                className="glass-effect rounded-full px-6 py-3 hover:glow-box transition-all duration-300 cursor-default"
              >
                <span className="text-starlight font-inter capitalize">{word}</span>
                <span className="text-cyan-mist font-bold font-montserrat ml-2">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalAnalytics;
