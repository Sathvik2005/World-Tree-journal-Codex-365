/**
 * Progress Service - Backend sync for user progress
 * Tracks entries, visits, and overall journey
 */

const STORAGE_KEY = 'mythical_world_progress';

class ProgressService {
  constructor() {
    this.loadProgress();
  }

  loadProgress() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.progress = JSON.parse(stored);
      } else {
        this.initializeProgress();
      }
    } catch (error) {
      console.error('Error loading progress:', error);
      this.initializeProgress();
    }
  }

  initializeProgress() {
    this.progress = {
      currentDay: 0,
      totalEntries: 0,
      totalVisits: 0,
      lastVisit: null,
      firstVisit: new Date().toISOString(),
      milestones: [],
      season: 'spring',
      spirits: [],
      legends: [],
      realmVisits: {
        sky: 0,
        midgard: 0,
        underworld: 0
      },
      stats: {
        longestStreak: 0,
        currentStreak: 0,
        totalTimeSpent: 0
      }
    };
    this.saveProgress();
  }

  saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  // Visit tracking
  recordVisit() {
    const now = new Date();
    const lastVisit = this.progress.lastVisit ? new Date(this.progress.lastVisit) : null;
    
    this.progress.totalVisits += 1;
    this.progress.lastVisit = now.toISOString();

    // Check streak
    if (lastVisit) {
      const daysDiff = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
      if (daysDiff === 1) {
        this.progress.stats.currentStreak += 1;
        this.progress.stats.longestStreak = Math.max(
          this.progress.stats.longestStreak,
          this.progress.stats.currentStreak
        );
      } else if (daysDiff > 1) {
        this.progress.stats.currentStreak = 1;
      }
    } else {
      this.progress.stats.currentStreak = 1;
    }

    this.saveProgress();
    return this.progress;
  }

  // Entry tracking
  addEntry(entryData) {
    this.progress.totalEntries += 1;
    this.progress.currentDay = Math.min(this.progress.totalEntries, 365);

    // Update season based on progress
    const dayProgress = this.progress.currentDay;
    if (dayProgress < 91) {
      this.progress.season = 'spring';
    } else if (dayProgress < 182) {
      this.progress.season = 'summer';
    } else if (dayProgress < 273) {
      this.progress.season = 'autumn';
    } else {
      this.progress.season = 'winter';
    }

    // Check for milestones
    this.checkMilestones();

    this.saveProgress();
    return this.progress;
  }

  checkMilestones() {
    const day = this.progress.currentDay;
    const milestones = [
      { day: 1, name: 'First Dawn', unlocked: false },
      { day: 7, name: 'First Week', unlocked: false },
      { day: 30, name: 'First Moon', unlocked: false },
      { day: 100, name: 'Century Mark', unlocked: false },
      { day: 180, name: 'Midpoint Journey', unlocked: false },
      { day: 270, name: 'Autumn Gate', unlocked: false },
      { day: 365, name: 'Full Circle', unlocked: false }
    ];

    milestones.forEach(milestone => {
      if (day >= milestone.day && !this.progress.milestones.includes(milestone.name)) {
        this.progress.milestones.push(milestone.name);
        this.unlockMilestone(milestone);
      }
    });
  }

  unlockMilestone(milestone) {
    // Trigger special effects or notifications
    console.log(`🌟 Milestone Unlocked: ${milestone.name}`);
    
    // You can add custom events here
    window.dispatchEvent(new CustomEvent('milestoneUnlocked', { 
      detail: milestone 
    }));
  }

  // Realm tracking
  visitRealm(realmName) {
    if (this.progress.realmVisits[realmName] !== undefined) {
      this.progress.realmVisits[realmName] += 1;
      this.saveProgress();
    }
  }

  // Spirit bonding
  bondSpirit(spiritData) {
    if (!this.progress.spirits.find(s => s.id === spiritData.id)) {
      this.progress.spirits.push({
        ...spiritData,
        bondedAt: new Date().toISOString()
      });
      this.saveProgress();
    }
  }

  // Legend unlocking
  unlockLegend(legendData) {
    if (!this.progress.legends.find(l => l.id === legendData.id)) {
      this.progress.legends.push({
        ...legendData,
        unlockedAt: new Date().toISOString()
      });
      this.saveProgress();
    }
  }

  // Getters
  getProgress() {
    return { ...this.progress };
  }

  getCurrentDay() {
    return this.progress.currentDay;
  }

  getSeason() {
    return this.progress.season;
  }

  getStats() {
    return { ...this.progress.stats };
  }

  // Reset (for testing)
  reset() {
    this.initializeProgress();
    return this.progress;
  }
}

// Singleton instance
const progressService = new ProgressService();

export default progressService;
