import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * MythicalContext - The Living Memory System
 * 
 * State = Memory + Identity + Mythology
 * Every interaction leaves an imprint on this world
 */

const MythicalContext = createContext(null);

const STORAGE_KEY = 'mythical_journey';

// Initial state - the beginning of all myths
const initialState = {
  // Core Identity
  journeyId: null,
  runeSignature: null,
  createdAt: null,
  
  // Memory System - Journal Entries
  entries: [],
  totalEntries: 0,
  
  // Thematic Progression (driven by journal content)
  themes: {
    wisdom: 0,      // Knowledge, learning, enlightenment
    courage: 0,     // Bravery, action, adventure
    fate: 0,        // Destiny, prophecy, time
    balance: 0,     // Harmony, nature, equilibrium
    shadow: 0,      // Introspection, mystery, depth
  },
  
  // World State
  treeGrowth: 0,          // 0-100: Visual tree development
  branchDensity: 1,       // Multiplier for branch rendering
  glowIntensity: 0.5,     // Base glow strength
  particleDensity: 1,     // Environmental particle count
  
  // Spirit & Creature State
  bondedSpirits: [],
  discoveredCreatures: [],
  spiritEnergy: 0,        // Accumulates with bonds and entries
  
  // Realm Progression
  activeRealm: 'midgard',
  unlockedRealms: ['midgard'],
  realmAffinities: {
    sky: 0,
    midgard: 10,
    underworld: 0,
  },
  
  // Unlocks & Discoveries
  unlockedLegends: [],
  rareStates: [],         // Special world states achieved
  achievedMilestones: [],
  
  // Temporal State
  lastEntryDate: null,
  sessionCount: 0,
  totalTimeSpent: 0,
};

