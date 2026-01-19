# ⚡ QUICK START GUIDE

Get the Mythic Codex running in 3 minutes.

---

## 🚀 Installation & Launch

```bash
# 1. Navigate to project
cd e:\HackAura\mythical-world-tree

# 2. Install dependencies (if needed)
npm install

# 3. Start development server
npm run dev
```

**Access**: http://localhost:3001/

---

## 🗺️ Site Navigation

### Main Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Updated with mythic design + logo |
| `/mythic` | **MythicCodex** ⭐ | **NEW** Legendary scroll experience |
| `/365` | WorldTree365 | Original 365 landing page |
| `/journal` | JournalPage | Daily journal entries |
| `/world-tree` | WorldTreePage | Interactive tree visualization |
| `/realms` | RealmsPage | Sky, Midgard, Underworld |
| `/legends` | LegendsPage | Unlocked mythical stories |

### Recommended First Visit

**Start here**: `/mythic` — The complete mythic narrative experience

---

## 🎨 Using Components

### Import Components

```jsx
// Option 1: Named imports
import { 
  LivingWorldTree, 
  CosmicParticles, 
  GlowingRunes, 
  MythicLogo 
} from './components/Mythic';

// Option 2: Individual imports
import LivingWorldTree from './components/Mythic/LivingWorldTree';
import CosmicParticles from './components/Mythic/CosmicParticles';
```

### Basic Page Template

```jsx
import React from 'react';
import { CosmicParticles, GlowingRunes } from '../components/Mythic';

const MyPage = () => (
  <div className="bg-midnight text-starlight min-h-screen">
    {/* Background Effects */}
    <CosmicParticles count={80} />
    
    {/* Hero Section */}
    <section className="relative min-h-screen flex items-center justify-center">
      <GlowingRunes section="hero" density="low" />
      
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold glow-text">
          My Mythic Page
        </h1>
      </div>
    </section>
  </div>
);

export default MyPage;
```

---

## 🎭 Component Props Quick Reference

### LivingWorldTree
```jsx
<LivingWorldTree 
  className="mx-auto"  // Optional: additional classes
/>
```

### CosmicParticles
```jsx
<CosmicParticles 
  count={80}                    // Number of particles
  enableMouseReaction={true}    // React to cursor
  enableScrollReaction={true}   // React to scrolling
/>
```

### GlowingRunes
```jsx
<GlowingRunes 
  section="hero"      // 'hero' | 'story' | 'divider'
  density="medium"    // 'low' | 'medium' | 'high'
/>

{/* Or use divider variant */}
<RuneDivider className="my-12" />
```

### MythicLogo
```jsx
<MythicLogo 
  size={300}            // Size in pixels
  animate={true}        // Play entry animation
  showTimeRings={true}  // Show 365 time markers
/>
```

---

## 🎨 Utility Classes

### Colors
```css
bg-midnight           /* #081225 - darkest background */
bg-midnight-deep      /* #0A1A3D - layered depth */

text-starlight        /* #F8FAFC - primary text */
text-starlight-dim    /* #E5E7EB - secondary text */
text-cyan-mist        /* #67E8F9 - accent text */
text-astral           /* #3B82F6 - primary accent */
```

### Effects
```css
glow-text             /* Text shadow glow */
glow-box              /* Box shadow glow */
glass-effect          /* Frosted glass card */
mythic-border         /* Subtle border + radius */
```

### Animations
```css
animate-pulse-glow    /* Slow pulsing glow (6s) */
animate-breathe       /* Gentle scale breathing (6s) */
animate-fade-in-up    /* Fade in + translate up (0.8s) */
animate-bloom         /* Scale + fade + blur (1s) */
animate-float         /* Vertical floating (6s) */

text-shimmer          /* Gradient shimmer text */
```

---

## 🎬 Animation Timing

| Animation | Duration | Use Case |
|-----------|----------|----------|
| `pulse-glow` | 6s | Ambient glow effects |
| `breathe` | 6s | Gentle scaling |
| `fade-in-up` | 0.8s | Scroll reveals |
| `bloom` | 1s | Card/section entrances |
| `spark-ignite` | 0.6s | Timeline sparks |
| `float` | 6s | Gentle floating elements |

---

## 📐 Layout Helpers

