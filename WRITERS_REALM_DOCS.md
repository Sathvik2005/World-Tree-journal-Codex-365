# Writer's Realm - Complete Feature Documentation

## Overview
The Writer's Realm is a comprehensive creative writing ecosystem built into the Mythical World Tree project. It provides 13+ specialized tools for writers, from distraction-free writing to worldbuilding and character development.

## Features

### 1. Writer's Sanctuary ✍️
**Fullscreen distraction-free writing mode**
- Auto-hiding UI after 3 seconds of inactivity
- Custom cursor with runic glow effect
- Tree silhouette background with breathing animation
- Real-time word count, character count, and read time
- Direct journal integration

**Usage:**
- Click "Enter Sanctuary" from any page
- Press ESC to exit
- Auto-saves to journal when complete

---

### 2. Chapter Forge 🌿
**Branch-based story structure builder**
- Organize chapters as tree branches
- Reorder chapters with up/down arrows
- Chapter editor with title, content, and private notes
- Word count per chapter
- LocalStorage persistence

**Data Structure:**
```javascript
{
  id: number,
  title: string,
  content: string,
  notes: string,
  order: number,
  createdAt: ISO timestamp
}
```

**Storage Key:** `mythical_chapters`

---

### 3. Idea Seeds ✨
**Interactive writing prompt system**
- 25 curated prompts across 5 categories
- Categories: Character (👤), World (🌍), Conflict (⚔️), Theme (💭), Magic (✨)
- Click to expand and view prompt
- "Use This Seed" callback for integration

**Example Prompts:**
- Character: "A warrior who refuses to fight"
- World: "A city built inside a sleeping giant"
- Conflict: "Two heroes hunting the same monster"

---

### 4. Root Archive 🌿
**Draft version history viewer**
- Create snapshots of entire chapter collection
- View past versions with full content
- Delete old versions
- Word and chapter count per version
- Modal interface with smooth animations

**Storage Key:** `mythical_draft_versions`

---

### 5. Rune Editor Toolbar ᚱ
**Minimalist toolbar with runic icons**
- Tools: Bold (ᛒ), Italic (ᛁ), H1/H2 (ᚺ), List (ᛚ)
- Actions: Undo (↶), Redo (↷), Save (ᛋ), Export (ᛖ), Copy (ᚲ)
- Hover glow effects
- onAction callback with selectedText parameter

---

### 6. Ambient Focus Rituals 🍃
**Progress rewards and focus nudges**
- Grows a leaf every 15 minutes of active writing
- Mist settles when idle (1+ minutes)
- Welcome back pulse animation when returning
- Leaf counter badge (bottom-right)
- Fixed overlay, non-blocking

**Behavior:**
- Tracks `lastActivity` timestamp
- `isWriting` prop triggers leaf growth timer
- Mist opacity increases with idle time

---

### 7. Constellation Board 🌌
**Node-based worldbuilding mapper**
- 5 node types: Location, Character, Faction, Event, Artifact
- Drag-and-drop positioning
- Create connections between nodes
- Label connections
- Interactive SVG canvas
- Export as JSON

**Node Types:**
- Location (🏔️ blue)
- Character (👤 cyan)
- Faction (⚔️ purple)
- Event (✦ amber)
- Artifact (💎 green)

**Storage Keys:**
- `mythical_constellation` (nodes)
- `mythical_connections` (relationships)

---

### 8. Timeline Spiral 🌀
**Drag-and-drop event organizer**
- 5 event types: Birth, Conflict, Discovery, Transformation, Ending
- Events glow brighter when clustered (proximity-based)
- Zoom controls (50% - 200%)
- Spiral background visual
- Date/era field for each event

**Glow Logic:**
Distance < 20% → intensity increases by 0.3 per nearby event

**Storage Key:** `mythical_timeline`

---

### 9. Lore Drawer 🗃️
**Quote & fragment storage system**
- 5 categories: Quote, Rule, Detail, Idea, Mystery
- Search across content, source, and tags
- Category filtering
- Tag system (comma-separated)
- Source attribution field

**Fragment Structure:**
```javascript
{
  id: number,
  category: string,
  content: string,
  source: string,
  tags: string[],
  createdAt: ISO timestamp
}
```

**Storage Key:** `mythical_lore_fragments`

---

### 10. Character DNA 👤
**Character blueprint builder**
- 6 archetypes: Hero, Mentor, Ruler, Warrior, Trickster, Tragic
- Core DNA fields:
  - 🎯 Motive (what drives them)
  - ⚠️ Flaw (fatal weakness)
  - 🤫 Secret (hidden past/identity)
  - 📈 Arc (transformation)
- Additional notes field
- Grid archetype selector

**Storage Key:** `mythical_characters`

---

### 11. Ritual Timer ⏳
**Mystical Pomodoro timer**
- Preset durations: 15, 25, 45, 60, 90 minutes
- Circular SVG progress indicator
- Runic markers at cardinal directions
- Session counter (total completed rituals)
- Start/Pause/Reset controls

**Animation:**
- Progress circle with glowing stroke
- Stroke-dashoffset animation (smooth countdown)
- Filter: drop-shadow increases with progress

**Storage Key:** `mythical_ritual_sessions`

---

### 12. Branch-to-Book Export 📖
**Advanced manuscript export**
- Format: Markdown (ready), PDF/DOCX/EPUB (coming soon)
- Options:
  - Include metadata (title page, date, word count)
  - Include chapter notes
  - Chapter numbering
