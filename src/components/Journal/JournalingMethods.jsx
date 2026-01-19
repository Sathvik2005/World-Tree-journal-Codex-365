import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, Coffee, Moon, Zap } from 'lucide-react';

/**
 * JournalingMethods Component
 * 6 science-backed journaling techniques with timers and structured guidance
 * Morning Pages, 5-Minute Rule, Letters to Self, Shadow Work, Micro-Gratitude
 */

const JournalingMethods = ({ onComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const intervalRef = useRef(null);
  const textareaRef = useRef(null);

  const methods = [
    {
      id: 'morning-pages',
      name: 'Morning Pages',
      icon: Coffee,
      color: 'amber',
      duration: null, // No timer, word count based
      targetWords: 750, // ~3 pages
      description: 'Three pages of raw, unedited "brain dump" writing',
      instructions: [
        'Write immediately after waking up',
        'Don\'t think, just write',
        'No editing or censoring',
        'Stream of consciousness',
        'Aim for 750 words (~3 pages)',
      ],
      benefits: 'Clears mental clutter and sparks creativity',
      bestFor: 'Morning routine, creative blocks, anxiety relief',
    },
    {
      id: 'five-minute-rule',
      name: '5-Minute Rule',
      icon: Zap,
      color: 'cyan',
      duration: 300, // 5 minutes
      description: 'Set a timer for 5 minutes and write until it goes off',
      instructions: [
        'Set timer for exactly 5 minutes',
        'Write non-stop until timer ends',
        'One sentence is a win',
        'Quantity over quality',
        'No pressure, just flow',
      ],
      benefits: 'Builds consistency and removes perfection paralysis',
      bestFor: 'Busy schedules, habit formation, overcoming resistance',
    },
    {
      id: 'letter-to-self',
      name: 'Letters to Self',
      icon: '💌',
      color: 'pink',
      duration: 900, // 15 minutes
      description: 'Write letters to your past or future self',
      instructions: [
        'Choose: Past self (10 years ago) or Future self (10 years ahead)',
        'Write as if you\'re actually sending a letter',
        'Be compassionate and honest',
        'Share wisdom, fears, hopes',
        'Sign it with love',
      ],
      benefits: 'Provides long-term perspective and self-compassion',
      bestFor: 'Life transitions, healing trauma, goal setting',
    },
    {
      id: 'shadow-work',
      name: 'Shadow Work',
      icon: Moon,
      color: 'purple',
      duration: 1200, // 20 minutes
      description: 'Explore the parts of yourself you usually avoid',
      instructions: [
        'Journal about fears, anger, shame',
        'Ask "What am I avoiding?"',
        'Dig beneath surface emotions',
        'No judgment, just observation',
        'Process at your own pace',
      ],
      benefits: 'Deep healing and self-awareness',
      bestFor: 'Therapy supplement, emotional processing, growth',
      warning: '⚠️ This can be emotionally intense. Take breaks if needed.',
    },
    {
      id: 'micro-gratitude',
      name: 'Micro-Gratitude',
      icon: '✨',
      color: 'green',
      duration: 180, // 3 minutes
      description: 'List three tiny things that went well today',
      instructions: [
        'Think small: "great coffee", "no traffic"',
        'Write exactly 3 things',
        'Be specific and sensory',
        'No "should" or "could have"',
        'Feel the appreciation',
      ],
      benefits: 'Boosts positivity and resilience by 25%',
      bestFor: 'Evening routine, depression recovery, perspective shift',
    },
    {
      id: 'worry-dump',
      name: 'Worry Dump',
      icon: '🌊',
      color: 'blue',
      duration: 600, // 10 minutes
      description: 'Transfer worries from mind to paper',
      instructions: [
        'Write every worry, big or small',
        'Don\'t solve them, just list them',
        'Include the irrational fears',
        'Mark which are in your control',
        'Physically close the journal when done',
      ],
      benefits: 'Reduces anxiety and improves sleep quality',
      bestFor: 'Bedtime routine, anxious minds, overthinking',
    },
  ];

  useEffect(() => {
    if (isActive && selectedMethod) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, selectedMethod]);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [content]);

  const startMethod = (methodId) => {
    setSelectedMethod(methodId);
    setIsActive(true);
    setTimeElapsed(0);
    setContent('');
    setWordCount(0);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const togglePause = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setTimeElapsed(0);
    setContent('');
    setWordCount(0);
  };

  const complete = () => {
    const method = methods.find(m => m.id === selectedMethod);
    onComplete({
      method: method.name,
      content,
      wordCount,
      timeElapsed,
      timestamp: new Date().toISOString(),
    });
    setSelectedMethod(null);
    reset();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const method = methods.find(m => m.id === selectedMethod);
    if (!method) return 0;

    if (method.targetWords) {
      return Math.min((wordCount / method.targetWords) * 100, 100);
    } else if (method.duration) {
      return Math.min((timeElapsed / method.duration) * 100, 100);
    }
    return 0;
  };

  const isComplete = () => {
    const method = methods.find(m => m.id === selectedMethod);
    if (!method) return false;

    if (method.targetWords) {
      return wordCount >= method.targetWords;
    } else if (method.duration) {
      return timeElapsed >= method.duration;
    }
    return false;
  };

  if (selectedMethod) {
    const method = methods.find(m => m.id === selectedMethod);
    const Icon = method.icon;
    const progress = getProgress();
    const complete = isComplete();

    return (
      <div className="space-y-6">
        {/* Method Header */}
        <div className="glass-effect mythic-border p-6 rounded-2xl">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl bg-gradient-to-br from-${method.color}-500 to-${method.color}-600`}>
                {typeof Icon === 'string' ? (
                  <span className="text-3xl">{Icon}</span>
                ) : (
                  <Icon size={32} className="text-white" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold font-montserrat">{method.name}</h2>
                <p className="text-sm text-gray-400">{method.description}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedMethod(null)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all"
            >
              ← Back
            </button>
          </div>

          {/* Progress Bar */}
          <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-${method.color}-500 to-${method.color}-400 transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
            {complete && (
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle size={16} className="text-white animate-bounce" />
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-cyan-400">{formatTime(timeElapsed)}</p>
              <p className="text-xs text-gray-400">Time Elapsed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-cyan-400">{wordCount}</p>
              <p className="text-xs text-gray-400">
                {method.targetWords ? `/ ${method.targetWords} words` : 'Words'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-cyan-400">{Math.round(progress)}%</p>
              <p className="text-xs text-gray-400">Progress</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={togglePause}
              className="flex-1 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              {isActive ? (
                <>
                  <Pause size={20} /> Pause
                </>
              ) : (
                <>
                  <Play size={20} /> Resume
                </>
              )}
            </button>
            <button
              onClick={reset}
              className="py-3 px-6 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
            >
              <RotateCcw size={20} />
            </button>
          </div>

          {method.warning && (
            <div className="mt-4 p-3 bg-amber-500/20 border border-amber-500/50 rounded-lg text-sm text-amber-200">
              {method.warning}
            </div>
          )}
        </div>

        {/* Writing Area */}
        <div className="glass-effect mythic-border p-6 rounded-2xl">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Start ${method.name}... ${method.instructions[0]}`}
            className="w-full h-96 bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none font-inter text-lg leading-relaxed"
            disabled={!isActive}
          />
        </div>

        {/* Complete Button */}
        {complete && (
          <button
            onClick={complete}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <CheckCircle size={24} />
            Complete Session ✨
          </button>
        )}
      </div>
    );
  }

  // Method Selection
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
          Science-Backed Journaling Methods
        </h2>
        <p className="text-gray-300">Choose a proven technique and follow the guided practice</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {methods.map(method => {
          const Icon = method.icon;
          return (
            <div
              key={method.id}
              className="group glass-effect mythic-border p-6 rounded-2xl hover:scale-105 transition-all hover:glow-box"
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br from-${method.color}-500 to-${method.color}-600 mb-4`}>
                {typeof Icon === 'string' ? (
                  <span className="text-3xl">{Icon}</span>
                ) : (
                  <Icon size={28} className="text-white" />
                )}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold font-montserrat mb-2">{method.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{method.description}</p>

              {/* Duration */}
              <div className="flex items-center gap-2 text-xs text-cyan-400 mb-4">
                {method.duration ? (
                  <span>⏱️ {method.duration / 60} min timer</span>
                ) : (
                  <span>📝 {method.targetWords} words target</span>
                )}
              </div>

              {/* Best For */}
              <div className="text-xs text-gray-500 mb-4">
                <span className="font-semibold text-gray-400">Best for:</span> {method.bestFor}
              </div>

              {/* Start Button */}
              <button
                onClick={() => startMethod(method.id)}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Session →
              </button>
            </div>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="glass-effect mythic-border p-6 rounded-2xl">
        <h3 className="text-xl font-bold mb-4">How to Use These Methods</h3>
        <div className="space-y-3 text-sm text-gray-300">
          <p>
            <span className="font-semibold text-cyan-400">1. Choose a method</span> that fits your current need and energy level.
          </p>
          <p>
            <span className="font-semibold text-cyan-400">2. Follow the instructions</span> displayed during the session. Trust the process.
          </p>
          <p>
            <span className="font-semibold text-cyan-400">3. Write without editing.</span> This is a judgment-free zone. Quantity over quality.
          </p>
          <p>
            <span className="font-semibold text-cyan-400">4. Complete the session</span> to track your progress and build consistency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JournalingMethods;
