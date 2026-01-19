import React, { useState } from 'react';
import { useMythical } from '../../contexts/MythicalContext';

/**
 * Branch-to-Book Export
 * Advanced export with PDF/DOCX/MD chapter conversion
 */
const BranchToBook = () => {
  const { journeyState } = useMythical();
  const [exportFormat, setExportFormat] = useState('markdown');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includeNotes, setIncludeNotes] = useState(false);
  const [chapterNumbering, setChapterNumbering] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const formats = {
    markdown: {
      icon: '📄',
      label: 'Markdown',
      ext: '.md',
      description: 'Clean text format, works everywhere',
    },
    pdf: {
      icon: '📕',
      label: 'PDF (Coming Soon)',
      ext: '.pdf',
      description: 'Professional book format',
      disabled: true,
    },
    docx: {
      icon: '📘',
      label: 'Word (Coming Soon)',
      ext: '.docx',
      description: 'Microsoft Word document',
      disabled: true,
    },
    epub: {
      icon: '📚',
      label: 'EPUB (Coming Soon)',
      ext: '.epub',
      description: 'E-reader compatible',
      disabled: true,
    },
  };

  const exportBook = async () => {
    setIsExporting(true);

    try {
      const chapters = JSON.parse(localStorage.getItem('mythical_chapters') || '[]');
      
      if (chapters.length === 0) {
        alert('No chapters to export. Create chapters in Chapter Forge first.');
        setIsExporting(false);
        return;
      }

      let content = '';

      // Add title page
      if (includeMetadata) {
        content += `# ${journeyState.journeyId || 'My Story'}\n\n`;
        content += `*A mythical tale from the World Tree*\n\n`;
        content += `Created: ${new Date().toLocaleDateString()}\n\n`;
        content += `---\n\n`;
      }

      // Table of Contents
      content += `## Table of Contents\n\n`;
      chapters
        .sort((a, b) => a.order - b.order)
        .forEach((chapter, index) => {
          const chapterNum = chapterNumbering ? `${index + 1}. ` : '';
          content += `${chapterNum}${chapter.title}\n`;
        });
      content += `\n---\n\n`;

      // Chapters
      chapters
        .sort((a, b) => a.order - b.order)
        .forEach((chapter, index) => {
          const chapterNum = chapterNumbering ? `Chapter ${index + 1}: ` : '';
          content += `# ${chapterNum}${chapter.title}\n\n`;
          content += `${chapter.content}\n\n`;

          if (includeNotes && chapter.notes) {
            content += `*Author's Note: ${chapter.notes}*\n\n`;
          }

          content += `---\n\n`;
        });

      // Add footer
      if (includeMetadata) {
        const wordCount = chapters.reduce((sum, ch) => sum + (ch.content || '').split(/\s+/).filter(Boolean).length, 0);
        content += `\n\n*Total Word Count: ${wordCount.toLocaleString()}*\n`;
        content += `*Exported from Mythical World Tree*\n`;
      }

      // Download
      if (exportFormat === 'markdown') {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${journeyState.journeyId || 'my-story'}-${Date.now()}.md`;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const chapters = JSON.parse(localStorage.getItem('mythical_chapters') || '[]');
  const totalWords = chapters.reduce((sum, ch) => sum + (ch.content || '').split(/\s+/).filter(Boolean).length, 0);

  return (
    <div className="branch-to-book mythic-border glass-effect rounded-2xl p-8 max-w-3xl mx-auto">
      <h3 className="text-3xl font-bold font-montserrat text-cyan-mist mb-2 flex items-center gap-2">
        <span className="text-4xl">📖</span> Branch to Book
      </h3>
      <p className="text-starlight/70 font-inter mb-8">
        Transform your chapters into a complete manuscript
      </p>

      {/* Format Selection */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {Object.entries(formats).map(([key, format]) => (
          <button
            key={key}
            onClick={() => !format.disabled && setExportFormat(key)}
            disabled={format.disabled}
            className={`p-6 rounded-xl transition-all duration-300 text-left ${
              exportFormat === key
                ? 'bg-cyan-mist/20 border-2 border-cyan-mist'
                : format.disabled
                ? 'bg-midnight-deep/30 border-2 border-starlight/10 opacity-50 cursor-not-allowed'
                : 'bg-midnight-deep border-2 border-starlight/20 hover:border-cyan-mist/50'
            }`}
          >
            <div className="text-4xl mb-2">{format.icon}</div>
            <div className="text-lg font-semibold font-montserrat text-starlight mb-1">
              {format.label}
            </div>
            <div className="text-xs text-starlight/60 font-inter">
              {format.description}
            </div>
          </button>
        ))}
      </div>

      {/* Export Options */}
      <div className="space-y-4 mb-8 mythic-border glass-effect rounded-xl p-6">
        <h4 className="text-lg font-semibold font-montserrat text-astral mb-4">
          Export Options
        </h4>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={includeMetadata}
            onChange={(e) => setIncludeMetadata(e.target.checked)}
            className="w-5 h-5 accent-cyan-mist"
          />
          <div>
            <div className="text-starlight font-inter font-medium">Include Metadata</div>
            <div className="text-starlight/50 font-inter text-xs">Title page, date, word count</div>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={includeNotes}
            onChange={(e) => setIncludeNotes(e.target.checked)}
            className="w-5 h-5 accent-cyan-mist"
          />
          <div>
            <div className="text-starlight font-inter font-medium">Include Chapter Notes</div>
            <div className="text-starlight/50 font-inter text-xs">Author notes from Chapter Forge</div>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={chapterNumbering}
            onChange={(e) => setChapterNumbering(e.target.checked)}
            className="w-5 h-5 accent-cyan-mist"
          />
          <div>
            <div className="text-starlight font-inter font-medium">Chapter Numbering</div>
            <div className="text-starlight/50 font-inter text-xs">"Chapter 1:", "Chapter 2:", etc.</div>
          </div>
        </label>
      </div>

      {/* Preview Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="mythic-border glass-effect rounded-lg p-4 text-center">
          <div className="text-3xl font-bold font-montserrat text-astral mb-1">
            {chapters.length}
          </div>
          <div className="text-xs text-starlight/70 font-inter">Chapters</div>
        </div>
        <div className="mythic-border glass-effect rounded-lg p-4 text-center">
          <div className="text-3xl font-bold font-montserrat text-astral mb-1">
            {totalWords.toLocaleString()}
          </div>
          <div className="text-xs text-starlight/70 font-inter">Words</div>
        </div>
        <div className="mythic-border glass-effect rounded-lg p-4 text-center">
          <div className="text-3xl font-bold font-montserrat text-astral mb-1">
            {Math.ceil(totalWords / 250)}
          </div>
          <div className="text-xs text-starlight/70 font-inter">Pages (est.)</div>
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={exportBook}
        disabled={isExporting || chapters.length === 0}
        className="w-full py-4 mythic-border glass-effect hover:glow-box font-montserrat text-lg rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isExporting ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⏳</span> Exporting...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2 text-cyan-mist">
            <span>📥</span> Export Book
          </span>
        )}
      </button>

      {chapters.length === 0 && (
        <p className="text-center text-starlight/50 font-inter text-sm mt-4">
          Create chapters in Chapter Forge before exporting
        </p>
      )}
    </div>
  );
};

export default BranchToBook;
