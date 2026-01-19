import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Sparkles, TrendingUp, Target } from 'lucide-react';

/**
 * VoiceToInsight Component
 * Voice journaling that generates AI summary of emotional themes + actionable next step
 * Perfect for brain dumps while walking
 */

const VoiceToInsight = ({ onSaveEntry }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const intervalRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

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

        setTranscript(prev => prev + finalTranscript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      clearInterval(intervalRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      // Start audio recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(1000); // Collect data every second
      mediaRecorderRef.current = mediaRecorder;

      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }

      // Start timer
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      setTranscript('');
      audioChunksRef.current = [];

      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Microphone access denied:', error);
      alert('Please allow microphone access to use voice journaling.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    clearInterval(intervalRef.current);
    setIsRecording(false);
    setIsPaused(false);

    // Analyze transcript
    if (transcript.trim().length > 20) {
      analyzeTranscript(transcript);
    }
  };

  const togglePause = () => {
    if (isPaused) {
      // Resume
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      setIsPaused(false);
    } else {
      // Pause
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      clearInterval(intervalRef.current);
      setIsPaused(true);
    }
  };

  const analyzeTranscript = (text) => {
    setIsAnalyzing(true);

    // Simple sentiment analysis (keyword-based)
    const emotions = detectEmotions(text);
    const themes = detectThemes(text);
    const nextStep = generateNextStep(emotions, themes);
    const keyInsights = extractKeyInsights(text);

    setTimeout(() => {
      setAnalysis({
        emotionalThemes: emotions,
        topThemes: themes,
        nextStep,
        keyInsights,
        wordCount: text.split(/\s+/).length,
        recordingDuration: recordingTime,
      });
      setIsAnalyzing(false);
    }, 1500); // Simulate processing time
  };

  const detectEmotions = (text) => {
    const emotionKeywords = {
      anxiety: ['worried', 'anxious', 'nervous', 'stress', 'overwhelmed', 'panic'],
      joy: ['happy', 'excited', 'great', 'love', 'amazing', 'wonderful', 'joy'],
      sadness: ['sad', 'down', 'depressed', 'lonely', 'miss', 'cry'],
      anger: ['angry', 'frustrated', 'mad', 'furious', 'upset', 'annoyed'],
      hope: ['hope', 'optimistic', 'looking forward', 'believe', 'future'],
      fear: ['afraid', 'scared', 'terrified', 'fear', 'worry'],
    };

    const detected = {};
    const lowerText = text.toLowerCase();

    Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
      const count = keywords.filter(keyword => lowerText.includes(keyword)).length;
      if (count > 0) {
        detected[emotion] = count;
      }
    });

    return Object.entries(detected)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([emotion, intensity]) => ({ emotion, intensity }));
  };

  const detectThemes = (text) => {
    const themeKeywords = {
      work: ['work', 'job', 'career', 'boss', 'meeting', 'project'],
      relationships: ['friend', 'family', 'partner', 'relationship', 'connection'],
      health: ['health', 'exercise', 'sleep', 'eat', 'body', 'tired'],
      growth: ['learn', 'grow', 'improve', 'change', 'develop', 'progress'],
      creativity: ['create', 'write', 'art', 'idea', 'imagine', 'dream'],
    };

    const detected = {};
    const lowerText = text.toLowerCase();

    Object.entries(themeKeywords).forEach(([theme, keywords]) => {
      const count = keywords.filter(keyword => lowerText.includes(keyword)).length;
      if (count > 0) {
        detected[theme] = count;
      }
    });

    return Object.entries(detected)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([theme]) => theme);
  };

  const generateNextStep = (emotions, themes) => {
    if (emotions.length === 0 || themes.length === 0) {
      return 'Take 5 minutes to write down your thoughts in more detail.';
    }

    const topEmotion = emotions[0]?.emotion;
    const topTheme = themes[0];

    const steps = {
      anxiety: {
        work: 'Write down the 3 most important tasks for tomorrow and schedule them.',
        relationships: 'Send a message to someone you trust about how you\'re feeling.',
        health: 'Do 10 minutes of deep breathing or a short walk to reset your nervous system.',
        default: 'List your worries on paper, then mark which ones are within your control.',
      },
      joy: {
        default: 'Write down what caused this joy and how you can create more of it.',
      },
      sadness: {
        relationships: 'Reach out to a friend or write a letter to your past self with compassion.',
        default: 'Allow yourself to feel this. Journal about what you need right now.',
      },
      anger: {
        default: 'Write an "unsent letter" to release this anger safely on paper.',
      },
      default: 'Reflect on one small action you can take today to move forward.',
    };

    return steps[topEmotion]?.[topTheme] || steps[topEmotion]?.default || steps.default;
  };

  const extractKeyInsights = (text) => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
    
    // Find sentences with strong emotional language or "I" statements
    const insights = sentences
      .filter(s => 
        s.toLowerCase().includes('i feel') ||
        s.toLowerCase().includes('i need') ||
        s.toLowerCase().includes('i want') ||
        s.toLowerCase().includes('i\'m') ||
        s.toLowerCase().includes('i am')
      )
      .slice(0, 3);

    return insights.length > 0 ? insights : sentences.slice(0, 3);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const saveEntry = () => {
    onSaveEntry({
      type: 'voice',
      transcript,
      analysis,
      recordingDuration: recordingTime,
      timestamp: new Date().toISOString(),
    });

    // Reset
    setTranscript('');
    setAnalysis(null);
    setRecordingTime(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
          Voice-to-Insight
        </h2>
        <p className="text-gray-300">Brain dump while walking. Get AI-powered emotional insights.</p>
      </div>

      {/* Recording Interface */}
      <div className="glass-effect mythic-border p-8 rounded-2xl text-center">
        {!isRecording && !transcript ? (
          <div className="space-y-6">
            <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse">
              <Mic size={48} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Start Voice Journaling</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Perfect for walks, commutes, or whenever typing feels like too much. Just talk freely.
              </p>
            </div>
            <button
              onClick={startRecording}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-bold text-lg transition-all hover:scale-105"
            >
              Start Recording
            </button>
          </div>
        ) : isRecording ? (
          <div className="space-y-6">
            {/* Waveform Animation */}
            <div className="flex items-center justify-center gap-2 h-24">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full ${!isPaused ? 'animate-bounce' : ''}`}
                  style={{
                    height: `${30 + Math.random() * 40}px`,
                    animationDelay: `${i * 0.1}s`,
                    opacity: isPaused ? 0.3 : 1,
                  }}
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-6xl font-bold text-cyan-400 font-mono">
              {formatTime(recordingTime)}
            </div>

            {/* Live Transcript Preview */}
            {transcript && (
              <div className="max-h-32 overflow-y-auto bg-white/5 rounded-xl p-4 text-left">
                <p className="text-sm text-gray-300 italic">{transcript}...</p>
              </div>
            )}

            {/* Controls */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={togglePause}
                className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-xl font-semibold transition-all flex items-center gap-2"
              >
                {isPaused ? <Play size={20} /> : <Square size={20} />}
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button
                onClick={stopRecording}
                className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl font-semibold transition-all"
              >
                Stop & Analyze
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Analysis Results */}
      {isAnalyzing && (
        <div className="glass-effect mythic-border p-8 rounded-2xl text-center">
          <Sparkles size={48} className="text-cyan-400 mx-auto mb-4 animate-spin" />
          <p className="text-lg">Analyzing your voice entry...</p>
        </div>
      )}

      {analysis && (
        <div className="space-y-6">
          {/* Emotional Themes */}
          <div className="glass-effect mythic-border p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="text-cyan-400" size={24} />
              Emotional Themes Detected
            </h3>
            <div className="space-y-3">
              {analysis.emotionalThemes.map((theme, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className="text-lg capitalize">{theme.emotion}</span>
                  <div className="flex-1 bg-white/5 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                      style={{ width: `${(theme.intensity / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400">{theme.intensity}x mentions</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Themes */}
          {analysis.topThemes.length > 0 && (
            <div className="glass-effect mythic-border p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-3">Main Topics</h3>
              <div className="flex gap-2 flex-wrap">
                {analysis.topThemes.map((theme, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-cyan-500/20 rounded-full text-sm font-medium capitalize"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Next Step */}
          <div className="glass-effect mythic-border p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Target className="text-green-400" size={24} />
              Your Next Actionable Step
            </h3>
            <p className="text-lg text-green-300">{analysis.nextStep}</p>
          </div>

          {/* Key Insights */}
          {analysis.keyInsights.length > 0 && (
            <div className="glass-effect mythic-border p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-3">Key Phrases You Said</h3>
              <div className="space-y-2">
                {analysis.keyInsights.map((insight, idx) => (
                  <p key={idx} className="text-gray-300 italic pl-4 border-l-2 border-cyan-400">
                    "{insight.trim()}"
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Full Transcript */}
          <div className="glass-effect mythic-border p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-3">Full Transcript</h3>
            <div className="max-h-64 overflow-y-auto bg-white/5 rounded-xl p-4">
              <p className="text-gray-300 leading-relaxed">{transcript}</p>
            </div>
            <p className="text-sm text-gray-400 mt-3">
              {analysis.wordCount} words · {formatTime(analysis.recordingDuration)} recording
            </p>
          </div>

          {/* Save Button */}
          <button
            onClick={saveEntry}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
          >
            Save Entry ✨
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceToInsight;
