/**
 * Multilingual Service
 * Support for Indian languages with rich literary heritage
 */

class MultilingualService {
  constructor() {
    this.currentLanguage = this.loadLanguage();
    this.supportedLanguages = {
      en: {
        name: 'English',
        nativeName: 'English',
        script: 'Latin',
        direction: 'ltr',
        font: 'Inter, system-ui',
        description: 'Global literary language',
        literaryHeritage: 'Modern Indian English literature - R.K. Narayan, Arundhati Roy, Jhumpa Lahiri',
        icon: '🇬🇧',
        placeholder: 'Start writing your thoughts...'
      },
      hi: {
        name: 'Hindi',
        nativeName: 'हिन्दी',
        script: 'Devanagari',
        direction: 'ltr',
        font: 'Noto Sans Devanagari, sans-serif',
        description: 'Most spoken Indian language',
        literaryHeritage: 'Vast modern literary tradition across North and Central India',
        icon: '🇮🇳',
        placeholder: 'अपने विचार लिखना शुरू करें...'
      },
      te: {
        name: 'Telugu',
        nativeName: 'తెలుగు',
        script: 'Telugu',
        direction: 'ltr',
        font: 'Noto Sans Telugu, sans-serif',
        description: 'Major Dravidian language',
        literaryHeritage: 'Classical status with significant literary output',
        icon: '🌾',
        placeholder: 'మీ ఆలోచనలను వ్రాయడం ప్రారంభించండి...'
      },
      bn: {
        name: 'Bengali',
        nativeName: 'বাংলা',
        script: 'Bengali',
        direction: 'ltr',
        font: 'Noto Sans Bengali, sans-serif',
        description: 'Language of Rabindranath Tagore',
        literaryHeritage: 'World-renowned authors, strong in poetry, fiction, and drama',
        icon: '🎭',
        placeholder: 'আপনার চিন্তা লেখা শুরু করুন...'
      },
      ta: {
        name: 'Tamil',
        nativeName: 'தமிழ்',
        script: 'Tamil',
        direction: 'ltr',
        font: 'Noto Sans Tamil, sans-serif',
        description: 'First classical language',
        literaryHeritage: 'Ancient literature and vibrant modern writing (Sangam literature)',
        icon: '📜',
        placeholder: 'உங்கள் எண்ணங்களை எழுத தொடங்குங்கள்...'
      },
      sa: {
        name: 'Sanskrit',
        nativeName: 'संस्कृतम्',
        script: 'Devanagari',
        direction: 'ltr',
        font: 'Noto Sans Devanagari, serif',
        description: 'Ancient foundational language',
        literaryHeritage: 'Vedas, Upanishads, epics (Mahabharata, Ramayana), philosophy',
        icon: '🕉️',
        placeholder: 'लेखनं आरभत...'
      },
      mr: {
        name: 'Marathi',
        nativeName: 'मराठी',
        script: 'Devanagari',
        direction: 'ltr',
        font: 'Noto Sans Devanagari, sans-serif',
        description: 'Official language of Maharashtra',
        literaryHeritage: 'Strong regional literary presence, saints and poets',
        icon: '🏛️',
        placeholder: 'आपले विचार लिहायला सुरुवात करा...'
      },
      ur: {
        name: 'Urdu',
        nativeName: 'اردو',
        script: 'Perso-Arabic',
        direction: 'rtl',
        font: 'Noto Nastaliq Urdu, serif',
        description: 'Language of Ghazals',
        literaryHeritage: 'Poetic tradition (Ghazals, poetry) and influential prose',
        icon: '🌙',
        placeholder: 'اپنے خیالات لکھنا شروع کریں...'
      }
    };
  }

  /**
   * Load saved language preference
   */
  loadLanguage() {
    return localStorage.getItem('mythical_language') || 'en';
  }

  /**
   * Set active language
   */
  setLanguage(languageCode) {
    if (!this.supportedLanguages[languageCode]) {
      console.error(`Language ${languageCode} not supported`);
      return false;
    }

    this.currentLanguage = languageCode;
    localStorage.setItem('mythical_language', languageCode);
    
    // Update document direction for RTL languages
    const lang = this.supportedLanguages[languageCode];
    document.documentElement.dir = lang.direction;
    document.documentElement.lang = languageCode;
    
    return true;
  }

  /**
   * Get current language info
   */
  getCurrentLanguage() {
    return {
      code: this.currentLanguage,
      ...this.supportedLanguages[this.currentLanguage]
    };
  }

  /**
   * Get all supported languages
   */
  getAllLanguages() {
    return Object.entries(this.supportedLanguages).map(([code, lang]) => ({
      code,
      ...lang
    }));
  }

  /**
   * Get language-specific keyboard layouts and input helpers
   */
  getKeyboardConfig(languageCode) {
    const configs = {
      hi: {
        inputMethod: 'transliteration',
        virtualKeyboard: true,
        imeSupport: true
      },
      te: {
        inputMethod: 'transliteration',
        virtualKeyboard: true,
        imeSupport: true
      },
      bn: {
        inputMethod: 'transliteration',
        virtualKeyboard: true,
        imeSupport: true
      },
      ta: {
        inputMethod: 'transliteration',
        virtualKeyboard: true,
        imeSupport: true
      },
      sa: {
        inputMethod: 'transliteration',
        virtualKeyboard: true,
        imeSupport: true
      },
      mr: {
        inputMethod: 'transliteration',
        virtualKeyboard: true,
        imeSupport: true
      },
      ur: {
        inputMethod: 'direct',
        virtualKeyboard: true,
        imeSupport: true,
        rtl: true
      },
      en: {
        inputMethod: 'direct',
        virtualKeyboard: false,
        imeSupport: false
      }
    };

    return configs[languageCode] || configs.en;
  }

