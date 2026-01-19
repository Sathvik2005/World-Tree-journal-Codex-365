import { useState, useEffect } from 'react';

/**
 * Custom hook to handle interactions and bonding with spirits
 */
const useSpiritBonding = () => {
  const [spirits, setSpirits] = useState([]);
  const [bondedSpirit, setBondedSpirit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching spirits from an API or context
    const fetchSpirits = async () => {
      setLoading(true);
      const fetchedSpirits = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, name: 'Sylvan Guardian', type: 'Tree Spirit' },
            { id: 2, name: 'Elemental Wisp', type: 'Elemental Spirit' },
            { id: 3, name: 'Mystic Shade', type: 'Shadow Spirit' },
          ]);
        }, 1000);
      });
      setSpirits(fetchedSpirits);
      setLoading(false);
    };

    fetchSpirits();
  }, []);

  const bondWithSpirit = (spirit) => {
    setBondedSpirit(spirit);
  };

  return {
    spirits,
    bondedSpirit,
    bondWithSpirit,
    loading,
  };
};

export { useSpiritBonding };
export default useSpiritBonding;