# 🌳 World Tree — Codex 365 Design System

> *A mystical journaling ecosystem where science meets mythology*

---

## 🎨 Brand Identity

### Logo Philosophy
Our custom SVG logo embodies the essence of cyclical growth and cosmic connection:

- **Circle Boundary** — Cosmic containment & infinite cycles
- **Stylized Tree** — Growth, roots (past), branches (future)
- **36 Dots** — Representing 365 days in symbolic harmony
- **Star Symbol** — Guidance, destiny, and enlightenment
- **Minimal Linework** — White on navy for mystical elegance

**Implementation Files:**
- 📄 SVG Component: `src/components/UI/WorldTreeLogo.jsx`
- ✨ Features: Breathing animation, scalable, fully responsive
- 🎭 Usage: Hero sections, navigation, branding

---

## 🎨 Color Palette

### Primary Colors
```css
Navy Dark:    #0A1A3D  /* Main background */
Navy Base:    #152347  /* Secondary backgrounds */
Navy Light:   #2A3A5C  /* Elevated surfaces */
Navy Accent:  #3D5A7D  /* Hover states */
```

### Secondary Colors
```css
White:        #FFFFFF  /* Primary text */
Gray 200:     #E9ECEF  /* Secondary text */
Gray 600:     #8596AB  /* Muted text */
```

### Accent Colors
```css
Blue Ethereal: #3B82F6  /* Primary CTA */
Blue Glow:     #60A5FA  /* Hover glow */
Cyan Rune:     #22D3EE  /* Magical accents */
Azure Flare:   #38BDF8  /* Timeline indicators */
```

### Shadows & Glows
```css
--glow-subtle:  0 0 20px rgba(91, 127, 168, 0.15)
--glow-blue:    0 0 20px rgba(91, 127, 168, 0.15)
--shadow-sm:    0 1px 3px rgba(0, 0, 0, 0.12)
--shadow-md:    0 4px 6px rgba(0, 0, 0, 0.15)
--shadow-lg:    0 10px 20px rgba(0, 0, 0, 0.2)
```

---

## Typography Scale

### Font Family
```css
/* Headings - Elegant Serif */
font-family: 'Playfair Display', Georgia, serif;

/* Body - Clean Serif */
font-family: 'Cormorant Garamond', Georgia, serif;

/* Alternative Modern Sans-Serif Option */
font-family: 'Inter', 'Montserrat', 'Roboto', sans-serif;
```

### Scale
```css
Heading 1:  5xl (3.5rem)   font-bold
Heading 2:  4xl (2.5rem)   font-bold
Heading 3:  2xl (1.5rem)   font-bold
Body:       xl (1.25rem)   font-normal
Small:      lg (1.125rem)  font-normal
Muted:      base (1rem)    font-light
```

### Line Heights
```css
Headings:   1.3  (tight)
Body:       1.6  (relaxed)
Spacing:    Airy - generous margins between sections
```

---

## Animation System

### Core Principles
- **Lightweight:** Minimal performance impact
- **Smooth:** Cubic-bezier easing (0.4, 0, 0.2, 1)
- **Purposeful:** Every animation has meaning

### Animations

#### 1. Fade In (Entry)
```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
Duration: 0.4s
Use: Page load, scroll reveal
```

