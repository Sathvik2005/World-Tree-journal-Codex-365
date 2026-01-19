/**
 * Behavioral & Lifestyle Integration Service
 * Uses digital and physical activity to spark better journaling ideas
 * Contextual sensing with location, workouts, music, sleep patterns
 */

class BehavioralSensingService {
  constructor() {
    this.storageKeys = {
      location: 'mythical_location_history',
      workouts: 'mythical_workout_log',
      music: 'mythical_music_listening',
      sleep: 'mythical_sleep_patterns',
      screen_time: 'mythical_screen_time',
    };
  }

  /**
   * Generate contextual prompts based on behavioral signals
   */
  generateContextualPrompts() {
    const prompts = [];

    // Sleep pattern analysis
    const sleepShift = this._analyzeSleepPattern();
    if (sleepShift) {
      prompts.push({
        type: 'sleep',
        prompt: `Your sleep pattern shifted recently—how is that affecting your energy today?`,
        context: `Average sleep: ${sleepShift.avgHours}h (${sleepShift.change > 0 ? '+' : ''}${sleepShift.change}h change)`,
        priority: 9,
        icon: '😴',
      });
    }

    // Location insights
    const locationInsight = this._analyzeLocation();
    if (locationInsight) {
      prompts.push({
        type: 'location',
        prompt: locationInsight.prompt,
        context: locationInsight.context,
        priority: 7,
        icon: '📍',
      });
    }

    // Workout consistency
    const workoutInsight = this._analyzeWorkouts();
    if (workoutInsight) {
      prompts.push({
        type: 'workout',
        prompt: workoutInsight.prompt,
        context: workoutInsight.context,
        priority: 8,
        icon: '💪',
      });
    }

    // Music mood detection
    const musicInsight = this._analyzeMusicListening();
    if (musicInsight) {
      prompts.push({
        type: 'music',
        prompt: musicInsight.prompt,
        context: musicInsight.context,
        priority: 6,
        icon: '🎵',
      });
    }

    // Screen time awareness
    const screenInsight = this._analyzeScreenTime();
    if (screenInsight) {
      prompts.push({
        type: 'screen',
        prompt: screenInsight.prompt,
        context: screenInsight.context,
        priority: 7,
        icon: '📱',
      });
    }

    return prompts.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Analyze sleep patterns
   */
  _analyzeSleepPattern() {
    const sleepData = this._getStorageData(this.storageKeys.sleep);
    if (!sleepData || sleepData.length < 3) return null;

    const recent = sleepData.slice(-7); // Last 7 days
    const previous = sleepData.slice(-14, -7); // Previous 7 days

    if (recent.length === 0 || previous.length === 0) return null;

    const avgRecent = recent.reduce((sum, d) => sum + d.hours, 0) / recent.length;
    const avgPrevious = previous.reduce((sum, d) => sum + d.hours, 0) / previous.length;
    const change = avgRecent - avgPrevious;

    if (Math.abs(change) < 0.5) return null; // No significant change

    return {
      avgHours: avgRecent.toFixed(1),
      change: change.toFixed(1),
      direction: change > 0 ? 'increased' : 'decreased',
    };
  }

  /**
   * Analyze location patterns
   */
  _analyzeLocation() {
    const locationData = this._getStorageData(this.storageKeys.location);
    if (!locationData || locationData.length < 5) return null;

    const recent = locationData.slice(-7);
    const uniqueLocations = new Set(recent.map(l => l.name)).size;

    if (uniqueLocations === 1) {
      return {
        prompt: 'You\'ve been in the same place all week. How does that make you feel? Do you crave adventure or appreciate the routine?',
        context: 'Location: Same spot for 7 days',
      };
    } else if (uniqueLocations > 5) {
      return {
        prompt: 'You\'ve been moving around a lot lately. Is this energizing or exhausting? What\'s pulling you in different directions?',
        context: `Location: ${uniqueLocations} different places this week`,
      };
    }

    // Check for new places
    const previousLocations = new Set(locationData.slice(-14, -7).map(l => l.name));
    const newLocations = recent.filter(l => !previousLocations.has(l.name));

    if (newLocations.length > 0) {
      return {
        prompt: `You visited ${newLocations[0].name} recently. What drew you there? How did it make you feel?`,
        context: `New place discovered: ${newLocations[0].name}`,
      };
    }

    return null;
  }

  /**
   * Analyze workout consistency
   */
  _analyzeWorkouts() {
    const workouts = this._getStorageData(this.storageKeys.workouts);
    if (!workouts || workouts.length < 2) return null;

    const last7Days = workouts.filter(w => {
      const daysSince = (Date.now() - new Date(w.date).getTime()) / 86400000;
      return daysSince <= 7;
    });

    if (last7Days.length === 0) {
      return {
        prompt: 'You haven\'t logged a workout in over a week. What\'s been getting in the way? How does your body feel?',
        context: 'No workouts logged this week',
      };
    } else if (last7Days.length >= 5) {
      return {
        prompt: 'You\'ve been crushing your workouts! How is this consistency affecting your mental clarity and mood?',
        context: `${last7Days.length} workouts this week`,
      };
    } else if (last7Days.length >= 3) {
      const types = [...new Set(last7Days.map(w => w.type))];
      return {
        prompt: `Your workout routine is building momentum. What\'s your favorite part about ${types[0]} right now?`,
        context: `${last7Days.length} workouts (${types.join(', ')})`,
      };
    }

    return null;
  }

  /**
   * Analyze music listening patterns
   */
  _analyzeMusicListening() {
    const music = this._getStorageData(this.storageKeys.music);
    if (!music || music.length < 5) return null;

    const recent = music.slice(-10);
    const genres = recent.map(m => m.genre || m.mood);
    const genreCount = {};

    genres.forEach(genre => {
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    });

    const topGenre = Object.entries(genreCount).sort(([, a], [, b]) => b - a)[0];

    if (topGenre && topGenre[1] >= 5) {
      const moodMap = {
        'sad': 'Are you processing something heavy? What emotions need space?',
        'energetic': 'You\'re in high-energy mode! What\'s fueling this drive?',
        'calm': 'You\'re seeking peace. What\'s been causing tension lately?',
        'nostalgic': 'Music is taking you back in time. What memories are surfacing?',
      };

      return {
        prompt: moodMap[topGenre[0]] || `You\'ve been listening to a lot of ${topGenre[0]} music. What does this say about your current state?`,
        context: `Music mood: ${topGenre[0]} (${topGenre[1]} songs)`,
      };
    }

    return null;
  }

  /**
   * Analyze screen time
   */
  _analyzeScreenTime() {
    const screenTime = this._getStorageData(this.storageKeys.screen_time);
    if (!screenTime || screenTime.length < 3) return null;

    const today = screenTime[screenTime.length - 1];
    const avgPrevious = screenTime.slice(-8, -1).reduce((sum, d) => sum + d.hours, 0) / 7;

    if (today.hours > avgPrevious + 2) {
      return {
        prompt: 'Screen time is way up today. Are you avoiding something or just in deep focus? How do your eyes feel?',
        context: `Screen time: ${today.hours}h (${(today.hours - avgPrevious).toFixed(1)}h above average)`,
      };
    } else if (today.hours < avgPrevious - 2) {
      return {
        prompt: 'You\'re spending less time on screens today. What are you doing instead? How does this feel?',
        context: `Screen time: ${today.hours}h (${(avgPrevious - today.hours).toFixed(1)}h below average)`,
      };
    }

    return null;
  }

  /**
   * Log behavioral data for future analysis
   */
  logSleep(hours, quality = 'good') {
    const data = this._getStorageData(this.storageKeys.sleep);
    data.push({
      date: new Date().toISOString().split('T')[0],
      hours,
      quality,
      timestamp: Date.now(),
    });
    this._setStorageData(this.storageKeys.sleep, data.slice(-30)); // Keep last 30 days
  }

  logWorkout(type, duration, intensity = 'moderate') {
    const data = this._getStorageData(this.storageKeys.workouts);
    data.push({
      date: new Date().toISOString().split('T')[0],
      type, // 'cardio', 'strength', 'yoga', etc.
      duration,
      intensity,
      timestamp: Date.now(),
    });
    this._setStorageData(this.storageKeys.workouts, data.slice(-50));
  }

  logMusic(track, genre, mood) {
    const data = this._getStorageData(this.storageKeys.music);
    data.push({
      track,
      genre,
      mood, // 'sad', 'energetic', 'calm', 'nostalgic'
      timestamp: Date.now(),
    });
    this._setStorageData(this.storageKeys.music, data.slice(-50));
  }

  logLocation(name, lat, lng) {
    const data = this._getStorageData(this.storageKeys.location);
    data.push({
      name,
      lat,
      lng,
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
    });
    this._setStorageData(this.storageKeys.location, data.slice(-30));
  }

  logScreenTime(hours, apps = []) {
    const data = this._getStorageData(this.storageKeys.screen_time);
    data.push({
      date: new Date().toISOString().split('T')[0],
      hours,
      apps, // ['social_media', 'work', 'entertainment']
      timestamp: Date.now(),
    });
    this._setStorageData(this.storageKeys.screen_time, data.slice(-30));
  }

  /**
   * Utility methods
   */
  _getStorageData(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  _setStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Clear all behavioral data
   */
  clearAllData() {
    Object.values(this.storageKeys).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  /**
   * Get summary statistics
   */
  getSummary() {
    return {
      sleep: this._getStorageData(this.storageKeys.sleep).length,
      workouts: this._getStorageData(this.storageKeys.workouts).length,
      music: this._getStorageData(this.storageKeys.music).length,
      locations: this._getStorageData(this.storageKeys.location).length,
      screenTime: this._getStorageData(this.storageKeys.screen_time).length,
    };
  }
}

// Export singleton
export const behavioralSensing = new BehavioralSensingService();
export default behavioralSensing;
