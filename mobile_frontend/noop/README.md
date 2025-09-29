# No-op Gradle Module

This placeholder module allows CI environments that forcibly run Gradle to complete successfully.
It does not produce any Android artifacts. For real Android builds, remove this folder and run:

- `npm run prebuild:android`
- `cd android && ./gradlew assembleDebug`
