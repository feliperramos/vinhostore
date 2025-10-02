import React, { useMemo } from 'react';
import { SafeAreaView, FlatList, View, Pressable } from 'react-native';
import { useCart, useTheme } from '@/providers';
import { Text, Button } from '@/components';
import { createCartScreenStyles } from './Cart.styles';
import type { Theme } from '@/theme/tokens';

export default function CartScreen() {
  const { state, inc, dec, remove, clear } = useCart();
  const items = Object.values(state.items);
  const { theme } = useTheme();
  const s = useMemo(() => createCartScreenStyles(theme as Theme), [theme]);

  const total = items.reduce((a, b) => a + b.qty * b.product.price, 0);

  if (!items.length) {
    return (
      <SafeAreaView style={s.screen}>
        <View style={s.emptyWrap}>
          <Text style={s.emptyText}>Seu carrinho está vazio.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.screen}>
      <FlatList
        data={items}
        keyExtractor={(it) => String(it.product.id)}
        contentContainerStyle={s.content}
        renderItem={({ item }) => (
          <View style={s.itemCard}>
            <Text style={s.itemTitle}>{item.product.title}</Text>
            <Text style={s.itemSubtitle}>Qtd: {item.qty} · ${item.product.price.toFixed(2)}</Text>

            <View style={s.controlsRow}>
              <Pressable
                onPress={() => dec(item.product.id)}
                accessibilityRole="button"
                accessibilityLabel="Diminuir quantidade"
                testID={`dec-${item.product.id}`}
                style={s.pillBtn}
              >
                <Text style={s.pillText}>−</Text>
              </Pressable>

              <Pressable
                onPress={() => inc(item.product.id)}
                accessibilityRole="button"
                accessibilityLabel="Aumentar quantidade"
                testID={`inc-${item.product.id}`}
                style={s.pillBtn}
              >
                <Text style={s.pillText}>+</Text>
              </Pressable>

              <Button
                variant="danger"
                title="Remover"
                onPress={() => remove(item.product.id)}
              />
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={s.footer}>
            <Text style={s.totalText}>Total: ${total.toFixed(2)}</Text>
            <View style={{ height: theme.spacing.sm }} />
            <Button title="Limpar carrinho" variant="outline" onPress={clear} />
          </View>
        }
      />
    </SafeAreaView>
  );
}
