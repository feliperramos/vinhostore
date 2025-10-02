// src/screens/ProductsScreen.tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import { fetchProducts } from '@/api/fakestore.service';
import type { Product } from '@/types';
import { ProductCard, Button } from '@/components';
import { useFavorites } from '@/hooks/useFavorite';
import { useAuth, useTheme, useCart } from '@/providers';
import { ProductDetailModal } from './components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

export default function ProductsScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);

  const { favoriteIds, toggleFavorite } = useFavorites();
  const { signOut } = useAuth();
  const { theme } = useTheme();
  const { add, count } = useCart();

  async function load() {
    try {
      setLoading(true);
      setProducts(await fetchProducts());
    } finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      isFavorite={favoriteIds.has(item.id)}
      onToggleFavorite={() => toggleFavorite(item)}
      onAddToCart={() => add(item)}
      onPress={() => setSelected(item)}
    />
  );

  if (loading) {
    return <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.bg }}>
      <ActivityIndicator />
    </SafeAreaView>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <View style={{ padding: theme.spacing.md, gap: theme.spacing.sm, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button variant="outline" title="Configurações" onPress={() => navigation.navigate('Settings')} />
        <Button variant="outline" title={`Carrinho (${count})`} onPress={() => navigation.navigate('Cart')} />
        <Button title="Sair" onPress={signOut} />
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={async () => { setRefreshing(true); await load(); setRefreshing(false); }} />
        }
        contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
      />

      <ProductDetailModal
        visible={!!selected}
        product={selected}
        onClose={() => setSelected(null)}
        onAdd={(p) => { add(p); setSelected(null); }}
        onToggleFav={(p) => toggleFavorite(p)}
        isFav={selected ? favoriteIds.has(selected.id) : false}
      />
    </SafeAreaView>
  );
}
