import React, { useMemo } from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { useFavorites } from '@/hooks/useFavorite';
import { ProductCard } from '@/components';

export default function WishListScreen() {
  const { favorites, toggleFavorite } = useFavorites();
  const items = useMemo(() => Array.from(favorites.values()).sort((a, b) => b.createdAt - a.createdAt), [favorites]);

  if (!items.length) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <Text>Nenhum favorito ainda.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard
            product={{ id: item.id, title: item.title, price: item.price, image: item.image, description: '', category: '' }}
            isFavorite={true}
            onToggleFavorite={() =>
              toggleFavorite({ id: item.id, title: item.title, price: item.price, image: item.image, description: '', category: '' })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}
