import React, { useMemo } from 'react';
import { View, Image, Pressable, TouchableOpacity } from 'react-native';
import type { Product } from '@/types';
import { useTheme } from '@/providers/Theme.provider';
import { Text } from '@/components/Text/Text.component';
import { Button } from '@/components/Button/Button.component';
import { Icon } from '@/components/Icon/Icon.component';
import type { Theme } from '@/theme/tokens';
import { createProductCardStyles } from './ProductCard.styles';

type Props = {
  product: Product;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onAddToCart?: () => void;
  onPress?: () => void;
  quantity?: number;
  onDecrease?: () => void;
  onRemove?: () => void;
};

export function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onPress,
  quantity = 0,
  onDecrease,
  onRemove,
}: Props) {
  const { theme } = useTheme();
  const s = useMemo(() => createProductCardStyles(theme as Theme), [theme]);

  const heartColor = isFavorite ? theme.colors.danger : theme.colors.textMuted;
  const inCart = quantity > 0;

  return (
    <Pressable onPress={onPress} style={s.card}>
      <View style={s.imageWrap}>
        <Image source={{ uri: product.image }} style={s.image} resizeMode="contain" />
        <TouchableOpacity
          onPress={onToggleFavorite}
          style={s.heartBtn}
          accessibilityRole="button"
          accessibilityLabel={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Icon name="heart" size={22} color={heartColor} fill={heartColor} />
        </TouchableOpacity>
      </View>

      <View style={s.info}>
        <Text numberOfLines={2} style={s.title}>{product.title}</Text>
        <Text style={s.price}>$ {product.price.toFixed(2)}</Text>
      </View>

      <View style={s.footer}>
        {!inCart ? (
          <Button title="Adicionar" onPress={onAddToCart} />
        ) : (
          <View style={s.controlsRow}>
            {/* Esquerda: lixeira se qty==1, senão "-" */}
            {quantity === 1 ? (
              <TouchableOpacity
                onPress={onRemove}
                style={[s.pillBtn, s.pillDanger]}
                accessibilityRole="button"
                accessibilityLabel="Remover do carrinho"
              >
                <Icon name="trash" size={18} color={theme.colors.primaryText} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={onDecrease}
                style={s.pillBtn}
                accessibilityRole="button"
                accessibilityLabel="Diminuir quantidade"
              >
                <Text style={s.pillText}>−</Text>
              </TouchableOpacity>
            )}

            <View style={s.qtyBadge}>
              <Text style={s.qtyText}>{quantity}</Text>
            </View>

            <TouchableOpacity
              onPress={onAddToCart}
              style={s.pillBtn}
              accessibilityRole="button"
              accessibilityLabel="Aumentar quantidade"
            >
              <Text style={s.pillText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Pressable>
  );
}
