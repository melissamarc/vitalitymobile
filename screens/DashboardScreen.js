// screens/DashboardScreen.js
import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { firebase } from '../firebaseconfig';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();


export default function DashboardScreen({ navigation }) {
  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => navigation.navigate('Home'));
  };


 
  function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }


  function TabNavigator() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color }) => <Icon name="home-outline" size={24} color={color} /> }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarIcon: ({ color }) => <Icon name="settings-outline" size={24} color={color} /> }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color }) => <Icon name="person-outline" size={24} color={color} /> }} />
      </Tab.Navigator>
    );
  }

}
