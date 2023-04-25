import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Navigator from './src/navigate/Navigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <Provider store={store}>
      {/* <StatusBar style="dark"></StatusBar> */}
      <Navigator />
    </Provider>
  );
}
