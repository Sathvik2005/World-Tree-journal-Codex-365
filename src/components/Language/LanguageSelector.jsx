import React, { useState, useEffect } from 'react';
import multilingualService from '../../services/multilingualService';

/**
 * Language Selector Component
 * Beautiful UI for selecting Indian languages for writing
 */
const LanguageSelector = ({ onLanguageChange, compact = false }) => {
  const [currentLang, setCurrentLang] = useState(multilingualService.getCurrentLanguage());
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const languages = multilingualService.getAllLanguages();

  const handleLanguageSelect = (langCode) => {
    multilingualService.setLanguage(langCode);
    const newLang = multilingualService.getCurrentLanguage();
    setCurrentLang(newLang);
    setShowDropdown(false);

    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
  };

  useEffect(() => {
    // Load current language on mount
    setCurrentLang(multilingualService.getCurrentLanguage());
  }, []);

  if (compact) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-3 py-2 bg-midnight-light text-starlight rounded-lg hover:bg-midnight-lighter transition-colors"
        >
          <span className="text-xl">{currentLang.icon}</span>
          <span className="font-medium">{currentLang.nativeName}</span>
          <span className="text-starlight/50">▼</span>
        </button>

        {showDropdown && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-midnight-light border border-midnight-lighter rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-midnight-lighter transition-colors ${
                  currentLang.code === lang.code ? 'bg-astral/20' : ''
                }`}
              >
                <span className="text-2xl">{lang.icon}</span>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-starlight">{lang.nativeName}</div>
                  <div className="text-xs text-starlight/60">{lang.name}</div>
                </div>
                {currentLang.code === lang.code && (
                  <span className="text-green-500">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-starlight mb-2">
          Choose Your Language
        </h2>
        <p className="text-starlight/60">
          Write in your mother tongue or explore India's rich literary heritage
        </p>
      </div>

      {/* Current Language Display */}
      <div className="mb-8 p-6 bg-gradient-to-br from-astral to-purple-600 rounded-2xl text-white">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{currentLang.icon}</span>
          <div className="flex-1">
            <div className="text-3xl font-bold mb-1">{currentLang.nativeName}</div>
            <div className="text-white/80">{currentLang.name} • {currentLang.script} Script</div>
          </div>
        </div>
        <div className="text-sm text-white/90">
          <div className="mb-2">
            <strong>Heritage:</strong> {currentLang.literaryHeritage}
          </div>
          <div>
            <strong>Font:</strong> {currentLang.font}
          </div>
        </div>
      </div>

      {/* Language Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              currentLang.code === lang.code
                ? 'bg-astral/20 border-astral shadow-lg shadow-astral/20'
                : 'bg-midnight-light border-midnight-lighter hover:border-astral/50 hover:bg-midnight-lighter'
            }`}
          >
            <div className="text-5xl mb-3">{lang.icon}</div>
            <div className="text-2xl font-bold text-starlight mb-1" style={{ fontFamily: lang.font }}>
              {lang.nativeName}
            </div>
            <div className="text-sm text-starlight/60 mb-2">{lang.name}</div>
            <div className="text-xs text-starlight/50">{lang.description}</div>
            
            {currentLang.code === lang.code && (
              <div className="mt-3 flex items-center gap-1 text-green-500 text-sm font-medium">
                <span>✓</span> Active
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Literary Heritage Details */}
      <div className="mt-8">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-astral hover:underline flex items-center gap-2"
        >
          {showDetails ? '▼' : '▶'} Learn about literary traditions
        </button>

        {showDetails && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {languages.map(lang => (
              <div key={lang.code} className="p-4 bg-midnight-light rounded-lg border border-midnight-lighter">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{lang.icon}</span>
                  <span className="font-bold text-starlight">{lang.name}</span>
                </div>
                <p className="text-sm text-starlight/70">
                  {lang.literaryHeritage}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Usage Tips */}
      <div className="mt-8 p-4 bg-midnight-light rounded-lg border border-midnight-lighter">
        <h3 className="text-lg font-bold text-starlight mb-2">💡 Writing Tips</h3>
        <ul className="text-sm text-starlight/70 space-y-1">
          <li>• Use your system keyboard or enable Google Input Tools for transliteration</li>
          <li>• For Devanagari scripts (Hindi, Sanskrit, Marathi): Type phonetically</li>
          <li>• For Urdu: Enable right-to-left text direction automatically</li>
          <li>• All fonts support proper rendering of complex scripts</li>
          <li>• Switch languages anytime - your entries are saved per language</li>
        </ul>
      </div>
    </div>
  );
};

export default LanguageSelector;
