import React, { useState } from 'react';

/**
 * Rune Inscription Component
 * Allows users to inscribe magical runes for various effects
 */
const RuneInscription = ({ onInscription }) => {
  const [rune, setRune] = useState('');

  const handleInscription = (e) => {
    e.preventDefault();
    if (rune.trim()) {
      onInscription(rune);
      setRune('');
    }
  };

  return (
    <div className="rune-inscription-container">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Inscribe Your Rune</h2>
      <form onSubmit={handleInscription} className="flex flex-col space-y-4">
        <input
          type="text"
          value={rune}
          onChange={(e) => setRune(e.target.value)}
          placeholder="Enter your rune..."
          className="input-field"
        />
        <button type="submit" className="btn-primary">
          Inscribe
        </button>
      </form>
    </div>
  );
};

export default RuneInscription;