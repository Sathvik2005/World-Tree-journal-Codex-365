import React, { useState, useMemo } from 'react';
import { useMythical } from '../../contexts/MythicalContext';

/**
 * SearchAndFilter - Modern search and filtering system
 * Find entries by content, date, emotion, realm, or theme
 */
const SearchAndFilter = ({ onResultsChange }) => {
  const { entries } = useMythical();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('all');
  const [selectedRealm, setSelectedRealm] = useState('all');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter and search entries
  const filteredEntries = useMemo(() => {
    let results = [...entries];

    // Text search (title + content)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(entry => 
        entry.title.toLowerCase().includes(query) ||
        entry.content.toLowerCase().includes(query)
      );
    }

    // Filter by emotion
    if (selectedEmotion !== 'all') {
      results = results.filter(entry => entry.emotion === selectedEmotion);
    }

    // Filter by realm
    if (selectedRealm !== 'all') {
      results = results.filter(entry => entry.realm === selectedRealm);
    }

    // Filter by dominant theme
    if (selectedTheme !== 'all') {
      results = results.filter(entry => {
        if (!entry.themes) return false;
        const themes = Object.entries(entry.themes);
        if (themes.length === 0) return false;
        const dominant = themes.reduce((a, b) => a[1] > b[1] ? a : b)[0];
        return dominant === selectedTheme;
      });
    }

    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      if (dateRange !== 'all') {
        results = results.filter(entry => 
          new Date(entry.timestamp) >= filterDate
        );
      }
    }

    // Sort results
    switch (sortBy) {
      case 'newest':
        results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
      case 'oldest':
        results.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      case 'longest':
        results.sort((a, b) => b.content.length - a.content.length);
        break;
      case 'shortest':
        results.sort((a, b) => a.content.length - b.content.length);
        break;
      case 'title':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return results;
  }, [entries, searchQuery, selectedEmotion, selectedRealm, selectedTheme, dateRange, sortBy]);

  // Get unique emotions, realms, themes
  const availableEmotions = useMemo(() => {
    const emotions = new Set(entries.map(e => e.emotion));
    return Array.from(emotions);
  }, [entries]);

  const availableRealms = useMemo(() => {
    const realms = new Set(entries.map(e => e.realm));
    return Array.from(realms);
  }, [entries]);

  const availableThemes = ['wisdom', 'courage', 'fate', 'balance', 'shadow'];

  // Notify parent component of results
  React.useEffect(() => {
    if (onResultsChange) {
      onResultsChange(filteredEntries);
    }
  }, [filteredEntries, onResultsChange]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedEmotion('all');
    setSelectedRealm('all');
    setSelectedTheme('all');
    setDateRange('all');
    setSortBy('newest');
  };

  const activeFiltersCount = [
    searchQuery.trim() !== '',
    selectedEmotion !== 'all',
    selectedRealm !== 'all',
    selectedTheme !== 'all',
    dateRange !== 'all',
  ].filter(Boolean).length;

  return (
    <div className="search-and-filter mythic-border glass-effect rounded-2xl p-8 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold font-montserrat text-cyan-mist flex items-center gap-2">
          <span className="text-3xl">ᛋ</span> Search & Filter
        </h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm font-inter text-starlight/70 hover:text-cyan-mist transition-colors duration-300"
          >
            Clear Filters ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search entries by title or content..."
          className="w-full px-4 py-3 bg-midnight-deep border-2 border-starlight/20 rounded-lg text-starlight placeholder-starlight/50 focus:outline-none focus:border-cyan-mist transition-all duration-300 font-inter"
        />
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Emotion Filter */}
        <div>
          <label className="block text-starlight/70 text-sm font-inter mb-2">Emotion</label>
          <select
            value={selectedEmotion}
            onChange={(e) => setSelectedEmotion(e.target.value)}
            className="w-full px-4 py-2 bg-midnight-deep border-2 border-starlight/20 rounded-lg text-starlight focus:outline-none focus:border-astral transition-all duration-300 font-inter"
          >
            <option value="all">All Emotions</option>
            {availableEmotions.map(emotion => (
              <option key={emotion} value={emotion} className="capitalize">
                {emotion}
              </option>
            ))}
          </select>
        </div>

        {/* Realm Filter */}
        <div>
          <label className="block text-starlight/70 text-sm font-inter mb-2">Realm</label>
          <select
            value={selectedRealm}
            onChange={(e) => setSelectedRealm(e.target.value)}
            className="w-full px-4 py-2 bg-midnight-deep border-2 border-starlight/20 rounded-lg text-starlight focus:outline-none focus:border-astral transition-all duration-300 font-inter"
          >
            <option value="all">All Realms</option>
            {availableRealms.map(realm => (
              <option key={realm} value={realm} className="capitalize">
                {realm}
              </option>
            ))}
          </select>
        </div>

        {/* Theme Filter */}
        <div>
          <label className="block text-starlight/70 text-sm font-inter mb-2">Theme</label>
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="w-full px-4 py-2 bg-midnight-deep border-2 border-starlight/20 rounded-lg text-starlight focus:outline-none focus:border-astral transition-all duration-300 font-inter"
          >
            <option value="all">All Themes</option>
            {availableThemes.map(theme => (
              <option key={theme} value={theme} className="capitalize">
                {theme}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-starlight/70 text-sm font-inter mb-2">Time Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full px-4 py-2 bg-midnight-deep border-2 border-starlight/20 rounded-lg text-starlight focus:outline-none focus:border-astral transition-all duration-300 font-inter"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
            <option value="year">Past Year</option>
          </select>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-4">
        <label className="text-starlight/70 text-sm font-inter">Sort By:</label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'newest', label: 'Newest First' },
            { value: 'oldest', label: 'Oldest First' },
            { value: 'longest', label: 'Longest' },
            { value: 'shortest', label: 'Shortest' },
            { value: 'title', label: 'Title A-Z' },
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-inter transition-all duration-300 ${
                sortBy === option.value
                  ? 'bg-cyan-mist/20 text-cyan-mist border-2 border-cyan-mist'
                  : 'bg-midnight-deep text-starlight border-2 border-starlight/20 hover:border-astral'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center pt-4 border-t border-starlight/10">
        <span className="text-starlight/70 font-inter">
          Showing <span className="text-cyan-mist font-bold">{filteredEntries.length}</span> of{' '}
          <span className="text-astral font-bold">{entries.length}</span> entries
        </span>
      </div>
    </div>
  );
};

export default SearchAndFilter;
