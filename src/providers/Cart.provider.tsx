import React, { createContext, useContext, useMemo, useReducer } from 'react';
import type { Product } from '@/types';

type CartItem = { product: Product; qty: number };
type State = { items: Record<number, CartItem> };
type Action =
  | { type: 'add'; product: Product; qty?: number }
  | { type: 'inc'; id: number }
  | { type: 'dec'; id: number }
  | { type: 'remove'; id: number }
  | { type: 'clear' };

const CartCtx = createContext<{
  state: State;
  count: number;
  add: (p: Product, qty?: number) => void;
  inc: (id: number) => void;
  dec: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
}>({} as any);

function reducer(state: State, action: Action): State {
  const s = { ...state.items };
  switch (action.type) {
    case 'add': {
      const cur = s[action.product.id]?.qty ?? 0;
      s[action.product.id] = { product: action.product, qty: cur + (action.qty ?? 1) };
      return { items: s };
    }
    case 'inc': { const it = s[action.id]; if (it) it.qty++; return { items: s }; }
    case 'dec': {
      const it = s[action.id]; if (!it) return state;
      it.qty--; if (it.qty <= 0) delete s[action.id]; return { items: s };
    }
    case 'remove': { delete s[action.id]; return { items: s }; }
    case 'clear': return { items: {} };
    default: return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: {} });
  const count = useMemo(() => Object.values(state.items).reduce((a, b) => a + b.qty, 0), [state.items]);

  const value = useMemo(() => ({
    state,
    count,
    add: (p: Product, qty?: number) => dispatch({ type: 'add', product: p, qty }),
    inc: (id: number) => dispatch({ type: 'inc', id }),
    dec: (id: number) => dispatch({ type: 'dec', id }),
    remove: (id: number) => dispatch({ type: 'remove', id }),
    clear: () => dispatch({ type: 'clear' }),
  }), [state]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
export const useCart = () => useContext(CartCtx);
