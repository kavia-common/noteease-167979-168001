# Root Gradle Wrapper Placeholder

CI systems that enforce running `./gradlew` expect these wrapper files at the root.
This project is Expo-based and does not require Gradle unless building native Android.

- For native builds, delete this placeholder and run `npm run prebuild:android` to generate the real wrapper under `android/`.
