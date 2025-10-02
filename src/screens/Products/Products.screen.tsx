import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, useWindowDimensions, View } from 'react-native';
import { fetchProducts } from '@/api/fakestore.service';
import type { Product } from '@/types';
import { ProductCard, Button } from '@/components';
import { useFavorites } from '@/hooks/useFavorite';
import { useAuth, useTheme, useCart } from '@/providers';
import { ProductDetailModal } from './components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createProductsScreenStyles } from './Products.styles';
import type { Theme } from '@/theme/tokens';

type Props = NativeStackScreenProps<any>;

export default function ProductsScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);

  const { favoriteIds, toggleFavorite } = useFavorites();
  const { signOut } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => createProductsScreenStyles(theme as Theme), [theme]);

  const { add, count, inc, dec, remove, getQuantity } = useCart();
  const { width } = useWindowDimensions();
  const numColumns = width >= 700 ? 3 : 2;

  async function load() {
    try {
      setLoading(true);
      setProducts(await fetchProducts());
    } finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  const renderItem = ({ item }: { item: Product }) => {
    const qty = getQuantity(item.id);

    return (
      <View style={styles.gridItem}>
        <ProductCard
          product={item}
          isFavorite={favoriteIds.has(item.id)}
          onToggleFavorite={() => toggleFavorite(item)}
          onAddToCart={() => (qty > 0 ? inc(item.id) : add(item))}
          onDecrease={() => dec(item.id)}
          onRemove={() => remove(item.id)}
          quantity={qty}
          onPress={() => setSelected(item)}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.headerBar}>
        <Button variant="outline" title="Configurações" onPress={() => navigation.navigate('Settings')} />
        <Button variant="outline" title={`Carrinho (${count})`} onPress={() => navigation.navigate('Cart')} />
        <Button title="Sair" onPress={signOut} />
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        numColumns={numColumns}
        key={`grid-${numColumns}`}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => { setRefreshing(true); await load(); setRefreshing(false); }}
          />
        }
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
