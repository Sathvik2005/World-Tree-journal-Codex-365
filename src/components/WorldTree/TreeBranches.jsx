import React from 'react';

/**
 * TreeBranches Component
 * Represents the branches of the mythical world tree, showcasing various mythical attributes.
 */
const TreeBranches = () => {
  return (
    <div className="tree-branches">
      <h2 className="text-2xl font-bold text-center">Branches of the World Tree</h2>
      <p className="text-center text-gray-600">
        The branches reach out to the realms, connecting the mystical energies of the universe.
      </p>
      <div className="branch-container">
        {/* Example of rendering mythical attributes */}
        <div className="branch" style={{ backgroundColor: 'lightgreen' }}>
          <span className="branch-attribute">Attribute: Wisdom</span>
        </div>
        <div className="branch" style={{ backgroundColor: 'lightblue' }}>
          <span className="branch-attribute">Attribute: Strength</span>
        </div>
        <div className="branch" style={{ backgroundColor: 'lightcoral' }}>
          <span className="branch-attribute">Attribute: Courage</span>
        </div>
      </div>
    </div>
  );
};

export default TreeBranches;