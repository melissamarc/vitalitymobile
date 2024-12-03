// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar'
import SignupScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationScreen from './screens/Notification';
import Caminhada from './screens/exercises/Caminhada';
import Musculacao from './screens/exercises/Musculacao';
import Corrida from './screens/exercises/Corrida';
import Detalhes from './screens/RecipeDetails';
import WaterScreen from './screens/WaterScreen';
import FoodScreen from './screens/FoodScreen';
import CaloriasDev from './screens/dev/CaloriasDev';
import EditAccountScreen from './screens/EditAccountScreen';
import SettingsScreen from './screens/SettingsScreen';
import { WaterProvider } from './screens/Watercontext';

const Stack = createStackNavigator();

export default function AppRoutes() {
  return (
    <WaterProvider> 
    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Oculta o header para todas as telas
        }}
      >

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen}

        />
        <Stack.Screen name="Caminhada" component={Caminhada} />
        <Stack.Screen name="Corrida" component={Corrida} />
        <Stack.Screen name="Musculacao" component={Musculacao} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name='EditAccountScreen' component={EditAccountScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
        <Stack.Screen name='WaterScreen' component={WaterScreen} />
        <Stack.Screen name="Refeicoes" component={FoodScreen} />
        <Stack.Screen name="CaloriasDev" component={CaloriasDev} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />


      </Stack.Navigator>
    </NavigationContainer>
    </WaterProvider>
  );
}
