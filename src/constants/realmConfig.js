export const realmConfig = {
  realms: {
    sky: {
      name: "Sky Realm",
      attributes: {
        gravity: "low",
        visibility: "high",
        magicLevel: "high",
      },
      description: "A realm of endless skies and floating islands, inhabited by celestial beings."
    },
    midgard: {
      name: "Midgard Realm",
      attributes: {
        gravity: "normal",
        visibility: "medium",
        magicLevel: "moderate",
      },
      description: "The realm of humans, filled with lush forests and vibrant life."
    },
    underworld: {
      name: "Underworld Realm",
      attributes: {
        gravity: "high",
        visibility: "low",
        magicLevel: "dark",
      },
      description: "A shadowy realm filled with mysteries and ancient spirits."
    }
  },
  defaultRealm: "midgard",
  realmTransitionDuration: 1000, // in milliseconds
};