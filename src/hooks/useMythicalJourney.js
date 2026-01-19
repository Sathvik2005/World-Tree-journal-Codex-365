import { useState, useEffect } from 'react';
import { fetchJourneyData, saveJourneyEntry } from '../utils/mythicalTransformations';

/**
 * Custom hook to manage the user's journey through the mythical world.
 */
const useMythicalJourney = () => {
  const [journeyData, setJourneyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJourneyData = async () => {
      try {
        const data = await fetchJourneyData();
        setJourneyData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadJourneyData();
  }, []);

  const addJourneyEntry = async (entry) => {
    try {
      const newEntry = await saveJourneyEntry(entry);
      setJourneyData((prevData) => [...prevData, newEntry]);
    } catch (err) {
      setError(err);
    }
  };

  return {
    journeyData,
    legends: journeyData,
    loading,
    error,
    addJourneyEntry,
  };
};

export { useMythicalJourney };
export default useMythicalJourney;