// src/providers/Auth.provider.tsx
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  type FirebaseAuthTypes,
} from '@react-native-firebase/auth';

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    let unsub: (() => void) | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    (async () => {
      try {
        const auth = getAuth();

        unsub = onAuthStateChanged(auth, (u) => {
          if (!mounted.current) return;
          setUser(u ?? null);
          setLoading(false);
        });

        timer = setTimeout(() => {
          if (!mounted.current) return;
          setLoading(false);
        }, 3000);
      } catch (err) {
        if (mounted.current) setLoading(false);
      }
    })();

    return () => {
      mounted.current = false;
      unsub?.();
      if (timer) clearTimeout(timer);
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      async signIn(email: string, password: string) {
        await signInWithEmailAndPassword(getAuth(), email.trim(), password);
      },
      async signUp(email: string, password: string) {
        await createUserWithEmailAndPassword(getAuth(), email.trim(), password);
      },
      async signOut() {
        await fbSignOut(getAuth());
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
