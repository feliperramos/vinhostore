import React from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from '@/providers/Theme.provider';

interface IconButtonProps {
  label: string;
  onPress?: () => void;
}

export function IconButton({ label, onPress }: IconButtonProps) {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.card,
      }}>
      <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{label}</Text>
    </Pressable>
  );
}
