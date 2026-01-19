/**
 * Intelligent Suggestions Service
 * Automatically suggests journal topics based on recent activities, time, weather, etc.
 * Inspired by Apple Journal's contextual suggestions
 */

class IntelligentSuggestionsService {
  constructor() {
    this.activityPatterns = {
      morning: ['Morning reflection', 'Dream journal', 'Today\'s intentions', 'Gratitude practice'],
      afternoon: ['Midday check-in', 'Productivity review', 'Energy levels', 'Lunch insights'],
      evening: ['Day review', 'Evening gratitude', 'Tomorrow\'s plan', 'Stress release'],
      night: ['Sleep preparation', 'Day highlights', 'Worry dump', 'Peaceful thoughts'],
    };

    this.seasonalThemes = {
      spring: ['Renewal and growth', 'Fresh starts', 'Spring cleaning (mind & space)', 'New beginnings'],
      summer: ['Adventure and exploration', 'Joy and play', 'Summer memories', 'Connection with nature'],
      autumn: ['Letting go', 'Harvest reflections', 'Change and transition', 'Cozy introspection'],
      winter: ['Rest and restoration', 'Inner work', 'Holiday reflections', 'Winter wisdom'],
    };

    this.weatherPrompts = {
      sunny: ['What brightens your day like sunshine?', 'Describe a moment of clarity'],
      rainy: ['What are you releasing today?', 'Embrace the quiet - what do you hear?'],
      cloudy: ['What\'s clouding your mind?', 'Finding beauty in gray moments'],
      stormy: ['Navigating turbulence', 'Inner storms and outer weather'],
      snowy: ['Fresh starts and blank pages', 'Peace in the quiet'],
    };

    this.milestonePrompts = {
      birthday: ['Reflections on another year', 'Letter to your past self', 'Dreams for the year ahead'],
      anniversary: ['Celebrating growth', 'Milestones and memories', 'What\'s evolved?'],
      holiday: ['What this day means to you', 'Traditions and values', 'Gratitude and celebration'],
      newMonth: ['Fresh month intentions', 'Last month\'s lessons', 'Monthly goals check-in'],
      weekend: ['Weekend reflections', 'Rest and recharge', 'Unstructured thoughts'],
    };
  }

  /**
   * Generate contextual suggestions based on current time, date, and user patterns
   * @returns {Array} - Array of suggestion objects with prompts and metadata
   */
  generateSuggestions() {
    const now = new Date();
    const suggestions = [];

    // Time-based suggestions
    suggestions.push(...this._getTimeBasedSuggestions(now));

    // Seasonal suggestions
    suggestions.push(...this._getSeasonalSuggestions(now));

    // Weather-based suggestions (simulated for now)
    suggestions.push(...this._getWeatherSuggestions());

    // Milestone-based suggestions
    suggestions.push(...this._getMilestoneSuggestions(now));

    // Activity-based suggestions (from past entries)
    suggestions.push(...this._getActivityBasedSuggestions());

    // Random inspiration
    suggestions.push(...this._getRandomInspiration());

    // Prioritize and limit to top 8
    return this._prioritizeSuggestions(suggestions).slice(0, 8);
  }

  /**
   * Get suggestions based on time of day
   */
  _getTimeBasedSuggestions(now) {
    const hour = now.getHours();
    let timeOfDay;

    if (hour >= 5 && hour < 12) timeOfDay = 'morning';
    else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
    else timeOfDay = 'night';

    return this.activityPatterns[timeOfDay].map(prompt => ({
      prompt,
      type: 'time',
      context: `${timeOfDay} prompt`,
      priority: 9,
      icon: this._getTimeIcon(timeOfDay),
    }));
  }

  /**
   * Get suggestions based on season
   */
  _getSeasonalSuggestions(now) {
    const month = now.getMonth();
    let season;

    if (month >= 2 && month <= 4) season = 'spring';
    else if (month >= 5 && month <= 7) season = 'summer';
    else if (month >= 8 && month <= 10) season = 'autumn';
    else season = 'winter';

    return this.seasonalThemes[season].map(prompt => ({
      prompt,
      type: 'seasonal',
      context: `${season} theme`,
      priority: 6,
      icon: this._getSeasonIcon(season),
    }));
  }

  /**
   * Get weather-based suggestions (simulated)
   * In production, integrate with weather API
   */
  _getWeatherSuggestions() {
    const weatherTypes = Object.keys(this.weatherPrompts);
    const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];

