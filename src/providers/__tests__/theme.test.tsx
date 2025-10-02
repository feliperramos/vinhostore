import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider, useTheme } from '../Theme.provider';

function Comp() {
  const { theme } = useTheme();
  return <>{theme.name}</>;
}
test('ThemeProvider renders', () => {
  const { toJSON } = render(<ThemeProvider><Comp /></ThemeProvider>);
  expect(toJSON()).toBeTruthy();
});
