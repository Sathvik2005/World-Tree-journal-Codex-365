import React, { useState, useEffect } from 'react';

/**
 * Root Archive - Past drafts viewer
 * Roots represent saved versions with animation
 */
const RootArchive = ({ chapters = [] }) => {
  const [versions, setVersions] = useState(() => {
    const saved = localStorage.getItem('mythical_draft_versions');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    localStorage.setItem('mythical_draft_versions', JSON.stringify(versions));
  }, [versions]);

  const createSnapshot = () => {
    const snapshot = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      chapters: chapters.map(ch => ({ ...ch })),
      label: `Draft ${versions.length + 1}`,
      wordCount: chapters.reduce((sum, ch) => 
        sum + ch.content.trim().split(/\s+/).filter(w => w).length, 0
      ),
    };
    setVersions([snapshot, ...versions]);
  };

  const deleteVersion = (id) => {
    setVersions(versions.filter(v => v.id !== id));
    setSelectedVersion(null);
  };

  const selected = versions.find(v => v.id === selectedVersion);

  return (
    <div className="root-archive">
      <button
        onClick={() => setShowArchive(!showArchive)}
        className="mythic-border glass-effect hover:glow-box px-6 py-3 rounded-xl text-cyan-mist font-montserrat transition-all duration-300"
      >
        <span className="mr-2">🌿</span>
        Root Archive ({versions.length})
      </button>

      {showArchive && (
        <div className="fixed inset-0 z-50 bg-midnight/95 backdrop-blur-sm flex items-center justify-center p-8">
          <div className="w-full max-w-6xl h-[80vh] grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Root List */}
            <div className="mythic-border glass-effect rounded-2xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold font-montserrat text-cyan-mist">Roots</h3>
                <button
                  onClick={() => setShowArchive(false)}
                  className="text-starlight/70 hover:text-starlight transition-colors"
                >
                  ✕
                </button>
              </div>

              <button
                onClick={createSnapshot}
                className="w-full mb-4 py-3 mythic-border glass-effect hover:glow-box text-astral font-montserrat rounded-lg transition-all duration-300"
              >
                + Save Current Draft
              </button>

              <div className="space-y-3">
                {versions.map((version, index) => (
                  <div
                    key={version.id}
                    onClick={() => setSelectedVersion(version.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 animate-root-draw ${
                      selectedVersion === version.id
                        ? 'bg-cyan-mist/20 border-2 border-cyan-mist'
                        : 'bg-midnight-deep border-2 border-starlight/20 hover:border-astral'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🌿</span>
                      <span className="font-montserrat text-starlight font-semibold">
                        {version.label}
                      </span>
                    </div>
                    <div className="text-xs text-starlight/60 font-inter space-y-1">
                      <div>{new Date(version.timestamp).toLocaleString()}</div>
                      <div>{version.wordCount} words • {version.chapters.length} chapters</div>
                    </div>
                  </div>
                ))}

                {versions.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2 opacity-30">🌿</div>
                    <p className="text-starlight/60 font-inter text-sm">
                      No saved drafts yet
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Version Viewer */}
            <div className="md:col-span-2 mythic-border glass-effect rounded-2xl p-6 overflow-y-auto">
              {selected ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold font-montserrat text-cyan-mist mb-1">
                        {selected.label}
                      </h3>
                      <p className="text-starlight/60 font-inter text-sm">
                        {new Date(selected.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteVersion(selected.id)}
                      className="text-red-400 hover:text-red-300 font-inter text-sm"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="space-y-6">
                    {selected.chapters.map((chapter, index) => (
                      <div key={index} className="bg-midnight-deep rounded-lg p-6">
                        <h4 className="text-xl font-semibold font-montserrat text-astral mb-4">
                          {chapter.title}
                        </h4>
                        <div className="text-starlight/80 font-inter leading-relaxed whitespace-pre-wrap">
                          {chapter.content || <span className="text-starlight/40 italic">Empty chapter</span>}
                        </div>
                        <div className="mt-4 text-xs text-starlight/50 font-inter">
                          {chapter.content.trim().split(/\s+/).filter(w => w).length} words
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    <div className="text-6xl mb-4 opacity-30">🌿</div>
                    <h3 className="text-2xl font-bold font-montserrat text-cyan-mist mb-2">
                      Select a Root
                    </h3>
                    <p className="text-starlight/70 font-inter">
                      Choose a draft version to view
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes root-draw {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-root-draw {
          animation: root-draw 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RootArchive;
