import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import type { Product } from '@/types';

type Props = {
  product: Product;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

export function ProductCard({ product, isFavorite, onToggleFavorite }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.price}>$ {product.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={onToggleFavorite} style={styles.heartBtn}>
        <Text style={{ fontSize: 20 }}>{isFavorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ddd' },
  image: { width: 64, height: 64 },
  title: { fontWeight: '600', fontSize: 14, color: '#111' },
  price: { marginTop: 6, fontWeight: '700' },
  heartBtn: { padding: 8 },
});
