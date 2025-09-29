import React from 'react';
import { HomeScreen } from '../screens/HomeScreen';

// PUBLIC_INTERFACE
export function RootNavigator() {
  // Single screen app with modal; no stack lib required for this scope
  return <HomeScreen />;
}
