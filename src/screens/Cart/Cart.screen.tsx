import React from 'react';
import { SafeAreaView, FlatList, View } from 'react-native';
import { useCart, useTheme } from '@/providers';
import { Text, Button } from '@/components';

export default function CartScreen() {
  const { state, inc, dec, remove, clear } = useCart();
  const items = Object.values(state.items);
  const { theme } = useTheme();
  const total = items.reduce((a, b) => a + b.qty * b.product.price, 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg, padding: theme.spacing.md }}>
      <FlatList
        data={items}
        keyExtractor={(it) => String(it.product.id)}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.card, borderRadius: theme.radius.md, padding: theme.spacing.md, marginBottom: theme.spacing.sm }}>
            <Text style={{ fontWeight: '700' }}>{item.product.title}</Text>
            <Text muted>Qtd: {item.qty} · ${item.product.price.toFixed(2)}</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
              <Button variant="outline" title="-" onPress={() => dec(item.product.id)} />
              <Button variant="outline" title="+" onPress={() => inc(item.product.id)} />
              <Button variant="danger" title="Remover" onPress={() => remove(item.product.id)} />
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{ marginTop: theme.spacing.lg }}>
            <Text style={{ fontSize: 18, fontWeight: '800' }}>Total: ${total.toFixed(2)}</Text>
            <View style={{ height: theme.spacing.sm }} />
            <Button title="Limpar carrinho" variant="outline" onPress={clear} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
