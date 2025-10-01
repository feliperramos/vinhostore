import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '@/firebase';

type AuthContextType = {
  user: import('@react-native-firebase/auth').FirebaseAuthTypes.User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<import('@react-native-firebase/auth').FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = auth().onAuthStateChanged((u) => {
      setUser(u ?? null);
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      async signIn(email: string, password: string) {
        await auth().signInWithEmailAndPassword(email.trim(), password);
      },
      async signUp(email: string, password: string) {
        await auth().createUserWithEmailAndPassword(email.trim(), password);
      },
      async signOut() {
        await auth().signOut();
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
