/**
 * AI-Enhanced Reflection Service
 * Generates follow-up questions based on journal entries to help users dig deeper
 * Inspired by Reflection app's AI questioning system
 */

class AIReflectionService {
  constructor() {
    this.questionBank = {
      emotions: [
        "What triggered this feeling?",
        "How did this emotion manifest physically in your body?",
        "Have you felt this way before? What was different then?",
        "What would you tell a friend feeling this way?",
        "What's beneath this emotion? Is there a deeper feeling?",
      ],
      relationships: [
        "How did this interaction make you feel valued or diminished?",
        "What did you wish you had said in that moment?",
        "What patterns do you notice in this relationship?",
        "How does this person's behavior reflect your own boundaries?",
        "What would change if you approached this with more compassion?",
      ],
      challenges: [
        "What's one small action you could take toward solving this?",
        "What resources or support do you already have?",
        "How have you overcome similar challenges before?",
        "What would this look like if it were easy?",
        "What's the worst that could realistically happen?",
      ],
      gratitude: [
        "How can you create more moments like this?",
        "Who contributed to this positive experience?",
        "What did you learn about yourself through this?",
        "How can you share this joy with others?",
        "What made this moment special compared to similar experiences?",
      ],
      growth: [
        "What skill or strength did you use to accomplish this?",
        "How would your past self react to seeing where you are now?",
        "What's one thing you'll do differently next time?",
        "What does this teach you about your values?",
        "How has this experience changed your perspective?",
      ],
      future: [
        "What does success look like for this goal?",
        "What's one obstacle you might face, and how will you handle it?",
        "Who can support you in this journey?",
        "How will achieving this align with your core values?",
        "What's the first tiny step you can take today?",
      ],
    };

    this.emotionKeywords = {
      emotions: ['feel', 'felt', 'emotion', 'happy', 'sad', 'angry', 'anxious', 'excited', 'afraid', 'worried', 'stressed', 'depressed', 'joy', 'fear', 'hurt', 'lonely'],
      relationships: ['friend', 'family', 'partner', 'colleague', 'boss', 'parent', 'child', 'spouse', 'relationship', 'conversation', 'argument', 'conflict', 'connection'],
      challenges: ['problem', 'challenge', 'difficult', 'struggle', 'obstacle', 'issue', 'stuck', 'confused', 'overwhelmed', 'complicated', 'hard', 'tough'],
      gratitude: ['grateful', 'thankful', 'appreciate', 'blessed', 'lucky', 'fortunate', 'wonderful', 'amazing', 'perfect', 'beautiful', 'love'],
      growth: ['learned', 'realized', 'discovered', 'achieved', 'accomplished', 'improved', 'progress', 'better', 'stronger', 'growth', 'changed'],
      future: ['goal', 'plan', 'want', 'wish', 'hope', 'dream', 'will', 'going to', 'next', 'future', 'aspire', 'intend'],
    };

    this.sentimentPatterns = {
      negative: ['never', 'always', 'can\'t', 'won\'t', 'impossible', 'hate', 'worst', 'terrible', 'awful'],
      absolute: ['everyone', 'nobody', 'everything', 'nothing', 'all', 'none'],
      passive: ['was', 'were', 'been', 'being', 'happened to me'],
    };
  }

  /**
   * Analyze journal entry and generate 3-5 personalized follow-up questions
   * @param {string} entryText - The journal entry content
   * @returns {Object} - Analysis results with questions, themes, and insights
   */
  analyzeEntry(entryText) {
    const text = entryText.toLowerCase();
    const wordCount = entryText.split(/\s+/).length;
    
    // Detect themes based on keyword matching
    const themes = this._detectThemes(text);
    
    // Detect sentiment patterns
    const patterns = this._detectPatterns(text);
    
    // Generate questions based on themes and patterns
    const questions = this._generateQuestions(themes, patterns, wordCount);
    
    // Provide insights
    const insights = this._generateInsights(themes, patterns, wordCount);
    
    return {
      themes,
      patterns,
      questions,
      insights,
      wordCount,
      analysisDate: new Date().toISOString(),
    };
  }

