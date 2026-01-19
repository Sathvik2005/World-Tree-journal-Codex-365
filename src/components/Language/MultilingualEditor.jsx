import React, { useState, useEffect, useRef } from 'react';
import multilingualService from '../../services/multilingualService';
import LanguageSelector from './LanguageSelector';

/**
 * Multilingual Editor
 * Full-featured writing component with native language support
 */
const MultilingualEditor = ({ initialContent = '', onSave, onContentChange }) => {
  const [currentLang, setCurrentLang] = useState(multilingualService.getCurrentLanguage());
  const [content, setContent] = useState(initialContent);
  const [wordCount, setWordCount] = useState(0);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const editorRef = useRef(null);

  useEffect(() => {
    // Update word count
    const count = multilingualService.getWordCount(content, currentLang.code);
    setWordCount(count);

    // Notify parent of content changes
    if (onContentChange) {
      onContentChange(content, currentLang.code);
    }

    // Auto-save
    const timer = setTimeout(() => {
      saveContent();
    }, 2000);

    return () => clearTimeout(timer);
  }, [content]);

  useEffect(() => {
    // Load prompts for current language
    const langPrompts = multilingualService.getPrompts(currentLang.code);
    setPrompts(langPrompts);

    // Apply language-specific styles
    if (editorRef.current) {
      editorRef.current.style.fontFamily = currentLang.font;
      editorRef.current.style.direction = currentLang.direction;
    }
  }, [currentLang]);

  const handleLanguageChange = (newLang) => {
    setCurrentLang(newLang);
    setShowLanguageSelector(false);
  };

  const saveContent = () => {
    const entry = {
      content,
      language: currentLang.code,
      timestamp: Date.now(),
      wordCount
    };

    // Save to localStorage
    const entries = JSON.parse(localStorage.getItem(`mythical_entries_${currentLang.code}`) || '[]');
    entries.unshift(entry);
    localStorage.setItem(`mythical_entries_${currentLang.code}`, JSON.stringify(entries));

    if (onSave) {
      onSave(entry);
    }
  };

  const insertPrompt = (prompt) => {
    const newContent = content + (content ? '\n\n' : '') + prompt + '\n\n';
    setContent(newContent);
    setShowPrompts(false);
    editorRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    // Language-specific keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 's') {
        e.preventDefault();
        saveContent();
      } else if (e.key === 'l') {
        e.preventDefault();
        setShowLanguageSelector(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-midnight p-6">
      {/* Language Selector Modal */}
      {showLanguageSelector && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 overflow-y-auto">
          <div className="bg-midnight rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-midnight border-b border-midnight-lighter p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-starlight">Select Language</h2>
              <button
                onClick={() => setShowLanguageSelector(false)}
                className="text-starlight/60 hover:text-starlight text-2xl"
              >
                ×
              </button>
            </div>
            <LanguageSelector onLanguageChange={handleLanguageChange} />
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-starlight mb-1">Multilingual Journal</h1>
            <p className="text-starlight/60">Write in your chosen language</p>
          </div>

          {/* Language Badge */}
          <button
            onClick={() => setShowLanguageSelector(true)}
            className="flex items-center gap-3 px-4 py-3 bg-midnight-light rounded-xl hover:bg-midnight-lighter transition-colors border border-midnight-lighter"
          >
            <span className="text-3xl">{currentLang.icon}</span>
            <div className="text-left">
              <div className="font-bold text-starlight" style={{ fontFamily: currentLang.font }}>
                {currentLang.nativeName}
              </div>
              <div className="text-xs text-starlight/60">{currentLang.script} Script</div>
            </div>
            <span className="text-starlight/50">▼</span>
          </button>
        </div>

        {/* Editor Stats */}
        <div className="flex gap-4 mb-4">
          <div className="px-4 py-2 bg-midnight-light rounded-lg">
            <span className="text-starlight/60 text-sm">Words: </span>
            <span className="text-astral font-bold">{wordCount}</span>
          </div>
          <div className="px-4 py-2 bg-midnight-light rounded-lg">
            <span className="text-starlight/60 text-sm">Characters: </span>
            <span className="text-astral font-bold">{content.length}</span>
          </div>
          <div className="px-4 py-2 bg-midnight-light rounded-lg">
            <span className="text-starlight/60 text-sm">Read time: </span>
            <span className="text-astral font-bold">{Math.ceil(wordCount / 200)} min</span>
          </div>
        </div>

        {/* Writing Prompts */}
        <div className="mb-4">
          <button
            onClick={() => setShowPrompts(!showPrompts)}
            className="text-sm text-astral hover:underline flex items-center gap-1"
          >
            {showPrompts ? '▼' : '▶'} Writing prompts in {currentLang.name}
          </button>

          {showPrompts && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              {prompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => insertPrompt(prompt)}
                  className="p-3 bg-midnight-light rounded-lg text-left hover:bg-midnight-lighter transition-colors border border-midnight-lighter"
                  style={{ fontFamily: currentLang.font, direction: currentLang.direction }}
                >
                  <div className="text-starlight">{prompt}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Editor */}
        <div className="relative">
          <textarea
            ref={editorRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={currentLang.placeholder}
            className="w-full h-[500px] p-6 bg-midnight-light text-starlight rounded-2xl border-2 border-midnight-lighter focus:border-astral focus:outline-none resize-none"
            style={{
              fontFamily: currentLang.font,
              direction: currentLang.direction,
              fontSize: '18px',
              lineHeight: '1.8'
            }}
          />

          {/* Floating Save Button */}
          <button
            onClick={saveContent}
            className="absolute bottom-6 right-6 px-6 py-3 bg-astral text-white rounded-lg font-medium hover:bg-astral/80 transition-colors shadow-lg"
          >
            💾 Save Entry
          </button>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-4 p-4 bg-midnight-light rounded-lg border border-midnight-lighter">
          <h3 className="text-sm font-bold text-starlight mb-2">⌨️ Keyboard Shortcuts</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-starlight/70">
            <div><kbd className="px-2 py-1 bg-midnight rounded">Ctrl+S</kbd> Save</div>
            <div><kbd className="px-2 py-1 bg-midnight rounded">Ctrl+L</kbd> Change Language</div>
            <div><kbd className="px-2 py-1 bg-midnight rounded">Ctrl+K</kbd> Insert Prompt</div>
          </div>
        </div>

        {/* Language-Specific Tips */}
        <div className="mt-4 p-4 bg-midnight-light rounded-lg border border-midnight-lighter">
          <h3 className="text-sm font-bold text-starlight mb-2">
            💡 {currentLang.name} Input Tips
          </h3>
          <ul className="text-xs text-starlight/70 space-y-1">
            {currentLang.code !== 'en' && (
              <>
                <li>• Enable {currentLang.name} keyboard in your system settings</li>
                <li>• Use Google Input Tools for easy transliteration</li>
                {currentLang.direction === 'rtl' && (
                  <li>• Text will flow right-to-left automatically</li>
                )}
              </>
            )}
            <li>• All special characters are preserved</li>
            <li>• Auto-saves every 2 seconds</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MultilingualEditor;
