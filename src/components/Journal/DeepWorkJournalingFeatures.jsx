import React, { useState } from 'react';
import { Search, MessageCircle, Palette, Sparkles, Calendar } from 'lucide-react';

/**
 * DeepWorkJournalingFeatures Component
 * Natural language search, shadow work modules, inner portrait gallery, glimmers
 * Unique creative strategies for 2026
 */

const DeepWorkJournalingFeatures = () => {
  const [activeFeature, setActiveFeature] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [glimmers, setGlimmers] = useState(
    JSON.parse(localStorage.getItem('mythical_glimmers') || '[]')
  );

  const features = [
    { id: 'search', name: 'Natural Language Search', icon: Search, desc: 'Ask your journal questions' },
    { id: 'converse', name: 'Talk to Past Self', icon: MessageCircle, desc: 'Converse with old entries' },
    { id: 'shadow', name: 'Shadow Work Modules', icon: '🌑', desc: 'Uncover repressed traits' },
    { id: 'portrait', name: 'Inner Portrait Gallery', icon: Palette, desc: 'Visualize your psyche' },
    { id: 'glimmers', name: 'Glimmers Tracker', icon: Sparkles, desc: 'Micro-moments of joy' },
  ];

  // Natural Language Search
  const performSearch = () => {
    const entries = JSON.parse(localStorage.getItem('mythical_journal_entries') || '[]');
    const query = searchQuery.toLowerCase();

    // Smart search patterns
    const patterns = {
      timeComparison: /what was i (.*) (last year|a year ago|this time last year)/i,
      emotion: /when (did|was) i (happy|sad|anxious|angry|excited)/i,
      topic: /about (.*)/i,
      person: /mentioned (.*)/i,
    };

    let results = [];

    // Time comparison search
    if (patterns.timeComparison.test(query)) {
      const match = query.match(patterns.timeComparison);
      const topic = match[1];
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      results = entries.filter(entry => {
        const entryDate = new Date(entry.date);
        const isTimeMatch = Math.abs(entryDate - oneYearAgo) < 30 * 86400000; // Within 30 days
        const hasTopicKeyword = entry.content.toLowerCase().includes(topic);
        return isTimeMatch && hasTopicKeyword;
      });
    }
    // Emotion search
    else if (patterns.emotion.test(query)) {
      const match = query.match(patterns.emotion);
      const emotion = match[2];
      results = entries.filter(entry =>
        entry.content.toLowerCase().includes(emotion) ||
        entry.metadata?.mood === emotion
      );
    }
    // General keyword search
    else {
      results = entries.filter(entry =>
        entry.content.toLowerCase().includes(query) ||
        entry.metadata?.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setSearchResults(results.slice(0, 10));
  };

  // Talk to Past Self
  const askPastSelf = (question) => {
    const entries = JSON.parse(localStorage.getItem('mythical_journal_entries') || '[]');
    
    // Find relevant entries based on question keywords
    const keywords = question.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const relevantEntries = entries
      .filter(entry => keywords.some(kw => entry.content.toLowerCase().includes(kw)))
      .slice(0, 5);

    if (relevantEntries.length === 0) {
      setConversationHistory(prev => [...prev, {
        question,
        answer: 'I don\'t have memories about that yet. Keep journaling to build your archive!',
        date: null,
      }]);
      return;
    }

    // Generate response from past entries
    const mostRelevant = relevantEntries[0];
    const excerpt = mostRelevant.content.substring(0, 200);
    const date = new Date(mostRelevant.date).toLocaleDateString();

    setConversationHistory(prev => [...prev, {
      question,
      answer: `On ${date}, I wrote: "${excerpt}..." This might answer your question.`,
      date: mostRelevant.date,
      fullEntry: mostRelevant,
    }]);
  };

  // Shadow Work Prompts
  const shadowPrompts = [
    'What truth am I avoiding because it would require change?',
    'What am I not saying that needs to be said?',
    'What part of myself do I judge most harshly?',
    'What fear controls my decisions without me realizing?',
    'What would I do if no one was watching or judging me?',
    'What anger or resentment am I holding onto?',
    'What do I pretend not to know about myself?',
    'What assumption about myself has been holding me back?',
    'If my darkest fear came true, how would I actually cope?',
    'What would I need to forgive myself for to move forward?',
  ];

  // Add Glimmer
  const addGlimmer = (description) => {
    const newGlimmer = {
      id: Date.now(),
      description,
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
    };
    const updated = [...glimmers, newGlimmer];
    setGlimmers(updated);
    localStorage.setItem('mythical_glimmers', JSON.stringify(updated));
  };

  // Generate Inner Portrait (simulated)
  const generatePortrait = () => {
    const entries = JSON.parse(localStorage.getItem('mythical_journal_entries') || '[]');
    const recentEntries = entries.slice(-7); // Last 7 entries

    if (recentEntries.length < 3) {
      return { message: 'Journal for 3+ days to generate your Inner Portrait' };
    }

    // Analyze patterns
    const allText = recentEntries.map(e => e.content).join(' ').toLowerCase();
    const emotionWords = {
      joy: ['happy', 'excited', 'love', 'joy', 'wonderful'],
      calm: ['peace', 'calm', 'relax', 'still', 'quiet'],
      growth: ['learn', 'grow', 'improve', 'change', 'realize'],
      struggle: ['hard', 'difficult', 'struggle', 'pain', 'tough'],
    };

    const colors = {};
    Object.entries(emotionWords).forEach(([emotion, words]) => {
      const count = words.filter(w => allText.includes(w)).length;
      if (count > 0) colors[emotion] = count;
    });

    const topEmotions = Object.entries(colors)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    return {
      colors: topEmotions,
      wordCount: recentEntries.reduce((sum, e) => sum + e.content.split(/\s+/).length, 0),
      entryCount: recentEntries.length,
      dominantMood: topEmotions[0]?.[0] || 'neutral',
    };
  };

  const portrait = activeFeature === 'portrait' ? generatePortrait() : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
          Deep Work & Creative Features
        </h2>
        <p className="text-gray-300">Unlock hidden insights from your journaling practice</p>
      </div>

      {/* Feature Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {features.map(feature => {
          const Icon = feature.icon;
          return (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                activeFeature === feature.id
                  ? 'bg-cyan-500/30 ring-2 ring-cyan-400'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              {typeof Icon === 'string' ? (
                <span className="text-xl">{Icon}</span>
              ) : (
                <Icon size={20} className="text-cyan-400" />
              )}
              <div className="text-left">
                <p className="font-medium text-sm">{feature.name}</p>
                <p className="text-xs text-gray-400">{feature.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Natural Language Search */}
      {activeFeature === 'search' && (
        <div className="glass-effect mythic-border p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4">🔍 Ask Your Journal Anything</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                placeholder='Try: "What was I worried about this time last year?"'
                className="flex-1 px-4 py-3 bg-white/5 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                onClick={performSearch}
                className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-xl font-semibold transition-all"
              >
                Search
              </button>
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-3 mt-6">
                <p className="text-sm text-gray-400">Found {searchResults.length} results:</p>
                {searchResults.map((result, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-xl">
                    <p className="text-xs text-cyan-400 mb-2">
                      {new Date(result.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-300 line-clamp-3">{result.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Talk to Past Self */}
      {activeFeature === 'converse' && (
        <div className="glass-effect mythic-border p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4">💬 Conversation with Past Self</h3>
          <div className="space-y-4">
            {conversationHistory.map((conv, idx) => (
              <div key={idx} className="space-y-2">
                <div className="bg-cyan-500/20 p-3 rounded-xl text-right">
                  <p className="text-sm">You: {conv.question}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl">
                  <p className="text-sm">Past You: {conv.answer}</p>
                </div>
              </div>
            ))}

            <input
              type="text"
              placeholder="Ask your past self a question..."
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  askPastSelf(e.target.value);
                  e.target.value = '';
                }
              }}
              className="w-full px-4 py-3 bg-white/5 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        </div>
      )}

      {/* Shadow Work */}
      {activeFeature === 'shadow' && (
        <div className="glass-effect mythic-border p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4">🌑 Shadow Work Prompts</h3>
          <p className="text-sm text-amber-200 mb-4 p-3 bg-amber-500/10 rounded-xl">
            ⚠️ These prompts explore uncomfortable truths. Take your time. It's okay to skip questions that feel too intense.
          </p>
          <div className="space-y-3">
            {shadowPrompts.map((prompt, idx) => (
              <div key={idx} className="bg-white/5 hover:bg-white/10 p-4 rounded-xl cursor-pointer transition-all group">
                <p className="text-sm font-medium text-gray-200 group-hover:text-cyan-400">
                  {idx + 1}. {prompt}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inner Portrait Gallery */}
      {activeFeature === 'portrait' && portrait && (
        <div className="glass-effect mythic-border p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4">🎨 Your Inner Portrait</h3>
          {portrait.message ? (
            <p className="text-gray-400">{portrait.message}</p>
          ) : (
            <div className="space-y-6">
              {/* Visual Representation */}
              <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-black to-gray-900">
                {portrait.colors.map(([emotion, intensity], idx) => {
                  const colorMap = {
                    joy: 'rgba(255, 215, 0, 0.6)',
                    calm: 'rgba(135, 206, 235, 0.6)',
                    growth: 'rgba(50, 205, 50, 0.6)',
                    struggle: 'rgba(178, 34, 34, 0.6)',
                  };
                  return (
                    <div
                      key={idx}
                      className="absolute inset-0 mix-blend-lighten"
                      style={{
                        background: `radial-gradient(circle at ${30 + idx * 30}% 50%, ${colorMap[emotion]}, transparent)`,
                        opacity: intensity / 10,
                      }}
                    />
                  );
                })}
              </div>

              {/* Analysis */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-cyan-400">{portrait.wordCount}</p>
                  <p className="text-xs text-gray-400">Words Written</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-cyan-400 capitalize">{portrait.dominantMood}</p>
                  <p className="text-xs text-gray-400">Dominant Mood</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Emotional Composition:</p>
                <div className="space-y-2">
                  {portrait.colors.map(([emotion, intensity]) => (
                    <div key={emotion} className="flex items-center gap-3">
                      <span className="text-sm capitalize w-20">{emotion}</span>
                      <div className="flex-1 bg-white/5 rounded-full h-3">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          style={{ width: `${(intensity / Math.max(...portrait.colors.map(c => c[1]))) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-gray-400 text-center">
                Based on your last 7 journal entries • Updates weekly
              </p>
            </div>
          )}
        </div>
      )}

      {/* Glimmers Tracker */}
      {activeFeature === 'glimmers' && (
        <div className="glass-effect mythic-border p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4">✨ Glimmers: Micro-Moments of Joy</h3>
          <p className="text-sm text-gray-400 mb-4">
            Glimmers are tiny, microscopic moments of joy—like the specific way light hit your coffee cup. Build emotional resilience without the pressure of long-form writing.
          </p>

          <input
            type="text"
            placeholder="Describe a tiny moment of joy today..."
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                addGlimmer(e.target.value);
                e.target.value = '';
              }
            }}
            className="w-full px-4 py-3 bg-white/5 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-6"
          />

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {glimmers.map(glimmer => (
              <div key={glimmer.id} className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 p-3 rounded-xl flex items-start gap-3">
                <span className="text-xl">✨</span>
                <div className="flex-1">
                  <p className="text-sm">{glimmer.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{glimmer.date}</p>
                </div>
              </div>
            ))}
          </div>

          {glimmers.length === 0 && (
            <p className="text-center text-gray-400 py-8">
              No glimmers yet. Start noticing the tiny joys! ✨
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DeepWorkJournalingFeatures;
