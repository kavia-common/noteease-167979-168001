@ECHO OFF
REM Root-level Gradle wrapper shim (no-op) for CI
ECHO [NoteEase CI] Skipping Gradle task at root: %*
ECHO [NoteEase CI] Use 'npm run prebuild:android' then run Gradle in android/ if a native build is needed.
EXIT /B 0
