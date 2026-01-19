import React, { useState } from 'react';
import { useMythical } from '../../contexts/MythicalContext';

/**
 * ExportOptions - Modern export functionality
 * Export journal in multiple formats
 */
const ExportOptions = () => {
  const { entries, journeyId, themes, totalEntries, createdAt } = useMythical();
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');

  const exportAsJSON = () => {
    const data = {
      journeyId,
      createdAt,
      totalEntries,
      themes,
      entries: entries.map(entry => ({
        id: entry.id,
        timestamp: entry.timestamp,
        title: entry.title,
        content: entry.content,
        emotion: entry.emotion,
        realm: entry.realm,
        rune: entry.rune,
        themes: entry.themes,
      })),
      metadata: {
        exportDate: new Date().toISOString(),
        version: '1.0',
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    downloadFile(blob, `mythical-journey-${Date.now()}.json`);
  };

  const exportAsMarkdown = () => {
    let markdown = `# Mythical World Tree Journey\n\n`;
    markdown += `**Journey ID:** ${journeyId}\n`;
    markdown += `**Started:** ${new Date(createdAt).toLocaleDateString()}\n`;
    markdown += `**Total Entries:** ${totalEntries}\n\n`;
    
    markdown += `## Thematic Progression\n\n`;
    Object.entries(themes).forEach(([theme, value]) => {
      markdown += `- **${theme.charAt(0).toUpperCase() + theme.slice(1)}:** ${value}\n`;
    });
    
    markdown += `\n---\n\n`;
    markdown += `## Journal Entries\n\n`;
    
    entries.forEach((entry, index) => {
      markdown += `### ${index + 1}. ${entry.title}\n\n`;
      markdown += `**Date:** ${new Date(entry.timestamp).toLocaleDateString()}\n`;
      markdown += `**Realm:** ${entry.realm}\n`;
      markdown += `**Emotion:** ${entry.emotion}\n`;
      markdown += `**Rune:** ${entry.rune}\n\n`;
      markdown += `${entry.content}\n\n`;
      markdown += `---\n\n`;
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    downloadFile(blob, `mythical-journey-${Date.now()}.md`);
  };

  const exportAsCSV = () => {
    let csv = 'ID,Timestamp,Title,Content,Emotion,Realm,Rune,Word Count\n';
    
    entries.forEach(entry => {
      const wordCount = entry.content.trim().split(/\s+/).length;
      const row = [
        entry.id,
        entry.timestamp,
        `"${entry.title.replace(/"/g, '""')}"`,
        `"${entry.content.replace(/"/g, '""')}"`,
        entry.emotion,
        entry.realm,
        entry.rune,
        wordCount,
      ].join(',');
      csv += row + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    downloadFile(blob, `mythical-journey-${Date.now()}.csv`);
  };

  const exportAsHTML = () => {
    let html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mythical World Tree Journey</title>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background: #081225;
      color: #F8FAFC;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    h1 {
      font-family: 'Montserrat', sans-serif;
      background: linear-gradient(to right, #3B82F6, #67E8F9, #F8FAFC);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 3em;
      text-align: center;
      margin-bottom: 10px;
    }
    .metadata {
      text-align: center;
      color: #67E8F9;
      margin-bottom: 40px;
    }
    .entry {
      background: rgba(58, 130, 246, 0.05);
      border: 1px solid rgba(103, 232, 249, 0.2);
      border-radius: 16px;
      padding: 32px;
      margin-bottom: 32px;
    }
    .entry-title {
      font-family: 'Montserrat', sans-serif;
      color: #67E8F9;
      font-size: 1.5em;
      margin-bottom: 12px;
    }
    .entry-meta {
      color: rgba(248, 250, 252, 0.6);
      font-size: 0.9em;
      margin-bottom: 20px;
    }
    .entry-content {
      line-height: 1.8;
      color: rgba(248, 250, 252, 0.9);
    }
    .rune {
      font-size: 2em;
      float: right;
      color: #67E8F9;
    }
  </style>
</head>
<body>
  <h1>🌳 Mythical World Tree Journey</h1>
  <div class="metadata">
    <p>Journey ID: ${journeyId}</p>
    <p>Started: ${new Date(createdAt).toLocaleDateString()}</p>
    <p>Total Entries: ${totalEntries}</p>
  </div>
`;

    entries.forEach(entry => {
      html += `
  <div class="entry">
    <div class="rune">${entry.rune}</div>
    <h2 class="entry-title">${entry.title}</h2>
    <div class="entry-meta">
      ${new Date(entry.timestamp).toLocaleDateString()} • 
      ${entry.realm} • 
      ${entry.emotion}
    </div>
    <div class="entry-content">${entry.content.replace(/\n/g, '<br>')}</div>
  </div>
`;
    });

    html += `
</body>
</html>
`;

    const blob = new Blob([html], { type: 'text/html' });
    downloadFile(blob, `mythical-journey-${Date.now()}.html`);
  };

  const downloadFile = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = async () => {
    if (entries.length === 0) {
      alert('No entries to export');
      return;
    }

    setIsExporting(true);

    // Simulate export delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));

    switch (exportFormat) {
      case 'json':
        exportAsJSON();
        break;
      case 'markdown':
        exportAsMarkdown();
        break;
      case 'csv':
        exportAsCSV();
        break;
      case 'html':
        exportAsHTML();
        break;
      default:
        exportAsJSON();
    }

    setIsExporting(false);
  };

  return (
    <div className="export-options mythic-border glass-effect rounded-2xl p-8">
      <h3 className="text-2xl font-bold font-montserrat text-cyan-mist mb-6 flex items-center gap-2">
        <span className="text-3xl">ᛞ</span> Export Your Journey
      </h3>

      <div className="space-y-6">
        {/* Format Selection */}
        <div>
          <label className="block text-starlight/70 text-sm font-inter mb-3">
            Choose Export Format
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 'json', label: 'JSON', desc: 'Complete data' },
              { value: 'markdown', label: 'Markdown', desc: 'Text format' },
              { value: 'csv', label: 'CSV', desc: 'Spreadsheet' },
              { value: 'html', label: 'HTML', desc: 'Web page' },
            ].map(format => (
              <button
                key={format.value}
                onClick={() => setExportFormat(format.value)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  exportFormat === format.value
                    ? 'border-cyan-mist bg-cyan-mist/10 text-cyan-mist'
                    : 'border-starlight/20 text-starlight hover:border-astral'
                }`}
              >
                <div className="font-bold font-montserrat text-lg">{format.label}</div>
                <div className="text-xs font-inter opacity-70">{format.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={isExporting || entries.length === 0}
          className={`w-full py-4 rounded-xl font-bold font-montserrat text-lg transition-all duration-500 ${
            entries.length === 0
              ? 'bg-midnight-deep text-starlight/40 cursor-not-allowed'
              : 'mythic-border glass-effect hover:glow-box text-cyan-mist'
          }`}
        >
          {isExporting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-cyan-mist border-t-transparent rounded-full animate-spin" />
              Exporting...
            </span>
          ) : (
            `Export ${totalEntries} ${totalEntries === 1 ? 'Entry' : 'Entries'}`
          )}
        </button>

        {/* Info Text */}
        <div className="text-center text-starlight/60 text-sm font-inter">
          Your journey data will be downloaded to your device
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;
