import React from 'react';

/**
 * Rune Editor Toolbar - Minimalist writing toolbar with runic icons
 * Bold, italic, headers, save, export, copy
 */
const RuneEditorToolbar = ({ onAction, selectedText, canUndo, canRedo }) => {
  const tools = [
    { id: 'bold', icon: 'ᛒ', label: 'Bold', action: 'bold' },
    { id: 'italic', icon: 'ᛁ', label: 'Italic', action: 'italic' },
    { id: 'h1', icon: 'ᚺ', label: 'Heading 1', action: 'h1' },
    { id: 'h2', icon: 'ᚺ', label: 'Heading 2', action: 'h2', smaller: true },
    { id: 'list', icon: 'ᛚ', label: 'List', action: 'list' },
    { id: 'divider', type: 'divider' },
    { id: 'undo', icon: '↶', label: 'Undo', action: 'undo', disabled: !canUndo },
    { id: 'redo', icon: '↷', label: 'Redo', action: 'redo', disabled: !canRedo },
    { id: 'divider2', type: 'divider' },
    { id: 'save', icon: 'ᛋ', label: 'Save', action: 'save' },
    { id: 'export', icon: 'ᛖ', label: 'Export', action: 'export' },
    { id: 'copy', icon: 'ᚲ', label: 'Copy', action: 'copy' },
  ];

  const handleAction = (action) => {
    if (onAction) {
      onAction(action, selectedText);
    }
  };

  return (
    <div className="rune-editor-toolbar mythic-border glass-effect rounded-xl p-3 flex items-center gap-2 flex-wrap">
      {tools.map((tool) => {
        if (tool.type === 'divider') {
          return <div key={tool.id} className="w-px h-8 bg-starlight/20" />;
        }

        return (
          <button
            key={tool.id}
            onClick={() => handleAction(tool.action)}
            disabled={tool.disabled}
            title={tool.label}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
              tool.disabled
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-cyan-mist/20 hover:text-cyan-mist hover:scale-110 hover:glow-text'
            } ${tool.smaller ? 'text-lg' : 'text-2xl'} text-starlight font-bold`}
          >
            {tool.icon}
          </button>
        );
      })}
    </div>
  );
};

export default RuneEditorToolbar;
