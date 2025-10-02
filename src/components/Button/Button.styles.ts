import { Theme } from '@/theme/tokens';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const createButtonStyles = (theme: Theme) =>
  StyleSheet.create<{
    containerBase: ViewStyle;
    containerPrimary: ViewStyle;
    containerOutline: ViewStyle;
    containerDanger: ViewStyle;

    titleBase: TextStyle;
    titlePrimary: TextStyle;
    titleOutline: TextStyle;
    titleDanger: TextStyle;
  }>({
    containerBase: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleBase: {
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 16,
    },
    containerPrimary: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    containerOutline: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.border,
    },
    containerDanger: {
      backgroundColor: theme.colors.danger,
      borderColor: theme.colors.danger,
    },
    titlePrimary: {
      color: theme.colors.primaryText,
    },
    titleOutline: {
      color: theme.colors.text,
    },
    titleDanger: {
      color: theme.colors.primaryText,
    },
  });
