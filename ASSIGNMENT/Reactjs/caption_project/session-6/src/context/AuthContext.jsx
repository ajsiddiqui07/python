import { useCallback, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase.js';
import AuthContext from './authContext.js';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return undefined;
    }

    return onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error('Firebase authentication state could not be restored:', error);
        setUser(null);
        setLoading(false);
      },
    );
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (!auth) {
      throw new Error('Firebase is not configured. Add your project settings to .env.');
    }

    const credential = await signInWithEmailAndPassword(auth, email, password);
    setUser(credential.user);
    return credential.user;
  }, []);

  const logout = useCallback(async () => {
    if (!auth) {
      throw new Error('Firebase is not configured. Add your project settings to .env.');
    }

    await signOut(auth);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, loading, signIn, logout }), [user, loading, signIn, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
