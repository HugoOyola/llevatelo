import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './src/styles/colors';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import RootStackNavigator from './src/navigation/RootStackNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    "Raleway-SemiBold": require("./assets/fonts/Raleway-SemiBold.ttf"),
    "Quicksand-Regular": require("./assets/fonts/Quicksand-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <>
        <StatusBar style="light" />
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </>
    </Provider>
  );
}
