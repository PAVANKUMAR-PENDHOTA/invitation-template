import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { defaultProfile } from '../data/defaultProfile';

const STORAGE_KEY = 'profile-page-data-v1';
const ProfileContext = createContext(null);

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultProfile, ...JSON.parse(raw) } : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(loadProfile);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      /* storage full or unavailable - ignore */
    }
  }, [profile]);

  useEffect(() => {
    document.title = `${profile.name} | Profile`;
  }, [profile.name]);

  const resetProfile = useCallback(() => setProfile(defaultProfile), []);
  const value = useMemo(() => ({ profile, setProfile, resetProfile }), [profile, resetProfile]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used inside <ProfileProvider>');
  return ctx;
}
