import React from 'react';
import Navigator from './src/navigate/Navigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from "react-redux";

export default function App() {
    // const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
    return (
    <Provider store={store}>
      {/* <StatusBar style= {isDarkTheme ? "dark" : 'light'}></StatusBar> */}
      <Navigator />
    </Provider>
  );
}
