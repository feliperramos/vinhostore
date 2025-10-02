import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme, type Theme } from '@/theme/tokens';

type Pref = 'system' | 'light' | 'dark';
type Ctx = {
  theme: Theme;
  preference: Pref;
  setPreference: (p: Pref) => void;
};

const ThemeCtx = createContext<Ctx>({} as any);
const KEY = '@theme:preference';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<Pref>('system');
  const [scheme, setScheme] = useState<ColorSchemeName>(Appearance.getColorScheme());

  // carrega preferência salva
  useEffect(() => {
    AsyncStorage.getItem(KEY).then(v => {
      if (v === 'light' || v === 'dark' || v === 'system') setPreferenceState(v);
    });
  }, []);

  // observa sistema
  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => setScheme(colorScheme));
    return () => sub.remove();
  }, []);

  const setPreference = (p: Pref) => {
    setPreferenceState(p);
    AsyncStorage.setItem(KEY, p).catch(() => { });
  };

  const theme = useMemo(() => {
    const effective = preference === 'system' ? scheme : preference;
    return effective === 'dark' ? darkTheme : lightTheme;
  }, [preference, scheme]);

  const value = useMemo(() => ({ theme, preference, setPreference }), [theme, preference]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
