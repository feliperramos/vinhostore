import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import CartScreen from '@/screens/Cart/Cart.screen';

const fakeTheme = {
  colors: {
    bg: '#0b0b0b',
    card: '#1b1b1b',
    border: '#333',
    text: '#fff',
    textMuted: '#aaa',
    primary: '#7c3aed',
    primaryText: '#fff',
    danger: '#e53935',
  },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 },
  radius: { md: 10, lg: 14 },
};

jest.mock('@/providers/Theme.provider', () => ({
  useTheme: () => ({ theme: fakeTheme }),
}));

const inc = jest.fn();
const dec = jest.fn();
const remove = jest.fn();
const clear = jest.fn();

jest.mock('@/providers', () => ({
  __esModule: true,
  useCart: jest.fn(),
  useTheme: () => ({ theme: fakeTheme }),
}));

const { useCart } = jest.requireMock('@/providers') as { useCart: jest.Mock };

const makeState = (items: Array<{ id: number; title: string; price: number; qty: number }>) => ({
  items: items.reduce((acc, it) => {
    acc[it.id] = {
      product: { id: it.id, title: it.title, price: it.price, image: '', description: '', category: '' },
      qty: it.qty,
    };
    return acc;
  }, {} as Record<number, any>),
});

describe('CartScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('mostra estado vazio', () => {
    useCart.mockReturnValue({
      state: makeState([]),
      inc, dec, remove, clear,
    });

    render(<CartScreen />);
    expect(screen.getByText(/Seu carrinho está vazio/)).toBeTruthy();
  });

  it('renderiza itens e calcula total', () => {
    useCart.mockReturnValue({
      state: makeState([
        { id: 1, title: 'Produto A', price: 10, qty: 2 },
        { id: 2, title: 'Produto B', price: 5, qty: 3 },
      ]),
      inc, dec, remove, clear,
    });

    render(<CartScreen />);
    expect(screen.getByText('Produto A')).toBeTruthy();
    expect(screen.getByText('Produto B')).toBeTruthy();
    expect(screen.getByText('Total: $35.00')).toBeTruthy();
  });

  it('aciona inc/dec/remove/clear', () => {
    useCart.mockReturnValue({
      state: makeState([{ id: 1, title: 'Produto A', price: 10, qty: 1 }]),
      inc, dec, remove, clear,
    });

    render(<CartScreen />);

    fireEvent.press(screen.getByTestId('inc-1'));
    expect(inc).toHaveBeenCalledWith(1);

    fireEvent.press(screen.getByTestId('dec-1'));
    expect(dec).toHaveBeenCalledWith(1);

    fireEvent.press(screen.getByText('Remover'));
    expect(remove).toHaveBeenCalledWith(1);

    fireEvent.press(screen.getByText('Limpar carrinho'));
    expect(clear).toHaveBeenCalled();
  });
});
