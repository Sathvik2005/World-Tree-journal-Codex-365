import React, { useState, useEffect } from 'react';

/**
 * Chapter Forge - Story structuring tool
 * Writers create chapters as tree branches
 */
const ChapterForge = () => {
  const [chapters, setChapters] = useState(() => {
    const saved = localStorage.getItem('mythical_chapters');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    localStorage.setItem('mythical_chapters', JSON.stringify(chapters));
  }, [chapters]);

  const addChapter = () => {
    const newChapter = {
      id: Date.now(),
      title: `Chapter ${chapters.length + 1}`,
      content: '',
      notes: '',
      order: chapters.length,
      createdAt: new Date().toISOString(),
    };
    setChapters([...chapters, newChapter]);
    setSelectedChapter(newChapter.id);
    setIsAdding(false);
  };

  const updateChapter = (id, updates) => {
    setChapters(chapters.map(ch => ch.id === id ? { ...ch, ...updates } : ch));
  };

  const deleteChapter = (id) => {
    setChapters(chapters.filter(ch => ch.id !== id));
    setSelectedChapter(null);
  };

  const reorderChapter = (id, direction) => {
    const index = chapters.findIndex(ch => ch.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === chapters.length - 1)) return;
    
    const newChapters = [...chapters];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newChapters[index], newChapters[targetIndex]] = [newChapters[targetIndex], newChapters[index]];
    
    setChapters(newChapters.map((ch, idx) => ({ ...ch, order: idx })));
  };

  const selected = chapters.find(ch => ch.id === selectedChapter);

  return (
    <div className="chapter-forge grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Branch Tree - Chapter List */}
      <div className="mythic-border glass-effect rounded-2xl p-6 lg:col-span-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold font-montserrat text-cyan-mist flex items-center gap-2">
            <span className="text-3xl">🌿</span> Story Branches
          </h3>
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 mythic-border glass-effect hover:glow-box text-cyan-mist rounded-lg transition-all duration-300"
          >
            <span className="text-xl">+</span>
          </button>
        </div>

        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              onClick={() => setSelectedChapter(chapter.id)}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                selectedChapter === chapter.id
                  ? 'bg-cyan-mist/20 border-2 border-cyan-mist'
                  : 'bg-midnight-deep border-2 border-starlight/20 hover:border-astral'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-montserrat text-starlight font-semibold">{chapter.title}</span>
                <div className="flex gap-1">
                  {index > 0 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); reorderChapter(chapter.id, 'up'); }}
                      className="text-starlight/50 hover:text-cyan-mist transition-colors"
                    >
                      ↑
                    </button>
                  )}
                  {index < chapters.length - 1 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); reorderChapter(chapter.id, 'down'); }}
                      className="text-starlight/50 hover:text-cyan-mist transition-colors"
                    >
                      ↓
                    </button>
                  )}
                </div>
              </div>
              <div className="text-xs text-starlight/60 font-inter">
                {chapter.content.trim().split(/\s+/).filter(w => w).length} words
              </div>
            </div>
          ))}

          {isAdding && (
            <div className="p-4 bg-astral/20 border-2 border-astral rounded-lg">
              <button
                onClick={addChapter}
                className="w-full py-2 text-cyan-mist font-montserrat hover:underline"
              >
                Create New Branch
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="w-full py-2 text-starlight/50 font-inter text-sm hover:underline"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chapter Editor */}
      <div className="mythic-border glass-effect rounded-2xl p-6 lg:col-span-2">
        {selected ? (
          <div className="h-full flex flex-col">
            <div className="mb-4">
              <input
                type="text"
                value={selected.title}
                onChange={(e) => updateChapter(selected.id, { title: e.target.value })}
                className="w-full bg-transparent border-b-2 border-starlight/20 text-2xl font-montserrat text-starlight focus:outline-none focus:border-cyan-mist mb-4 pb-2"
              />
              
              <div className="flex gap-2">
                <button
                  onClick={() => deleteChapter(selected.id)}
                  className="text-sm text-red-400 hover:text-red-300 font-inter"
                >
                  Delete Branch
                </button>
              </div>
            </div>

            <textarea
              value={selected.content}
              onChange={(e) => updateChapter(selected.id, { content: e.target.value })}
              placeholder="Write your chapter here... The branch grows with every word."
              className="flex-1 bg-midnight-deep rounded-lg p-4 text-starlight font-inter leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-cyan-mist"
            />

            <div className="mt-4 pt-4 border-t border-starlight/10">
              <details>
                <summary className="cursor-pointer text-starlight/70 hover:text-cyan-mist font-inter mb-2">
                  Chapter Notes
                </summary>
                <textarea
                  value={selected.notes}
                  onChange={(e) => updateChapter(selected.id, { notes: e.target.value })}
                  placeholder="Notes, reminders, ideas for this chapter..."
                  className="w-full bg-midnight-deep rounded-lg p-4 text-starlight/80 font-inter text-sm resize-none focus:outline-none focus:ring-2 focus:ring-astral"
                  rows={4}
                />
              </details>
            </div>

            <div className="mt-4 text-sm text-starlight/50 font-inter flex gap-4">
              <span>{selected.content.trim().split(/\s+/).filter(w => w).length} words</span>
              <span>•</span>
              <span>{selected.content.length} characters</span>
              <span>•</span>
              <span>Created {new Date(selected.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <div className="text-6xl mb-4 opacity-30">🌿</div>
              <h3 className="text-2xl font-bold font-montserrat text-cyan-mist mb-2">
                Select a Branch
              </h3>
              <p className="text-starlight/70 font-inter">
                Choose a chapter from the tree or create a new branch
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterForge;
