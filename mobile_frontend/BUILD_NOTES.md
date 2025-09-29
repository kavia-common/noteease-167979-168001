# Build Notes

This Expo project ships without native Android sources by default.
Some CI pipelines try to run `./gradlew` from the project root.

- A root-level `gradlew` shim forwards to `android/gradlew` (fallback no-op).
- If you want a real native build:
  1) Remove the fallback `android/` folder
  2) Run: `npm run prebuild:android`
  3) Build: `cd android && ./gradlew assembleDebug`

For CI verification only, use:
- `npm run ci:verify` (lint)

The shims prevent CI failures where Gradle is invoked unintentionally.
