# Multilingual Support - Indian Languages

## 🌏 Supported Languages

World Tree - Codex 365 now supports writing in 8 Indian languages with rich literary heritage:

### Languages
1. **English** 🇬🇧 - Global literature (R.K. Narayan, Arundhati Roy, Jhumpa Lahiri)
2. **Hindi** 🇮🇳 - Most spoken, modern literary tradition (Devanagari script)
3. **Telugu** 🌾 - Major Dravidian language, classical status (Telugu script)
4. **Bengali** 🎭 - Language of Tagore, poetry and drama (Bengali script)
5. **Tamil** 📜 - First classical language, Sangam literature (Tamil script)
6. **Sanskrit** 🕉️ - Ancient texts, Vedas, epics (Devanagari script)
7. **Marathi** 🏛️ - Maharashtra's official language (Devanagari script)
8. **Urdu** 🌙 - Poetic tradition, Ghazals (Perso-Arabic script, RTL)

## 🎨 Features

### Text Rendering
- **Native Fonts**: Google Noto fonts for perfect script rendering
- **Complex Scripts**: Full support for Devanagari, Telugu, Bengali, Tamil, Urdu
- **RTL Support**: Automatic right-to-left for Urdu
- **Font Optimization**: Script-specific line heights and spacing

### Writing Tools
- **Language Selector**: Beautiful UI to switch between languages
- **Writing Prompts**: Translated prompts for each language
- **Word Counter**: Accurate counting for complex scripts
- **Auto-Save**: Per-language entry storage
- **Keyboard Shortcuts**: Quick language switching (Ctrl+L)

### Input Methods
- **System Keyboard**: Use your OS keyboard layouts
- **Google Input Tools**: Optional transliteration support
- **IME Support**: Input Method Editor for complex scripts
- **Voice-to-Text**: Works with all languages

## 📝 Usage

### Basic Setup

```jsx
import MultilingualEditor from './components/Language/MultilingualEditor';

function App() {
  return (
    <MultilingualEditor 
      onSave={(entry) => console.log('Saved:', entry)}
      onContentChange={(content, langCode) => {
        console.log('Language:', langCode);
      }}
    />
  );
}
```

### Language Selector Only

```jsx
import LanguageSelector from './components/Language/LanguageSelector';

<LanguageSelector 
  compact={true}
  onLanguageChange={(lang) => console.log('Selected:', lang)}
/>
```

### Multilingual Service

```javascript
import multilingualService from './services/multilingualService';

// Get current language
const currentLang = multilingualService.getCurrentLanguage();

// Change language
multilingualService.setLanguage('hi'); // Hindi

// Get all languages
const languages = multilingualService.getAllLanguages();

// Word count for any language
const count = multilingualService.getWordCount(text, 'te'); // Telugu

// Detect language from text
const detected = multilingualService.detectLanguage('నమస్కారం');
```

## ⌨️ Keyboard Input Setup

### Windows
1. Settings → Time & Language → Language
2. Add desired Indian language
3. Install keyboard layout
4. Switch: Windows + Space

### macOS
1. System Preferences → Keyboard → Input Sources
2. Add Indian language keyboard
3. Switch: Ctrl + Space

### Linux (Ubuntu)
1. Settings → Region & Language
2. Add Input Source
3. Switch: Super + Space

### Browser Input Tools
- **Chrome**: Google Input Tools extension
- **Firefox**: Built-in IME support
- **Edge**: Windows IME integration

## 🎯 Font Configuration

### Devanagari (Hindi, Sanskrit, Marathi)
```css
font-family: 'Noto Sans Devanagari', sans-serif;
```

### Telugu
```css
font-family: 'Noto Sans Telugu', sans-serif;
```

### Bengali
```css
font-family: 'Noto Sans Bengali', sans-serif;
```

### Tamil
```css
font-family: 'Noto Sans Tamil', sans-serif;
```

### Urdu (Nastaliq)
```css
font-family: 'Noto Nastaliq Urdu', serif;
direction: rtl;
```

## 💾 Data Storage

Entries are stored per language in localStorage:

```javascript
// Hindi entries
localStorage.getItem('mythical_entries_hi')

// Telugu entries
localStorage.getItem('mythical_entries_te')

// English entries
localStorage.getItem('mythical_entries_en')
```

## 🔤 Transliteration Guide

### Hindi/Devanagari
- `namaste` → नमस्ते
- `dhanyavaad` → धन्यवाद
- `shukriya` → शुक्रिया

### Telugu
- `namaskaram` → నమస్కారం
- `dhanyavadalu` → ధన్యవాదాలు

### Bengali
- `nomoskar` → নমস্কার
- `dhonnobad` → ধন্যবাদ

### Tamil
- `vanakkam` → வணக்கம்
- `nandri` → நன்றி

### Sanskrit
- `namaste` → नमस्ते
- `dhanyavaadaḥ` → धन्यवादः

### Marathi
- `namaskar` → नमस्कार
- `dhanyavaad` → धन्यवाद

## 📚 Literary Heritage Integration

Each language includes:
- **Historical Context**: Brief literary history
- **Notable Authors**: Famous writers and poets
- **Writing Style**: Traditional and modern forms
- **Cultural Significance**: Regional importance

