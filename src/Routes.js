import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login'
import Home from './screens/Home'

export default Routes = () => {
    const Stack = createNativeStackNavigator()

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Login'
            component={Login}
          />
        <Stack.Screen
            name='Home'
            component={Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }