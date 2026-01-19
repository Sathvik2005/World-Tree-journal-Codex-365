import React from 'react';

const MythicalCard = ({ title, description, image, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
      {image && <img src={image} alt={title} className="w-full h-32 object-cover rounded-t-lg" />}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default MythicalCard;