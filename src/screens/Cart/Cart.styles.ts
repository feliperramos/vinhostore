import { StyleSheet } from 'react-native';
import type { Theme } from '@/theme/tokens';

export const createCartScreenStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.bg,
    },

    content: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
    },
    itemCard: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
      borderRadius: theme.radius.md,
      padding: theme.spacing.md,
      marginTop: theme.spacing.sm,
    },
    itemTitle: {
      fontWeight: '700',
      color: theme.colors.text,
    },
    itemSubtitle: {
      marginTop: 4,
      color: theme.colors.textMuted,
    },
    controlsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      marginTop: theme.spacing.sm,
    },
    pillBtn: {
      minWidth: 44,
      height: 40,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pillText: {
      fontSize: 18,
      fontWeight: '800',
      color: theme.colors.text,
    },
    footer: {
      marginTop: theme.spacing.lg,
      paddingTop: theme.spacing.md,
    },
    totalText: {
      fontSize: 18,
      fontWeight: '800',
      color: theme.colors.text,
    },
    emptyWrap: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.lg,
    },
    emptyText: {
      color: theme.colors.textMuted,
    },
  });
