import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Login'
import Explore from './screens/Explore'
import User from './screens/User'
import Settings from './screens/Settings';
import Product from './screens/Product';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const BottomTab = () => {

  const Tab = createBottomTabNavigator();

  return(
    <Tab.Navigator>
      <Tab.Screen 
        name = 'Explore'
        component={Explore}
        options={{headerShown:false,}}
      />
      <Tab.Screen 
        name = 'User'
        component={User}
        options={{headerShown:false,}}
      />
      <Tab.Screen 
        name = 'Settings'
        component={Settings}
        options={{headerShown:false,}}
      />
      <Tab.Screen 
        name = 'Login'
        component={Login}
        options={{headerShown:false,}}
      />
    </Tab.Navigator>
  );

}

export default Routes = () => {
    const Stack = createNativeStackNavigator()

    return (
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name = 'BottomTab'
            component={BottomTab}
            options={{headerShown:false,}}
          />
          <Stack.Screen
            name='Login'
            component={Login}
            options={{headerShown:false,}}
          />
          <Stack.Screen
            name='Explore'
            component={Explore}
            options={{headerShown:false,}}
          />
          <Stack.Screen
            name='User'
            component={User}
            options={{headerShown:false,}}
          />  
          <Stack.Screen
            name='Product'
            component={Product}
            options={({ route }) => ({ title: route.params.title }) }
          />
          <Stack.Screen
            name='Settings'
            component={Settings}
            options={{headerShown:false,}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

