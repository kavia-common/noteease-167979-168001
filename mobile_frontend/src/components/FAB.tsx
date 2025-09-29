import React from 'react';
import { Pressable, StyleSheet, ViewStyle, Text, Platform } from 'react-native';
import { Colors } from '../theme/colors';
import { shadow } from '../theme/shadow';
import { radius } from '../theme/radius';
import { spacing } from '../theme/spacing';

type Props = {
  onPress: () => void;
  style?: ViewStyle;
  label?: string;
};

export const FAB: React.FC<Props> = ({ onPress, style, label = '+' }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        style,
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.95 },
      ]}
      android_ripple={{ color: '#ffffff22', borderless: false }}
      accessibilityRole="button"
      accessibilityLabel="Add note"
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const SIZE = 56;

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    backgroundColor: Colors.primary,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'ios' ? (shadow.card as object) : (shadow.card as object)),
  },
  label: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginTop: -spacing.xs,
  },
});
