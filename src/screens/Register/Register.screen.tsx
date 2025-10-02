import React, { useState } from 'react';
import { View, Alert, SafeAreaView } from 'react-native';
import { useAuth, useTheme } from '@/providers';
import { Input, Button, Text } from '@/components';

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const { theme } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  async function onRegister() {
    try {
      if (password.length < 6) {
        Alert.alert('Senha curta', 'A senha precisa ter pelo menos 6 caracteres.');
        return;
      }
      if (password !== confirm) {
        Alert.alert('Senhas diferentes', 'Confirme a mesma senha digitada.');
        return;
      }
      await signUp(email.trim(), password);
    } catch (e: any) {
      Alert.alert('Erro no cadastro', `${e?.code ?? ''}\n${e?.message ?? String(e)}`);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <View style={{ flex: 1, justifyContent: 'center', padding: theme.spacing.lg }}>
        <Text style={{ fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: theme.spacing.lg }}>
          Criar conta
        </Text>

        <Input
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
          returnKeyType="next"
        />

        <View style={{ height: theme.spacing.sm }} />

        {/* O toggle de senha aparece automaticamente porque secureTextEntry está ativo */}
        <Input
          placeholder="Senha (≥6)"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          textContentType="newPassword"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
        />

        <View style={{ height: theme.spacing.sm }} />

        <Input
          placeholder="Confirmar senha"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
          textContentType="newPassword"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
        />

        <View style={{ height: theme.spacing.md }} />
        <Button title="Cadastrar" onPress={onRegister} />
      </View>
    </SafeAreaView>
  );
}
