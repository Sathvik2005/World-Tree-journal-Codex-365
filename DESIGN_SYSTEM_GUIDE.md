# 🎨 MYTHIC DESIGN SYSTEM GUIDE

## Complete Design Language for World Tree — 365

---

## 🌌 Color Philosophy

### Primary Palette

```css
Deep Navy Midnight    #081225    • Darkest background, cosmic void
Midnight Deep         #0A1A3D    • Slightly lighter, layered depth
Astral Blue           #3B82F6    • Primary accent, glowing energy
Starlight White       #F8FAFC    • Primary text, pure luminescence
Cosmic Cyan Mist      #67E8F9    • Secondary accent, ethereal glow
```

### Usage Rules

**Backgrounds**:
- Use `midnight` (#081225) as the primary page background
- Layer `midnight-deep` for cards and elevated surfaces
- Never use pure white (#FFFFFF) backgrounds

**Text**:
- Primary text: `starlight` (#F8FAFC)
- Secondary text: `starlight-dim` (#E5E7EB)
- Accent text: `cyan-mist` (#67E8F9)
- Never use pure black text

**Accents**:
- Interactive elements: `astral` (#3B82F6)
- Hover states: `cyan-mist` (#67E8F9)
- Special highlights: `cosmos-purple` (#A78BFA)

### Color Contrast Ratios

| Combination | Ratio | WCAG Level |
|------------|-------|------------|
| Starlight on Midnight | 14.5:1 | AAA |
| Cyan Mist on Midnight | 10.2:1 | AAA |
| Astral on Midnight | 5.8:1 | AA |

---

## ✍️ Typography System

### Font Families

```css
/* Headings - Bold, Legendary */
font-family: 'Montserrat', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Body - Readable, Elegant */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Font Scale

```css
/* Display (Hero Titles) */
h1: clamp(2.5rem, 5vw, 4.5rem)     /* 40px - 72px */
    font-weight: 700
    letter-spacing: 0.02em
    line-height: 1.2

/* Large Headings */
h2: clamp(2rem, 4vw, 3.5rem)       /* 32px - 56px */
    font-weight: 600
    letter-spacing: 0.02em
    line-height: 1.2

/* Section Headings */
h3: clamp(1.5rem, 3vw, 2.5rem)     /* 24px - 40px */
    font-weight: 600
    letter-spacing: 0.015em
    line-height: 1.3

/* Card Titles */
h4: 1.25rem - 1.5rem               /* 20px - 24px */
    font-weight: 600
    letter-spacing: 0.01em

/* Body Text */
p: 1rem - 1.25rem                  /* 16px - 20px */
   font-weight: 400
   letter-spacing: 0.015em
   line-height: 1.75

/* Small Text */
small: 0.875rem                    /* 14px */
       font-weight: 400
       letter-spacing: 0.01em
```

### Typography Do's & Don'ts

✅ **Do**:
- Use Montserrat for all headings
- Use Inter for all body text
- Maintain generous line height (1.75 for body)
- Use letter-spacing for readability
- Use clamp() for responsive sizing

❌ **Don't**:
- Mix more than 2 font families
- Use font sizes below 14px
- Use tight line heights (< 1.4)
- Use all caps for long text
- Use italic for emphasis (use bold instead)

---

## 🎬 Animation Principles

### Core Philosophy

**"Whispering Magic, Not Chaotic Noise"**

All animations should feel:
- **Slow**: 3s - 6s minimum for ambient effects
- **Graceful**: Ease-in-out curves, no linear motion
- **Alive**: Continuous loops that breathe
- **Purposeful**: Every animation communicates meaning

### Animation Categories

#### 1. Ambient (Always Running)
```css
Duration: 4s - 8s
Purpose: Create atmosphere
Examples: 
  - Particle drift
  - Glow pulsing
  - Breathing effects
```

#### 2. Entrance (On Mount)
```css
Duration: 0.8s - 2s
Purpose: Reveal elements gracefully
Examples:
  - Fade in
  - Draw lines
  - Bloom effects
```

#### 3. Scroll-Triggered (On View)
```css
Duration: 0.6s - 1.5s
Purpose: Progressive disclosure
Examples:
  - Section reveals
  - Spark ignition
  - Timeline growth
```

#### 4. Interactive (On Hover/Click)
```css
Duration: 0.3s - 0.6s
Purpose: Provide feedback
Examples:
  - Button hover
  - Card lift
  - Glow intensify
```

### Easing Functions

```css
/* Entrances */
ease-out: cubic-bezier(0.16, 1, 0.3, 1)

/* Exits */
ease-in: cubic-bezier(0.7, 0, 0.84, 0)

/* Smooth Transitions */
ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)

/* Bouncy (sparingly) */
spring: cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Animation Do's & Don'ts

✅ **Do**:
- Use `will-change` for frequently animated properties
- Respect `prefers-reduced-motion`
- Keep durations above 300ms
- Use GPU-accelerated properties (transform, opacity)
- Loop seamlessly (0% and 100% match)

❌ **Don't**:
- Animate layout properties (width, height, margin)
- Create infinite rapid loops (< 2s)
- Overlay too many animations
- Use bounce/elastic for text
- Ignore accessibility settings

---

## 🧩 Component Patterns

### Card Anatomy

```jsx
<div className="glass-effect rounded-2xl p-8 mythic-border hover:shadow-glow-cyan">
  {/* Icon */}
  <div className="text-5xl mb-4 animate-pulse-glow">
    ✦
  </div>
  
  {/* Title */}
  <h3 className="text-2xl font-bold mb-4 text-cyan-mist">
    Card Title
  </h3>
  
  {/* Body */}
  <p className="text-base text-starlight-dim">
    Description text goes here with comfortable line height.
  </p>
  
  {/* Action (optional) */}
  <button className="mt-6 px-5 py-2 bg-astral/20 rounded-full">
    Action
  </button>
</div>
```

### Button Styles

```css
/* Primary */
.btn-primary {
  background: rgba(59, 130, 246, 0.2);
  color: #3B82F6;
  border: 1px solid rgba(59, 130, 246, 0.3);
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

/* Secondary */
.btn-secondary {
  background: rgba(103, 232, 249, 0.1);
  color: #67E8F9;
  border: 1px solid rgba(103, 232, 249, 0.2);
}

/* Ghost */
.btn-ghost {
  background: transparent;
  border: 1px solid rgba(248, 250, 252, 0.2);
  color: #F8FAFC;
}
```

### Section Layout

```jsx
<section className="relative py-32 px-6">
  {/* Background Effects */}
  <GlowingRunes section="story" density="medium" />
  
  {/* Content Container */}
  <div className="max-w-4xl mx-auto relative z-10">
    {/* Section Title */}
    <h2 className="text-5xl font-bold text-center mb-8 glow-text">
      Section Title
    </h2>
    
    {/* Decorative Divider */}
    <RuneDivider />
    
    {/* Section Content */}
    <div className="space-y-8">
      {/* Cards, text, etc. */}
    </div>
  </div>
</section>
```

---

## 🌟 Effects Library

### Glass Morphism

```css
.glass-effect {
  background: rgba(8, 18, 37, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(103, 232, 249, 0.2);
  border-radius: 1rem;
}
```

**Usage**: Cards, modals, overlays

### Glow Effects

```css
/* Text Glow */
.glow-text {
  text-shadow: 0 0 20px rgba(103, 232, 249, 0.6);
}

/* Box Glow */
.glow-box {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}

/* Inner Glow */
.inner-glow {
  box-shadow: inset 0 0 20px rgba(103, 232, 249, 0.3);
}
```

### Gradient Text

```css
.text-shimmer {
  background: linear-gradient(
    90deg,
    #F8FAFC 0%,
    #67E8F9 50%,
    #F8FAFC 100%
  );
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite;
}
```

---

## 📐 Spacing System

```css
/* Base Unit: 4px (0.25rem) */

/* Micro Spacing */
xs: 0.25rem   /* 4px */
sm: 0.5rem    /* 8px */
md: 1rem      /* 16px */

/* Standard Spacing */
lg: 1.5rem    /* 24px */
xl: 2rem      /* 32px */
2xl: 3rem     /* 48px */

/* Macro Spacing */
3xl: 4rem     /* 64px */
4xl: 6rem     /* 96px */
5xl: 8rem     /* 128px */

/* Section Spacing */
section-py: 8rem   /* 128px vertical padding */
```

### Spacing Guidelines

**Component Internal**:
- Icon to title: `1rem`
- Title to body: `1rem`
- Body to action: `1.5rem`

**Between Components**:
- Cards in grid: `2rem`
- Sections: `8rem`

**Container Padding**:
- Mobile: `1.5rem`
- Desktop: `2rem` - `4rem`

---

## 🎯 Iconography

### Icon Style

- **Line-based**: Stroke width 1.5px - 2px
- **Size**: 24px - 48px for UI, 64px+ for hero
- **Color**: Match text color or use accent
- **Glow**: Optional `filter: drop-shadow(0 0 10px currentColor)`

### Icon Sources

1. **Emoji**: For quick prototyping (✦, 🌳, 📜, 🌱)
2. **Runes**: Unicode Elder Futhark (ᚱ, ᛉ, ᛟ)
3. **Custom SVG**: For brand-specific icons

### Icon Usage

```jsx
{/* Emoji Icon */}
<div className="text-5xl animate-pulse-glow">
  ✦
</div>

{/* Rune Icon */}
<div className="text-4xl text-cyan-mist" style={{ fontFamily: 'serif' }}>
  ᛉ
</div>

{/* SVG Icon (outlined) */}
<svg className="w-12 h-12 text-astral" stroke="currentColor" strokeWidth="2">
  {/* paths */}
</svg>
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */

/* Small Devices */
@media (max-width: 640px) {
  /* Phones */
}

/* Medium Devices */
@media (min-width: 768px) {
  /* Tablets */
}

/* Large Devices */
@media (min-width: 1024px) {
  /* Laptops */
}

/* Extra Large */
@media (min-width: 1280px) {
  /* Desktops */
}
```

### Responsive Strategy

**Mobile (< 768px)**:
- Single column layouts
- Reduce font sizes by 20-30%
- Stack navigation
- Increase touch targets (44px min)
- Reduce particle count (40 particles)

**Tablet (768px - 1024px)**:
- 2-column grids
- Standard font sizes
- Hybrid navigation
- Standard interactions

**Desktop (> 1024px)**:
- Multi-column layouts
- Full animations
- Hover effects
- Maximum particle count (80-100)

---

## ♿ Accessibility Guidelines

### Color Contrast

- **AAA Standard**: 7:1 for normal text, 4.5:1 for large text
- All primary text meets AAA
- All interactive elements meet AA minimum

### Focus States

```css
:focus-visible {
  outline: 2px solid #67E8F9;
  outline-offset: 4px;
  border-radius: 4px;
}
```

### Motion Sensitivity

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Readers

- Use semantic HTML (`<nav>`, `<main>`, `<article>`)
- Add `aria-label` to icon-only buttons
- Use `alt` text for decorative SVGs: `aria-hidden="true"`
- Maintain logical heading hierarchy

---

## 🔧 Implementation Checklist

### Every New Component Should:

- [ ] Use Tailwind classes for spacing/sizing
- [ ] Follow mythic color palette (no custom colors)
- [ ] Include hover states for interactive elements
- [ ] Respect `prefers-reduced-motion`
- [ ] Have proper focus states
- [ ] Be responsive (test mobile/desktop)
- [ ] Use Montserrat for headings, Inter for body
- [ ] Include appropriate animation (if any)
- [ ] Have semantic HTML structure
- [ ] Match glass effect style if elevated

### Every New Page Should:

- [ ] Include CosmicParticles background
- [ ] Use GlowingRunes for atmosphere
- [ ] Implement scroll-triggered reveals
- [ ] Have consistent section spacing (8rem)
- [ ] Include RuneDividers between sections
- [ ] Use MythicLogo in header/footer
- [ ] Maintain midnight background
- [ ] Follow scroll-driven narrative flow
- [ ] Include scroll progress indicator
- [ ] Test all breakpoints

---

## 📚 Code Examples

### Full Mythic Page Template

```jsx
import React, { useEffect, useState } from 'react';
import { CosmicParticles, GlowingRunes, RuneDivider, MythicLogo } from '../components/Mythic';

const MyMythicPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-midnight text-starlight min-h-screen">
      {/* Cosmic Background */}
      <CosmicParticles count={80} enableMouseReaction enableScrollReaction />
      
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-midnight-deep z-50">
        <div 
          className="h-full bg-gradient-to-r from-astral via-cyan-mist to-starlight"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center">
        <GlowingRunes section="hero" density="low" />
        <div className="relative z-10 text-center">
          <MythicLogo size={300} animate showTimeRings />
          <h1 className="text-7xl font-bold mt-8 glow-text">Page Title</h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-32 px-6 scroll-reveal-section">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center mb-8">Section Title</h2>
          <RuneDivider />
          <p className="text-xl text-starlight-dim text-center">
            Your content here...
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 border-t border-astral/20">
        <div className="text-center text-sm text-starlight-dim">
          © 2026 Mythic Codex
        </div>
      </footer>
    </div>
  );
};

export default MyMythicPage;
```

---

## 🎨 Figma/Design Tool Setup

### Color Swatches

```
midnight         #081225
midnight-deep    #0A1A3D
astral           #3B82F6
starlight        #F8FAFC
cyan-mist        #67E8F9
cosmos-purple    #A78BFA
```

### Text Styles

```
H1 Display       Montserrat Bold 72px
H2 Large         Montserrat SemiBold 56px
H3 Section       Montserrat SemiBold 40px
H4 Card          Montserrat SemiBold 24px
Body Large       Inter Regular 20px
Body             Inter Regular 16px
Small            Inter Regular 14px
```

### Effect Styles

```
Glass Morphism   Background: #08122599, Blur: 10px
Glow Astral      Shadow: 0 0 20px #3B82F680
Glow Cyan        Shadow: 0 0 20px #67E8F980
```

---

## 🚀 Performance Guidelines

### Animation Performance

- Use `transform` and `opacity` only (GPU accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly and remove after animation
- Limit concurrent animations to 5-7 on screen

### Particle System

- Mobile: 40 particles max
- Desktop: 80 particles max
- Use `requestAnimationFrame` for smooth 60fps
- Implement visibility check (pause when off-screen)

### Images & Assets

- Use SVG for icons and logos
- Optimize PNGs with TinyPNG
- Lazy load images below fold
- Use `loading="lazy"` attribute

---

**✦ · ✦ · ✦**

*This design system is alive—it grows and evolves with the legend.*
