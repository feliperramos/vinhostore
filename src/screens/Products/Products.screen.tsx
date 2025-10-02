import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import { fetchProducts } from '@/api/fakestore.service';
import type { Product } from '@/types';
import { ProductCard, Button } from '@/components';
import { useFavorites } from '@/hooks/useFavorite';
import { useAuth } from '@/providers/Auth.provider';
import { useTheme } from '@/providers/Theme.provider';

export default function ProductsScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { preference, setPreference, theme } = useTheme();
  const { signOut } = useAuth();

  async function load() {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 12 }}>
        <Button title="Sair" onPress={signOut} />
      </View>
      <View style={{ padding: theme.spacing.md, gap: theme.spacing.sm }}>
        <Button
          variant="outline"
          title={`Tema: ${preference} (trocar)`}
          onPress={() => setPreference(preference === 'dark' ? 'light' : preference === 'light' ? 'system' : 'dark')}
        />
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            isFavorite={favoriteIds.has(item.id)}
            onToggleFavorite={() => toggleFavorite(item)}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => { setRefreshing(true); await load(); setRefreshing(false); }} />}
      />
    </SafeAreaView>
  );
}
