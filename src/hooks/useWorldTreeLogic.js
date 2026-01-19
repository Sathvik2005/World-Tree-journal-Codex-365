import { useState, useEffect } from 'react';
import { fetchWorldTreeData, fetchMythicalCreatures } from '../utils/mythicalTransformations';

/**
 * Custom hook for managing the logic of the mythical world tree component
 */
const useWorldTreeLogic = () => {
  const [treeData, setTreeData] = useState(null);
  const [creatures, setCreatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchWorldTreeData();
        const mythicalCreatures = await fetchMythicalCreatures();
        setTreeData(data);
        setCreatures(mythicalCreatures);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    treeData,
    creatures,
    loading,
    error,
  };
};

export { useWorldTreeLogic };
export default useWorldTreeLogic;