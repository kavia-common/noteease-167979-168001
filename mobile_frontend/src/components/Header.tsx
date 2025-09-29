import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type Props = {
  title: string;
  subtitle?: string;
};

export const Header: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <View style={styles.container} accessibilityRole="header">
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: Colors.text,
  },
  subtitle: {
    marginTop: spacing.xs,
    ...typography.caption,
    color: Colors.muted,
  },
});