  /**
   * Load Google Input Tools for transliteration
   */
  loadGoogleInputTools() {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.elements) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://www.google.com/jsapi';
      script.onload = () => {
        window.google.load('elements', '1', {
          packages: 'transliteration',
          callback: resolve
        });
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  /**
   * Get language-specific writing prompts
   */
  getPrompts(languageCode) {
    const prompts = {
      en: [
        'What are you grateful for today?',
        'Describe a moment that made you smile',
        'What challenges are you facing?',
        'What lessons did you learn recently?'
      ],
      hi: [
        'आज आप किस बात के लिए आभारी हैं?',
        'एक ऐसे पल का वर्णन करें जिसने आपको मुस्कुराया',
        'आप किन चुनौतियों का सामना कर रहे हैं?',
        'आपने हाल ही में क्या सीखा?'
      ],
      te: [
        'ఈరోజు మీరు దేనికి కృతజ్ఞులు?',
        'మిమ్మల్ని నవ్వించిన ఒక క్షణాన్ని వివరించండి',
        'మీరు ఎలాంటి సవాళ్లను ఎదుర్కొంటున్నారు?',
        'మీరు ఇటీవల ఏమి నేర్చుకున్నారు?'
      ],
      bn: [
        'আজ আপনি কিসের জন্য কৃতজ্ঞ?',
        'এমন একটি মুহূর্ত বর্ণনা করুন যা আপনাকে হাসিয়েছে',
        'আপনি কী চ্যালেঞ্জের সম্মুখীন হচ্ছেন?',
        'আপনি সম্প্রতি কী শিখেছেন?'
      ],
      ta: [
        'இன்று நீங்கள் எதற்காக நன்றியுள்ளவர்?',
        'உங்களை சிரிக்க வைத்த ஒரு தருணத்தை விவரிக்கவும்',
        'நீங்கள் என்ன சவால்களை எதிர்கொள்கிறீர்கள்?',
        'நீங்கள் சமீபத்தில் என்ன கற்றுக்கொண்டீர்கள்?'
      ],
      sa: [
        'अद्य भवान् कस्मै कृतज्ञः अस्ति?',
        'एकं क्षणं वर्णयतु यत् भवन्तं स्मितम् अकरोत्',
        'के आव्हानाः सन्ति भवतः?',
        'नूतनं किं शिक्षितवान् भवान्?'
      ],
      mr: [
        'आज तुम्ही कशाबद्दल कृतज्ञ आहात?',
        'तुम्हाला हसवलेल्या क्षणाचे वर्णन करा',
        'तुम्ही कोणत्या आव्हानांना सामोरे जात आहात?',
        'तुम्ही अलीकडे काय शिकलात?'
      ],
      ur: [
        'آج آپ کس بات کے لیے شکر گزار ہیں؟',
        'ایک لمحے کی تفصیل بیان کریں جس نے آپ کو مسکرایا',
        'آپ کن چیلنجز کا سامنا کر رہے ہیں؟',
        'آپ نے حال ہی میں کیا سیکھا؟'
      ]
    };

    return prompts[languageCode] || prompts.en;
  }

  /**
   * Get word count (handles complex scripts)
   */
  getWordCount(text, languageCode) {
    if (!text) return 0;

    const lang = this.supportedLanguages[languageCode];
    
    // For Indic scripts, count by spaces and special characters
    if (lang.script !== 'Latin' && lang.script !== 'Perso-Arabic') {
      // Split by whitespace and filter empty strings
      return text.split(/\s+/).filter(w => w.length > 0).length;
    }

    // For English and Urdu
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
  }

  /**
   * Detect language from text
   */
  detectLanguage(text) {
    const samples = text.slice(0, 100);
    
    // Unicode ranges for different scripts
    const ranges = {
      hi: /[\u0900-\u097F]/, // Devanagari
      te: /[\u0C00-\u0C7F]/, // Telugu
      bn: /[\u0980-\u09FF]/, // Bengali
      ta: /[\u0B80-\u0BFF]/, // Tamil
      mr: /[\u0900-\u097F]/, // Devanagari (same as Hindi)
      ur: /[\u0600-\u06FF\u0750-\u077F]/, // Arabic/Urdu
      en: /[A-Za-z]/
    };

    for (const [code, regex] of Object.entries(ranges)) {
      if (regex.test(samples)) {
        return code;
      }
    }

    return 'en';
  }

  /**
   * Get font loading CSS
   */
  getFontLoadingCSS() {
    return `
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;600;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;600;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap');
    `;
  }

  /**
   * Initialize fonts
   */
  initializeFonts() {
    const style = document.createElement('style');
    style.textContent = this.getFontLoadingCSS();
    document.head.appendChild(style);
  }
}

// Create singleton instance
const multilingualService = new MultilingualService();

// Initialize fonts on load
if (typeof window !== 'undefined') {
  multilingualService.initializeFonts();
}

export default multilingualService;
