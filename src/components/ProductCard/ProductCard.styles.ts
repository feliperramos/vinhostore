import { StyleSheet } from 'react-native';
import type { Theme } from '@/theme/tokens';

export const createProductCardStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.md,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },

    imageWrap: {
      position: 'relative',
      borderRadius: theme.radius.md,
      overflow: 'hidden',
      backgroundColor: theme.colors.bg,
    },
    image: {
      width: '100%',
      aspectRatio: 1,
    },
    heartBtn: {
      position: 'absolute',
      top: theme.spacing.xs,
      right: theme.spacing.xs,
      padding: theme.spacing.xs,
      borderRadius: theme.radius.md,
    },

    info: {
      marginTop: theme.spacing.sm,
      marginBottom: theme.spacing.md,
    },
    title: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
    },
    price: {
      marginTop: 6,
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.primary,
    },
    footer: {
      marginTop: theme.spacing.sm,
    },

    controlsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
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
    pillDanger: {
      backgroundColor: theme.colors.danger,
      borderColor: theme.colors.danger,
    },
    pillText: {
      fontSize: 18,
      fontWeight: '800',
      color: theme.colors.text,
    },
    pillTextInverse: {
      color: theme.colors.primaryText,
    },
    qtyBadge: {
      minWidth: 48,
      height: 40,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.bg,
      borderColor: theme.colors.border,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.md,
    },
    qtyText: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.text,
    },
  });
