import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { useTheme } from '@/providers/Theme.provider';

export function Text(props: TextProps & { muted?: boolean }) {
  const { theme } = useTheme();
  const color = props.muted ? theme.colors.textMuted : theme.colors.text;
  return <RNText {...props} style={[{ color }, props.style]} />;
}
