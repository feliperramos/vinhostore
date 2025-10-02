// src/components/ProductCard/ProductCard.component.tsx
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import type { Product } from '@/types';
import { useTheme } from '@/providers/Theme.provider';
import { Text } from '../Text/Text.component';
import type { Theme } from '@/theme/tokens';

type Props = {
  product: Product;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

export function ProductCard({ product, isFavorite, onToggleFavorite }: Props) {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.price}>$ {product.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={onToggleFavorite} style={styles.heartBtn}>
        <Text style={{ fontSize: 20 }}>{isFavorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  image: { width: 64, height: 64 },
  title: { fontWeight: '600', fontSize: 14, color: theme.colors.text },
  price: { marginTop: 6, fontWeight: '700', color: theme.colors.primary },
  heartBtn: { padding: theme.spacing.sm },
});
