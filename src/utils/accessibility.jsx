/**
 * Accessibility utilities and keyboard navigation helpers
 */

// Focus trap for modals
export const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  firstFocusable?.focus();

  return () => element.removeEventListener('keydown', handleTabKey);
};

// Announce to screen readers
export const announce = (message, priority = 'polite') => {
  const announcer = document.getElementById('mythical-announcer') || createAnnouncer();
  announcer.setAttribute('aria-live', priority);
  announcer.textContent = message;
  
  setTimeout(() => {
    announcer.textContent = '';
  }, 1000);
};

const createAnnouncer = () => {
  const announcer = document.createElement('div');
  announcer.id = 'mythical-announcer';
  announcer.className = 'sr-only';
  announcer.setAttribute('role', 'status');
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  document.body.appendChild(announcer);
  return announcer;
};

// Keyboard shortcuts manager
export class KeyboardShortcuts {
  constructor() {
    this.shortcuts = new Map();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    window.addEventListener('keydown', this.handleKeyPress);
  }

  register(key, callback, options = {}) {
    const { ctrl = false, alt = false, shift = false } = options;
    const shortcutKey = `${ctrl ? 'ctrl+' : ''}${alt ? 'alt+' : ''}${shift ? 'shift+' : ''}${key}`;
    this.shortcuts.set(shortcutKey, callback);
  }

  unregister(key, options = {}) {
    const { ctrl = false, alt = false, shift = false } = options;
    const shortcutKey = `${ctrl ? 'ctrl+' : ''}${alt ? 'alt+' : ''}${shift ? 'shift+' : ''}${key}`;
    this.shortcuts.delete(shortcutKey);
  }

  handleKeyPress(e) {
    const key = e.key.toLowerCase();
    const shortcutKey = `${e.ctrlKey ? 'ctrl+' : ''}${e.altKey ? 'alt+' : ''}${e.shiftKey ? 'shift+' : ''}${key}`;
    
    const callback = this.shortcuts.get(shortcutKey);
    if (callback) {
      e.preventDefault();
      callback(e);
    }
  }

  destroy() {
    window.removeEventListener('keydown', this.handleKeyPress);
    this.shortcuts.clear();
  }
}

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Skip to content link
export const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-mist focus:text-midnight focus:rounded-lg"
    >
      Skip to main content
    </a>
  );
};

// ARIA announcements for dynamic content
export const announcePageChange = (pageName) => {
  announce(`Navigated to ${pageName} page`);
};

export const announceSave = (success) => {
  announce(success ? 'Changes saved successfully' : 'Failed to save changes', 'assertive');
};

export const announceError = (message) => {
  announce(message, 'assertive');
};

// Focus management
export const saveFocus = () => {
  return document.activeElement;
};

export const restoreFocus = (element) => {
  if (element && element.focus) {
    element.focus();
  }
};

// Accessible modal helpers
export const openModal = (modalElement) => {
  const previousFocus = saveFocus();
  const cleanup = trapFocus(modalElement);
  document.body.style.overflow = 'hidden';
  
  return () => {
    cleanup();
    restoreFocus(previousFocus);
    document.body.style.overflow = '';
  };
};

// Export all utilities
export default {
  trapFocus,
  announce,
  KeyboardShortcuts,
  prefersReducedMotion,
  SkipToContent,
  announcePageChange,
  announceSave,
  announceError,
  saveFocus,
  restoreFocus,
  openModal
};
