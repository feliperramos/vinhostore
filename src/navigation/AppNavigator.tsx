// src/navigation/AppNavigator.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProductsScreen, WishListScreen, LoginScreen, RegisterScreen } from '@/screens';
import { useAuth } from '@/providers/Auth.provider';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Produtos" component={ProductsScreen} />
      <Tabs.Screen name="Favoritos" component={WishListScreen} />
    </Tabs.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();
  const [bootBypass, setBootBypass] = useState(false);

  useEffect(() => {
    console.log('[NAV] render -> loading:', loading, 'user:', user?.uid);
  }, [loading, user]);

  // Bypass de segurança: mesmo se loading bugasse, libera após 4s
  useEffect(() => {
    const t = setTimeout(() => setBootBypass(true), 4000);
    return () => clearTimeout(t);
  }, []);

  if (loading && !bootBypass) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <AppTabs />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Criar conta' }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
