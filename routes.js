// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar'
import SignupScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createStackNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer>
       <StatusBar style="hidden"/>
      <Stack.Navigator initialRouteName="Home"> 
      
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
