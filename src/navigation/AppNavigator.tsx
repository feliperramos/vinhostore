import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer, Theme as NavTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProductsScreen, WishListScreen, LoginScreen, RegisterScreen, SettingsScreen, CartScreen } from '@/screens';
import { useAuth } from '@/providers/Auth.provider';
import { ActivityIndicator, View, StatusBar, TextStyle } from 'react-native';
import { useTheme } from '@/providers/Theme.provider';
import { Icon } from '@/components';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const ProductTabBarIcon = ({ color }: { color: string }) => <Icon name="home" color={color} />;
const FavoriteTabBarIcon = ({ color }: { color: string }) => <Icon name="heart" color={color} />;
const SettingsTabBarIcon = ({ color }: { color: string }) => <Icon name="settings" color={color} />;
const CartTabBarIcon = ({ color }: { color: string }) => <Icon name="cart" color={color} />;

function AppTabs({ screenOptions }: { screenOptions: any }) {
  return (
    <Tabs.Navigator screenOptions={screenOptions}>
      <Tabs.Screen
        name="Produtos"
        component={ProductsScreen}
        options={{ tabBarIcon: ProductTabBarIcon }}
      />
      <Tabs.Screen
        name="Favoritos"
        component={WishListScreen}
        options={{ tabBarIcon: FavoriteTabBarIcon }}
      />
      <Tabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Config', tabBarIcon: SettingsTabBarIcon }}
      />
      <Tabs.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Carrinho', tabBarIcon: CartTabBarIcon }}
      />
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
