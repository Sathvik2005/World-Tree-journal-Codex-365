# 🌳 WORLD TREE — 365: MYTHIC CODEX

> *A legendary, scroll-driven storytelling experience crafted from myth and starlight.*

---

## ✨ Design Philosophy

**Whispering Magic, Not Chaotic Noise**

This is not a website—it is a **living legend**, a **mythic artifact** that breathes with cosmic energy. Every animation is slow, graceful, and alive. Every scroll reveals a new chapter. Every spark tells a story.

---

## 🎨 Visual Identity

### Color Palette

```css
/* Mythic Base */
--midnight: #081225           /* Deep Navy Midnight - darkest background */
--midnight-deep: #0A1A3D      /* Slightly lighter midnight */

/* Primary Astral */
--astral: #3B82F6             /* Astral Blue Glow - primary accent */
--astral-light: #60A5FA       /* Lighter astral */

/* Starlight & Luminescence */
--starlight: #F8FAFC          /* Starlight White - primary text */

/* Cosmic Cyan Mist */
--cyan-mist: #67E8F9          /* Cosmic Cyan Mist - accent */
--cyan-deep: #06B6D4          /* Deep cyan */

/* Mysticism */
--cosmos-purple: #A78BFA      /* Purple mysticism */

/* Void & Shadow */
--void-black: #000000         /* Pure black */
```

**Philosophy**: Deep cosmic navy + starlight white + astral blue. No harsh greens, no neon, no rainbow gradients.

### Typography

```css
/* Headings */
font-family: 'Montserrat', 'Inter', sans-serif;
font-weight: 600-800;
letter-spacing: 0.02em;

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 400;
line-height: 1.75;
letter-spacing: 0.015em;
```

**Philosophy**: Legendary, timeless, clean. Spacious kerning, airy line height.

---

## 🌌 Core Components

### 1. **LivingWorldTree** (`components/Mythic/LivingWorldTree.jsx`)

The centerpiece hero element—a fully animated SVG World Tree.

**Features**:
- 🌱 Root system grows and spreads on page load
- 🌿 Branches animate upward with flowing light veins
- ✨ Leaves/glyphs appear like sparks of living memory
- 🔮 Soft pulsing aura around the trunk
- 🌊 Seamless loop, slow and mythic

**Style**: Line art + luminous veins, starlight white + astral blue glow

**Usage**:
```jsx
import LivingWorldTree from './components/Mythic/LivingWorldTree';

<LivingWorldTree className="mx-auto" />
```

---

### 2. **CosmicParticles** (`components/Mythic/CosmicParticles.jsx`)

Drifting cosmic dust particles that create otherworldly atmosphere.

**Features**:
- ⭐ Slow drifting specks of light
- 🌠 Parallax layered depth (foreground, mid, deep space)
- 🖱️ Particles react to scroll and mouse movement
- 💫 Three depth layers with varying speeds and sizes

**Usage**:
```jsx
import CosmicParticles from './components/Mythic/CosmicParticles';

<CosmicParticles 
  count={80} 
  enableMouseReaction 
  enableScrollReaction 
/>
```

---

### 3. **GlowingRunes** (`components/Mythic/GlowingRunes.jsx`)

Ancient glyphs that subtly light up in the background—whispers of forgotten knowledge.

**Features**:
- ᚱ Ancient Nordic/Elder Futhark runes
- 💡 Occasionally light up gently (2-5 second intervals)
- 🌫️ Do NOT overpower text or UI
- 📍 Placement: hero section, story sections, dividers

**Usage**:
```jsx
import GlowingRunes, { RuneDivider } from './components/Mythic/GlowingRunes';

<GlowingRunes section="hero" density="medium" />
<RuneDivider />
```

**Sections**: `hero`, `story`, `divider`  
**Density**: `low`, `medium`, `high`

---

### 4. **MythicLogo** (`components/Mythic/MythicLogo.jsx`)

The new hero logo—a luminous branching World Tree with 365 time rings.

**Features**:
- 🌳 Branching World Tree structure
- ⭕ 365 time markers in three concentric rings (60 + 100 + 205 dots)
- ✨ Branches forming constellations with star nodes
- ⭐ Single crown star above the tree
- 🎨 Elegant line art with subtle glow
- 🔄 Optional animation on mount

