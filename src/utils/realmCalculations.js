import { calculateRealmEffect, calculateRealmAttributes } from '../constants/realmConfig';

/**
 * Calculate realm-specific attributes or effects based on the user's journey.
 * @param {string} realm - The realm for which to calculate attributes.
 * @param {number} journeyLevel - The user's current journey level.
 * @returns {object} Calculated attributes and effects for the specified realm.
 */
export const getRealmCalculations = (realm, journeyLevel) => {
  const baseAttributes = calculateRealmAttributes(realm);
  const effectMultiplier = calculateRealmEffect(realm, journeyLevel);

  return {
    health: baseAttributes.health * effectMultiplier,
    magic: baseAttributes.magic * effectMultiplier,
    stability: baseAttributes.stability * effectMultiplier,
  };
};

/**
 * Calculate the overall impact of the user's journey on the realms.
 * @param {number} totalJourneyPoints - Total points accumulated in the journey.
 * @returns {object} Overall impact metrics for the realms.
 */
export const calculateOverallRealmImpact = (totalJourneyPoints) => {
  return {
    influence: totalJourneyPoints * 0.1,
    harmony: totalJourneyPoints * 0.05,
    growth: totalJourneyPoints * 0.2,
  };
};