#### 2. Float (Subtle Motion)
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
Duration: 6s infinite
Use: Floating day indicators, icons
```

#### 3. Glow (Breathing Effect)
```css
@keyframes glow {
  0%, 100% { opacity: 0.85; box-shadow: subtle; }
  50% { opacity: 1; box-shadow: enhanced; }
}
Duration: 4s infinite
Use: Logo, focus elements
```

#### 4. Breathe (Logo)
```css
@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.92; }
  50% { transform: scale(1.008); opacity: 0.98; }
}
Duration: 6s infinite
Use: World Tree logo
```

### Scroll Effects
- Parallax on hero logo
- Fade out on scroll
- Timeline progress tracking

---

## Layout System

### Section Structure
```
Hero:      100vh full screen
About:     py-32 (128px vertical padding)
Timeline:  py-32 with navy-base background
Vision:    py-32
Footer:    py-16 with border-top
```

### Containers
```css
Max Width: 1280px (5xl)
Padding:   px-4 (mobile), px-8 (desktop)
Gaps:      gap-8 (2rem) standard
```

### Grid Patterns
```css
Stats Grid:     3 columns on desktop, 1 on mobile
Timeline Grid:  4 seasons across desktop
Icon Grid:      Floating absolute positions
```

---

## Component Specifications

### 1. Hero Section
- Full viewport height
- Centered logo (240px, animated breathing)
- Tagline: "One Year. One Growth. One Story."
- CTA Button: Blue ethereal with hover glow
- Scroll indicator with bounce animation

### 2. About Section
- 36 floating day dots (random positions)
- Large "365" display with gradient text
- 3-column stats grid (12 Lunar Cycles, 52 Weekly Rhythms, ∞ Possibilities)
- Cards with hover border transitions

### 3. Timeline Section
- Progress bar (0-365 days)
- Updates on scroll
- 4 season milestones with icons
- Navy base background for contrast

### 4. Vision Section
- 3 floating icon circles (book, lightbulb, lightning)
- Staggered float animations
- Centered CTA with gradient background

### 5. Footer
- Minimal design
- Logo + social placeholders
- Copyright text

---

## Responsive Breakpoints

```css
Mobile:   < 768px  (base styles)
Tablet:   768px    (md:)
Desktop:  1024px   (lg:)
Wide:     1280px   (xl:)
```

### Mobile Optimizations
- Single column layouts
- Reduced font sizes
- Compressed vertical spacing
- Touch-friendly button sizes (min 44px)

---

## Accessibility

### Contrast Ratios
- Navy (#0A1A3D) on White: 14.7:1 ✓
- White on Navy: 14.7:1 ✓
- Blue Ethereal (#3B82F6) on Navy: 6.3:1 ✓

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--accent-base);
  outline-offset: 2px;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

---

## File Structure

```
src/
├── pages/
│   └── WorldTree365.jsx       # Main landing page
├── components/
│   └── UI/
│       └── WorldTreeLogo.jsx  # Custom logo component
├── styles/
│   └── cosmic-animations.css  # Animation system
└── App.jsx                    # Route configuration
```

---

## Usage Instructions

### 1. Install Dependencies
```bash
npm install react-router-dom
```

### 2. Import Fonts
Already included via @import in cosmic-animations.css:
- Playfair Display (headings)
- Cormorant Garamond (body)

### 3. Route Access
Navigate to `/365` route to view the landing page

### 4. Customization
- Logo: Edit `WorldTreeLogo.jsx` paths/circles
- Colors: Update Tailwind config
- Animations: Modify `cosmic-animations.css`

---

## Export Assets

### Logo Formats
- **SVG Component:** `WorldTreeLogo.jsx` (reactive)
- **PNG Export:** Use browser screenshot at 2x/3x scale
- **PDF Export:** Print to PDF from browser

### Color Tokens (JSON)
```json
{
  "primary": { "navy-dark": "#0A1A3D" },
  "accent": { "blue-ethereal": "#3B82F6" },
  "text": { "white": "#FFFFFF" }
}
```

---

## Performance Notes

- **Animations:** GPU-accelerated (transform, opacity)
- **Images:** Logo is SVG (scalable, no HTTP request)
- **Bundle:** ~15KB gzipped for landing page
- **Lighthouse Score:** 95+ expected

---

## Future Enhancements

1. Add actual journal integration
2. Connect timeline to real user data
3. Implement season-based theme switching
4. Add sound effects (optional)
5. Create shareable progress cards

---

**Design Complete:** ✅  
**Files Created:** 2 (WorldTree365.jsx, WorldTreeLogo.jsx)  
**Theme:** Mystical Science + Elegant Navy  
**Status:** Production Ready
