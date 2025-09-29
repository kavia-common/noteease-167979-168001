import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Header } from '../components/Header';
import { FAB } from '../components/FAB';
import { NoteCard } from '../components/NoteCard';
import { EditNoteModal } from './EditNoteModal';
import { Note, getAllNotes, initDb } from '../database/sqlite';
import { typography } from '../theme/typography';
import { radius } from '../theme/radius';

export const HomeScreen: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState<Note | null>(null);

  const load = useCallback(async () => {
    setRefreshing(true);
    await initDb();
    const list = await getAllNotes();
    setNotes(list);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onAdd = () => {
    setSelected(null);
    setModalVisible(true);
  };

  const onOpen = (note: Note) => {
    setSelected(note);
    setModalVisible(true);
  };

  const onSaved = async () => {
    setModalVisible(false);
    setSelected(null);
    await load();
  };

  const onDismiss = () => {
    setModalVisible(false);
    setSelected(null);
  };

  return (
    <View style={styles.root}>
      <LinearGradient colors={Gradients.subtleAlt} style={styles.headerBg} />
      <SafeAreaView style={styles.safe}>
        <Header title="NoteEase" subtitle="Capture thoughts with clarity" />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Notes</Text>
          <Text style={styles.count}>{notes.length}</Text>
        </View>
        <FlatList
          data={notes}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <NoteCard
              title={item.title}
              content={item.content}
              updatedAt={item.updated_at}
              onPress={() => onOpen(item)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyTitle}>No notes yet</Text>
              <Text style={styles.emptySubtitle}>Tap the + button to create your first note.</Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={load} tintColor={Colors.primary} />
          }
        />
        <View style={styles.fabWrap}>
          <FAB onPress={onAdd} />
        </View>
      </SafeAreaView>

      <EditNoteModal visible={modalVisible} initial={selected ?? undefined} onDismiss={onDismiss} onSaved={onSaved} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safe: {
    flex: 1,
  },
  headerBg: {
    position: 'absolute',
    top: -120,
    left: -120,
    right: -120,
    height: 280,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    transform: [{ scaleX: 1.2 }],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: Colors.text,
    flex: 1,
  },
  count: {
    ...typography.bodyRegular,
    color: Colors.muted,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl + 56,
  },
  fabWrap: {
    position: 'absolute',
    right: spacing.xl,
    bottom: spacing.xl,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    ...typography.title,
    color: Colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    ...typography.bodyRegular,
    color: Colors.muted,
  },
});
