import React, { useEffect, useRef, useState } from 'react';
import LivingWorldTree from '../components/Mythic/LivingWorldTree';
import GlowingRunes, { RuneDivider } from '../components/Mythic/GlowingRunes';
import MythicLogo from '../components/Mythic/MythicLogo';
import FireflyStars from '../components/Mythic/FireflyStars';
import SeasonalOverlay from '../components/Mythic/SeasonalOverlay';
import SpiritWisps from '../components/Mythic/SpiritWisps';
import InteractiveRoots from '../components/Mythic/InteractiveRoots';
import GrowthTracker from '../components/Mythic/GrowthTracker';
import HeroEntrance from '../components/Mythic/HeroEntrance';
import ConstellationNav from '../components/Mythic/ConstellationNav';
import { RuneHoverRevealContainer } from '../components/Mythic/RuneTooltip';
import ParallaxLayers from '../components/Mythic/ParallaxLayers';
import TiltCard from '../components/Mythic/TiltCard';

/**
 * MYTHIC CODEX - World Tree 365
 * A scroll-driven narrative experience
 */
const MythicCodex = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [ignitedSparks, setIgnitedSparks] = useState(new Set());
  const [showEntrance, setShowEntrance] = useState(true);
  const [season, setSeason] = useState('spring');
  const heroRef = useRef(null);
  const timelineRef = useRef(null);

  // Track scroll progress for animations
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      
      setScrollProgress(Math.min(progress, 100));

      // Update season based on scroll
      if (progress < 25) setSeason('spring');
      else if (progress < 50) setSeason('summer');
      else if (progress < 75) setSeason('autumn');
      else setSeason('winter');

      // Hero parallax fade
      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        const heroProgress = Math.min(scrolled / heroHeight, 1);
        heroRef.current.style.opacity = 1 - heroProgress * 0.7;
        heroRef.current.style.transform = `translateY(${heroProgress * 100}px)`;
      }

      // Reveal sections on scroll
      const sections = document.querySelectorAll('.scroll-reveal-section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < windowHeight * 0.75 && rect.bottom > 0;
        
        if (isVisible && !section.classList.contains('revealed')) {
          section.classList.add('revealed');
          setVisibleSections(prev => new Set([...prev, section.id]));
        }
      });

      // Ignite sparks based on scroll progress in timeline
      if (timelineRef.current) {
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const timelineStart = timelineRect.top + scrolled;
        const timelineHeight = timelineRect.height;
        
        if (scrolled > timelineStart - windowHeight && scrolled < timelineStart + timelineHeight) {
          const timelineProgress = (scrolled - (timelineStart - windowHeight)) / (timelineHeight + windowHeight);
          const sparksToIgnite = Math.floor(timelineProgress * 365);
          setIgnitedSparks(new Set([...Array(sparksToIgnite).keys()]));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Chapter data
  const chapters = [
    {
      id: 'seed',
      title: 'The Seed',
      text: 'In the void before memory, a single seed fell from the cosmic tree. It held within it the promise of 365 dawns, each a step toward becoming.',
      delay: 0
    },
    {
      id: 'roots',
      title: 'The Roots',
      text: 'Beneath the surface, roots spread through shadow and stone. They drink from forgotten streams, anchoring the tree to ancient truth.',
      delay: 0.3
    },
    {
      id: 'trunk',
      title: 'The Trunk',
      text: 'Through seasons of storm and stillness, the trunk rises. It bears the weight of branches yet to bloom, steady in its ascent.',
      delay: 0.6
    },
    {
      id: 'branches',
      title: 'The Branches',
      text: 'From a single point, countless paths emerge. Each branch reaches toward its own star, weaving the tree into constellation.',
      delay: 0.9
    },
    {
      id: 'crown',
      title: 'The Crown',
      text: 'At the summit, leaves catch starlight. The tree breathes in cosmic dust and exhales legend. It has become eternal.',
      delay: 1.2
    }
  ];

  const sparks = Array.from({ length: 365 }, (_, i) => i);

  const milestones = [
    { day: 1, label: 'First Dawn', season: 'Spring' },
    { day: 100, label: 'Century Mark', season: 'Spring' },
    { day: 180, label: 'Midpoint', season: 'Summer' },
    { day: 270, label: 'Autumn Gate', season: 'Autumn' },
    { day: 365, label: 'Full Circle', season: 'Winter' }
  ];

  return (
    <ParallaxLayers>
      <div className="mythic-codex bg-midnight text-starlight overflow-x-hidden">
        {/* Hero Entrance Animation */}
        {showEntrance && (
          <HeroEntrance onComplete={() => setShowEntrance(false)} />
        )}

        {/* Mythic Atmosphere */}
        <FireflyStars count={60} speed="slow" />
        <SeasonalOverlay season={season} intensity={0.4} />
        <SpiritWisps count={5} />
        
        {/* Constellation Navigation */}
        <ConstellationNav 
          chapters={chapters}
          onNavigate={(id) => {
            const element = document.getElementById(`chapter-${id}`);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        
        {/* Interactive Roots */}
        <InteractiveRoots />
        
        {/* Rune Hover Reveals */}
        <RuneHoverRevealContainer runes={[
          { symbol: 'ᚱ', lore: 'Memory', x: 8, y: 25 },
          { symbol: 'ᛟ', lore: 'Growth', x: 88, y: 18 },
          { symbol: 'ᛉ', lore: 'Origin', x: 12, y: 82 },
          { symbol: '✦', lore: 'Future', x: 85, y: 75 },
          { symbol: 'ᛊ', lore: 'Wisdom', x: 50, y: 50 }
        ]} />
        
        {/* Growth Tracker */}
        <GrowthTracker progress={scrollProgress} totalDays={Math.floor(scrollProgress * 3.65)} />
      {/* HERO PROLOGUE */}
      <section 
        ref={heroRef}
        className="hero-prologue relative min-h-screen flex items-center justify-center"
      >
        <GlowingRunes section="hero" density="low" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-12 animate-fade-in">
            <LivingWorldTree className="mx-auto" />
          </div>

          <h1 
            className="text-6xl md:text-8xl font-bold mb-6 tracking-wide animate-fade-in-up"
            style={{ animationDelay: '0.5s', fontFamily: 'Montserrat, sans-serif' }}
          >
            <span className="text-shimmer">WORLD TREE</span>
          </h1>
          
          <div 
            className="text-2xl md:text-3xl font-light mb-8 tracking-widest text-cyan-mist animate-fade-in-up"
            style={{ animationDelay: '0.8s' }}
          >
            —— 365 ——
          </div>

          <p 
            className="text-xl md:text-2xl text-starlight-dim font-light italic max-w-2xl mx-auto mb-12 animate-fade-in-up"
            style={{ animationDelay: '1.1s', fontFamily: 'Inter, sans-serif' }}
          >
            "From a single seed, through 365 dawns, a legend unfolds"
          </p>

          <button 
            className="group relative px-8 py-4 text-lg font-medium mythic-border glass-effect hover:glow-box transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: '1.4s' }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="relative z-10">Begin The Journey</span>
            <div className="absolute inset-0 bg-astral opacity-0 group-hover:opacity-20 transition-opacity rounded-lg"></div>
          </button>

          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="text-cyan-mist text-sm tracking-widest mb-2">SCROLL</div>
            <div className="w-px h-12 bg-gradient-to-b from-cyan-mist to-transparent mx-auto"></div>
          </div>
        </div>
      </section>

      {/* ORIGIN OF THE TREE */}
      <section className="origin-section scroll-reveal-section relative py-32 px-6" id="origin">
        <GlowingRunes section="story" density="medium" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 glow-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            The Origin
          </h2>
          
          <RuneDivider />

          <div className="text-center mb-20">
            <p className="text-xl md:text-2xl text-starlight-dim leading-relaxed max-w-3xl mx-auto">
              Before time kept count, there existed only the Void and the Seed.
              <br /><br />
              The cosmic tree promised that through 365 sacred dawns, 
              any soul who tends its roots shall witness their own becoming—
              <br /><br />
              <span className="text-cyan-mist font-medium">a journey from shadow to starlight.</span>
            </p>
          </div>

          <div className="flex justify-center my-20">
            <MythicLogo size={400} animate showTimeRings />
          </div>
        </div>
      </section>

      <RuneDivider className="my-20" />

      {/* CHAPTER CARDS */}
      <section className="chapters-section scroll-reveal-section relative py-32 px-6" id="chapters">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 glow-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Five Chapters of Growth
          </h2>

          <div className="space-y-24">
            {chapters.map((chapter) => (
              <TiltCard key={chapter.id} intensity={10}>
                <div
                  className="chapter-card scroll-reveal-section glass-effect p-8 md:p-12 rounded-lg transform transition-all duration-700 group relative overflow-hidden"
                  id={`chapter-${chapter.id}`}
                  style={{ animationDelay: `${chapter.delay}s` }}
                >
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-astral/5 via-transparent to-cyan-mist/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-cyan-mist" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {chapter.title}
                    </h3>
                    <p className="text-lg md:text-xl text-starlight-dim leading-relaxed">
                      {chapter.text}
                    </p>
                  </div>
                  
                  {/* Floating Rune Accent */}
                  <div className="absolute top-4 right-4 text-cyan-mist/30 text-4xl group-hover:text-cyan-mist/70 group-hover:scale-110 transition-all duration-500">
                    ✦
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <RuneDivider className="my-20" />

      {/* 365 SPARKS TIMELINE */}
      <section 
        ref={timelineRef}
        className="timeline-section scroll-reveal-section relative py-32 px-6" 
        id="timeline"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-8 glow-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            365 Days of Becoming
          </h2>
          
          <p className="text-xl text-center text-starlight-dim mb-20 max-w-2xl mx-auto">
            Each spark represents a dawn. As you journey through the year, 
            watch the timeline ignite with your growth.
          </p>

          <div className="relative mb-16">
            <div className="w-full h-1 bg-midnight-deep rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-astral via-cyan-mist to-starlight transition-all duration-500"
                style={{ width: `${(ignitedSparks.size / 365) * 100}%` }}
              ></div>
            </div>
            
            <div className="text-center mt-4 text-lg text-cyan-mist font-medium">
              {ignitedSparks.size} / 365 Days
            </div>
          </div>

          <div className="sparks-grid grid gap-2 mb-20" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(12px, 1fr))' }}>
            {sparks.map((day) => {
              const milestone = milestones.find(m => m.day === day + 1);
              const isIgnited = ignitedSparks.has(day);
              
              return (
                <div
                  key={day}
                  className={`spark relative transition-all duration-300 ${isIgnited ? 'spark-ignited' : 'spark-dormant'}`}
                  title={milestone ? `Day ${day + 1}: ${milestone.label}` : `Day ${day + 1}`}
                >
                  <div 
                    className={`w-3 h-3 rounded-full ${
                      isIgnited 
                        ? milestone 
                          ? 'bg-starlight shadow-glow-starlight' 
                          : 'bg-cyan-mist shadow-glow-cyan'
                        : 'bg-midnight-deep border border-astral/20'
                    } transition-all duration-300`}
                  ></div>
                  
                  {milestone && isIgnited && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-cyan-mist whitespace-nowrap opacity-0 animate-fade-in">
                      {milestone.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="milestones-legend glass-effect p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Sacred Milestones
            </h3>
            
            <div className="grid md:grid-cols-5 gap-6">
              {milestones.map((milestone) => (
                <div key={milestone.day} className="text-center">
                  <div className="text-3xl font-bold text-cyan-mist mb-2">
                    {milestone.day}
                  </div>
                  <div className="text-sm font-medium text-starlight-dim">
                    {milestone.label}
                  </div>
                  <div className="text-xs text-astral-light mt-1">
                    {milestone.season}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RuneDivider className="my-20" />

      {/* EPILOGUE */}
      <section className="epilogue-section scroll-reveal-section relative py-32 px-6" id="epilogue">
        <GlowingRunes section="divider" density="high" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 glow-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Your Legend Awaits
          </h2>

          <p className="text-2xl md:text-3xl text-starlight-dim leading-relaxed mb-12 max-w-3xl mx-auto">
            365 days. One tree. Infinite growth.
            <br /><br />
            Will you tend the roots of your becoming?
          </p>

          <button className="group relative px-12 py-6 text-xl font-medium mythic-border glass-effect hover:glow-box transition-all duration-300">
            <span className="relative z-10">Join The Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-astral to-cyan-mist opacity-0 group-hover:opacity-30 transition-opacity rounded-lg"></div>
          </button>

          <div className="mt-20 text-6xl animate-pulse-glow">
            ✦
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-16 px-6 border-t border-astral/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <MythicLogo size={60} />
            <div>
              <div className="text-xl font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                WORLD TREE — 365
              </div>
              <div className="text-sm text-starlight-dim">
                A Year of Becoming
              </div>
            </div>
          </div>

          <div className="flex gap-8 text-sm text-starlight-dim">
            <a href="#" className="hover:text-cyan-mist transition-colors">About</a>
            <a href="#" className="hover:text-cyan-mist transition-colors">Guide</a>
            <a href="#" className="hover:text-cyan-mist transition-colors">Community</a>
          </div>

          <div className="text-sm text-starlight-dim">
            © 2026 Mythic Codex
          </div>
        </div>

        <div className="text-center mt-8 text-cyan-mist opacity-40">
          ✦ · ✦ · ✦
        </div>
      </footer>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-midnight-deep z-50">
        <div 
          className="h-full bg-gradient-to-r from-astral via-cyan-mist to-starlight transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <style jsx>{`
        .spark-ignited {
          animation: spark-ignite 0.6s ease-out forwards;
        }

        @keyframes spark-ignite {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
    </ParallaxLayers>
  );
};

export default MythicCodex;
