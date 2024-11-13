// screens/DashboardScreen.js
import React from 'react';
import { View, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { firebase } from '../firebaseconfig';

// Importando as telas separadas
import DashboardHomeScreen from './DashboardHomeScreen';
import WaterCounterScreen from './WaterCounterScreen';
import ExerciseScreen from './ExerciseScreen';
import FoodScreen from './FoodScreen';

const Tab = createBottomTabNavigator();

export default function DashboardScreen({ navigation }) {
  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => navigation.navigate('Home'));
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Dashboard') {
              return <Ionicons name="stats-chart" size={size} color={color} />;
            } else if (route.name === 'Contador de Água') {
              return <FontAwesome5 name="tint" size={size} color={color} />;
            } else if (route.name === 'Exercícios') {
              return <MaterialIcons name="fitness-center" size={size} color={color} />;
            } else if (route.name === 'Comida') {
              return <MaterialIcons name="restaurant" size={size} color={color} />;
            }
          },
          tabBarLabel: () => null,  // Remove os nomes das abas
          tabBarActiveTintColor: '#007acc',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardHomeScreen} />
        <Tab.Screen name="Contador de Água" component={WaterCounterScreen} />
        <Tab.Screen name="Exercícios" component={ExerciseScreen} />
        <Tab.Screen name="Comida" component={FoodScreen} />
      </Tab.Navigator>

     
    </View>
  );
}
