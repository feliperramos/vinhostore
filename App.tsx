import React from 'react';
import { AuthProvider } from '@/providers/Auth.provider';
import AppNavigator from '@/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
