import React, { useState, createContext, useContext } from 'react';
import ProfileModal from '../components/modals/ProfileModal';

export const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [activeProfile, setActiveProfile] = useState(null);

  return (
    <ProfileContext.Provider value={{ activeProfile, viewProfile: setActiveProfile }}>
      {children}
      {activeProfile && <ProfileModal profile={activeProfile} onClose={() => setActiveProfile(null)} />}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
