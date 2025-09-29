@ECHO OFF
REM Android-level Gradle wrapper shim (no-op) for CI
ECHO [NoteEase CI] Skipping Android Gradle task: %*
ECHO [NoteEase CI] Run 'npm run prebuild:android' to generate native projects if a native build is required.
EXIT /B 0