### Section Structure
```jsx
<section className="relative py-32 px-6">
  <div className="max-w-4xl mx-auto relative z-10">
    <h2 className="text-5xl font-bold text-center mb-8 glow-text">
      Section Title
    </h2>
    
    <RuneDivider />
    
    {/* Content */}
  </div>
</section>
```

### Card Structure
```jsx
<div className="glass-effect rounded-2xl p-8 mythic-border hover:shadow-glow-cyan transition-all duration-300">
  <div className="text-5xl mb-4 animate-pulse-glow">
    ✦
  </div>
  
  <h3 className="text-2xl font-bold mb-4 text-cyan-mist">
    Card Title
  </h3>
  
  <p className="text-base text-starlight-dim">
    Card description text...
  </p>
</div>
```

---

## 🎯 Common Patterns

### Full-Screen Hero
```jsx
<section className="relative min-h-screen flex items-center justify-center">
  <GlowingRunes section="hero" density="low" />
  
  <div className="relative z-10 text-center">
    <LivingWorldTree />
    <h1 className="text-7xl font-bold mt-8 glow-text">
      Title
    </h1>
  </div>
</section>
```

### Scroll-Reveal Section
```jsx
<section className="scroll-reveal-section relative py-32 px-6" id="unique-id">
  {/* Content will fade in when 75% visible */}
</section>
```

### Progress Bar
```jsx
<div className="fixed top-0 left-0 right-0 h-1 bg-midnight-deep z-50">
  <div 
    className="h-full bg-gradient-to-r from-astral via-cyan-mist to-starlight"
    style={{ width: `${scrollProgress}%` }}
  />
</div>
```

---

## 🐛 Troubleshooting

### Issue: Animations not playing
**Fix**: Ensure CSS is imported in App.jsx:
```jsx
import './styles/mythic-animations.css';
```

### Issue: Particles not visible
**Fix**: Verify CosmicParticles is rendered before other content:
```jsx
<div className="bg-midnight">
  <CosmicParticles count={80} />
  {/* Other content */}
</div>
```

### Issue: Fonts look wrong
**Fix**: Check mythic-animations.css is loaded (contains @import for Google Fonts)

### Issue: Colors look different
**Fix**: Use exact Tailwind classes from config:
```jsx
// ✅ Correct
<div className="bg-midnight text-starlight">

// ❌ Wrong (old colors)
<div className="bg-navy-dark text-text-primary">
```

---

## 📚 Documentation Links

- **Complete Guide**: See `MYTHIC_CODEX_README.md`
- **Design System**: See `DESIGN_SYSTEM_GUIDE.md`
- **Visual Reference**: See `VISUAL_SHOWCASE.md`
- **Summary**: See `PROJECT_COMPLETION_SUMMARY.md`

---

## 💡 Tips & Best Practices

### Do's ✅
- Use Montserrat for headings, Inter for body
- Keep animations slow (3s+)
- Use `glass-effect` for elevated surfaces
- Add `glow-text` to important headings
- Respect scroll-reveal patterns
- Test mobile responsive

### Don'ts ❌
- Don't use old color classes (navy-*, green-*)
- Don't animate layout properties (width, height)
- Don't exceed 100 particles on mobile
- Don't use pure black (#000) for text
- Don't stack too many animations (5-7 max)

---

## 🎨 Color Picker

```
Copy these hex codes for design tools:

Midnight:        #081225
Midnight Deep:   #0A1A3D
Astral Blue:     #3B82F6
Starlight White: #F8FAFC
Cyan Mist:       #67E8F9
Cosmos Purple:   #A78BFA
```

---

## ⚡ Performance Tips

1. **Reduce particles on mobile**: Use `count={40}` for mobile devices
2. **Lazy load components**: Import heavy components dynamically
3. **Optimize images**: Use WebP format when possible
4. **Debounce scroll**: Limit scroll event frequency
5. **Use `will-change`**: Only on actively animating elements

---

## 🚀 Next Steps

1. **Explore** `/mythic` route to see full implementation
2. **Read** design system docs for deep dive
3. **Create** your own mythic page using templates
4. **Customize** colors/animations to your needs
5. **Deploy** to production when ready

---

**✦ · ✦ · ✦**

*Ready to build your legend? Start with `/mythic` and explore the cosmos.*

**— World Tree: 365**
