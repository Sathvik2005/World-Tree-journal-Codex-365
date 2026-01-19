import React, { useEffect, useState } from 'react';
import { WorldTreeLogo } from '../components/UI/WorldTreeLogo';

/**
 * World Tree — 365
 * Modern Single-Page Landing Site
 * Theme: Mystical Science + Elegant Navy
 */
const WorldTree365 = () => {
  const [scrollY, setScrollY] = useState(0);
  const [dayProgress, setDayProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Calculate progress through the year (0-365)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((window.scrollY / maxScroll) * 365, 365);
      setDayProgress(Math.floor(progress));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating day indicators
  const generateDayDots = () => {
    return [...Array(36)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
  };

  const dayDots = generateDayDots();

  return (
    <div className="relative bg-navy-dark text-white overflow-x-hidden">
      {/* === HERO SECTION === */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-ethereal rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy-light rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
        </div>

        {/* Logo */}
        <div 
          className="relative z-10 mb-8 text-white"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: 1 - scrollY / 800,
          }}
        >
          <WorldTreeLogo size={240} animate={true} />
        </div>

        {/* Hero Text */}
        <div 
          className="relative z-10 text-center px-4 animate-fade-in"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            opacity: 1 - scrollY / 600,
          }}
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight">
            World Tree — 365
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto font-light">
            One Year. One Growth. One Story.
          </p>
          <button className="group relative bg-blue-ethereal text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-glow transition-all duration-500 shadow-lg hover:shadow-glow-blue transform hover:scale-105">
            Begin The Journey
            <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* === ABOUT THE WORLD TREE === */}
      <section className="relative py-32 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-6">The World Tree</h2>
            <div className="w-20 h-1 bg-blue-ethereal mx-auto mb-8"></div>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              In Norse mythology, Yggdrasil connects all nine realms—a cosmic axis that holds existence together. 
              Our journey mirrors this ancient wisdom: <strong className="text-white">365 days of growth</strong>, 
              each day a root deepening, a branch reaching, a leaf unfurling.
            </p>
          </div>

          {/* Floating Day Indicators */}
          <div className="relative h-96 max-w-4xl mx-auto">
            {dayDots.map((dot) => (
              <div
                key={dot.id}
                className="absolute w-2 h-2 bg-blue-ethereal rounded-full opacity-40 float"
                style={{
                  left: `${dot.x}%`,
                  top: `${dot.y}%`,
                  animationDelay: `${dot.delay}s`,
                }}
              ></div>
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-ethereal to-cyan-rune mb-4">
                  365
                </div>
                <p className="text-lg text-text-secondary">Days of Transformation</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-navy-base bg-opacity-60 backdrop-blur-sm rounded-2xl p-8 text-center border border-navy-light hover:border-blue-ethereal transition-all duration-500 shadow-md hover:shadow-glow-blue">
              <div className="text-5xl font-bold text-blue-ethereal mb-3">12</div>
              <p className="text-text-secondary">Lunar Cycles</p>
            </div>
            <div className="bg-navy-base bg-opacity-60 backdrop-blur-sm rounded-2xl p-8 text-center border border-navy-light hover:border-blue-ethereal transition-all duration-500 shadow-md hover:shadow-glow-blue">
              <div className="text-5xl font-bold text-cyan-rune mb-3">52</div>
              <p className="text-text-secondary">Weekly Rhythms</p>
            </div>
            <div className="bg-navy-base bg-opacity-60 backdrop-blur-sm rounded-2xl p-8 text-center border border-navy-light hover:border-blue-ethereal transition-all duration-500 shadow-md hover:shadow-glow-blue">
              <div className="text-5xl font-bold text-azure-flare mb-3">∞</div>
              <p className="text-text-secondary">Possibilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* === TIMELINE SCROLL === */}
      <section className="relative py-32 px-4 md:px-8 bg-navy-base bg-opacity-40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">The Journey Unfolds</h2>
            <p className="text-text-secondary text-lg">Day {dayProgress} of 365</p>
          </div>

          {/* Timeline Line */}
          <div className="relative h-2 bg-navy-light rounded-full overflow-hidden mb-16">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-ethereal to-cyan-rune transition-all duration-300 shadow-glow-blue"
              style={{ width: `${(dayProgress / 365) * 100}%` }}
            ></div>
          </div>

          {/* Season Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { season: 'Spring', days: '1-91', icon: '🌱', desc: 'Awakening & Seeds' },
              { season: 'Summer', days: '92-182', icon: '☀️', desc: 'Growth & Vitality' },
              { season: 'Autumn', days: '183-273', icon: '🍂', desc: 'Harvest & Wisdom' },
              { season: 'Winter', days: '274-365', icon: '❄️', desc: 'Rest & Reflection' },
            ].map((season, i) => (
              <div 
                key={i}
                className="relative bg-navy-base border border-navy-light rounded-xl p-6 hover:border-blue-ethereal transition-all duration-500 group"
              >
                <div className="text-4xl mb-4 opacity-60 group-hover:opacity-100 transition-opacity">{season.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{season.season}</h3>
                <p className="text-sm text-blue-ethereal mb-2">Days {season.days}</p>
                <p className="text-text-secondary">{season.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === VISION / PURPOSE === */}
      <section className="relative py-32 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-5xl font-bold mb-8">Transformation Through Time</h2>
            <p className="text-xl text-text-secondary leading-relaxed mb-6">
              Every great journey begins with a single step. Every mighty tree grows from a single seed. 
              <strong className="text-white"> This is your year</strong>—365 opportunities to reflect, grow, and become.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              The World Tree doesn't rush. It deepens its roots with patience, reaches toward the sky with purpose, 
              and stands as a testament to consistent, mindful growth.
            </p>
          </div>

          {/* Floating Icons */}
          <div className="relative h-64 mb-12">
            <div className="absolute left-1/4 top-10 float" style={{ animationDelay: '0s' }}>
              <div className="w-16 h-16 bg-blue-ethereal bg-opacity-20 rounded-full flex items-center justify-center border border-blue-ethereal">
                <svg className="w-8 h-8 text-blue-ethereal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
            </div>

            <div className="absolute right-1/4 top-20 float" style={{ animationDelay: '1.5s' }}>
              <div className="w-16 h-16 bg-cyan-rune bg-opacity-20 rounded-full flex items-center justify-center border border-cyan-rune">
                <svg className="w-8 h-8 text-cyan-rune" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
            </div>

            <div className="absolute left-1/2 bottom-10 -translate-x-1/2 float" style={{ animationDelay: '3s' }}>
              <div className="w-16 h-16 bg-azure-flare bg-opacity-20 rounded-full flex items-center justify-center border border-azure-flare">
                <svg className="w-8 h-8 text-azure-flare" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
            </div>
          </div>

          <button className="bg-gradient-to-r from-blue-ethereal to-cyan-rune text-white px-12 py-5 rounded-full text-lg font-semibold hover:shadow-glow-blue transition-all duration-500 transform hover:scale-105">
            Start Your Journey Today
          </button>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="relative py-16 px-4 border-t border-navy-light">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <WorldTreeLogo size={60} />
              <div>
                <div className="font-bold text-lg">World Tree — 365</div>
                <div className="text-sm text-text-secondary">One Year of Growth</div>
              </div>
            </div>

            {/* Social Placeholders */}
            <div className="flex gap-6">
              {['Twitter', 'Instagram', 'Discord'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 rounded-full border border-navy-light flex items-center justify-center hover:border-blue-ethereal hover:bg-blue-ethereal hover:bg-opacity-10 transition-all duration-300"
                  aria-label={social}
                >
                  <span className="text-sm">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-12 text-sm text-text-secondary">
            © {new Date().getFullYear()} World Tree — 365. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WorldTree365;
