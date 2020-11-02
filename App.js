import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'

import { Provider } from 'react-redux';
import store from './src/store'

import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from './src/navigations/navigationRef.js';
import AppNavigator from './src/navigations/index.js';

export const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  )
};