  /**
   * Detect themes in the journal entry
   */
  _detectThemes(text) {
    const detectedThemes = [];
    
    for (const [theme, keywords] of Object.entries(this.emotionKeywords)) {
      const matchCount = keywords.filter(keyword => text.includes(keyword)).length;
      if (matchCount > 0) {
        detectedThemes.push({
          theme,
          strength: matchCount,
          keywords: keywords.filter(keyword => text.includes(keyword)),
        });
      }
    }
    
    // Sort by strength (most relevant first)
    detectedThemes.sort((a, b) => b.strength - a.strength);
    
    return detectedThemes;
  }

  /**
   * Detect cognitive patterns (negative thinking, absolutes, passive voice)
   */
  _detectPatterns(text) {
    const detected = {
      negative: [],
      absolute: [],
      passive: [],
    };
    
    for (const [type, patterns] of Object.entries(this.sentimentPatterns)) {
      detected[type] = patterns.filter(pattern => text.includes(pattern));
    }
    
    return detected;
  }

  /**
   * Generate personalized questions based on themes and patterns
   */
  _generateQuestions(themes, patterns, wordCount) {
    const questions = [];
    
    // Add questions from top 2-3 themes
    const topThemes = themes.slice(0, 3);
    topThemes.forEach(({ theme, strength }) => {
      const themeQuestions = this.questionBank[theme] || [];
      // Pick 1-2 questions per theme based on strength
      const numQuestions = strength > 3 ? 2 : 1;
      const selected = this._shuffleArray(themeQuestions).slice(0, numQuestions);
      questions.push(...selected);
    });
    
    // Add pattern-specific questions if negative thinking detected
    if (patterns.negative.length > 0) {
      questions.push("What evidence do you have that contradicts this thought?");
      questions.push("How might you reframe this situation more objectively?");
    }
    
    if (patterns.absolute.length > 2) {
      questions.push("Are there exceptions to this 'always/never' statement?");
    }
    
    if (patterns.passive.length > 2) {
      questions.push("What aspects of this situation are within your control?");
    }
    
    // If entry is short, encourage expansion
    if (wordCount < 100) {
      questions.push("Can you describe this in more detail? What sensory details stand out?");
    }
    
    // Return 3-5 questions max
    return this._shuffleArray(questions).slice(0, 5);
  }

  /**
   * Generate insights about the entry
   */
  _generateInsights(themes, patterns, wordCount) {
    const insights = [];
    
    if (wordCount < 50) {
      insights.push({
        type: 'length',
        message: 'This entry is brief. Consider exploring your thoughts more deeply.',
        icon: '📝',
      });
    } else if (wordCount > 500) {
      insights.push({
        type: 'length',
        message: 'You\'re in a deep reflection state! This detailed entry shows strong self-awareness.',
        icon: '✨',
      });
    }
    
    // Theme-based insights
    if (themes.length === 0) {
      insights.push({
        type: 'neutral',
        message: 'This entry is reflective and neutral. Consider exploring your emotions more explicitly.',
        icon: '🤔',
      });
    } else if (themes[0]?.theme === 'emotions' && themes[0].strength > 4) {
      insights.push({
        type: 'emotional',
        message: 'You\'re processing strong emotions. It\'s healthy to acknowledge and explore these feelings.',
        icon: '💙',
      });
    } else if (themes[0]?.theme === 'gratitude') {
      insights.push({
        type: 'positive',
        message: 'Gratitude practice detected! Studies show this boosts happiness by 25%.',
        icon: '🌟',
      });
    } else if (themes[0]?.theme === 'growth') {
      insights.push({
        type: 'growth',
        message: 'You\'re in a learning mindset. This self-awareness is key to personal development.',
        icon: '🌱',
      });
    }
    
    // Pattern-based insights
    if (patterns.negative.length > 3) {
      insights.push({
        type: 'warning',
        message: 'Notice the negative language patterns. Try the "Reframe Exercise" to challenge these thoughts.',
        icon: '⚠️',
      });
    }
    
    if (patterns.absolute.length > 3) {
      insights.push({
        type: 'cognitive',
        message: 'You\'re using absolute terms like "always" or "never." Reality is often more nuanced.',
        icon: '🔍',
      });
    }
    
    return insights;
  }

