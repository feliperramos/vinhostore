import React, { useRef, useState } from 'react';
import { View, TextInput as RNTextInput, Pressable, TextInputProps } from 'react-native';
import { useTheme } from '@/providers/Theme.provider';
import { Icon } from '@/components';
import { createInputStyles } from './Input.styles';

export function Input({ secureTextEntry, style, ...props }: TextInputProps) {
  const { theme } = useTheme();
  const styles = createInputStyles(theme);

  const isPassword = !!secureTextEntry;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const inputRef = useRef<RNTextInput>(null);

  const togglePassword = () => setPasswordVisible((v) => !v);

  const paddingRightStyle = isPassword ? { paddingRight: theme.spacing.xl * 2 } : null;

  return (
    <View style={styles.container}>
      <RNTextInput
        ref={inputRef}
        placeholderTextColor={theme.colors.textMuted}
        secureTextEntry={isPassword ? !passwordVisible : false}
        {...props}
        style={[styles.input, paddingRightStyle, style]}
      />

      {isPassword && (
        <Pressable
          onPress={togglePassword}
          hitSlop={8}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
        >
          <Icon
            name={passwordVisible ? 'eyeClosed' : 'eye'}
            size={22}
            color={theme.colors.textMuted}
          />
        </Pressable>
      )}
    </View>
  );
}
