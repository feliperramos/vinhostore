import { StyleSheet } from 'react-native';
import type { Theme } from '@/theme/tokens';

export const createProductsScreenStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.bg,
    },
    itemView: { flex: 1, marginBottom: theme.spacing.md },
    isLoadingView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerBar: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
