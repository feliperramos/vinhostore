import '@react-native-firebase/app';
import { setLogLevel } from '@react-native-firebase/app';
import React, { useEffect } from 'react';
import { ThemeProvider } from '@/providers/Theme.provider';
import { AuthProvider } from '@/providers/Auth.provider';
import AppNavigator from '@/navigation/AppNavigator';

export default function App() {
  useEffect(() => { setLogLevel('debug'); }, []);
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
