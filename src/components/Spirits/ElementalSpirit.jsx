import React from 'react';

/**
 * ElementalSpirit Component
 * Represents elemental spirits associated with the mythical world tree.
 */
const ElementalSpirit = ({ element, description }) => {
  return (
    <div className={`elemental-spirit ${element.toLowerCase()}`}>
      <h3 className="text-xl font-bold">{element} Spirit</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default ElementalSpirit;