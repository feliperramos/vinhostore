import React, { useMemo } from 'react';
import { FlatList, SafeAreaView, useWindowDimensions, View } from 'react-native';
import { useFavorites } from '@/hooks/useFavorite';
import { ProductCard, Text } from '@/components';
import { useCart, useTheme } from '@/providers';
import { createWishListScreenStyles } from './WishList.styles';
import type { Theme } from '@/theme/tokens';
import type { Product } from '@/types';

export default function WishListScreen() {
  const { favorites, toggleFavorite } = useFavorites();
  const items = useMemo(
    () => Array.from(favorites.values()).sort((a, b) => b.createdAt - a.createdAt),
    [favorites]
  );

  const { theme } = useTheme();
  const styles = useMemo(() => createWishListScreenStyles(theme as Theme), [theme]);
  const { width } = useWindowDimensions();
  const numColumns = width >= 700 ? 3 : 2;

  const { add, inc, dec, remove, getQuantity } = useCart();

  if (!items.length) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nenhum favorito ainda.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        numColumns={numColumns}
        key={`grid-${numColumns}`}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const product: Product = {
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            description: '',
            category: '',
          };

          const qty = getQuantity(product.id);

          return (
            <View style={styles.gridItem}>
              <ProductCard
                product={product}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(product)}
                onAddToCart={() => (qty > 0 ? inc(product.id) : add(product))}
                onDecrease={() => dec(product.id)}
                onRemove={() => remove(product.id)}
                quantity={qty}
                onPress={undefined}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
