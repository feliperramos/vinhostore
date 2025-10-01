import { useEffect, useMemo, useState } from 'react';
import { firestore } from '@/firebase';
import { useAuth } from '@/providers/Auth.provider';
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
    const ref = firestore()
      .collection('users')
      .doc(uid)
      .collection('favorites');
    const unsub = ref.onSnapshot(snap => {
      const map = new Map<number, Favorite>();
      snap.forEach(doc => {
        const data = doc.data() as Favorite;
        map.set(Number(doc.id), data);
      });
      setFavorites(map);
    });
    return unsub;
  }, [uid]);

  const ids = useMemo(() => new Set(favorites.keys()), [favorites]);

  async function toggleFavorite(p: Product) {
    if (!uid) return;
    const ref = firestore()
      .collection('users')
      .doc(uid)
      .collection('favorites')
      .doc(String(p.id));
    const exists = ids.has(p.id);
    if (exists) {
      await ref.delete();
    } else {
      const doc: Favorite = {
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.image,
        createdAt: Date.now(),
      };
      await ref.set(doc);
    }
  }

  return { favorites, favoriteIds: ids, toggleFavorite };
}
