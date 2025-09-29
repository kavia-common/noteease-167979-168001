import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Gradients } from '../theme/colors';
import { shadow } from '../theme/shadow';
import { radius } from '../theme/radius';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  title: string;
  content: string;
  updatedAt?: number;
  onPress: () => void;
};

export const NoteCard: React.FC<Props> = ({ title, content, updatedAt, onPress }) => {
  const preview = content.length > 120 ? content.slice(0, 117) + '…' : content;
  const dateStr = updatedAt ? new Date(updatedAt).toLocaleString() : undefined;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.wrap, pressed && { opacity: 0.95 }]}>
      <LinearGradient colors={Gradients.subtle} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
        <View style={styles.header}>
          <Text numberOfLines={1} style={styles.title}>{title || 'Untitled'}</Text>
          {dateStr ? <Text style={styles.timestamp}>{dateStr}</Text> : null}
        </View>
        <Text numberOfLines={3} style={styles.preview}>{preview || 'No content yet.'}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...(shadow.card as object),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.title,
    color: Colors.text,
    flex: 1,
  },
  timestamp: {
    ...typography.caption,
    color: Colors.muted,
    marginLeft: spacing.sm,
  },
  preview: {
    ...typography.bodyRegular,
    color: Colors.muted,
    lineHeight: 20,
  },
});
