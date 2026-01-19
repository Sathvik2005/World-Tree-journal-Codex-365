import React, { useState, useRef } from 'react';
import { Calendar, Target, CloudRain, Mail, Star, Clock } from 'lucide-react';

/**
 * InnovativeJournalingTechniques Component
 * 2026 cutting-edge methods: 3-2-1, Future Self-Visualization, Emotional Weather, Unsent Letter, Glimmer Tracking
 */

const InnovativeJournalingTechniques = ({ onSaveEntry }) => {
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [formData, setFormData] = useState({});

  const techniques = [
    {
      id: '3-2-1',
      name: '3-2-1 Reflection Method',
      icon: Target,
      color: 'cyan',
      duration: 10,
      description: 'Holistic, forward-thinking review of your day',
      fields: [
        { id: 'learned', label: '3 things I learned today', type: 'textarea', rows: 3 },
        { id: 'wentWell', label: '2 things that went well', type: 'textarea', rows: 2 },
        { id: 'improve', label: '1 thing to improve tomorrow', type: 'textarea', rows: 2 },
      ],
      benefit: 'Forces a balanced perspective with actionable next steps',
    },
    {
      id: 'future-self',
      name: 'Future Self-Visualization',
      icon: Calendar,
      color: 'purple',
      duration: 15,
      description: 'Write a letter from your December 2026 self',
      fields: [
        { id: 'futureDate', label: 'Future Date', type: 'date' },
        { id: 'accomplishments', label: 'What I accomplished by then', type: 'textarea', rows: 4 },
        { id: 'advice', label: 'Advice from future me to current me', type: 'textarea', rows: 4 },
        { id: 'gratitude', label: 'What future me is grateful for', type: 'textarea', rows: 3 },
      ],
      benefit: 'Creates clarity and motivation by reverse-engineering success',
    },
    {
      id: 'emotional-weather',
      name: 'Emotional Weather Report',
      icon: CloudRain,
      color: 'blue',
      duration: 5,
      description: 'Describe your internal state as weather',
      fields: [
        { id: 'weather', label: 'Current emotional weather', type: 'select', options: [
          'Sunny and clear',
          'Partly cloudy',
          'Overcast',
          'Light rain',
          'Thunderstorms',
          'Foggy',
          'Sunny breaks with risk of storms',
          'Calm before the storm',
          'Rainbow after rain',
        ]},
        { id: 'forecast', label: 'Tomorrow\'s forecast', type: 'select', options: [
          'Improving',
          'Worsening',
          'Same conditions',
          'Uncertain',
        ]},
        { id: 'details', label: 'Weather details (optional)', type: 'textarea', rows: 3, placeholder: 'What\'s causing this weather pattern?' },
      ],
      benefit: 'Quick emotional check-in using metaphor instead of clinical language',
    },
    {
      id: 'unsent-letter',
      name: 'The Unsent Letter',
      icon: Mail,
      color: 'pink',
      duration: 20,
      description: 'Raw, unfiltered letter you\'ll never send',
      fields: [
        { id: 'recipient', label: 'To:', type: 'text', placeholder: 'Who is this letter for?' },
        { id: 'emotion', label: 'Primary emotion', type: 'select', options: [
          'Anger',
          'Hurt',
          'Grief',
          'Frustration',
          'Regret',
          'Love (unexpressed)',
          'Forgiveness',
        ]},
        { id: 'letter', label: 'Your letter', type: 'textarea', rows: 10, placeholder: 'Write everything you need to say, unfiltered...' },
        { id: 'closure', label: 'What I release by writing this', type: 'textarea', rows: 2 },
      ],
      benefit: 'Scientifically proven to release pent-up emotions safely',
    },
    {
      id: 'glimmer-deep',
      name: 'Glimmer Deep Dive',
      icon: Star,
      color: 'amber',
      duration: 8,
      description: 'Expand one micro-moment of joy into sensory detail',
      fields: [
        { id: 'glimmer', label: 'The glimmer (one sentence)', type: 'text', placeholder: 'e.g., "The way light hit my coffee cup"' },
        { id: 'visual', label: 'What did it look like?', type: 'textarea', rows: 2 },
        { id: 'sensory', label: 'Other senses (sound/smell/touch)', type: 'textarea', rows: 2 },
        { id: 'feeling', label: 'How did it make you feel?', type: 'textarea', rows: 2 },
        { id: 'meaning', label: 'Why did this moment matter?', type: 'textarea', rows: 2 },
      ],
      benefit: 'Trains your brain to notice beauty in ordinary moments',
    },
    {
      id: 'identity-shift',
      name: 'Identity Shift Reflection',
      icon: '🦋',
      color: 'violet',
      duration: 12,
      description: 'Explore who you\'re becoming vs. who you were',
      fields: [
        { id: 'oldIdentity', label: 'Who I used to be (old identity)', type: 'textarea', rows: 3, placeholder: 'e.g., "I was someone who always put others first..."' },
        { id: 'grief', label: 'What I\'m grieving about this change', type: 'textarea', rows: 2 },
        { id: 'newIdentity', label: 'Who I\'m becoming (new identity)', type: 'textarea', rows: 3 },
        { id: 'permission', label: 'Permission I\'m giving myself', type: 'textarea', rows: 2, placeholder: 'e.g., "I give myself permission to..."' },
      ],
      benefit: 'Helps navigate life transitions and personal evolution',
    },
  ];

  const handleFieldChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    const technique = techniques.find(t => t.id === selectedTechnique);
    
    // Format entry based on technique
    let formattedContent = `# ${technique.name}\n\n`;
    
    technique.fields.forEach(field => {
      const value = formData[field.id] || '[Not answered]';
      formattedContent += `**${field.label}:**\n${value}\n\n`;
    });

    onSaveEntry({
      type: 'technique',
      technique: technique.name,
      techniqueId: technique.id,
      content: formattedContent,
      formData,
      timestamp: new Date().toISOString(),
    });

    // Reset
    setSelectedTechnique(null);
    setFormData({});
  };

  if (selectedTechnique) {
    const technique = techniques.find(t => t.id === selectedTechnique);
    const Icon = technique.icon;

    return (
      <div className="space-y-6">
        {/* Technique Header */}
        <div className="glass-effect mythic-border p-6 rounded-2xl">
          <button
            onClick={() => setSelectedTechnique(null)}
            className="mb-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all"
          >
            ← Back to Techniques
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br from-${technique.color}-500 to-${technique.color}-600`}>
              {typeof Icon === 'string' ? (
                <span className="text-3xl">{Icon}</span>
              ) : (
                <Icon size={32} className="text-white" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold font-montserrat">{technique.name}</h2>
              <p className="text-sm text-gray-400">{technique.description}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-cyan-400">
                <Clock size={12} />
                <span>~{technique.duration} minutes</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-cyan-500/10 rounded-xl text-sm">
            <p className="text-cyan-200"><strong>Benefit:</strong> {technique.benefit}</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {technique.fields.map(field => (
            <div key={field.id} className="glass-effect mythic-border p-4 rounded-2xl">
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                {field.label}
              </label>

              {field.type === 'text' && (
                <input
                  type="text"
                  value={formData[field.id] || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 bg-white/5 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              )}

              {field.type === 'date' && (
                <input
                  type="date"
                  value={formData[field.id] || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              )}

              {field.type === 'select' && (
                <select
                  value={formData[field.id] || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
                >
                  <option value="">Select...</option>
                  {field.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}

              {field.type === 'textarea' && (
                <textarea
                  value={formData[field.id] || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  rows={field.rows || 4}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 bg-white/5 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
                />
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Save Entry ✨
        </button>
      </div>
    );
  }

  // Technique Selection
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
          Innovative Journaling Techniques
        </h2>
        <p className="text-gray-300">2026's cutting-edge methods for self-reflection</p>
      </div>

      {/* Techniques Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techniques.map(technique => {
          const Icon = technique.icon;
          return (
            <button
              key={technique.id}
              onClick={() => setSelectedTechnique(technique.id)}
              className="group glass-effect mythic-border p-6 rounded-2xl hover:scale-105 transition-all text-left hover:glow-box"
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br from-${technique.color}-500 to-${technique.color}-600 mb-4`}>
                {typeof Icon === 'string' ? (
                  <span className="text-3xl">{Icon}</span>
                ) : (
                  <Icon size={28} className="text-white" />
                )}
              </div>

              {/* Name & Description */}
              <h3 className="text-xl font-bold font-montserrat mb-2 group-hover:text-cyan-400 transition-colors">
                {technique.name}
              </h3>
              <p className="text-sm text-gray-400 mb-4">{technique.description}</p>

              {/* Duration & Benefit */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-cyan-400">
                  <Clock size={14} />
                  <span>~{technique.duration} min</span>
                </div>
                <p className="text-xs text-gray-500">{technique.benefit}</p>
              </div>

              {/* Try Button */}
              <div className="mt-4 px-4 py-2 bg-cyan-500/20 rounded-lg text-center font-semibold text-sm">
                Try This Technique →
              </div>
            </button>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="glass-effect mythic-border p-6 rounded-2xl">
        <h3 className="text-xl font-bold mb-3">Why These Work</h3>
        <div className="space-y-3 text-sm text-gray-300">
          <p>
            <strong className="text-cyan-400">Science-backed:</strong> These techniques are based on cognitive behavioral therapy, positive psychology, and neuroscience research from 2020-2026.
          </p>
          <p>
            <strong className="text-cyan-400">Quick & effective:</strong> Each takes 5-20 minutes but provides lasting clarity and emotional regulation.
          </p>
          <p>
            <strong className="text-cyan-400">Adaptable:</strong> Use them daily, weekly, or whenever you feel stuck. Mix and match to fit your needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InnovativeJournalingTechniques;
