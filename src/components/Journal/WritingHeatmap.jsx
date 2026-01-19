import React, { useMemo } from 'react';
import { useMythical } from '../../contexts/MythicalContext';

/**
 * WritingHeatmap - GitHub-style contribution calendar
 * Visualizes writing activity over time
 */
const WritingHeatmap = () => {
  const { entries } = useMythical();

  // Generate heatmap data for the last year
  const heatmapData = useMemo(() => {
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 364);
    
    // Create map of date -> entry count
    const dateMap = {};
    entries.forEach(entry => {
      const date = new Date(entry.timestamp).toDateString();
      dateMap[date] = (dateMap[date] || 0) + 1;
    });

    // Generate all days for the past year
    const days = [];
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = new Date(d).toDateString();
      days.push({
        date: new Date(d),
        count: dateMap[dateStr] || 0,
      });
    }

    // Group by weeks
    const weeks = [];
    let currentWeek = [];
    
    days.forEach((day, index) => {
      currentWeek.push(day);
      if (day.date.getDay() === 6 || index === days.length - 1) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });

    return { weeks, maxCount: Math.max(...Object.values(dateMap), 1) };
  }, [entries]);

  // Get color based on contribution count
  const getColor = (count, maxCount) => {
    if (count === 0) return 'bg-midnight-deep border-starlight/10';
    const intensity = Math.min(count / maxCount, 1);
    if (intensity >= 0.8) return 'bg-cyan-mist border-cyan-mist';
    if (intensity >= 0.6) return 'bg-astral border-astral';
    if (intensity >= 0.4) return 'bg-astral/60 border-astral/60';
    if (intensity >= 0.2) return 'bg-astral/40 border-astral/40';
    return 'bg-astral/20 border-astral/20';
  };

  // Month labels
  const monthLabels = useMemo(() => {
    const labels = [];
    const today = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      labels.push({
        name: date.toLocaleDateString('en-US', { month: 'short' }),
        col: Math.floor((11 - i) * 4.33), // Approximate column position
      });
    }
    
    return labels;
  }, []);

  return (
    <div className="writing-heatmap mythic-border glass-effect rounded-2xl p-8">
      <h3 className="text-2xl font-bold font-montserrat text-cyan-mist mb-6 flex items-center gap-2">
        <span className="text-3xl">ᚲ</span> Writing Activity
      </h3>

      <div className="overflow-x-auto pb-4">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex mb-2 pl-8">
            {monthLabels.map((month, idx) => (
              <div 
                key={idx}
                className="text-xs text-starlight/60 font-inter"
                style={{ 
                  marginLeft: idx === 0 ? '0' : `${month.col * 3 - (monthLabels[idx - 1]?.col || 0) * 3 - 12}px`,
                  minWidth: '24px'
                }}
              >
                {month.name}
              </div>
            ))}
          </div>

          {/* Day labels + Grid */}
          <div className="flex gap-1">
            {/* Day of week labels */}
            <div className="flex flex-col gap-1 pt-4 pr-2">
              <div className="h-3 text-xs text-starlight/60 font-inter flex items-center">Mon</div>
              <div className="h-3"></div>
              <div className="h-3 text-xs text-starlight/60 font-inter flex items-center">Wed</div>
              <div className="h-3"></div>
              <div className="h-3 text-xs text-starlight/60 font-inter flex items-center">Fri</div>
              <div className="h-3"></div>
              <div className="h-3 text-xs text-starlight/60 font-inter flex items-center">Sun</div>
            </div>

            {/* Heatmap grid */}
            <div className="flex gap-1">
              {heatmapData.weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.map((day, dayIdx) => (
                    <div
                      key={dayIdx}
                      className={`w-3 h-3 rounded-sm border transition-all duration-300 hover:scale-125 cursor-pointer ${getColor(day.count, heatmapData.maxCount)}`}
                      title={`${day.date.toLocaleDateString()}: ${day.count} ${day.count === 1 ? 'entry' : 'entries'}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-6">
            <span className="text-xs text-starlight/60 font-inter">Less</span>
            <div className="w-3 h-3 rounded-sm bg-midnight-deep border border-starlight/10"></div>
            <div className="w-3 h-3 rounded-sm bg-astral/20 border border-astral/20"></div>
            <div className="w-3 h-3 rounded-sm bg-astral/40 border border-astral/40"></div>
            <div className="w-3 h-3 rounded-sm bg-astral/60 border border-astral/60"></div>
            <div className="w-3 h-3 rounded-sm bg-astral border border-astral"></div>
            <div className="w-3 h-3 rounded-sm bg-cyan-mist border border-cyan-mist"></div>
            <span className="text-xs text-starlight/60 font-inter">More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingHeatmap;
