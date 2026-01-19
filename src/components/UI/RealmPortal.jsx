import React from 'react';
import useRealmTransitions from '../../hooks/useRealmTransitions';
import AnimatedGlow from './AnimatedGlow';

const RealmPortal = () => {
  const { changeRealm } = useRealmTransitions();

  const handleRealmClick = (realm) => {
    changeRealm(realm);
  };

  return (
    <div className="realm-portal">
      <h2 className="text-2xl font-bold text-center mb-4">Realm Portal</h2>
      <div className="flex justify-around">
        <div className="realm-option" onClick={() => handleRealmClick('SkyRealm')}>
          <AnimatedGlow>
            <span className="text-lg">Sky Realm</span>
          </AnimatedGlow>
        </div>
        <div className="realm-option" onClick={() => handleRealmClick('MidgardRealm')}>
          <AnimatedGlow>
            <span className="text-lg">Midgard Realm</span>
          </AnimatedGlow>
        </div>
        <div className="realm-option" onClick={() => handleRealmClick('UnderworldRealm')}>
          <AnimatedGlow>
            <span className="text-lg">Underworld Realm</span>
          </AnimatedGlow>
        </div>
      </div>
    </div>
  );
};

export { RealmPortal };
export default RealmPortal;