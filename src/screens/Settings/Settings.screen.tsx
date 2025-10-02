// src/screens/SettingsScreen.tsx
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from '@/providers';
import { Text, Button } from '@/components';

export default function SettingsScreen() {
  const { theme, preference, setPreference } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg, padding: theme.spacing.lg }}>
      <Text style={{ fontSize: 20, fontWeight: '800' }}>Aparência</Text>

      <View style={{ height: theme.spacing.md }} />
      <Text muted>Escolha o tema</Text>
      <View style={{ flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.md }}>
        <Button variant={preference === 'system' ? 'primary' : 'outline'} title="Sistema" onPress={() => setPreference('system')} />
        <Button variant={preference === 'light' ? 'primary' : 'outline'} title="Claro" onPress={() => setPreference('light')} />
        <Button variant={preference === 'dark' ? 'primary' : 'outline'} title="Escuro" onPress={() => setPreference('dark')} />
      </View>
    </SafeAreaView>
  );
}