  /**
   * Generate a daily prompt based on the date and past patterns
   */
  generateDailyPrompt() {
    const prompts = [
      "What's one thing you're looking forward to today?",
      "Describe a recent moment when you felt truly present.",
      "What's a fear you've been avoiding? Why?",
      "Write a letter to your younger self about today's challenges.",
      "What does 'success' mean to you right now?",
      "Who made you smile recently? How can you thank them?",
      "What's one habit you'd like to change? What's stopping you?",
      "Describe your ideal day from morning to night.",
      "What's a compliment you wish someone would give you?",
      "What would you do if you knew you couldn't fail?",
      "List three things your body did well today.",
      "What's a lesson you learned this week?",
      "Describe a place that makes you feel safe.",
      "What's something you're procrastinating on? Why?",
      "Write about a time you were proud of yourself.",
    ];
    
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const promptIndex = dayOfYear % prompts.length;
    
    return {
      prompt: prompts[promptIndex],
      category: this._categorizePrompt(prompts[promptIndex]),
      date: new Date().toISOString().split('T')[0],
    };
  }

  /**
   * Categorize prompt for filtering
   */
  _categorizePrompt(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes('grat') || lowerPrompt.includes('thank')) return 'gratitude';
    if (lowerPrompt.includes('fear') || lowerPrompt.includes('challeng')) return 'shadow work';
    if (lowerPrompt.includes('future') || lowerPrompt.includes('goal')) return 'future';
    if (lowerPrompt.includes('body') || lowerPrompt.includes('feel')) return 'mindfulness';
    return 'reflection';
  }

  /**
   * Utility: Shuffle array
   */
  _shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Save analysis to localStorage for tracking over time
   */
  saveAnalysis(entryId, analysis) {
    const key = 'mythical_reflection_analyses';
    const existing = JSON.parse(localStorage.getItem(key) || '{}');
    existing[entryId] = analysis;
    localStorage.setItem(key, JSON.stringify(existing));
  }

  /**
   * Get past analyses to track patterns over time
   */
  getHistoricalAnalyses() {
    const key = 'mythical_reflection_analyses';
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  /**
   * Generate insights from multiple entries
   */
  generateTrends(timeframe = 'week') {
    const analyses = this.getHistoricalAnalyses();
    const entries = Object.values(analyses);
    
    if (entries.length < 3) {
      return {
        message: 'Keep journaling to see trends! You need at least 3 entries.',
        trends: [],
      };
    }
    
    // Calculate most common themes
    const themeCount = {};
    entries.forEach(entry => {
      entry.themes.forEach(({ theme }) => {
        themeCount[theme] = (themeCount[theme] || 0) + 1;
      });
    });
    
    const topThemes = Object.entries(themeCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([theme, count]) => ({ theme, count }));
    
    // Calculate average word count
    const avgWordCount = Math.round(
      entries.reduce((sum, e) => sum + e.wordCount, 0) / entries.length
    );
    
    return {
      totalEntries: entries.length,
      topThemes,
      avgWordCount,
      trends: this._generateTrendInsights(topThemes, avgWordCount),
    };
  }

  _generateTrendInsights(topThemes, avgWordCount) {
    const insights = [];
    
    if (topThemes[0]?.theme === 'challenges') {
      insights.push('You\'ve been processing challenges frequently. Consider adding more gratitude entries for balance.');
    }
    
    if (topThemes.some(t => t.theme === 'growth')) {
      insights.push('Your growth mindset is showing! You\'re actively learning from experiences.');
    }
    
    if (avgWordCount > 300) {
      insights.push('Your detailed entries show deep self-reflection. This is a strong journaling practice!');
    } else if (avgWordCount < 100) {
      insights.push('Try expanding your entries. Aim for 200+ words to unlock deeper insights.');
    }
    
    return insights;
  }
}

// Export singleton instance
export const aiReflectionService = new AIReflectionService();
export default aiReflectionService;
