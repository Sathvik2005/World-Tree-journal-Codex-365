import React, { useState, useEffect } from 'react';

/**
 * Quote & Fragment Drawer
 * Store lore snippets, quotes, worldbuilding notes
 */
const LoreDrawer = () => {
  const [fragments, setFragments] = useState(() => {
    const saved = localStorage.getItem('mythical_lore_fragments');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedFragment, setSelectedFragment] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('mythical_lore_fragments', JSON.stringify(fragments));
  }, [fragments]);

  const categories = {
    quote: { icon: '💬', label: 'Quotes', color: '#67E8F9' },
    rule: { icon: '📜', label: 'Rules', color: '#3B82F6' },
    detail: { icon: '🔍', label: 'Details', color: '#10B981' },
    idea: { icon: '💡', label: 'Ideas', color: '#F59E0B' },
    mystery: { icon: '❓', label: 'Mysteries', color: '#8B5CF6' },
  };

  const addFragment = (category) => {
    const newFragment = {
      id: Date.now(),
      category,
      content: '',
      source: '',
      tags: [],
      createdAt: new Date().toISOString(),
    };
    setFragments([newFragment, ...fragments]);
    setSelectedFragment(newFragment.id);
  };

  const updateFragment = (id, updates) => {
    setFragments(fragments.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const deleteFragment = (id) => {
    setFragments(fragments.filter(f => f.id !== id));
    setSelectedFragment(null);
  };

  const filteredFragments = fragments.filter(f => {
    const matchesFilter = filter === 'all' || f.category === filter;
    const matchesSearch = !searchTerm || 
      f.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const selected = fragments.find(f => f.id === selectedFragment);

  return (
    <div className="lore-drawer h-full">
      <div className="flex gap-6 h-full">
        {/* Fragment List */}
        <div className="w-96 mythic-border glass-effect rounded-2xl p-6 space-y-4 overflow-y-auto">
          <div className="flex items-center justify-between sticky top-0 bg-midnight/90 backdrop-blur-sm pb-4 z-10">
            <h3 className="text-2xl font-bold font-montserrat text-cyan-mist flex items-center gap-2">
              <span className="text-3xl">🗃️</span> Lore Drawer
            </h3>
            <button
              onClick={() => addFragment('quote')}
              className="w-10 h-10 mythic-border glass-effect hover:glow-box rounded-lg transition-all duration-300 text-2xl"
            >
              +
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search fragments..."
            className="w-full bg-midnight-deep border-2 border-starlight/20 rounded-lg px-4 py-2 text-starlight font-inter focus:outline-none focus:border-cyan-mist"
          />

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-inter transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-cyan-mist text-midnight font-semibold'
                  : 'bg-midnight-deep text-starlight/70 hover:text-starlight'
              }`}
            >
              All ({fragments.length})
            </button>
            {Object.entries(categories).map(([key, { icon, label }]) => {
              const count = fragments.filter(f => f.category === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 py-1 rounded-lg text-xs font-inter transition-all duration-300 ${
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

          {/* Fragments */}
          <div className="space-y-2">
            {filteredFragments.length === 0 ? (
              <div className="text-center py-12 text-starlight/50 font-inter text-sm">
                No fragments yet. Add your first piece of lore!
              </div>
            ) : (
              filteredFragments.map(fragment => (
                <div
                  key={fragment.id}
                  onClick={() => setSelectedFragment(fragment.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedFragment === fragment.id
                      ? 'bg-cyan-mist/20 border-2 border-cyan-mist'
                      : 'bg-midnight-deep hover:bg-midnight-deep/70 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{categories[fragment.category].icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-starlight font-inter text-sm line-clamp-2">
                        {fragment.content || 'Empty fragment'}
                      </p>
                      {fragment.source && (
                        <p className="text-starlight/50 font-inter text-xs mt-1">
                          — {fragment.source}
                        </p>
                      )}
                      {fragment.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {fragment.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-astral/30 text-cyan-mist rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Fragment Editor */}
        <div className="flex-1 mythic-border glass-effect rounded-2xl p-6 space-y-4">
          {selected ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {Object.entries(categories).map(([key, { icon, label }]) => (
                    <button
                      key={key}
                      onClick={() => updateFragment(selected.id, { category: key })}
                      title={label}
                      className={`w-12 h-12 rounded-lg transition-all duration-300 text-2xl ${
                        selected.category === key
                          ? 'bg-cyan-mist/20 border-2 border-cyan-mist'
                          : 'bg-midnight-deep hover:bg-midnight-deep/70'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => deleteFragment(selected.id)}
                  className="text-red-400 hover:text-red-300 text-sm font-inter"
                >
                  Delete
                </button>
              </div>

              <textarea
                value={selected.content}
                onChange={(e) => updateFragment(selected.id, { content: e.target.value })}
                placeholder="Write your lore fragment, quote, or worldbuilding note..."
                className="w-full bg-midnight-deep border-2 border-starlight/20 rounded-lg px-4 py-3 text-starlight font-inter resize-none focus:outline-none focus:border-cyan-mist h-64 leading-relaxed"
              />

              <input
                type="text"
                value={selected.source}
                onChange={(e) => updateFragment(selected.id, { source: e.target.value })}
                placeholder="Source (e.g., Chapter 3, Character backstory, etc.)"
                className="w-full bg-midnight-deep border-2 border-starlight/20 rounded-lg px-4 py-2 text-starlight font-inter focus:outline-none focus:border-cyan-mist"
              />

              <div>
                <label className="block text-sm font-semibold font-montserrat text-starlight/70 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={selected.tags.join(', ')}
                  onChange={(e) => {
                    const tags = e.target.value
                      .split(',')
                      .map(t => t.trim())
                      .filter(t => t.length > 0);
                    updateFragment(selected.id, { tags });
                  }}
                  placeholder="magic, prophecy, ancient history"
                  className="w-full bg-midnight-deep border-2 border-starlight/20 rounded-lg px-4 py-2 text-starlight font-inter focus:outline-none focus:border-cyan-mist"
                />
              </div>

              <div className="pt-4 border-t border-starlight/10">
                <p className="text-xs text-starlight/50 font-inter">
                  Created: {new Date(selected.createdAt).toLocaleString()}
                </p>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <div className="text-6xl mb-4 opacity-30">📚</div>
                <p className="text-starlight/70 font-inter text-sm">
                  Select a fragment to edit
                </p>
                <p className="text-starlight/50 font-inter text-xs mt-2">
                  Store quotes, rules, details, ideas, and mysteries
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoreDrawer;
