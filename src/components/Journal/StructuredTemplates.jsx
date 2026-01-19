import React, { useState } from 'react';
import { Grid, Sparkles, Heart, Brain, Target, Moon, Sun, Book } from 'lucide-react';

/**
 * StructuredTemplates Component
 * Pre-built grids and prompts to remove the friction of starting
 * Inspired by Grid Diary and PlanWiz
 */

const StructuredTemplates = ({ onSelectTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [responses, setResponses] = useState({});

  const templates = [
    {
      id: 'morning-pages',
      name: 'Morning Pages',
      icon: Sun,
      color: 'amber',
      description: 'Three prompts to clear mental clutter and spark creativity',
      prompts: [
        'What\'s on my mind right now?',
        'What am I grateful for this morning?',
        'What\'s one intention for today?',
      ],
      category: 'morning',
    },
    {
      id: 'daily-reflection',
      name: 'Daily Reflection',
      icon: Sparkles,
      color: 'cyan',
      description: 'End-of-day review to capture wins and lessons',
      prompts: [
        'What went well today?',
        'What challenged me?',
        'What did I learn?',
        'How do I feel right now?',
      ],
      category: 'evening',
    },
    {
      id: 'gratitude-grid',
      name: 'Gratitude Grid',
      icon: Heart,
      color: 'pink',
      description: 'Five micro-gratitudes to boost positivity',
      prompts: [
        'One person I\'m grateful for:',
        'One small moment that made me smile:',
        'One thing my body did well today:',
        'One comfort I appreciate:',
        'One thing I\'m looking forward to:',
      ],
      category: 'gratitude',
    },
    {
      id: 'shadow-work',
      name: 'Shadow Work',
      icon: Moon,
      color: 'purple',
      description: 'Deep dive into parts of yourself you usually avoid',
      prompts: [
        'What emotion am I avoiding right now?',
        'What fear is beneath this feeling?',
        'When did I first feel this way?',
        'What would I tell a friend feeling this?',
        'What lesson is this teaching me?',
      ],
      category: 'shadow',
    },
    {
      id: 'goal-clarity',
      name: 'Goal Clarity',
      icon: Target,
      color: 'blue',
      description: 'Strategic planning to turn dreams into action',
      prompts: [
        'What do I want to achieve?',
        'Why does this matter to me?',
        'What\'s one tiny step I can take today?',
        'What obstacle might I face?',
        'Who can support me?',
      ],
      category: 'future',
    },
    {
      id: 'letter-to-self',
      name: 'Letter to Self',
      icon: Book,
      color: 'green',
      description: 'Write to your past or future self',
      prompts: [
        'Dear [Past/Future] Self,',
        'Here\'s what you need to know:',
        'I\'m proud of you for:',
        'Remember this:',
        'With love, [Your Name]',
      ],
      category: 'reflection',
    },
    {
      id: 'five-minute-dump',
      name: '5-Minute Brain Dump',
      icon: Brain,
      color: 'violet',
      description: 'Raw, unfiltered stream of consciousness',
      prompts: [
        'Write non-stop for 5 minutes. No editing, no judgment. Just let it flow...',
      ],
      category: 'clarity',
      timed: true,
      duration: 300, // 5 minutes in seconds
    },
    {
      id: 'weekly-review',
      name: 'Weekly Review',
      icon: Grid,
      color: 'indigo',
      description: 'Comprehensive week-in-review grid',
      prompts: [
        'Biggest win this week:',
        'Biggest challenge:',
        'Person who impacted me:',
        'Lesson learned:',
        'Energy level (1-10):',
        'One thing to change next week:',
      ],
      category: 'reflection',
    },
  ];

  const handleResponseChange = (promptIndex, value) => {
    setResponses(prev => ({
      ...prev,
      [promptIndex]: value,
    }));
  };

  const handleSubmit = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    const completedEntry = {
      templateName: template.name,
      templateId: template.id,
      responses,
      timestamp: new Date().toISOString(),
    };

    // Convert to full text
    const fullText = template.prompts
      .map((prompt, idx) => {
        const response = responses[idx] || '[No response]';
        return `${prompt}\n${response}`;
      })
      .join('\n\n');

    onSelectTemplate({
      content: fullText,
      metadata: {
        template: template.name,
        category: template.category,
      },
    });

    // Reset
    setSelectedTemplate(null);
    setResponses({});
  };

  const getColorClass = (color) => {
    const colors = {
      amber: 'from-amber-500 to-orange-500',
      cyan: 'from-cyan-500 to-blue-500',
      pink: 'from-pink-500 to-rose-500',
      purple: 'from-purple-500 to-indigo-500',
      blue: 'from-blue-500 to-cyan-500',
      green: 'from-green-500 to-emerald-500',
      violet: 'from-violet-500 to-purple-500',
      indigo: 'from-indigo-500 to-blue-500',
    };
    return colors[color] || 'from-cyan-500 to-blue-500';
  };

  if (selectedTemplate) {
    const template = templates.find(t => t.id === selectedTemplate);
    const Icon = template.icon;

    return (
      <div className="space-y-6">
        {/* Template Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${getColorClass(template.color)}`}>
              <Icon size={32} className="text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold font-montserrat">{template.name}</h2>
              <p className="text-sm text-gray-400">{template.description}</p>
            </div>
          </div>
        </div>

        {/* Prompts */}
        <div className="space-y-4">
          {template.prompts.map((prompt, idx) => (
            <div key={idx} className="glass-effect mythic-border p-6 rounded-2xl">
              <label className="block text-sm font-semibold text-cyan-400 mb-3">
                {idx + 1}. {prompt}
              </label>
              {template.timed && idx === 0 ? (
                <textarea
                  value={responses[idx] || ''}
                  onChange={(e) => handleResponseChange(idx, e.target.value)}
                  placeholder="Let your thoughts flow freely..."
                  className="w-full h-48 bg-white/5 text-white placeholder-gray-400 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none font-inter"
                  autoFocus
                />
              ) : (
                <textarea
                  value={responses[idx] || ''}
                  onChange={(e) => handleResponseChange(idx, e.target.value)}
                  placeholder="Your response..."
                  className="w-full h-24 bg-white/5 text-white placeholder-gray-400 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none font-inter"
                />
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => {
              setSelectedTemplate(null);
              setResponses({});
            }}
            className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
          >
            ← Back to Templates
          </button>
          <button
            onClick={handleSubmit}
            disabled={Object.keys(responses).length === 0}
            className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Save Entry ✨
          </button>
        </div>
      </div>
    );
  }

  // Template Selection Grid
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
          Structured Templates
        </h2>
        <p className="text-gray-300">Pre-built prompts to remove the friction of starting</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => {
          const Icon = template.icon;
          return (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className="group glass-effect mythic-border p-6 rounded-2xl hover:scale-105 transition-all text-left hover:glow-box"
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${getColorClass(template.color)} mb-4`}>
                <Icon size={28} className="text-white" />
              </div>

              {/* Name & Description */}
              <h3 className="text-xl font-bold font-montserrat mb-2 group-hover:text-cyan-400 transition-colors">
                {template.name}
              </h3>
              <p className="text-sm text-gray-400 mb-4">{template.description}</p>

              {/* Prompts Count */}
              <div className="flex items-center gap-2 text-xs text-cyan-400">
                <Grid size={14} />
                <span>{template.prompts.length} prompts</span>
                {template.timed && (
                  <>
                    <span>•</span>
                    <span>⏱️ {template.duration / 60} min timer</span>
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Info Banner */}
      <div className="glass-effect mythic-border p-6 rounded-2xl text-center">
        <p className="text-gray-300">
          💡 <span className="font-semibold text-cyan-400">Pro Tip:</span> Try different templates to discover what resonates with you. There's no wrong way to journal!
        </p>
      </div>
    </div>
  );
};

export default StructuredTemplates;
