import React, { useState } from 'react';

/**
 * Spark Vault - Inspiration storage with tree fruit visuals
 */
const SparkVault = () => {
  const [sparks, setSparks] = useState(() => {
    const saved = localStorage.getItem('mythical_sparks');
    return saved ? JSON.parse(saved) : [];
  });

  const [newSpark, setNewSpark] = useState('');
  const [filter, setFilter] = useState('all');

  const sparkTypes = {
    image: { icon: '🎨', label: 'Visual', color: '#F59E0B' },
    quote: { icon: '💬', label: 'Quote', color: '#67E8F9' },
    dream: { icon: '🌙', label: 'Dream', color: '#8B5CF6' },
    observation: { icon: '👁️', label: 'Observation', color: '#10B981' },
    question: { icon: '❓', label: 'Question', color: '#3B82F6' },
  };

  const addSpark = (type) => {
    if (!newSpark.trim()) return;

    const spark = {
      id: Date.now(),
      type,
      content: newSpark,
      createdAt: new Date().toISOString(),
      used: false,
    };

    setSparks([spark, ...sparks]);
    localStorage.setItem('mythical_sparks', JSON.stringify([spark, ...sparks]));
    setNewSpark('');
  };

  const toggleUsed = (id) => {
    const updated = sparks.map(s => s.id === id ? { ...s, used: !s.used } : s);
    setSparks(updated);
    localStorage.setItem('mythical_sparks', JSON.stringify(updated));
  };

  const deleteSpark = (id) => {
    const updated = sparks.filter(s => s.id !== id);
    setSparks(updated);
    localStorage.setItem('mythical_sparks', JSON.stringify(updated));
  };

  const filteredSparks = sparks.filter(s => {
    if (filter === 'all') return true;
    if (filter === 'unused') return !s.used;
    return s.type === filter;
  });

  return (
    <div className="spark-vault mythic-border glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
      <h3 className="text-3xl font-bold font-montserrat text-cyan-mist mb-2 flex items-center gap-2">
        <span className="text-4xl">🍎</span> Spark Vault
      </h3>
      <p className="text-starlight/70 font-inter mb-8">
        Gather inspiration like fruit from the tree
      </p>

      {/* Add New Spark */}
      <div className="mb-8 mythic-border glass-effect rounded-xl p-6">
        <textarea
          value={newSpark}
          onChange={(e) => setNewSpark(e.target.value)}
          placeholder="Capture a spark of inspiration... An image, quote, dream, or question."
          className="w-full bg-midnight-deep border-2 border-starlight/20 rounded-lg px-4 py-3 text-starlight font-inter resize-none focus:outline-none focus:border-cyan-mist h-24 mb-4"
        />
        
        <div className="flex gap-2 flex-wrap">
          {Object.entries(sparkTypes).map(([key, { icon, label }]) => (
            <button
              key={key}
              onClick={() => addSpark(key)}
              disabled={!newSpark.trim()}
              className="px-4 py-2 mythic-border glass-effect hover:glow-box rounded-lg transition-all duration-300 font-inter text-sm disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span className="text-lg">{icon}</span>
              Add as {label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-inter text-sm transition-all duration-300 ${
            filter === 'all'
              ? 'bg-cyan-mist text-midnight font-semibold'
              : 'bg-midnight-deep text-starlight/70 hover:text-starlight'
          }`}
        >
          All ({sparks.length})
        </button>
        <button
          onClick={() => setFilter('unused')}
          className={`px-4 py-2 rounded-lg font-inter text-sm transition-all duration-300 ${
            filter === 'unused'
              ? 'bg-cyan-mist text-midnight font-semibold'
              : 'bg-midnight-deep text-starlight/70 hover:text-starlight'
          }`}
        >
          Fresh ({sparks.filter(s => !s.used).length})
        </button>
        {Object.entries(sparkTypes).map(([key, { icon, label }]) => {
          const count = sparks.filter(s => s.type === key).length;
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg font-inter text-sm transition-all duration-300 ${
                filter === key
                  ? 'bg-cyan-mist text-midnight font-semibold'
                  : 'bg-midnight-deep text-starlight/70 hover:text-starlight'
              }`}
            >
              {icon} {label} ({count})
            </button>
          );
        })}
      </div>

      {/* Spark Grid */}
      {filteredSparks.length === 0 ? (
        <div className="text-center py-16 text-starlight/50 font-inter">
          <div className="text-6xl mb-4 opacity-30">🌳</div>
          <p>No sparks yet. Start gathering inspiration!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSparks.map(spark => (
            <div
              key={spark.id}
              className={`mythic-border glass-effect rounded-xl p-5 transition-all duration-300 ${
                spark.used ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{sparkTypes[spark.type].icon}</span>
                  <span className="text-xs font-inter text-starlight/50">
                    {new Date(spark.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleUsed(spark.id)}
                    className="text-lg transition-all duration-300 hover:scale-125"
                    title={spark.used ? 'Mark as unused' : 'Mark as used'}
                  >
                    {spark.used ? '✓' : '○'}
                  </button>
                  <button
                    onClick={() => deleteSpark(spark.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <p className="text-starlight font-inter text-sm leading-relaxed whitespace-pre-wrap">
                {spark.content}
              </p>

              {spark.used && (
                <div className="mt-3 pt-3 border-t border-starlight/10">
                  <span className="text-xs text-cyan-mist font-inter">✓ Used in writing</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="mt-8 pt-6 border-t border-starlight/10 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold font-montserrat text-astral mb-1">
            {sparks.length}
          </div>
          <div className="text-xs text-starlight/70 font-inter">Total Sparks</div>
        </div>
        <div>
          <div className="text-2xl font-bold font-montserrat text-astral mb-1">
            {sparks.filter(s => !s.used).length}
          </div>
          <div className="text-xs text-starlight/70 font-inter">Fresh Ideas</div>
        </div>
        <div>
          <div className="text-2xl font-bold font-montserrat text-astral mb-1">
            {sparks.filter(s => s.used).length}
          </div>
          <div className="text-xs text-starlight/70 font-inter">Used in Stories</div>
        </div>
      </div>
    </div>
  );
};

export default SparkVault;
