import React from 'react';
import { Modal, View, Image, ScrollView, Pressable } from 'react-native';
import type { Product } from '@/types';
import { useTheme } from '@/providers/Theme.provider';
import { Text } from '@/components/Text/Text.component';
import { Button } from '@/components/Button/Button.component';

type Props = {
  visible: boolean;
  product?: Product | null;
  onClose: () => void;
  onAdd: (p: Product) => void;
  onToggleFav: (p: Product) => void;
  isFav: boolean;
};

export function ProductDetailModal({ visible, product, onClose, onAdd, onToggleFav, isFav }: Props) {
  const { theme } = useTheme();
  if (!product) return null;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: theme.colors.bg }}>
        <View style={{ padding: theme.spacing.md, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Pressable onPress={onClose}><Text>Fechar</Text></Pressable>
          <Pressable onPress={() => onToggleFav(product)}><Text>{isFav ? '❤️' : '🤍'}</Text></Pressable>
        </View>

        <ScrollView contentContainerStyle={{ padding: theme.spacing.lg }}>
          <View style={{ alignItems: 'center' }}>
            <Image source={{ uri: product.image }} style={{ width: 220, height: 220 }} resizeMode="contain" />
          </View>
          <Text style={{ fontSize: 20, fontWeight: '700', marginTop: theme.spacing.md }}>{product.title}</Text>
          <Text muted style={{ marginTop: theme.spacing.sm }}>{product.category}</Text>
          <Text style={{ fontSize: 22, fontWeight: '800', marginTop: theme.spacing.md, color: theme.colors.primary }}>
            $ {product.price.toFixed(2)}
          </Text>
          <Text style={{ marginTop: theme.spacing.md, lineHeight: 20 }}>{product.description}</Text>
        </ScrollView>

        <View style={{ padding: theme.spacing.lg }}>
          <Button title="Adicionar ao carrinho" onPress={() => onAdd(product)} />
        </View>
      </View>
    </Modal>
  );
}
