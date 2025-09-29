# CI Notes for NoteEase Mobile (Expo)

This project uses Expo and does not include a prebuilt Android native project by default.
Attempting to run Gradle directly (./gradlew) without first running `expo prebuild` will fail.

Recommended CI steps:
1) Install deps: `npm ci`
2) Lint only (default verification): `npm run ci:verify`

If native Android build is required:
1) `npm run prebuild:android`
2) Ensure Android SDK is available in the CI environment
3) `npm run build:android-gradle`

The default `npm run build` intentionally does not run Gradle to prevent failures in CI environments without Android toolchains.
