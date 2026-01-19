import React from 'react';
import TreeSpirit from './TreeSpirit';
import ElementalSpirit from './ElementalSpirit';

const SpiritCollection = () => {
  const spirits = [
    { id: 1, type: 'Tree Spirit', component: <TreeSpirit /> },
    { id: 2, type: 'Elemental Spirit', component: <ElementalSpirit /> },
    // Add more spirits as needed
  ];

  return (
    <div className="spirit-collection">
      <h2 className="text-2xl font-bold text-center mb-4">Spirit Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {spirits.map((spirit) => (
          <div key={spirit.id} className="spirit-card p-4 border rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{spirit.type}</h3>
            {spirit.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpiritCollection;