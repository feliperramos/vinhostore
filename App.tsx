// App.tsx
import '@react-native-firebase/app';
import { getApp, setLogLevel } from '@react-native-firebase/app';
import React, { useEffect } from 'react';
import { AuthProvider } from '@/providers/Auth.provider';
import AppNavigator from '@/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
