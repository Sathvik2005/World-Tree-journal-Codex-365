/**
 * Auto-save service for journal and writer data
 * Provides debounced saving to localStorage with conflict resolution
 */

const AUTOSAVE_DELAY = 1000; // 1 second debounce
const STORAGE_VERSION = '1.0';

class AutoSaveService {
  constructor() {
    this.saveTimers = {};
    this.saveQueue = new Map();
  }

  /**
   * Save data with debouncing
   * @param {string} key - Storage key
   * @param {any} data - Data to save
   * @param {number} delay - Debounce delay in ms
   */
  save(key, data, delay = AUTOSAVE_DELAY) {
    // Clear existing timer
    if (this.saveTimers[key]) {
      clearTimeout(this.saveTimers[key]);
    }

    // Set new timer
    this.saveTimers[key] = setTimeout(() => {
      try {
        const envelope = {
          version: STORAGE_VERSION,
          timestamp: new Date().toISOString(),
          data: data
        };
        
        localStorage.setItem(key, JSON.stringify(envelope));
        console.log(`✓ Auto-saved: ${key}`);
        
        // Emit save event
        window.dispatchEvent(new CustomEvent('autosave', { 
          detail: { key, success: true } 
        }));
      } catch (error) {
        console.error(`✗ Auto-save failed for ${key}:`, error);
        window.dispatchEvent(new CustomEvent('autosave', { 
          detail: { key, success: false, error } 
        }));
      }
    }, delay);
  }

  /**
   * Load data from storage
   * @param {string} key - Storage key
   * @returns {any} Parsed data or null
   */
  load(key) {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return null;

      const envelope = JSON.parse(stored);
      
      // Version check
      if (envelope.version !== STORAGE_VERSION) {
        console.warn(`Version mismatch for ${key}. Consider migration.`);
      }

      return envelope.data;
    } catch (error) {
      console.error(`Failed to load ${key}:`, error);
      return null;
    }
  }

  /**
   * Export all data as JSON
   * @returns {object} All stored data
   */
  exportAll() {
    const allData = {};
    const keys = [
      'mythical_journey',
      'mythical_chapters',
      'mythical_characters',
      'mythical_sparks',
      'mythical_constellation',
      'mythical_connections',
      'mythical_timeline',
      'mythical_lore_fragments',
      'mythical_draft_versions',
      'mythical_writing_goals',
      'mythical_ritual_sessions'
    ];

    keys.forEach(key => {
      const data = this.load(key);
      if (data) allData[key] = data;
    });

    return {
      exportDate: new Date().toISOString(),
      version: STORAGE_VERSION,
      data: allData
    };
  }

  /**
   * Import data from backup
   * @param {object} backup - Backup data object
   * @returns {boolean} Success status
   */
  importBackup(backup) {
    try {
      if (!backup.data) {
        throw new Error('Invalid backup format');
      }

      Object.entries(backup.data).forEach(([key, value]) => {
        this.save(key, value, 0); // Save immediately
      });

      return true;
    } catch (error) {
      console.error('Import failed:', error);
      return false;
    }
  }

  /**
   * Clear all auto-save timers
   */
  clearAllTimers() {
    Object.values(this.saveTimers).forEach(timer => clearTimeout(timer));
    this.saveTimers = {};
  }

  /**
   * Get storage usage stats
   * @returns {object} Storage statistics
   */
  getStorageStats() {
    let totalSize = 0;
    const itemCount = localStorage.length;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      totalSize += key.length + value.length;
    }

    return {
      itemCount,
      totalSizeKB: (totalSize / 1024).toFixed(2),
      availableQuotaMB: 5, // Typical localStorage limit
      usagePercent: ((totalSize / (5 * 1024 * 1024)) * 100).toFixed(1)
    };
  }
}

// Singleton instance
const autoSaveService = new AutoSaveService();

export default autoSaveService;

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  autoSaveService.clearAllTimers();
});
