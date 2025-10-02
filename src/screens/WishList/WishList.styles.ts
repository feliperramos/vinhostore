import { StyleSheet } from 'react-native';
import type { Theme } from '@/theme/tokens';

export const createWishListScreenStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.bg,
    },
    empty: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.lg,
    },
    emptyText: {
      color: theme.colors.textMuted,
      fontSize: 16,
    },
    listContent: {
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.xl,
    },
    gridRow: {
      paddingHorizontal: theme.spacing.md,
      justifyContent: 'space-between',
    },
    gridItem: {
      flex: 1,
      marginBottom: theme.spacing.md,
    },
  });
