// src/hooks/useFavorites.ts (versão modular)
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/providers/Auth.provider';
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
} from '@react-native-firebase/firestore';
import type { Favorite, Product } from '@/types';

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Map<number, Favorite>>(new Map());
  const uid = user?.uid;

  useEffect(() => {
    if (!uid) {
      setFavorites(new Map());
      return;
    }
    const db = getFirestore();
    const ref = collection(doc(collection(db, 'users'), uid), 'favorites');

    const unsub = onSnapshot(ref, snap => {
      const map = new Map<number, Favorite>();
      snap.forEach((d: { id: any; data: () => Favorite }) => {
        map.set(Number(d.id), d.data() as Favorite);
      });
      setFavorites(map);
    });

    return unsub;
  }, [uid]);

  const ids = useMemo(() => new Set(favorites.keys()), [favorites]);

  async function toggleFavorite(p: Product) {
    if (!uid) return;
    const db = getFirestore();
    const ref = doc(
      collection(doc(collection(db, 'users'), uid), 'favorites'),
      String(p.id),
    );
    if (ids.has(p.id)) {
      await deleteDoc(ref);
    } else {
      await setDoc(ref, {
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.image,
        createdAt: Date.now(),
      } satisfies Favorite as any);
    }
  }

  return { favorites, favoriteIds: ids, toggleFavorite };
}
