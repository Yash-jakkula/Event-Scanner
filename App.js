/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Main from './src/components/Main';
import { View } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';

function App(){
  return ( 
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}

export default App;
