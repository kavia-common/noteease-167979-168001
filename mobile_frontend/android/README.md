# Android Fallback Wrapper (CI)

This directory contains a minimal `gradlew` fallback to prevent CI failures when Gradle is invoked
for an Expo project that hasn't been prebuilt.

- If you intend to build native Android:
  1) Remove this folder
  2) Run `npm run prebuild:android` (or `expo prebuild --platform android`)
  3) Use the generated `android/gradlew` wrapper to build

- If you don't need native builds in CI, keep this folder to avoid failing jobs that run `./gradlew` by default.
