import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Colors } from './src/theme/colors';
import { RootNavigator } from './src/navigation';

// PUBLIC_INTERFACE
export default function App() {
  return (
    <View style={styles.appRoot}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safe} />
      <RootNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  appRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safe: {
    backgroundColor: Colors.background,
  },
});
