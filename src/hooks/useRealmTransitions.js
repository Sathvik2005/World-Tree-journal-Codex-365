import { useState, useEffect } from 'react';

/**
 * Custom hook to manage transitions between different realms in the mythical world tree.
 */
const useRealmTransitions = () => {
  const [currentRealm, setCurrentRealm] = useState('SkyRealm');
  const [transitioning, setTransitioning] = useState(false);

  /**
   * Function to change the realm with a transition effect.
   * @param {string} newRealm - The realm to transition to.
   */
  const changeRealm = (newRealm) => {
    if (newRealm !== currentRealm) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentRealm(newRealm);
        setTransitioning(false);
      }, 1000); // Duration of the transition effect
    }
  };

  useEffect(() => {
    // Logic to handle any side effects when the realm changes
    if (!transitioning) {
      // Example: Fetch realm-specific data or trigger animations
    }
  }, [currentRealm, transitioning]);

  return {
    currentRealm,
    transitioning,
    changeRealm,
  };
};

export { useRealmTransitions };
export default useRealmTransitions;