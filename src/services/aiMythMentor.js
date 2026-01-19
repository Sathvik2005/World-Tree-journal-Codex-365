/**
 * AI Myth Mentor - Server-side AI processing for lore consistency
 * Provides story guidance, character development, and plot suggestions
 */

class AIMythMentor {
  constructor() {
    this.apiEndpoint = process.env.VITE_AI_API_ENDPOINT || '/api/ai-mentor';
    this.apiKey = process.env.VITE_AI_API_KEY || '';
    this.model = 'gpt-4'; // or 'claude-3', 'gemini-pro'
  }

  /**
   * Analyze lore consistency across manuscripts
   * @param {Array} manuscripts - All user manuscripts
   * @returns {Object} Consistency report with issues and suggestions
   */
  async analyzeLoreConsistency(manuscripts) {
    try {
      const loreElements = this.extractLoreElements(manuscripts);
      
      // In production: Send to backend AI service
      const response = await this.callAIService({
        action: 'analyze_consistency',
        data: loreElements,
        manuscripts: manuscripts.map(m => ({
          id: m.id,
          title: m.title,
          content: m.content,
          characters: m.characters,
          locations: m.locations
        }))
      });

      return {
        consistency_score: response.score || 85,
        issues: response.issues || [],
        suggestions: response.suggestions || [],
        timeline_conflicts: response.timeline_conflicts || [],
        character_inconsistencies: response.character_inconsistencies || []
      };
    } catch (error) {
      console.error('Lore consistency analysis failed:', error);
      return this.getMockConsistencyReport();
    }
  }

  /**
   * Get AI writing suggestions based on current context
   * @param {Object} context - Current writing context
   */
  async getWritingSuggestions(context) {
    try {
      const { content, genre, tone, characters, currentScene } = context;
      
      const response = await this.callAIService({
        action: 'writing_suggestions',
        data: {
          content: content.slice(-2000), // Last 2000 chars
          genre,
          tone,
          characters,
          scene: currentScene
        }
      });

      return {
        next_scene_ideas: response.scenes || [],
        dialogue_suggestions: response.dialogue || [],
        pacing_advice: response.pacing || '',
        conflict_opportunities: response.conflicts || [],
        character_development: response.character_notes || []
      };
    } catch (error) {
      console.error('Writing suggestions failed:', error);
      return this.getMockSuggestions();
    }
  }

  /**
   * Generate character arc analysis
   * @param {Object} character - Character data
   * @param {Array} appearances - All scenes with this character
   */
  async analyzeCharacterArc(character, appearances) {
    try {
      const response = await this.callAIService({
        action: 'character_arc',
        data: {
          character,
          appearances,
          timeline: this.buildCharacterTimeline(appearances)
        }
      });

      return {
        arc_type: response.arc_type || 'Flat Arc',
        development_score: response.score || 75,
        key_moments: response.moments || [],
        growth_areas: response.growth || [],
        suggestions: response.suggestions || [],
        emotional_journey: response.emotions || []
      };
    } catch (error) {
      console.error('Character arc analysis failed:', error);
      return this.getMockCharacterArc();
    }
  }

  /**
   * Detect plot holes and narrative gaps
   * @param {Array} manuscripts - Story manuscripts in order
   */
  async detectPlotHoles(manuscripts) {
    try {
      const narrative = this.buildNarrativeStructure(manuscripts);
      
      const response = await this.callAIService({
        action: 'plot_analysis',
        data: narrative
      });

      return {
        plot_holes: response.holes || [],
        unanswered_questions: response.questions || [],
        loose_threads: response.threads || [],
        pacing_issues: response.pacing || [],
        suggestions: response.fixes || []
      };
    } catch (error) {
      console.error('Plot hole detection failed:', error);
      return { plot_holes: [], suggestions: [] };
    }
  }

  /**
   * Generate story continuation prompt
   * @param {string} currentContent - Current manuscript content
   * @param {Object} storyContext - Overall story context
   */
  async generateContinuationPrompt(currentContent, storyContext) {
    try {
      const response = await this.callAIService({
        action: 'continuation_prompt',
        data: {
          content: currentContent.slice(-3000),
          context: storyContext,
          tone: storyContext.tone,
          genre: storyContext.genre
        }
      });

      return {
        prompts: response.prompts || [],
        scene_starters: response.starters || [],
        tension_builders: response.tension || [],
        dialogue_openers: response.dialogue || []
      };
    } catch (error) {
      console.error('Continuation prompt failed:', error);
      return this.getMockContinuationPrompts();
    }
  }

