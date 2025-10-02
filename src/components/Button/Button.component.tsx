import React from 'react';
import { Text, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/Theme.provider';
import { createButtonStyles } from './Button.styles';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'outline' | 'danger';
  style?: StyleProp<ViewStyle>;
};

export function Button({ title, onPress, variant = 'primary', style }: Props) {
  const { theme } = useTheme();
  const styles = createButtonStyles(theme);

  const containerVariant =
    variant === 'primary'
      ? styles.containerPrimary
      : variant === 'outline'
        ? styles.containerOutline
        : styles.containerDanger;

  const titleVariant =
    variant === 'primary'
      ? styles.titlePrimary
      : variant === 'outline'
        ? styles.titleOutline
        : styles.titleDanger;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.containerBase, containerVariant, style]} >
      <Text style={[styles.titleBase, titleVariant]}>{title}</Text>
    </TouchableOpacity>
  );
}
