import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/LoginScreen'
import Explore from './screens/Explore'
import User from './screens/User'
import Settings from './screens/Settings';
import AddItem from './screens/AddItem';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import RegisterScreen from './screens/RegisterScreen';
import Item from './screens/Item';

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
      /><Tab.Screen 
      name = 'RegisterScreen'
      component={RegisterScreen}
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
            name='Item'
            component={Item}
            options={{headerShown:false,}}
          />
          <Stack.Screen
            name='Settings'
            component={Settings}
            options={{headerShown:false,}}
          />
          <Stack.Screen
            name = 'AddItem'
            component={AddItem}
            options={{headerShown:false,}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

