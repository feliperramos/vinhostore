import React, { useState } from 'react';
import { View, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth, useTheme } from '@/providers';
import { Input, Button, Text } from '@/components';

type Props = NativeStackScreenProps<any>;

export default function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { theme } = useTheme();

  async function onLogin() {
    try { await signIn(email, password); }
    catch (e: any) { Alert.alert('Erro ao entrar', e?.message ?? String(e)); }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <View style={[styles.container, { padding: theme.spacing.lg }]}>
        <Text style={{ fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: theme.spacing.lg }}>Entrar</Text>
        <Input placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <View style={{ height: theme.spacing.sm }} />
        <Input placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
        <View style={{ height: theme.spacing.md }} />
        <Button title="Entrar" onPress={onLogin} />
        <View style={{ height: theme.spacing.sm }} />
        <Button variant="outline" title="Criar conta" onPress={() => navigation.navigate('Register')} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center' } });
