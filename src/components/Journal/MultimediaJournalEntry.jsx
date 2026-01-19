import React, { useState, useRef } from 'react';
import { Camera, Mic, MapPin, Cloud, Music, Image as ImageIcon, Video, FileText, X } from 'lucide-react';

/**
 * MultimediaJournalEntry Component
 * Rich journal entry with voice notes, photos, weather, location metadata
 * Inspired by Day One app
 */

const MultimediaJournalEntry = ({ onSave, initialEntry = null }) => {
  const [content, setContent] = useState(initialEntry?.content || '');
  const [attachments, setAttachments] = useState(initialEntry?.attachments || []);
  const [metadata, setMetadata] = useState(initialEntry?.metadata || {
    weather: null,
    location: null,
    mood: null,
    tags: [],
  });
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const fileInputRef = useRef(null);
  const audioRecorderRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  const weatherOptions = [
    { id: 'sunny', label: 'Sunny', icon: '☀️' },
    { id: 'cloudy', label: 'Cloudy', icon: '☁️' },
    { id: 'rainy', label: 'Rainy', icon: '🌧️' },
    { id: 'stormy', label: 'Stormy', icon: '⛈️' },
    { id: 'snowy', label: 'Snowy', icon: '❄️' },
    { id: 'foggy', label: 'Foggy', icon: '🌫️' },
  ];

  // Handle file upload (photos, videos)
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newAttachment = {
          id: Date.now() + Math.random(),
          type: file.type.startsWith('image') ? 'image' : 'video',
          name: file.name,
          data: event.target.result,
          size: file.size,
          timestamp: new Date().toISOString(),
        };
        setAttachments(prev => [...prev, newAttachment]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const reader = new FileReader();
        reader.onload = (e) => {
          const newAttachment = {
            id: Date.now(),
            type: 'audio',
            name: `Voice Note ${new Date().toLocaleTimeString()}`,
            data: e.target.result,
            duration: recordingTime,
            timestamp: new Date().toISOString(),
          };
          setAttachments(prev => [...prev, newAttachment]);
        };
        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      audioRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Update recording time
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone access denied:', err);
      alert('Please allow microphone access to record voice notes.');
    }
  };

  const stopRecording = () => {
    if (audioRecorderRef.current && isRecording) {
      audioRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(recordingIntervalRef.current);
    }
  };

  // Get location (browser geolocation API)
  const addLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMetadata(prev => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              timestamp: new Date().toISOString(),
            },
          }));
        },
        (error) => {
          console.error('Location access denied:', error);
          alert('Please allow location access to add location metadata.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  // Remove attachment
  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  // Save entry
  const handleSave = () => {
    const entry = {
      id: initialEntry?.id || Date.now(),
      content,
      attachments,
      metadata: {
        ...metadata,
        createdAt: initialEntry?.metadata?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
    onSave(entry);
  };

  const formatRecordingTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Rich Text Editor */}
      <div className="glass-effect mythic-border p-6 rounded-2xl">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? Write your story..."
          className="w-full h-64 bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none font-inter"
          style={{ fontSize: '16px', lineHeight: '1.6' }}
        />
      </div>

      {/* Multimedia Toolbar */}
      <div className="glass-effect mythic-border p-4 rounded-2xl">
        <div className="flex flex-wrap gap-3">
          {/* Photo/Video Upload */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-all"
          >
            <Camera size={20} className="text-cyan-400" />
            <span className="text-sm font-medium">Add Photo</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Voice Recording */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isRecording
                ? 'bg-red-500/30 hover:bg-red-500/40 animate-pulse'
                : 'bg-purple-500/20 hover:bg-purple-500/30'
            }`}
          >
            <Mic size={20} className={isRecording ? 'text-red-400' : 'text-purple-400'} />
            <span className="text-sm font-medium">
              {isRecording ? formatRecordingTime(recordingTime) : 'Voice Note'}
            </span>
          </button>

          {/* Location */}
          <button
            onClick={addLocation}
            className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-all"
          >
            <MapPin size={20} className="text-green-400" />
            <span className="text-sm font-medium">
              {metadata.location ? '✓ Location' : 'Add Location'}
            </span>
          </button>

          {/* Weather Dropdown */}
          <select
            value={metadata.weather || ''}
            onChange={(e) => setMetadata(prev => ({ ...prev, weather: e.target.value }))}
            className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-sm font-medium cursor-pointer focus:outline-none transition-all"
          >
            <option value="">☁️ Weather</option>
            {weatherOptions.map(weather => (
              <option key={weather.id} value={weather.id}>
                {weather.icon} {weather.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="glass-effect mythic-border p-4 rounded-2xl">
          <h4 className="text-sm font-semibold mb-3 text-cyan-400">Attachments ({attachments.length})</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {attachments.map(attachment => (
              <div
                key={attachment.id}
                className="relative group bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all"
              >
                {/* Remove Button */}
                <button
                  onClick={() => removeAttachment(attachment.id)}
                  className="absolute top-2 right-2 z-10 p-1 bg-red-500/80 hover:bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X size={16} />
                </button>

                {/* Preview */}
                {attachment.type === 'image' && (
                  <img
                    src={attachment.data}
                    alt={attachment.name}
                    className="w-full h-32 object-cover"
                  />
                )}
                {attachment.type === 'video' && (
                  <div className="flex items-center justify-center h-32 bg-black/30">
                    <Video size={32} className="text-cyan-400" />
                  </div>
                )}
                {attachment.type === 'audio' && (
                  <div className="flex flex-col items-center justify-center h-32 p-3">
                    <Mic size={32} className="text-purple-400 mb-2" />
                    <p className="text-xs text-gray-400">{attachment.duration}s</p>
                  </div>
                )}

                {/* Name */}
                <div className="p-2">
                  <p className="text-xs text-gray-300 truncate">{attachment.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metadata Display */}
      {(metadata.location || metadata.weather) && (
        <div className="glass-effect mythic-border p-4 rounded-2xl">
          <h4 className="text-sm font-semibold mb-2 text-cyan-400">Entry Details</h4>
          <div className="flex flex-wrap gap-3 text-sm text-gray-300">
            {metadata.weather && (
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full">
                <span>{weatherOptions.find(w => w.id === metadata.weather)?.icon}</span>
                <span>{weatherOptions.find(w => w.id === metadata.weather)?.label}</span>
              </div>
            )}
            {metadata.location && (
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
                <MapPin size={14} className="text-green-400" />
                <span>
                  {metadata.location.lat.toFixed(4)}, {metadata.location.lng.toFixed(4)}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-500/20 rounded-full">
              <span>📅 {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={!content.trim() && attachments.length === 0}
        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        Save Entry ✨
      </button>
    </div>
  );
};

export default MultimediaJournalEntry;