**Usage**:
```jsx
import MythicLogo from './components/Mythic/MythicLogo';

<MythicLogo 
  size={300} 
  animate={true} 
  showTimeRings={true} 
/>
```

---

## 📜 Mythic Codex Page Structure

### Route: `/mythic`

**Scroll-Driven Narrative Experience**

The site unfolds like a **mythic codex**—each section is a chapter, each scroll reveals new knowledge.

#### Section Breakdown:

1. **Hero Prologue**
   - Full-screen cosmic navy field
   - Central animated Living World Tree
   - Title: "WORLD TREE — 365"
   - Subtitle: "From a single seed, through 365 dawns, a legend unfolds"
   - CTA: "Begin The Journey"
   - Ambient starlight particles
   - Glowing background runes

2. **Origin of the Tree**
   - Story of the cosmic seed and the void
   - Mythic Logo display with 365 time rings
   - Scroll-triggered fade-in
   - Rune dividers

3. **Five Chapters of Growth**
   - **The Seed** 🌱: The promise of 365 dawns
   - **The Roots** ᚱ: Anchoring to ancient truth
   - **The Trunk** ⎊: Steady ascent through seasons
   - **The Branches** ᛉ: Paths emerging into constellation
   - **The Crown** ✦: Eternal starlight
   - Each chapter blooms into view on scroll
   - Glass effect cards with glowing icons

4. **365 Sparks Timeline**
   - Subtle progress line that grows as user scrolls
   - 365 tiny orbs that ignite one by one
   - Milestone markers (Days 1, 100, 180, 270, 365)
   - Real-time progress tracking
   - Seasonal color coding

5. **Epilogue**
   - "Your Legend Awaits"
   - Message of growth and destiny
   - Final CTA: "Join The Journey"
   - Closing symbol: ✦

6. **Footer**
   - Minimal with mythic logo
   - Quick links
   - Star divider
   - Copyright

---

## 🎬 Animation System

### Philosophy

**Slow, elegant, alive.** No flicker, shake, heavy blur, neon, or rapid animations.

### Core Animations (`styles/mythic-animations.css`)

| Animation | Duration | Purpose |
|-----------|----------|---------|
| `pulse-glow` | 6s | Soft pulsing aura around elements |
| `breathe` | 6s | Gentle scale breathing effect |
| `star-drift` | 8s | Falling starlight particles |
| `fade-in-up` | 0.8s | Scroll-triggered reveal |
| `orbit-slow` | 20s | Slow circular orbital motion |
| `glow-intensify` | 3s | Box shadow glow pulse |
| `line-grow` | 1.5s | Progress line growing animation |
| `bloom` | 1s | Scale + fade + blur reveal |
| `spark-ignite` | 0.6s | Timeline spark ignition |
| `float` | 6s | Gentle vertical floating |
| `shimmer` | 3s | Text gradient shimmer effect |

### Scroll-Triggered Animations

```jsx
// Elements with class .scroll-reveal-section automatically fade in on scroll
<section className="scroll-reveal-section" id="unique-id">
  {/* Content */}
</section>
```

**How it works**: JavaScript IntersectionObserver detects when 75% of element enters viewport, adds `.revealed` class.

---

## 🛠️ Technical Implementation

### File Structure

```
src/
├── components/
│   └── Mythic/
│       ├── LivingWorldTree.jsx     # Animated SVG tree centerpiece
│       ├── CosmicParticles.jsx     # Canvas particle system
│       ├── GlowingRunes.jsx        # Ancient rune background
│       └── MythicLogo.jsx          # 365-ring logo
├── pages/
│   ├── MythicCodex.jsx             # Main mythic experience page
│   └── HomePage.jsx                # Updated with mythic styling
├── styles/
│   ├── mythic-animations.css       # All animations + fonts
│   ├── mythical-themes.css         # Legacy theme support
│   └── realm-gradients.css         # Realm-specific gradients
└── App.jsx                         # Routes configured
```

### Routes

```jsx
/mythic      → MythicCodex (NEW - legendary scroll experience)
/365         → WorldTree365 (original 365 landing page)
/            → HomePage (updated with mythic design)
/journal     → JournalPage
/world-tree  → WorldTreePage
/realms      → RealmsPage
/legends     → LegendsPage
```