### Example: Bengali
```javascript
{
  name: 'Bengali',
  literaryHeritage: 'World-renowned authors like Rabindranath Tagore, 
                     strong in poetry, fiction, and drama',
  icon: '🎭',
  notableWorks: ['Gitanjali', 'Gora', 'The Home and the World']
}
```

## 🌐 Internationalization (i18n)

### UI Translation Structure
```javascript
const translations = {
  en: {
    save: 'Save Entry',
    wordCount: 'Words',
    prompt: 'Start writing...'
  },
  hi: {
    save: 'प्रविष्टि सहेजें',
    wordCount: 'शब्द',
    prompt: 'लिखना शुरू करें...'
  }
  // ... other languages
}
```

## 🎨 Styling Guidelines

### Font Sizes
- **Latin (English)**: 16-18px
- **Devanagari**: 18-20px
- **Telugu/Tamil**: 19-21px
- **Bengali**: 18-20px
- **Urdu**: 20-22px (Nastaliq needs more space)

### Line Heights
- **English**: 1.7
- **Devanagari**: 1.8-1.9
- **Telugu/Tamil**: 2.0
- **Bengali**: 1.9
- **Urdu**: 2.2

### Letter Spacing
- **English**: 0
- **Devanagari**: 0.02em
- **Telugu/Tamil/Bengali**: 0.01em
- **Urdu**: 0.02em

## 📱 Mobile Optimization

### Responsive Font Sizes
```css
@media (max-width: 768px) {
  [lang="hi"], [lang="te"], [lang="bn"], [lang="ta"] {
    font-size: 16px;
    line-height: 1.9;
  }
  [lang="ur"] {
    font-size: 18px;
    line-height: 2.3;
  }
}
```

### Touch-Friendly Language Selector
- Minimum touch target: 44x44px
- Clear visual feedback
- Swipe gestures for quick switching

## 🔧 Troubleshooting

### Fonts Not Loading
1. Check internet connection (Google Fonts CDN)
2. Verify font import in CSS
3. Clear browser cache
4. Use local font fallbacks

### Input Issues
1. Enable system keyboard for language
2. Install Google Input Tools
3. Check browser IME support
4. Verify language pack installed

### Display Problems
1. Update browser to latest version
2. Enable font ligatures
3. Check text-rendering property
4. Verify Unicode support

### RTL (Urdu) Issues
1. Ensure `direction: rtl` is applied
2. Check text-align properties
3. Verify flex-direction for layouts
4. Test in RTL-aware browsers

## 🚀 Performance

### Font Loading Strategy
```javascript
// Preload critical fonts
<link rel="preload" as="font" 
      href="noto-sans-devanagari.woff2" 
      type="font/woff2" crossorigin>
```

### Lazy Loading
- Load fonts only when language is selected
- Cache font files in service worker
- Use font-display: swap

### Bundle Size
- Noto Sans Devanagari: ~180KB
- Noto Sans Telugu: ~220KB
- Noto Sans Bengali: ~200KB
- Noto Sans Tamil: ~190KB
- Noto Nastaliq Urdu: ~450KB
- **Total**: ~1.44MB (loaded on-demand)

## 🎯 Future Enhancements

### Planned Features
- [ ] Kannada language support
- [ ] Malayalam language support
- [ ] Gujarati language support
- [ ] Punjabi (Gurmukhi) support
- [ ] Odia language support
- [ ] Virtual keyboard overlay
- [ ] Handwriting recognition
- [ ] Voice-to-text for all languages
- [ ] AI grammar checking per language
- [ ] Language-specific writing statistics
- [ ] Export to PDF with proper fonts
- [ ] Collaborative editing in multiple languages

### Advanced Features
- [ ] Translation between supported languages
- [ ] Bilingual writing mode (side-by-side)
- [ ] Language learning prompts
- [ ] Script conversion (e.g., Hindi to Sanskrit)
- [ ] Poetry meter detection for each language
- [ ] Literary style analysis

## 📖 Resources

### Font Sources
- [Google Fonts](https://fonts.google.com/)
- [Noto Fonts](https://www.google.com/get/noto/)

### Input Methods
- [Google Input Tools](https://www.google.com/inputtools/)
- [Lipikaar](https://www.lipikaar.com/)
- [Quillpad](https://quillpad.in/)

### Language References
- [Hindi Transliteration](https://www.lexilogos.com/keyboard/hindi.htm)
- [Telugu Unicode](https://www.teluguunicode.in/)
- [Tamil Virtual Keyboard](https://www.tamilvu.org/)
- [Urdu Editor](https://www.urdu-editor.com/)

## 🤝 Contributing

To add a new language:

1. Update `multilingualService.js`:
```javascript
supportedLanguages: {
  kn: {
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    script: 'Kannada',
    direction: 'ltr',
    font: 'Noto Sans Kannada, sans-serif',
    // ... rest of config
  }
}
```

2. Add font import to `multilingual.css`
3. Create translation strings
4. Test rendering and input methods
5. Update this documentation

---

**Made with ❤️ for India's linguistic diversity**

Celebrating the rich literary heritage of Indian languages through technology.
