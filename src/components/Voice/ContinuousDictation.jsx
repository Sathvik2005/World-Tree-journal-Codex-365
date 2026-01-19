import React, { useState, useRef, useEffect } from 'react';

/**
 * Enhanced Voice-to-Text Journaling
 * Continuous dictation mode with real-time transcription and smart formatting
 * Upgraded version of VoiceToInsight with better accessibility features
 */
const ContinuousDictation = ({ onSaveEntry, onTranscriptUpdate }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [punctuationMode, setPunctuationMode] = useState('auto'); // auto, manual, smart

  const recognitionRef = useRef(null);
  const intervalRef = useRef(null);
  const autoSaveIntervalRef = useRef(null);

  useEffect(() => {
    initializeSpeechRecognition();
    
    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    // Count words
    const words = transcript.trim().split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);

    // Auto-save every 30 seconds if enabled
    if (autoSaveEnabled && transcript.length > 0) {
      if (autoSaveIntervalRef.current) {
        clearTimeout(autoSaveIntervalRef.current);
      }
      autoSaveIntervalRef.current = setTimeout(() => {
        autoSave();
      }, 30000);
    }

    // Notify parent component of transcript changes
    if (onTranscriptUpdate) {
      onTranscriptUpdate(transcript);
    }
  }, [transcript]);

  /**
   * Initialize Web Speech API
   */
  const initializeSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log('Speech recognition started');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPiece + ' ';
        } else {
          interimTranscript += transcriptPiece;
        }
      }

      if (finalTranscript) {
        // Apply smart formatting
        const formatted = applySmartFormatting(finalTranscript);
        setTranscript(prev => prev + formatted);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      
      if (event.error === 'no-speech') {
        console.log('No speech detected, waiting...');
      } else if (event.error === 'network') {
        alert('Network error. Please check your connection.');
      }
    };

    recognition.onend = () => {
      // Auto-restart if still recording (unless manually stopped)
      if (isRecording && !isPaused) {
        try {
          recognition.start();
        } catch (e) {
          console.log('Recognition restart failed:', e);
        }
      }
    };

    recognitionRef.current = recognition;
  };

  /**
   * Apply smart formatting to transcribed text
   */
  const applySmartFormatting = (text) => {
    if (punctuationMode === 'manual') return text;

    let formatted = text;

    // Capitalize first letter
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);

    // Add punctuation based on voice commands
    const commands = {
      'period': '.',
      'comma': ',',
      'question mark': '?',
      'exclamation point': '!',
      'exclamation mark': '!',
      'new line': '\n',
      'new paragraph': '\n\n',
      'colon': ':',
      'semicolon': ';',
      'quote': '"',
      'unquote': '"'
    };

    Object.entries(commands).forEach(([command, punctuation]) => {
      const regex = new RegExp(`\\s${command}\\s`, 'gi');
      formatted = formatted.replace(regex, punctuation + ' ');
    });

    // Smart sentence detection (capitalize after punctuation)
    formatted = formatted.replace(/([.!?])\s+([a-z])/g, (match, p1, p2) => {
      return p1 + ' ' + p2.toUpperCase();
    });

    // Auto-add period at end if missing
    if (punctuationMode === 'auto') {
      if (!/[.!?]$/.test(formatted.trim())) {
        formatted = formatted.trim() + '. ';
      }
    }

    return formatted;
  };

  /**
   * Start recording
   */
  const startRecording = () => {
    if (!recognitionRef.current) {
      initializeSpeechRecognition();
      setTimeout(startRecording, 100);
      return;
    }

    try {
      recognitionRef.current.start();
      setIsRecording(true);
      setIsPaused(false);

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Failed to start recognition:', error);
      alert('Could not start voice recording. Please check microphone permissions.');
    }
  };

  /**
   * Pause recording
   */
  const pauseRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsPaused(true);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  /**
   * Resume recording
   */
  const resumeRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsPaused(false);

        intervalRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } catch (error) {
        console.error('Failed to resume:', error);
      }
    }
  };

  /**
   * Stop recording
   */
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    setIsRecording(false);
    setIsPaused(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  /**
   * Auto-save draft
   */
  const autoSave = () => {
    if (transcript.length === 0) return;

    const drafts = JSON.parse(localStorage.getItem('mythical_dictation_drafts') || '[]');
    const draft = {
      id: Date.now(),
      content: transcript,
      wordCount,
      timestamp: new Date().toISOString(),
      autoSaved: true
    };

    drafts.unshift(draft);
    // Keep only last 10 drafts
    drafts.splice(10);
    
    localStorage.setItem('mythical_dictation_drafts', JSON.stringify(drafts));
    console.log('Draft auto-saved');
  };

  /**
   * Save as journal entry
   */
  const saveAsEntry = () => {
    if (transcript.length === 0) {
      alert('No content to save');
      return;
    }

    const entry = {
      id: Date.now(),
      content: transcript,
      wordCount,
      type: 'voice_dictation',
      timestamp: new Date().toISOString(),
      recordingTime
    };

    // Save to journal entries
    const entries = JSON.parse(localStorage.getItem('mythical_journal_entries') || '[]');
    entries.unshift(entry);
    localStorage.setItem('mythical_journal_entries', JSON.stringify(entries));

    if (onSaveEntry) {
      onSaveEntry(entry);
    }

    alert('Entry saved successfully!');
    
    // Clear transcript
    setTranscript('');
    setRecordingTime(0);
    setWordCount(0);
  };

  /**
   * Cleanup
   */
  const cleanup = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (autoSaveIntervalRef.current) {
      clearTimeout(autoSaveIntervalRef.current);
    }
  };

  /**
   * Format time display
   */
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Insert text at cursor position
   */
  const insertCommand = (command) => {
    setTranscript(prev => prev + ' ' + command + ' ');
  };

  return (
    <div className="min-h-screen bg-midnight p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-starlight mb-2">
            🎙️ Continuous Dictation
          </h1>
          <p className="text-starlight/60">
            Speak naturally and watch your words come to life
          </p>
        </div>

        {/* Recording Controls */}
        <div className="mb-6 p-6 bg-midnight-light rounded-2xl border border-midnight-lighter">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold text-starlight mb-1">
                {formatTime(recordingTime)}
              </div>
              <div className="text-sm text-starlight/60">
                {wordCount} words • {Math.ceil(wordCount / 200)} min read
              </div>
            </div>

            {/* Status Indicator */}
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              isRecording && !isPaused
                ? 'bg-red-600 text-white animate-pulse'
                : isPaused
                ? 'bg-yellow-600 text-white'
                : 'bg-midnight-dark text-starlight/50'
            }`}>
              {isRecording && !isPaused ? '● Recording' : isPaused ? '⏸ Paused' : '○ Ready'}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-3">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="flex-1 px-6 py-3 bg-astral text-white rounded-lg font-medium hover:bg-astral/80 transition-colors flex items-center justify-center gap-2"
              >
                🎤 Start Dictation
              </button>
            ) : (
              <>
                {isPaused ? (
                  <button
                    onClick={resumeRecording}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    ▶️ Resume
                  </button>
                ) : (
                  <button
                    onClick={pauseRecording}
                    className="flex-1 px-6 py-3 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                  >
                    ⏸️ Pause
                  </button>
                )}
                
                <button
                  onClick={stopRecording}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  ⏹️ Stop
                </button>
              </>
            )}
          </div>

          {/* Punctuation Mode */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm text-starlight/60">Punctuation:</span>
            {['auto', 'manual', 'smart'].map(mode => (
              <button
                key={mode}
                onClick={() => setPunctuationMode(mode)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  punctuationMode === mode
                    ? 'bg-astral text-white'
                    : 'bg-midnight-dark text-starlight/70 hover:bg-midnight-lighter'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Commands */}
        {isRecording && (
          <div className="mb-6 p-4 bg-midnight-light rounded-lg border border-midnight-lighter">
            <div className="text-sm font-semibold text-starlight mb-2">Voice Commands:</div>
            <div className="flex flex-wrap gap-2">
              {['period', 'comma', 'new paragraph', 'question mark', 'exclamation point'].map(cmd => (
                <button
                  key={cmd}
                  onClick={() => insertCommand(cmd)}
                  className="px-3 py-1 bg-midnight-dark text-starlight/70 rounded text-xs hover:bg-midnight-lighter transition-colors"
                >
                  "{cmd}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Transcript */}
        <div className="mb-6 p-6 bg-midnight-light rounded-xl border border-midnight-lighter min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-starlight">Transcript</h3>
            {transcript.length > 0 && (
              <button
                onClick={() => {
                  setTranscript('');
                  setWordCount(0);
                }}
                className="text-sm text-red-400 hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="text-starlight whitespace-pre-wrap leading-relaxed">
              {transcript || (
                <span className="text-starlight/40 italic">
                  Your transcribed text will appear here...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        {transcript.length > 0 && (
          <div className="flex gap-3">
            <button
              onClick={saveAsEntry}
              className="flex-1 px-6 py-3 bg-astral text-white rounded-lg font-medium hover:bg-astral/80 transition-colors"
            >
              💾 Save as Journal Entry
            </button>
            <button
              onClick={autoSave}
              className="px-6 py-3 bg-midnight-lighter text-starlight rounded-lg font-medium hover:bg-midnight-light transition-colors"
            >
              📄 Save Draft
            </button>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 p-4 bg-midnight-light rounded-lg border border-midnight-lighter">
          <h3 className="text-lg font-bold text-starlight mb-2">💡 Dictation Tips</h3>
          <ul className="text-sm text-starlight/70 space-y-1">
            <li>• Speak clearly and at a natural pace</li>
            <li>• Say "period", "comma", etc. for punctuation</li>
            <li>• Use "new paragraph" to start a new section</li>
            <li>• Auto-save creates drafts every 30 seconds</li>
            <li>• Works best in Chrome or Edge browsers</li>
            <li>• Microphone permission required</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContinuousDictation;
