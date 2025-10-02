// base scale
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  pill: 999,
};

export const font = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  weight: {
    regular: '400',
    medium: '600',
    bold: '700',
  },
};

type Palette = {
  bg: string;
  card: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryText: string;
  danger: string;
};

export type Theme = {
  name: 'light' | 'dark';
  colors: Palette;
  spacing: typeof spacing;
  radius: typeof radius;
  font: typeof font;
};

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    bg: '#FFFFFF',
    card: '#F7F7F9',
    border: '#E5E7EB',
    text: '#111827',
    textMuted: '#6B7280',
    primary: '#6D28D9', // roxo elegante
    primaryText: '#FFFFFF',
    danger: '#EF4444',
  },
  spacing,
  radius,
  font,
};

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    bg: '#0B0B10',
    card: '#16161C',
    border: '#23232A',
    text: '#E5E7EB',
    textMuted: '#9CA3AF',
    primary: '#8B5CF6',
    primaryText: '#080809',
    danger: '#F87171',
  },
  spacing,
  radius,
  font,
};
