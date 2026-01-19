import React, { useState, useEffect } from 'react';

/**
 * Timeline Spiral - Drag-and-drop event organizer
 * Events glow brighter as they cluster
 */
const TimelineSpiral = () => {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('mythical_timeline');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    localStorage.setItem('mythical_timeline', JSON.stringify(events));
  }, [events]);

  const eventTypes = {
    birth: { icon: '🌱', color: '#10B981' },
    conflict: { icon: '⚔️', color: '#EF4444' },
    discovery: { icon: '✨', color: '#F59E0B' },
    transformation: { icon: '🔮', color: '#8B5CF6' },
    ending: { icon: '🌙', color: '#6B7280' },
  };

  const addEvent = (type) => {
    const newEvent = {
      id: Date.now(),
      type,
      title: `New ${type}`,
      description: '',
      date: '',
      x: 50,
      y: 50,
    };
    setEvents([...events, newEvent]);
    setSelectedEvent(newEvent.id);
  };

  const updateEvent = (id, updates) => {
    setEvents(events.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
    setSelectedEvent(null);
  };

  const handleDrag = (id, clientX, clientY, container) => {
    const rect = container.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    updateEvent(id, { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  // Calculate glow intensity based on nearby events
  const getGlowIntensity = (event) => {
    let nearby = 0;
    events.forEach(other => {
      if (other.id === event.id) return;
      const distance = Math.sqrt(
        Math.pow(event.x - other.x, 2) + Math.pow(event.y - other.y, 2)
      );
      if (distance < 20) nearby++;
    });
    return Math.min(nearby * 0.3 + 0.3, 1);
  };

  const selected = events.find(e => e.id === selectedEvent);

  return (
    <div className="timeline-spiral h-full">
      <div className="flex gap-6 h-full">
        {/* Timeline Canvas */}
        <div className="flex-1 mythic-border glass-effect rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <h3 className="text-2xl font-bold font-montserrat text-cyan-mist flex items-center gap-2">
              <span className="text-3xl">🌀</span> Timeline Spiral
            </h3>

            <div className="flex gap-2 items-center">
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                className="w-10 h-10 mythic-border glass-effect hover:glow-box rounded-lg transition-all duration-300 text-starlight text-xl"
              >
                −
              </button>
              <span className="text-starlight/70 font-inter text-sm w-12 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(Math.min(2, zoom + 0.25))}
                className="w-10 h-10 mythic-border glass-effect hover:glow-box rounded-lg transition-all duration-300 text-starlight text-xl"
              >
                +
              </button>
              <div className="w-px bg-starlight/20 mx-2 h-8" />
              {Object.entries(eventTypes).map(([type, { icon }]) => (
                <button
                  key={type}
                  onClick={() => addEvent(type)}
                  title={`Add ${type}`}
                  className="w-10 h-10 mythic-border glass-effect hover:glow-box rounded-lg transition-all duration-300"
                >
                  <span className="text-xl">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Spiral Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              background: `
                radial-gradient(circle at 50% 50%, transparent 20%, rgba(59, 130, 246, 0.1) 40%, transparent 60%),
                conic-gradient(from 0deg, transparent, rgba(103, 232, 249, 0.2), transparent)
              `,
            }}
          />

          {/* Events Canvas */}
          <div
            className="absolute inset-16 overflow-hidden"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
            onDragOver={(e) => e.preventDefault()}
          >
            {events.map(event => {
              const glow = getGlowIntensity(event);
              return (
                <div
                  key={event.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.effectAllowed = 'move';
                  }}
                  onDrag={(e) => {
                    if (e.clientX === 0 && e.clientY === 0) return; // Ignore last drag event
                    const container = e.currentTarget.parentElement;
                    handleDrag(event.id, e.clientX, e.clientY, container);
                  }}
                  onClick={() => setSelectedEvent(event.id)}
                  className={`absolute cursor-move transition-all duration-300 ${
                    selectedEvent === event.id ? 'scale-125 z-20' : 'z-10'
                  }`}
                  style={{
                    left: `${event.x}%`,
                    top: `${event.y}%`,
                    transform: 'translate(-50%, -50%)',
                    filter: `drop-shadow(0 0 ${8 + glow * 12}px ${eventTypes[event.type].color})`,
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mythic-border glass-effect"
                    style={{
                      backgroundColor: `${eventTypes[event.type].color}20`,
                      borderColor: eventTypes[event.type].color,
                      boxShadow: `0 0 ${16 + glow * 24}px ${eventTypes[event.type].color}40`,
                    }}
                  >
                    <span className="text-3xl">{eventTypes[event.type].icon}</span>
                  </div>
                  {(selectedEvent === event.id || glow > 0.6) && (
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap bg-midnight-deep/90 px-3 py-1 rounded-lg text-xs font-inter text-starlight">
                      {event.title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Event Editor */}
        <div className="w-80 mythic-border glass-effect rounded-2xl p-6 space-y-4">
          {selected ? (
            <>
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold font-montserrat text-astral capitalize">
                  {selected.type} Event
                </h4>
                <button
                  onClick={() => deleteEvent(selected.id)}
                  className="text-red-400 hover:text-red-300 text-sm font-inter"
                >
                  Delete
                </button>
              </div>

              <input
                type="text"
                value={selected.title}
                onChange={(e) => updateEvent(selected.id, { title: e.target.value })}
                className="w-full bg-midnight-deep border-2 border-starlight/20 rounded-lg px-4 py-2 text-starlight font-inter focus:outline-none focus:border-cyan-mist"
                placeholder="Event title"
              />

              <input
                type="text"
                value={selected.date}
                onChange={(e) => updateEvent(selected.id, { date: e.target.value })}
                className="w-full bg-midnight-deep border-2 border-starlight/20 rounded-lg px-4 py-2 text-starlight font-inter focus:outline-none focus:border-cyan-mist"
                placeholder="Date or era (e.g., Year 1027, Age of Dragons)"
              />

              <textarea
                value={selected.description}
                onChange={(e) => updateEvent(selected.id, { description: e.target.value })}
                placeholder="What happened? Who was involved? What changed?"
                className="w-full bg-midnight-deep border-2 border-starlight/20 rounded-lg px-4 py-2 text-starlight font-inter resize-none focus:outline-none focus:border-cyan-mist h-64"
              />

              <div className="pt-4 border-t border-starlight/10 text-sm text-starlight/70 font-inter">
                <p className="mb-2">💡 <strong>Tip:</strong> Events glow brighter when near others</p>
                <p>Drag events to organize your timeline visually</p>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <div className="text-6xl mb-4 opacity-30">⏳</div>
                <p className="text-starlight/70 font-inter text-sm">
                  Create events to build your timeline
                </p>
                <p className="text-starlight/50 font-inter text-xs mt-2">
                  Drag to reposition, events glow when clustered
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineSpiral;
