# Gradle Wrapper Placeholder

This is a placeholder to satisfy CI systems that expect the Gradle wrapper files to exist.

- For real native builds:
  1) Remove this placeholder `android/` directory
  2) Run `npm run prebuild:android` to generate native sources and a real Gradle wrapper
  3) Build with `cd android && ./gradlew assembleDebug`
