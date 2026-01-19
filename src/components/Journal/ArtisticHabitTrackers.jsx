import React, { useState } from 'react';
import { Book, Droplet, Palette, Circle, Square } from 'lucide-react';

/**
 * ArtisticHabitTrackers Component
 * Visual habit trackers: bookshelf, mood jar, pixel art, garden
 * Moves away from boring checkboxes to creative visualization
 */

const ArtisticHabitTrackers = () => {
  const [trackerType, setTrackerType] = useState('bookshelf');
  const [bookshelf, setBookshelf] = useState(
    JSON.parse(localStorage.getItem('mythical_bookshelf') || '[]')
  );
  const [moodJar, setMoodJar] = useState(
    JSON.parse(localStorage.getItem('mythical_mood_jar') || '[]')
  );
  const [pixelGarden, setPixelGarden] = useState(
    JSON.parse(localStorage.getItem('mythical_pixel_garden') || '[]')
  );

  const trackers = [
    { id: 'bookshelf', name: 'Digital Bookshelf', icon: Book, desc: 'Color in a book for each one you read' },
    { id: 'mood-jar', name: 'Mood Jar', icon: Droplet, desc: 'Fill a jar with colored drops based on daily mood' },
    { id: 'pixel-garden', name: 'Pixel Garden', icon: Palette, desc: 'Grow a pixel art garden with each good habit' },
  ];

  // Bookshelf Logic
  const addBook = (title, color) => {
    const newBook = {
      id: Date.now(),
      title,
      color,
      dateAdded: new Date().toISOString(),
    };
    const updated = [...bookshelf, newBook];
    setBookshelf(updated);
    localStorage.setItem('mythical_bookshelf', JSON.stringify(updated));
  };

  const removeBook = (id) => {
    const updated = bookshelf.filter(b => b.id !== id);
    setBookshelf(updated);
    localStorage.setItem('mythical_bookshelf', JSON.stringify(updated));
  };

  // Mood Jar Logic
  const addMoodDrop = (mood, color) => {
    const newDrop = {
      id: Date.now(),
      mood,
      color,
      date: new Date().toISOString().split('T')[0],
    };
    const updated = [...moodJar, newDrop];
    setMoodJar(updated);
    localStorage.setItem('mythical_mood_jar', JSON.stringify(updated));
  };

  // Pixel Garden Logic
  const plantPixel = (type, color) => {
    const newPixel = {
      id: Date.now(),
      type, // 'flower', 'tree', 'star'
      color,
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
      date: new Date().toISOString().split('T')[0],
    };
    const updated = [...pixelGarden, newPixel];
    setPixelGarden(updated);
    localStorage.setItem('mythical_pixel_garden', JSON.stringify(updated));
  };

  const bookColors = [
    { name: 'Crimson', hex: '#DC143C' },
    { name: 'Ocean', hex: '#1E90FF' },
    { name: 'Forest', hex: '#228B22' },
    { name: 'Amber', hex: '#FFBF00' },
    { name: 'Violet', hex: '#8B00FF' },
    { name: 'Rose', hex: '#FF007F' },
    { name: 'Teal', hex: '#008080' },
    { name: 'Coral', hex: '#FF6F61' },
  ];

  const moodColors = {
    joyful: '#FFD700',
    calm: '#87CEEB',
    energized: '#FF4500',
    melancholy: '#4B0082',
    grateful: '#32CD32',
    anxious: '#FF6347',
    peaceful: '#B0E0E6',
    excited: '#FF1493',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
          Artistic Habit Trackers
        </h2>
        <p className="text-gray-300">Move beyond checkboxes. Make tracking beautiful.</p>
      </div>

      {/* Tracker Selector */}
      <div className="flex gap-3 justify-center flex-wrap">
        {trackers.map(tracker => {
          const Icon = tracker.icon;
          return (
            <button
              key={tracker.id}
              onClick={() => setTrackerType(tracker.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                trackerType === tracker.id
                  ? 'bg-cyan-500/30 ring-2 ring-cyan-400'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <Icon size={20} className="text-cyan-400" />
              <span className="font-medium">{tracker.name}</span>
            </button>
          );
        })}
      </div>

      {/* Bookshelf Tracker */}
      {trackerType === 'bookshelf' && (
        <div className="glass-effect mythic-border p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4">📚 My Reading Bookshelf</h3>
          <p className="text-sm text-gray-400 mb-6">Add a book every time you finish reading one. Watch your library grow!</p>

          {/* Bookshelf Grid */}
          <div className="grid grid-cols-5 md:grid-cols-8 gap-2 mb-6 p-4 bg-gradient-to-b from-amber-900/20 to-amber-950/30 rounded-xl">
            {bookshelf.map(book => (
              <button
                key={book.id}
                onClick={() => removeBook(book.id)}
                className="aspect-[2/3] rounded transition-all hover:scale-110 hover:shadow-lg relative group"
                style={{ backgroundColor: book.color }}
                title={book.title}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 rounded transition-opacity">
                  <span className="text-xs">✕</span>
                </div>
              </button>
            ))}
            {/* Empty slots */}
            {Array.from({ length: Math.max(0, 40 - bookshelf.length) }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="aspect-[2/3] rounded bg-white/5 border border-white/10"
              />
            ))}
          </div>

          {/* Add Book Form */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Book title..."
              id="book-title-input"
              className="w-full px-4 py-3 bg-white/5 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <div className="flex gap-2 flex-wrap">
              {bookColors.map(color => (
                <button
                  key={color.hex}
                  onClick={() => {
                    const title = document.getElementById('book-title-input').value;
                    if (title.trim()) {
                      addBook(title, color.hex);
                      document.getElementById('book-title-input').value = '';
                    }
                  }}
                  className="w-12 h-12 rounded-lg hover:scale-110 transition-all ring-2 ring-white/20 hover:ring-cyan-400"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-400 mt-4 text-center">
            📖 Books read: <span className="font-bold text-cyan-400">{bookshelf.length}</span>
          </p>
        </div>
      )}

      {/* Mood Jar Tracker */}
      {trackerType === 'mood-jar' && (
        <div className="glass-effect mythic-border p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4">💧 My Mood Jar</h3>
          <p className="text-sm text-gray-400 mb-6">Add a colored drop for each day based on your mood. Watch the colors accumulate!</p>

          {/* Jar Visualization */}
          <div className="relative h-96 w-64 mx-auto bg-gradient-to-b from-transparent to-white/5 rounded-b-[100px] border-4 border-white/20 overflow-hidden">
            {/* Jar Opening */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-20 h-8 bg-amber-900/50 border-4 border-white/20 rounded-t-lg" />

            {/* Drops (fill from bottom) */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col-reverse">
              {moodJar.map((drop, idx) => (
                <div
                  key={drop.id}
                  className="h-4 transition-all duration-500 animate-pulse"
                  style={{
                    backgroundColor: drop.color,
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Add Drop Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {Object.entries(moodColors).map(([mood, color]) => (
              <button
                key={mood}
                onClick={() => addMoodDrop(mood, color)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:scale-105 transition-all bg-white/5 hover:bg-white/10"
              >
                <div
                  className="w-10 h-10 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs capitalize">{mood}</span>
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-400 mt-4 text-center">
            💧 Drops collected: <span className="font-bold text-cyan-400">{moodJar.length}</span> | Fill level: {Math.min(100, (moodJar.length / 100) * 100).toFixed(0)}%
          </p>
        </div>
      )}

      {/* Pixel Garden Tracker */}
      {trackerType === 'pixel-garden' && (
        <div className="glass-effect mythic-border p-6 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4">🌱 My Pixel Garden</h3>
          <p className="text-sm text-gray-400 mb-6">Plant a pixel for each good habit. Grow your digital garden!</p>

          {/* 10x10 Garden Grid */}
          <div className="grid grid-cols-10 gap-1 mb-6 p-4 bg-gradient-to-b from-green-900/20 to-green-950/30 rounded-xl">
            {Array.from({ length: 100 }).map((_, idx) => {
              const x = idx % 10;
              const y = Math.floor(idx / 10);
              const pixel = pixelGarden.find(p => p.x === x && p.y === y);

              return (
                <div
                  key={idx}
                  className="aspect-square rounded transition-all hover:scale-110"
                  style={{
                    backgroundColor: pixel ? pixel.color : 'rgba(255,255,255,0.05)',
                  }}
                  title={pixel ? `${pixel.type} - ${pixel.date}` : 'Empty'}
                >
                  {pixel && (
                    <div className="w-full h-full flex items-center justify-center text-xs">
                      {pixel.type === 'flower' && '🌸'}
                      {pixel.type === 'tree' && '🌳'}
                      {pixel.type === 'star' && '⭐'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Plant Buttons */}
          <div className="flex gap-3 justify-center">
            {[
              { type: 'flower', emoji: '🌸', color: '#FF69B4' },
              { type: 'tree', emoji: '🌳', color: '#228B22' },
              { type: 'star', emoji: '⭐', color: '#FFD700' },
            ].map(item => (
              <button
                key={item.type}
                onClick={() => plantPixel(item.type, item.color)}
                className="flex flex-col items-center gap-2 px-6 py-3 rounded-xl hover:scale-105 transition-all bg-white/5 hover:bg-white/10"
              >
                <span className="text-3xl">{item.emoji}</span>
                <span className="text-xs capitalize">Plant {item.type}</span>
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-400 mt-4 text-center">
            🌱 Garden size: <span className="font-bold text-cyan-400">{pixelGarden.length}/100</span> pixels planted
          </p>
        </div>
      )}
    </div>
  );
};

export default ArtisticHabitTrackers;