---

## 🌟 Accessibility

### Reduced Motion Support

All animations respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--color-cyan-mist);
  outline-offset: 4px;
}

button:focus-visible {
  box-shadow: 0 0 0 3px rgba(103, 232, 249, 0.3);
}
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile: 320px - 768px */
/* Tablet: 768px - 1024px */
/* Desktop: 1024px+ */
```

### Typography Scaling

```css
h1: clamp(2.5rem, 5vw, 4.5rem)
h2: clamp(2rem, 4vw, 3.5rem)
h3: clamp(1.5rem, 3vw, 2.5rem)
```

---

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Navigate to:
- **Mythic Codex**: `http://localhost:3001/mythic`
- **Home Page**: `http://localhost:3001/`
- **Original 365**: `http://localhost:3001/365`

### Build

```bash
npm run build
```

---

## 🎯 Design Tokens

### Spacing

```css
--spacing-breath: 1.75  /* Line height multiplier */
```

### Timing

```css
--timing-slow: 6s
--timing-medium: 3s
--timing-fast: 1.5s
```

### Shadows

```css
.glow-astral    → 0 0 20px rgba(59, 130, 246, 0.5)
.glow-cyan      → 0 0 20px rgba(103, 232, 249, 0.5)
.glow-starlight → 0 0 30px rgba(248, 250, 252, 0.3)
```

### Borders

```css
.mythic-border → 1px solid rgba(59, 130, 246, 0.3), border-radius: 8px
```

### Glass Effect

```css
.glass-effect → 
  background: rgba(8, 18, 37, 0.6)
  backdrop-filter: blur(10px)
  border: 1px solid rgba(103, 232, 249, 0.2)
```

---

## 🧙 Usage Examples

### Full Page with All Elements

```jsx
import LivingWorldTree from '../components/Mythic/LivingWorldTree';
import CosmicParticles from '../components/Mythic/CosmicParticles';
import GlowingRunes from '../components/Mythic/GlowingRunes';
import MythicLogo from '../components/Mythic/MythicLogo';

const MyPage = () => (
  <div className="bg-midnight text-starlight">
    <CosmicParticles count={80} enableMouseReaction enableScrollReaction />
    
    <section className="relative min-h-screen">
      <GlowingRunes section="hero" density="low" />
      
      <div className="relative z-10">
        <LivingWorldTree />
        <h1 className="text-6xl glow-text">My Mythic Page</h1>
      </div>
    </section>
  </div>
);
```

---

## 📖 Story & Tone

### Voice

- **Mythic**: Ancient, timeless, sacred
- **Poetic**: Flowing, metaphorical
- **Minimal**: Less is more—let visuals breathe

### Writing Guidelines

❌ **Avoid**:
- "Click here"
- "Sign up now"
- Marketing jargon
- Excessive exclamation points

✅ **Use**:
- "Begin the journey"
- "Enter the legend"
- "Discover your becoming"
- Prophecy-style hints

### Example Text

> *"From a single seed, through 365 dawns, a legend unfolds"*

> *"Will you tend the roots of your becoming?"*

> *"Each spark represents a dawn"*

---

## 🔮 Future Enhancements

### Potential Additions

- [ ] Lottie animations for tree growth sequences
- [ ] Audio: ambient cosmic soundscape (optional, user-triggered)
- [ ] Particle interaction: mouse trail leaves stardust
- [ ] Rune tooltips: hover reveals ancient meanings
- [ ] 365 timeline: click individual sparks to see daily reflections
- [ ] Export: download mythic logo as SVG/PNG

---

## 🌠 Credits

**Design Philosophy**: Ancient cosmic storytelling meets modern web design  
**Fonts**: Google Fonts (Inter, Montserrat)  
**Runes**: Elder Futhark Unicode characters  
**Inspiration**: Norse mythology, cosmic trees, sacred geometry

---

## 📜 License

This project is a mythic artifact—use it to inspire, grow, and create legends.

---

**✦ · ✦ · ✦**

*"The tree remembers every dawn. So shall you."*

**— World Tree: 365**
