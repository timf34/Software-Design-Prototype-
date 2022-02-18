import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login'
import Home from './screens/Home'
import User from './screens/User'
import Settings from './screens/Settings';
import Product from './screens/Product';

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
          <Stack.Screen
            name='User'
            component={User}
          />  
          <Stack.Screen
            name='Product'
            component={Product}
          />
          <Stack.Screen
            name='Settings'
            component={Settings}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }