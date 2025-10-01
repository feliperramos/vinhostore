import type { Product } from '@/types';
import { BASE_URL } from '@/constants/URL';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error('Falha ao buscar produtos');
  const data = (await res.json()) as Product[];
  return data;
}
