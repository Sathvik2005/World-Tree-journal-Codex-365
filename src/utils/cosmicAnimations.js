import { useEffect } from 'react';

/**
 * Create cosmic animations for the UI elements.
 * @param {HTMLElement} element - The element to animate.
 */
const animateCosmicElement = (element) => {
  if (!element) return;

  // Example animation logic
  element.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
  element.style.transform = 'scale(1.1)';
  element.style.opacity = '0.8';

  setTimeout(() => {
    element.style.transform = 'scale(1)';
    element.style.opacity = '1';
  }, 500);
};

/**
 * Hook to apply cosmic animations to elements.
 * @param {string} selector - The CSS selector for the elements to animate.
 */
export const useCosmicAnimations = (selector) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      animateCosmicElement(element);
    });
  }, [selector]);
};

export default useCosmicAnimations;