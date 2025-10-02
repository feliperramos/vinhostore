import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from '@/providers/Theme.provider';

export function Input(props: TextInputProps) {
  const { theme } = useTheme();
  return (
    <TextInput
      placeholderTextColor={theme.colors.textMuted}
      {...props}
      style={[
        {
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
          color: theme.colors.text,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
          borderRadius: theme.radius.md,
        },
        props.style,
      ]}
    />
  );
}
