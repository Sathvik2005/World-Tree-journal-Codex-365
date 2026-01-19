module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mythic Base Palette
        'midnight': '#081225',           // Deep Navy Midnight (darkest background)
        'midnight-deep': '#0A1A3D',      // Slightly lighter midnight
        'cosmos': '#0F172A',             // Cosmic void
        
        // Primary Astral Colors
        'astral': '#3B82F6',             // Astral Blue Glow (primary accent)
        'astral-light': '#60A5FA',       // Lighter astral
        'astral-deep': '#1E3A8A',        // Deep astral blue
        
        // Starlight & Luminescence
        'starlight': '#F8FAFC',          // Starlight White (primary text)
        'starlight-dim': '#E5E7EB',      // Dimmed starlight
        
        // Cosmic Cyan Mist
        'cyan-mist': '#67E8F9',          // Cosmic Cyan Mist accent
        'cyan-deep': '#06B6D4',          // Deep cyan
        'cyan-rune': '#22D3EE',          // Rune cyan
        
        // Mythic Accents
        'cosmos-purple': '#A78BFA',      // Purple mysticism
        'violet-omen': '#6366F1',        // Violet accent
        'slate-spirit': '#64748B',       // Slate for subtle elements
        
        // Void & Shadow
        'void-black': '#000000',         // Pure black
        'void-shadow': '#05070D',        // Near black
        
        // Warnings & States
        'ember-low': '#F59E0B',
        'ember-high': '#EF4444',
        
        // Legacy text aliases
        'text-primary': '#F8FAFC',       // Maps to starlight
        'text-secondary': '#9CA3AF',
        'text-muted': '#6B7280',
        'text-glow': '#67E8F9',          // Maps to cyan-mist
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #081225 0%, #0A1A3D 100%)',
        'astral-gradient': 'linear-gradient(135deg, #3B82F6 0%, #67E8F9 100%)',
        'void-gradient': 'linear-gradient(135deg, #000000 0%, #081225 100%)',
        'starlight-gradient': 'linear-gradient(135deg, #F8FAFC 0%, #67E8F9 100%)',
        'sky-realm': 'linear-gradient(135deg, #0A1A3D, #1E3A8A, #3B82F6)',
        'midgard-realm': 'linear-gradient(135deg, #081225, #0A1A3D, #3B82F6)',
        'underworld-realm': 'linear-gradient(135deg, #000000, #081225, #A78BFA)',
        'tree-gradient': 'linear-gradient(to bottom, #081225, #0A1A3D, #3B82F6)',
      },
      boxShadow: {
        'glow-astral': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-cyan': '0 0 20px rgba(103, 232, 249, 0.5)',
        'glow-starlight': '0 0 30px rgba(248, 250, 252, 0.3)',
        'glow-rune': '0 0 18px rgba(34, 211, 238, 0.6)',
        'glow-spirit': '0 0 16px rgba(100, 116, 139, 0.5)',
        'glow-violet': '0 0 20px rgba(99, 102, 241, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(103, 232, 249, 0.3)',
      },
    },
  },
  plugins: [],
};