import * as SQLite from 'expo-sqlite';

// PUBLIC_INTERFACE
export type Note = {
  id?: number;
  title: string;
  content: string;
  updated_at?: number; // epoch millis
  created_at?: number; // epoch millis
};

/**
 * PUBLIC_INTERFACE
 * Open or create the local database connection.
 */
export function getDb() {
  // Using default location, persistent on device
  return SQLite.openDatabaseSync('noteease.db');
}

/**
 * PUBLIC_INTERFACE
 * Initialize the database schema if not present.
 */
export async function initDb(): Promise<void> {
  const db = getDb();
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_notes_updated_at ON notes(updated_at DESC);
  `);
}

/**
 * PUBLIC_INTERFACE
 * Get all notes ordered by updated_at desc.
 */
export async function getAllNotes(): Promise<Note[]> {
  const db = getDb();
  const res = await db.getAllAsync<Note>('SELECT * FROM notes ORDER BY updated_at DESC;');
  return res ?? [];
}

/**
 * PUBLIC_INTERFACE
 * Create a new note with title/content.
 */
export async function createNote(title: string, content: string): Promise<number> {
  const db = getDb();
  const now = Date.now();
  const result = await db.runAsync(
    'INSERT INTO notes (title, content, created_at, updated_at) VALUES (?, ?, ?, ?);',
    [title, content, now, now]
  );
  return result.lastInsertRowId as number;
}

/**
 * PUBLIC_INTERFACE
 * Update an existing note by id.
 */
export async function updateNote(id: number, title: string, content: string): Promise<void> {
  const db = getDb();
  const now = Date.now();
  await db.runAsync(
    'UPDATE notes SET title = ?, content = ?, updated_at = ? WHERE id = ?;',
    [title, content, now, id]
  );
}

/**
 * PUBLIC_INTERFACE
 * Delete note by id.
 */
export async function deleteNote(id: number): Promise<void> {
  const db = getDb();
  await db.runAsync('DELETE FROM notes WHERE id = ?;', [id]);
}
