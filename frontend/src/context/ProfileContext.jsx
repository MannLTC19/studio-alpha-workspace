import React, { useEffect, useState, createContext, useContext } from 'react';
import ProfileModal from '../components/modals/ProfileModal';
import { useAuth } from './AuthContext';
import { getProfile } from '../utils/data';
import { normalizeProfile } from '../utils/profileModel';
import { fetchProfileById, upsertCurrentUserProfile } from '../services/profileService';

export const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const { user } = useAuth();
  const [activeProfile, setActiveProfile] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadCurrentProfile = async () => {
      if (!user?.id) {
        if (isMounted) {
          setCurrentUserProfile(null);
        }
        return;
      }

      setProfileLoading(true);
      setProfileError(null);

      const seeded = getProfile('You');
      const fallbackProfile = normalizeProfile({
        ...seeded,
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || seeded.name,
        isCurrentUser: true,
      });

      try {
        const { rowExists, profile } = await fetchProfileById(user.id, fallbackProfile);
        const profileToUse = rowExists
          ? profile
          : await upsertCurrentUserProfile(user, fallbackProfile);
        if (!isMounted) return;
        setCurrentUserProfile({ ...normalizeProfile(profileToUse), isCurrentUser: true });
      } catch (error) {
        if (!isMounted) return;
        setCurrentUserProfile(fallbackProfile);
        setProfileError(error.message || 'Failed to load profile.');
      } finally {
        if (isMounted) {
          setProfileLoading(false);
        }
      }
    };

    loadCurrentProfile();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const viewProfile = (profileInput) => {
    if (!profileInput) return;

    if ((profileInput.isCurrentUser || profileInput.id === user?.id) && currentUserProfile) {
      setActiveProfile({ ...currentUserProfile, isCurrentUser: true });
      return;
    }

    if (typeof profileInput === 'string') {
      setActiveProfile(normalizeProfile(getProfile(profileInput)));
      return;
    }

    const normalized = normalizeProfile(profileInput);
    setActiveProfile(normalized);
  };

  const saveCurrentProfile = async (updates) => {
    if (!user?.id || !currentUserProfile) {
      return { success: false, error: 'Not signed in.' };
    }

    setProfileSaving(true);
    setProfileError(null);

    try {
      const mergedProfile = {
        ...currentUserProfile,
        ...updates,
        isCurrentUser: true,
      };

      const savedProfile = await upsertCurrentUserProfile(user, mergedProfile);
      const normalizedSaved = { ...normalizeProfile(savedProfile), isCurrentUser: true };
      setCurrentUserProfile(normalizedSaved);
      setActiveProfile((prev) => (prev?.isCurrentUser ? normalizedSaved : prev));
      return { success: true, profile: normalizedSaved };
    } catch (error) {
      const message = error.message || 'Failed to save profile.';
      setProfileError(message);
      return { success: false, error: message };
    } finally {
      setProfileSaving(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        activeProfile,
        currentUserProfile,
        profileLoading,
        profileSaving,
        profileError,
        viewProfile,
        saveCurrentProfile,
      }}
    >
      {children}
      {activeProfile && <ProfileModal profile={activeProfile} onClose={() => setActiveProfile(null)} />}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
