import { act, renderHook } from '@testing-library/react-hooks';
import { CartProvider, useCart } from '../Cart.provider';
import React from 'react';

function wrapper({ children }: any) { return <CartProvider>{children}</CartProvider>; }

test('add/inc/dec/remove works', () => {
  const { result } = renderHook(() => useCart(), { wrapper });
  const product = { id: 1, title: 'P', price: 10, image: '', description: '', category: '' };

  act(() => result.current.add(product));
  expect(result.current.count).toBe(1);

  act(() => result.current.inc(1));
  expect(result.current.count).toBe(2);

  act(() => result.current.dec(1));
  expect(result.current.count).toBe(1);

  act(() => result.current.remove(1));
  expect(result.current.count).toBe(0);
});
