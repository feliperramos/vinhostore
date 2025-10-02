import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer, Theme as NavTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProductsScreen, WishListScreen, LoginScreen, RegisterScreen, SettingsScreen, CartScreen } from '@/screens';
import { useAuth } from '@/providers/Auth.provider';
import { ActivityIndicator, View, StatusBar, TextStyle } from 'react-native';
import { useTheme } from '@/providers/Theme.provider';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function AppTabs({ screenOptions }: { screenOptions: any }) {
  return (
    <Tabs.Navigator screenOptions={screenOptions}>
      <Tabs.Screen name="Produtos" component={ProductsScreen} />
      <Tabs.Screen name="Favoritos" component={WishListScreen} />
      <Tabs.Screen name="Settings" options={{ title: 'Config' }} component={SettingsScreen} />
      <Tabs.Screen name="Cart" options={{ title: 'Carrinho' }} component={CartScreen} />
    </Tabs.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();
  const [bootBypass, setBootBypass] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBootBypass(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const navTheme: NavTheme = useMemo(
    () => ({
      dark: theme.name === 'dark',
      colors: {
        primary: theme.colors.primary,
        background: theme.colors.bg,
        card: theme.colors.card,
        text: theme.colors.text,
        border: theme.colors.border,
        notification: theme.colors.primary,
      },
      fonts: {
        regular: { fontFamily: 'System', fontWeight: '400' as '400' },
        medium: { fontFamily: 'System', fontWeight: '500' as '500' },
        bold: { fontFamily: 'System', fontWeight: '700' as '700' },
        heavy: { fontFamily: 'System', fontWeight: '900' as '900' },
        light: { fontFamily: 'System', fontWeight: '300' as '300' },
        thin: { fontFamily: 'System', fontWeight: '100' as '100' },
      },
    }),
    [theme]
  );

  const stackScreenOptions = useMemo(
    () => ({
      headerStyle: { backgroundColor: theme.colors.card },
      headerTitleStyle: { color: theme.colors.text, fontWeight: '700' as TextStyle['fontWeight'] },
      headerTintColor: theme.colors.text,
      contentStyle: { backgroundColor: theme.colors.bg },
    }),
    [theme]
  );

  const tabScreenOptions = useMemo(
    () => ({
      headerStyle: { backgroundColor: theme.colors.card },
      headerTitleStyle: { color: theme.colors.text, fontWeight: '700' },
      headerTintColor: theme.colors.text,
      tabBarStyle: {
        backgroundColor: theme.colors.card,
        borderTopColor: theme.colors.border,
      },
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.textMuted,
      tabBarLabelStyle: { fontWeight: '600' },
    }),
    [theme]
  );

  if (loading && !bootBypass) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.bg }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.card}
      />
      <NavigationContainer theme={navTheme}>
        {user ? (
          <AppTabs screenOptions={tabScreenOptions} />
        ) : (
          <Stack.Navigator screenOptions={stackScreenOptions}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Criar conta' }} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}