export const MythicalProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    // Load from localStorage on init
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...initialState, ...parsed };
      }
    } catch (error) {
      console.warn('Could not load mythical journey:', error);
    }
    
    // Initialize new journey
    return {
      ...initialState,
      journeyId: `journey_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
  });

  // Persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Could not save mythical journey:', error);
    }
  }, [state]);

  // === JOURNAL SYSTEM ===
  
  const addJournalEntry = useCallback((entryData) => {
    const entry = {
      id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      realm: state.activeRealm,
      content: entryData.content,
      title: entryData.title || 'Untitled Memory',
      emotion: entryData.emotion || 'neutral',
      rune: entryData.rune || generateRuneFromEntry(entryData),
      themes: analyzeThemes(entryData.content),
    };

    setState(prev => {
      const newEntries = [...prev.entries, entry];
      const newThemes = calculateNewThemes(prev.themes, entry.themes);
      const growth = calculateTreeGrowth(newEntries);
      
      return {
        ...prev,
        entries: newEntries,
        totalEntries: prev.totalEntries + 1,
        themes: newThemes,
        treeGrowth: growth,
        glowIntensity: Math.min(1, 0.5 + (newEntries.length * 0.01)),
        particleDensity: 1 + (newEntries.length * 0.05),
        spiritEnergy: prev.spiritEnergy + 10,
        lastEntryDate: entry.timestamp,
        realmAffinities: {
          ...prev.realmAffinities,
          [state.activeRealm]: prev.realmAffinities[state.activeRealm] + 5,
        },
      };
    });

    return entry;
  }, [state.activeRealm]);

  // === REALM SYSTEM ===
  
  const changeRealm = useCallback((newRealm) => {
    setState(prev => ({
      ...prev,
      activeRealm: newRealm,
      unlockedRealms: prev.unlockedRealms.includes(newRealm) 
        ? prev.unlockedRealms 
        : [...prev.unlockedRealms, newRealm],
    }));
  }, []);

  // === SPIRIT BONDING ===
  
  const bondSpirit = useCallback((spirit) => {
    setState(prev => {
      if (prev.bondedSpirits.find(s => s.id === spirit.id)) {
        return prev; // Already bonded
      }
      
      return {
        ...prev,
        bondedSpirits: [...prev.bondedSpirits, {
          ...spirit,
          bondedAt: new Date().toISOString(),
          bondStrength: 1,
        }],
        spiritEnergy: prev.spiritEnergy + 25,
      };
    });
  }, []);

  // === PROGRESSION SYSTEM ===
  
  const unlockLegend = useCallback((legendId) => {
    setState(prev => {
      if (prev.unlockedLegends.includes(legendId)) {
        return prev;
      }
      
      return {
        ...prev,
        unlockedLegends: [...prev.unlockedLegends, legendId],
      };
    });
  }, []);

  const achieveMilestone = useCallback((milestone) => {
    setState(prev => ({
      ...prev,
      achievedMilestones: [...prev.achievedMilestones, {
        ...milestone,
        achievedAt: new Date().toISOString(),
      }],
    }));
  }, []);

  // === GETTERS & COMPUTED VALUES ===
  
  const getDominantTheme = useCallback(() => {
    const entries = Object.entries(state.themes);
    if (entries.length === 0) return 'balance';
    return entries.reduce((a, b) => a[1] > b[1] ? a : b)[0];
  }, [state.themes]);

  const getJourneyAge = useCallback(() => {
    if (!state.createdAt) return 0;
    const created = new Date(state.createdAt);
    const now = new Date();
    return Math.floor((now - created) / (1000 * 60 * 60 * 24)); // Days
  }, [state.createdAt]);

  const getTreeStage = useCallback(() => {
    if (state.treeGrowth < 10) return 'seedling';
    if (state.treeGrowth < 30) return 'sapling';
    if (state.treeGrowth < 60) return 'young';
    if (state.treeGrowth < 90) return 'mature';
    return 'ancient';
  }, [state.treeGrowth]);

  const value = {
    // State
    ...state,
    
    // Actions
    addJournalEntry,
    changeRealm,
    bondSpirit,
    unlockLegend,
    achieveMilestone,
    
    // Computed
    dominantTheme: getDominantTheme(),
    journeyAge: getJourneyAge(),
    treeStage: getTreeStage(),
    
    // Raw setState for advanced use
    setState,
  };

  return (
    <MythicalContext.Provider value={value}>
      {children}
    </MythicalContext.Provider>
  );
};

export const useMythical = () => {
  const context = useContext(MythicalContext);
  if (!context) {
    throw new Error('useMythical must be used within MythicalProvider');
  }
  return context;
};

// === HELPER FUNCTIONS ===

function generateRuneFromEntry(entry) {
  // Generate a unique rune pattern based on entry characteristics
  const hash = simpleHash(entry.content + entry.title);
  const patterns = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ'];
  const rune1 = patterns[hash % patterns.length];
  const rune2 = patterns[(hash >> 4) % patterns.length];
  const rune3 = patterns[(hash >> 8) % patterns.length];
  return `${rune1}${rune2}${rune3}`;
}

function analyzeThemes(content) {
  const lower = content.toLowerCase();
  const themes = {
    wisdom: 0,
    courage: 0,
    fate: 0,
    balance: 0,
    shadow: 0,
  };

  // Wisdom keywords
  if (/learn|knowledge|understand|wisdom|teach|discover|truth/.test(lower)) themes.wisdom += 5;
  
  // Courage keywords
  if (/brave|courage|fight|battle|strong|hero|overcome|challenge/.test(lower)) themes.courage += 5;
  
  // Fate keywords
  if (/destiny|fate|future|prophecy|time|path|journey|purpose/.test(lower)) themes.fate += 5;
  
  // Balance keywords
  if (/balance|harmony|peace|nature|calm|center|equilibrium/.test(lower)) themes.balance += 5;
  
  // Shadow keywords
  if (/dark|shadow|deep|mystery|secret|hidden|reflect|introspect/.test(lower)) themes.shadow += 5;

  return themes;
}

function calculateNewThemes(oldThemes, entryThemes) {
  return {
    wisdom: oldThemes.wisdom + entryThemes.wisdom,
    courage: oldThemes.courage + entryThemes.courage,
    fate: oldThemes.fate + entryThemes.fate,
    balance: oldThemes.balance + entryThemes.balance,
    shadow: oldThemes.shadow + entryThemes.shadow,
  };
}

function calculateTreeGrowth(entries) {
  // Growth is logarithmic - early entries matter more
  const base = Math.min(100, entries.length * 5);
  const bonus = Math.min(20, Math.log(entries.length + 1) * 10);
  return Math.min(100, base + bonus);
}

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}
