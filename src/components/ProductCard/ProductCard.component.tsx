import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import type { Product } from '@/types';
import { useTheme } from '@/providers/Theme.provider';
import { Text } from '@/components/Text/Text.component';
import { Button } from '@/components/Button/Button.component';
import type { Theme } from '@/theme/tokens';
import { Icon } from '../Icon/Icon.component';

type Props = {
  product: Product;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onAddToCart?: () => void;
  onPress?: () => void; // abrir modal de detalhe
};

export function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart, onPress }: Props) {
  const { theme } = useTheme();
  const s = getStyles(theme);

  return (
    <Pressable onPress={onPress} style={s.card}>
      <View style={s.imageWrap}>
        <Image source={{ uri: product.image }} style={s.image} resizeMode="contain" />
        <TouchableOpacity onPress={onToggleFavorite} style={s.heart}>
          <Icon name="heart" size={20} color={isFavorite ? theme.colors.primary : theme.colors.textMuted} />
        </TouchableOpacity>
      </View>

      <View style={s.info}>
        <Text numberOfLines={2} style={s.title}>{product.title}</Text>
        <Text style={s.price}>$ {product.price.toFixed(2)}</Text>
      </View>

      <Button title="Adicionar" onPress={onAddToCart} />
    </Pressable>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 2,
  },
  imageWrap: { alignItems: 'center' },
  image: { width: 110, height: 110 },
  heart: { position: 'absolute', right: 4, top: 4, padding: theme.spacing.xs },
  info: { marginTop: theme.spacing.sm, marginBottom: theme.spacing.md },
  title: { fontSize: 14, fontWeight: '600', color: theme.colors.text },
  price: { fontSize: 16, fontWeight: '700', color: theme.colors.primary, marginTop: 6 },
});