    return this.weatherPrompts[randomWeather].map(prompt => ({
      prompt,
      type: 'weather',
      context: `${randomWeather} weather`,
      priority: 5,
      icon: this._getWeatherIcon(randomWeather),
    }));
  }

  /**
   * Get milestone-based suggestions
   */
  _getMilestoneSuggestions(now) {
    const day = now.getDate();
    const dayOfWeek = now.getDay();
    const suggestions = [];

    // First day of month
    if (day === 1) {
      suggestions.push(...this.milestonePrompts.newMonth.map(prompt => ({
        prompt,
        type: 'milestone',
        context: 'New month',
        priority: 10,
        icon: '📅',
      })));
    }

    // Weekend
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      suggestions.push(...this.milestonePrompts.weekend.map(prompt => ({
        prompt,
        type: 'milestone',
        context: 'Weekend',
        priority: 7,
        icon: '🌈',
      })));
    }

    return suggestions;
  }

  /**
   * Get suggestions based on past journaling patterns
   */
  _getActivityBasedSuggestions() {
    const recentEntries = this._getRecentEntries(7); // Last 7 days
    const suggestions = [];

    if (recentEntries.length === 0) {
      suggestions.push({
        prompt: 'Start your journaling journey with a simple "How am I feeling right now?"',
        type: 'onboarding',
        context: 'First entry',
        priority: 10,
        icon: '🌱',
      });
    } else if (recentEntries.length < 3) {
      suggestions.push({
        prompt: 'You\'re building a habit! What\'s one thing you learned this week?',
        type: 'habit',
        context: 'Building consistency',
        priority: 8,
        icon: '🔥',
      });
    } else {
      // Check for gaps
      const lastEntryDate = new Date(recentEntries[0].date);
      const daysSinceLastEntry = Math.floor((Date.now() - lastEntryDate) / 86400000);

      if (daysSinceLastEntry > 3) {
        suggestions.push({
          prompt: 'Welcome back! What\'s changed since your last entry?',
          type: 'reconnection',
          context: 'Return after break',
          priority: 9,
          icon: '✨',
        });
      }

      // Suggest follow-up to last entry
      const lastEntry = recentEntries[0];
      if (lastEntry.content && lastEntry.content.length > 50) {
        suggestions.push({
          prompt: `Continue your thought from ${this._formatDate(lastEntryDate)}: "${lastEntry.content.substring(0, 50)}..."`,
          type: 'continuation',
          context: 'Follow-up',
          priority: 8,
          icon: '🔗',
        });
      }
    }

    return suggestions;
  }

  /**
   * Get random inspirational prompts
   */
  _getRandomInspiration() {
    const inspirations = [
      'What would you do if you had unlimited courage?',
      'Describe yourself in one word. Why that word?',
      'Write about a stranger who changed your day.',
      'What does your heart need to hear today?',
      'If your life was a book, what chapter are you in?',
      'What are you not saying that needs to be said?',
      'Describe a moment of unexpected beauty.',
      'What would make today meaningful?',
    ];

    const random = inspirations[Math.floor(Math.random() * inspirations.length)];

    return [{
      prompt: random,
      type: 'inspiration',
      context: 'Random inspiration',
      priority: 4,
      icon: '💡',
    }];
  }

  /**
   * Prioritize suggestions and remove duplicates
   */
  _prioritizeSuggestions(suggestions) {
    // Remove duplicates
    const unique = suggestions.filter((item, index, self) =>
      index === self.findIndex((t) => t.prompt === item.prompt)
    );

    // Sort by priority (higher first)
    return unique.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Get recent journal entries from localStorage
   */
  _getRecentEntries(days = 7) {
    const entries = JSON.parse(localStorage.getItem('mythical_journal_entries') || '[]');
    const cutoffDate = Date.now() - (days * 86400000);

    return entries
      .filter(entry => new Date(entry.date).getTime() > cutoffDate)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  /**
   * Icon helpers
   */
  _getTimeIcon(timeOfDay) {
    const icons = {
      morning: '🌅',
      afternoon: '☀️',
      evening: '🌆',
      night: '🌙',
    };
    return icons[timeOfDay] || '⏰';
  }

  _getSeasonIcon(season) {
    const icons = {
      spring: '🌸',
      summer: '🌻',
      autumn: '🍂',
      winter: '❄️',
    };
    return icons[season] || '🌍';
  }

  _getWeatherIcon(weather) {
    const icons = {
      sunny: '☀️',
      rainy: '🌧️',
      cloudy: '☁️',
      stormy: '⛈️',
      snowy: '🌨️',
    };
    return icons[weather] || '🌤️';
  }

  _formatDate(date) {
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  /**
   * Track when user uses a suggestion (for learning)
   */
  trackSuggestionUsed(suggestion) {
    const key = 'mythical_suggestion_usage';
    const usage = JSON.parse(localStorage.getItem(key) || '{}');

    const type = suggestion.type;
    usage[type] = (usage[type] || 0) + 1;

    localStorage.setItem(key, JSON.stringify(usage));
  }

  /**
   * Get usage statistics to improve suggestions
   */
  getSuggestionStats() {
    const key = 'mythical_suggestion_usage';
    return JSON.parse(localStorage.getItem(key) || '{}');
  }
}

// Export singleton instance
export const intelligentSuggestions = new IntelligentSuggestionsService();
export default intelligentSuggestions;
