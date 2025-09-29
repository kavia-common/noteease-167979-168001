# NoteEase Mobile Frontend

A minimalist, modern notes app using React Native + Expo with local SQLite persistence.

Theme: Ocean Professional
- Primary: #2563EB (blue)
- Secondary/Accent: #F59E0B (amber)
- Background: #f9fafb, Surface: #ffffff, Text: #111827
- Rounded corners, subtle shadows, smooth gradients

Features
- Notes list with updated-at ordering
- Create, edit, and delete notes
- Floating action button (FAB) to add a note
- Modal editor with save/cancel and delete
- Persistent storage using expo-sqlite

Structure
- src/theme: Color, spacing, radius, shadow, typography tokens
- src/database: SQLite adapter (init, CRUD)
- src/components: FAB, Header, NoteCard
- src/screens: HomeScreen (list), EditNoteModal (editor)
- src/navigation: RootNavigator (single-screen + modal)

Development
- Install: npm install
- Start: npm run start (open in Expo Go)
- Android: npm run android
- iOS: npm run ios (on macOS)

Notes
- No environment variables are required.
- Database file: noteease.db stored in app's sandbox.