  /**
   * Call AI service (backend API)
   */
  async callAIService(payload) {
    // In production: Make actual API call
    // const response = await fetch(this.apiEndpoint, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${this.apiKey}`
    //   },
    //   body: JSON.stringify(payload)
    // });
    // return await response.json();

    // Demo mode: Return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getMockAIResponse(payload.action));
      }, 1500);
    });
  }

  /**
   * Extract lore elements from manuscripts
   */
  extractLoreElements(manuscripts) {
    const lore = {
      characters: new Set(),
      locations: new Set(),
      magic_systems: new Set(),
      artifacts: new Set(),
      historical_events: []
    };

    manuscripts.forEach(manuscript => {
      if (manuscript.characters) {
        manuscript.characters.forEach(c => lore.characters.add(c));
      }
      if (manuscript.locations) {
        manuscript.locations.forEach(l => lore.locations.add(l));
      }
    });

    return {
      characters: Array.from(lore.characters),
      locations: Array.from(lore.locations),
      magic_systems: Array.from(lore.magic_systems),
      artifacts: Array.from(lore.artifacts)
    };
  }

  /**
   * Build character timeline from appearances
   */
  buildCharacterTimeline(appearances) {
    return appearances
      .sort((a, b) => a.chapter - b.chapter)
      .map(app => ({
        chapter: app.chapter,
        scene: app.scene,
        emotional_state: app.emotion,
        action: app.action,
        growth_moment: app.growth
      }));
  }

  /**
   * Build narrative structure from manuscripts
   */
  buildNarrativeStructure(manuscripts) {
    return manuscripts.map((m, index) => ({
      sequence: index + 1,
      title: m.title,
      word_count: m.wordCount,
      characters: m.characters,
      locations: m.locations,
      major_events: m.majorEvents || [],
      conflicts: m.conflicts || [],
      resolutions: m.resolutions || []
    }));
  }

  // Mock responses for demo mode
  getMockAIResponse(action) {
    const responses = {
      analyze_consistency: {
        score: 87,
        issues: [
          'Character "Elara" eye color changes from blue (Ch. 3) to green (Ch. 7)',
          'Timeline inconsistency: 3 days pass but character mentions "last week"'
        ],
        suggestions: [
          'Standardize character descriptions in a reference doc',
          'Create timeline tracker for better continuity'
        ]
      },
      writing_suggestions: {
        scenes: [
          'The mentor reveals a hidden truth about protagonist\'s lineage',
          'An unexpected ally appears from protagonist\'s past',
          'Discovery of an ancient artifact that changes everything'
        ],
        dialogue: [
          '"You\'re not ready for what comes next," the elder whispered.',
          '"Everything I knew was a lie," she realized aloud.'
        ]
      }
    };

    return responses[action] || {};
  }

  getMockConsistencyReport() {
    return {
      consistency_score: 85,
      issues: [
        'Minor timeline discrepancy in Chapter 4',
        'Character motivation shift needs clarification'
      ],
      suggestions: [
        'Add transitional scene to explain character change',
        'Review chapter sequence for timeline accuracy'
      ],
      timeline_conflicts: [],
      character_inconsistencies: []
    };
  }

  getMockSuggestions() {
    return {
      next_scene_ideas: [
        'Confrontation with the antagonist in neutral territory',
        'Discovery of a clue that changes the protagonist\'s goal',
        'Quiet moment revealing character vulnerability'
      ],
      dialogue_suggestions: [],
      pacing_advice: 'Consider adding a calm scene before the climax',
      conflict_opportunities: ['Internal: doubt about chosen path'],
      character_development: ['Show vulnerability through action, not just thought']
    };
  }

  getMockCharacterArc() {
    return {
      arc_type: 'Positive Change Arc',
      development_score: 78,
      key_moments: [
        'Chapter 2: First failure teaches humility',
        'Chapter 5: Chooses others over personal gain',
        'Chapter 8: Confronts inner fear'
      ],
      growth_areas: ['Show more internal struggle', 'Deepen relationships'],
      suggestions: ['Add scene showing character applying lesson learned'],
      emotional_journey: ['Fear → Doubt → Acceptance → Courage']
    };
  }

  getMockContinuationPrompts() {
    return {
      prompts: [
        'What if your character discovered their mentor\'s secret?',
        'How would the story change if the antagonist offered an alliance?'
      ],
      scene_starters: [
        'The morning broke with an unsettling silence...',
        'She found the letter exactly where he said it would be...'
      ],
      tension_builders: [
        'A familiar face appears in an unexpected place',
        'A deadline suddenly moves closer'
      ],
      dialogue_openers: [
        '"We need to talk about what happened last night."',
        '"You weren\'t supposed to find out this way."'
      ]
    };
  }
}

// Create singleton instance
const aiMythMentor = new AIMythMentor();

export default aiMythMentor;
