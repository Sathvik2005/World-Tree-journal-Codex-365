import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

/**
 * GrowthTracker - Visual progress bar showing 0-365 journey
 * Fills as user progresses, with leaf icons appearing
 */
const GrowthTracker = ({ currentDay = 0, totalDays = 365 }) => {
  const [displayDay, setDisplayDay] = useState(0);
  const progress = (currentDay / totalDays) * 100;

  useEffect(() => {
    gsap.to({ value: displayDay }, {
      value: currentDay,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: function() {
        setDisplayDay(Math.floor(this.targets()[0].value));
      }
    });
  }, [currentDay]);

  // Calculate leaf positions (every 30 days)
  const leafMilestones = [];
  for (let i = 30; i <= totalDays; i += 30) {
    if (i <= currentDay) {
      leafMilestones.push({ day: i, position: (i / totalDays) * 100 });
    }
  }

  return (
    <div className="growth-tracker fixed bottom-0 left-0 right-0 z-40 bg-midnight/90 backdrop-blur-sm border-t border-astral/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress bar */}
        <div className="relative h-3 bg-midnight-deep rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-gradient-to-r from-astral via-cyan-mist to-starlight transition-all duration-1000 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Animated shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>

          {/* Leaf milestones */}
          {leafMilestones.map((milestone) => (
            <div
              key={milestone.day}
              className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 leaf-milestone"
              style={{ left: `${milestone.position}%` }}
              title={`Day ${milestone.day}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C12 2 6 8 6 14C6 17.31 8.69 20 12 20C15.31 20 18 17.31 18 14C18 8 12 2 12 2Z"
                  fill="#67E8F9"
                  stroke="#F8FAFC"
                  strokeWidth="1"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* Day counter */}
        <div className="flex justify-between items-center text-sm">
          <div className="text-cyan-mist font-medium">
            Day {displayDay} of {totalDays}
          </div>
          <div className="text-starlight-dim">
            {Math.floor(progress)}% Complete
          </div>
        </div>
      </div>

      <style jsx>{`
        .leaf-milestone {
          animation: leaf-appear 0.6s ease-out;
          filter: drop-shadow(0 0 8px rgba(103, 232, 249, 0.8));
        }

        @keyframes leaf-appear {
          from {
            opacity: 0;
            transform: translateY(-50%) scale(0);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default GrowthTracker;
