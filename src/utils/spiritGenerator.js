import { spiritTypes } from '../constants/spiritTypes';

/**
 * Generate a random spirit with attributes
 * @returns {Object} Random spirit object
 */
export const generateRandomSpirit = () => {
  const randomType = spiritTypes[Math.floor(Math.random() * spiritTypes.length)];
  const randomAttributes = generateAttributes(randomType);
  
  return {
    type: randomType,
    attributes: randomAttributes,
    createdAt: new Date().toISOString(),
  };
};

/**
 * Generate attributes based on spirit type
 * @param {string} type - The type of spirit
 * @returns {Object} Attributes for the spirit
 */
const generateAttributes = (type) => {
  switch (type) {
    case 'Elemental':
      return {
        power: Math.floor(Math.random() * 100),
        affinity: ['Fire', 'Water', 'Earth', 'Air'][Math.floor(Math.random() * 4)],
      };
    case 'Nature':
      return {
        growthRate: Math.random(),
        connectionToEarth: Math.random() > 0.5,
      };
    case 'Celestial':
      return {
        starPower: Math.floor(Math.random() * 100),
        cosmicEnergy: Math.random(),
      };
    default:
      return {};
  }
};