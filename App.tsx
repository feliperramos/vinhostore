import React, { useEffect } from 'react';
import '@react-native-firebase/app';
import { ThemeProvider } from '@/providers/Theme.provider';
import { AuthProvider } from '@/providers/Auth.provider';
import { CartProvider } from '@/providers/Cart.provider';
import AppNavigator from '@/navigation/AppNavigator';
import { initPush } from '@/utils/push';

export default function App() {
  useEffect(() => { (async () => { (await initPush)?.(); })(); }, []);
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
