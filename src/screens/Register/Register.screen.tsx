import React, { useState } from 'react';
import { View, Alert, SafeAreaView } from 'react-native';
import { useAuth, useTheme } from '@/providers';
import { Input, Button, Text } from '@/components';

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { theme } = useTheme();

  async function onRegister() {
    try { await signUp(email, password); }
    catch (e: any) { Alert.alert('Erro no cadastro', `${e?.code ?? ''}\n${e?.message ?? String(e)}`); }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <View style={{ flex: 1, justifyContent: 'center', padding: theme.spacing.lg }}>
        <Text style={{ fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: theme.spacing.lg }}>Criar conta</Text>
        <Input placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <View style={{ height: theme.spacing.sm }} />
        <Input placeholder="Senha (≥6)" secureTextEntry value={password} onChangeText={setPassword} />
        <View style={{ height: theme.spacing.md }} />
        <Button title="Cadastrar" onPress={onRegister} />
      </View>
    </SafeAreaView>
  );
}
