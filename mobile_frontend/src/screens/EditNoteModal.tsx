import React, { useEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { radius } from '../theme/radius';
import { typography } from '../theme/typography';
import { shadow } from '../theme/shadow';
import { Note, createNote, deleteNote, updateNote } from '../database/sqlite';

type Props = {
  visible: boolean;
  initial?: Note | null;
  onDismiss: () => void;
  onSaved: () => void;
};

export const EditNoteModal: React.FC<Props> = ({ visible, initial, onDismiss, onSaved }) => {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [content, setContent] = useState(initial?.content ?? '');

  useEffect(() => {
    setTitle(initial?.title ?? '');
    setContent(initial?.content ?? '');
  }, [initial, visible]);

  const canSave = useMemo(() => (title.trim().length > 0 || content.trim().length > 0), [title, content]);

  const handleSave = async () => {
    if (!canSave) {
      onDismiss();
      return;
    }
    if (initial?.id) {
      await updateNote(initial.id, title.trim(), content.trim());
    } else {
      await createNote(title.trim(), content.trim());
    }
    onSaved();
  };

  const handleDelete = async () => {
    if (initial?.id) {
      await deleteNote(initial.id);
      onSaved();
    } else {
      onDismiss();
    }
  };

  if (!visible) return null;

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onDismiss} />
      <View style={styles.container} accessible accessibilityLabel="Edit note modal">
        <View style={styles.header}>
          <Pressable onPress={onDismiss} style={({ pressed }) => [styles.headerBtn, pressed && styles.pressed]}>
            <Text style={[styles.headerBtnText, { color: Colors.muted }]}>Cancel</Text>
          </Pressable>
          <Text style={styles.headerTitle}>{initial?.id ? 'Edit Note' : 'New Note'}</Text>
          <Pressable onPress={handleSave} style={({ pressed }) => [styles.headerBtn, pressed && styles.pressed]} disabled={!canSave}>
            <Text style={[styles.headerBtnText, { color: canSave ? Colors.primary : Colors.muted }]}>Save</Text>
          </Pressable>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="Title"
            placeholderTextColor="#9CA3AF"
            value={title}
            onChangeText={setTitle}
            style={styles.titleInput}
            autoFocus
          />
          <TextInput
            placeholder="Start typing..."
            placeholderTextColor="#9CA3AF"
            value={content}
            onChangeText={setContent}
            style={styles.contentInput}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.footer}>
          {initial?.id ? (
            <Pressable onPress={handleDelete} style={({ pressed }) => [styles.dangerBtn, pressed && styles.pressed]}>
              <Text style={styles.dangerText}>Delete</Text>
            </Pressable>
          ) : (
            <View style={{ height: spacing.lg }} />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#11182788',
  },
  container: {
    width: '92%',
    maxWidth: 720,
    backgroundColor: Colors.surface,
    borderRadius: radius.xl,
    ...(shadow.card as object),
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  headerTitle: {
    ...typography.title,
    color: Colors.text,
    flex: 1,
    textAlign: 'center',
  },
  headerBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  headerBtnText: {
    ...typography.body,
  },
  pressed: {
    opacity: 0.8,
  },
  form: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  titleInput: {
    ...typography.h2,
    color: Colors.text,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#F3F4F6',
    marginBottom: spacing.md,
  },
  contentInput: {
    minHeight: 180,
    ...typography.bodyRegular,
    color: Colors.text,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: '#F9FAFB',
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderColor: Colors.border,
    alignItems: 'flex-end',
  },
  dangerBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  dangerText: {
    ...typography.body,
    color: '#B91C1C',
  },
});