- Generates Table of Contents
- Estimated page count (250 words/page)
- Downloads as .md file with timestamp

**Export Structure:**
1. Title page
2. Table of Contents
3. Chapters (sorted by order)
4. Footer with word count

---

### 13. Spark Vault 🍎
**Inspiration storage system**
- 5 spark types: Visual, Quote, Dream, Observation, Question
- Mark sparks as used/unused
- Filter by type or freshness
- Statistics: total, fresh, used
- Quick-add interface

**Spark Structure:**
```javascript
{
  id: number,
  type: string,
  content: string,
  createdAt: ISO timestamp,
  used: boolean
}
```

**Storage Key:** `mythical_sparks`

---

## Architecture

### Component Structure
```
src/components/Writer/
├── WriterSanctuary.jsx        (Fullscreen mode)
├── ChapterForge.jsx            (Story structure)
├── IdeaSeeds.jsx               (Prompt system)
├── RootArchive.jsx             (Version history)
├── RuneEditorToolbar.jsx       (Toolbar)
├── AmbientFocusRituals.jsx     (Progress rewards)
├── ConstellationBoard.jsx      (Worldbuilding)
├── TimelineSpiral.jsx          (Events)
├── LoreDrawer.jsx              (Fragments)
├── CharacterDNA.jsx            (Characters)
├── RitualTimer.jsx             (Pomodoro)
├── BranchToBook.jsx            (Export)
└── SparkVault.jsx              (Inspiration)

src/pages/
└── WriterHub.jsx               (Main hub page)
```

### Design System
**Colors:**
- Midnight: `#081225` (backgrounds)
- Midnight Deep: `#0A1A3D` (secondary bg)
- Astral: `#3B82F6` (primary accent)
- Cyan Mist: `#67E8F9` (highlights)
- Starlight: `#F8FAFC` (text)

**Typography:**
- Headings: Montserrat (600-700 weight)
- Body: Inter (400-600 weight)

**Effects:**
- `mythic-border` - subtle glow border
- `glass-effect` - frosted glass background
- `glow-box` - hover glow
- `animate-pulse-glow` - pulsing cyan glow

### State Management
- **LocalStorage** for all data persistence
- **React useState** for component state
- **useEffect** for auto-save and timers
- **useMythical** context for journal integration

### Performance
- `useMemo` for filtered lists
- Lazy component loading in WriterHub
- Debounced auto-save (where applicable)
- SVG for scalable graphics

---

## Usage Examples

### Basic Workflow
1. Enter **Sanctuary** for distraction-free writing
2. Save to journal when done
3. Organize in **Chapter Forge**
4. Create **snapshots** in Root Archive
5. **Export** final manuscript

### Worldbuilding Workflow
1. Create **Characters** with DNA builder
2. Map relationships in **Constellation Board**
3. Plot events in **Timeline Spiral**
4. Store lore in **Lore Drawer**
5. Add inspiration to **Spark Vault**

### Writing Session
1. Start **Ritual Timer** (25 min)
2. Open **Sanctuary** to write
3. **Focus Rituals** grows leaves as you write
4. Finish session, review in **Chapters**

---

## Integration

### Adding to Existing Pages
```jsx
import WriterSanctuary from './components/Writer/WriterSanctuary';

const [sanctuaryOpen, setSanctuaryOpen] = useState(false);

// Button to open
<button onClick={() => setSanctuaryOpen(true)}>
  Write
</button>

// Component
{sanctuaryOpen && (
  <WriterSanctuary onClose={() => setSanctuaryOpen(false)} />
)}
```

### Accessing Storage
```javascript
// Get chapters
const chapters = JSON.parse(localStorage.getItem('mythical_chapters') || '[]');

// Get characters
const characters = JSON.parse(localStorage.getItem('mythical_characters') || '[]');

// Get sparks
const sparks = JSON.parse(localStorage.getItem('mythical_sparks') || '[]');
```

---

## Future Enhancements

### Planned Features
1. **Dreamspace Generator** - Gravity-based idea clustering
2. **Map of Realms** - Sketch canvas for locations
3. **Lore Thread Web** - Word linking visualization
4. **Tone Alchemist** - Mood slider affecting UI
5. **Consistency Scanner** - Name/date contradiction detection
6. **Myth Scroll Exports** - Long PNG scroll-style exports
7. **Persona Masks** - Writer identity mode switcher
8. **Firekeeper Publishing** - Notion/Medium connectors
9. **Oracle of Themes** - Theme density tracker

### Export Improvements
- PDF generation with styling
- DOCX with Word formatting
- EPUB for e-readers
- Custom cover page designer
- Font and styling options

### Collaboration Features
- Share constellations as images
- Export character sheets
- Timeline visualization as PNG
- Shareable spark collections

---

## Technical Notes

### Browser Compatibility
- Requires modern browser with LocalStorage
- SVG support (all modern browsers)
- CSS Grid and Flexbox

### Performance Considerations
- LocalStorage has 5-10MB limit per domain
- Consider IndexedDB for larger projects (future)
- Large chapter collections (100+) may slow down

### Data Backup
All data stored in LocalStorage. Users should:
1. Export chapters regularly
2. Use browser's "Export Data" tools
3. Manual JSON backup from DevTools

---

## Credits
Built with React 18, Vite, Tailwind CSS, and GSAP.
Inspired by mythological world trees and creative writing workflows.

---

## License
Part of the Mythical World Tree project.
