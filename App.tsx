import '@react-native-firebase/app';
import React, { useEffect } from 'react';
import { ThemeProvider } from '@/providers/Theme.provider';
import { AuthProvider } from '@/providers/Auth.provider';
import AppNavigator from '@/navigation/AppNavigator';
import { initPush } from '@/utils/push';

export default function App() {
  useEffect(() => {
    let cleanupFn: (() => void) | undefined;
    const promise = initPush();
    promise.then(fn => {
      cleanupFn = fn;
    });
    return () => { cleanupFn?.(); };
  }, []);
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
