import React from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';
import { useTheme } from '@/providers/Theme.provider';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'outline' | 'danger';
  style?: ViewStyle;
};

export function Button({ title, onPress, variant = 'primary', style }: Props) {
  const { theme } = useTheme();
  const base = {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    borderWidth: 1,
  };

  const variants: Record<NonNullable<Props['variant']>, ViewStyle & { textColor: string }> = {
    primary: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary, textColor: theme.colors.primaryText },
    outline: { backgroundColor: 'transparent', borderColor: theme.colors.border, textColor: theme.colors.text },
    danger: { backgroundColor: theme.colors.danger, borderColor: theme.colors.danger, textColor: theme.colors.primaryText },
  };

  const v = variants[variant];

  return (
    <Pressable onPress={onPress} style={[base, v, style as any]}>
      <Text style={{ textAlign: 'center', color: v.textColor, fontWeight: '700', fontSize: 16 }}>{title}</Text>
    </Pressable>
  );
}
