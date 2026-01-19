import React from 'react';
import TreeBranches from './TreeBranches';
import TreeRoots from './TreeRoots';
import TreeCanopy from './TreeCanopy';

/**
 * TreeVisualization Component
 * This component visualizes the mythical world tree, integrating branches, roots, and canopy elements.
 */
export const TreeVisualization = () => {
  return (
    <div className="world-tree-container">
      <TreeRoots />
      <TreeBranches />
      <TreeCanopy />
    </div>
  );
};

export default TreeVisualization;