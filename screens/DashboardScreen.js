// screens/DashboardScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { firebase } from '../firebaseconfig';

export default function DashboardScreen({ navigation }) {
  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => navigation.navigate('Home'));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bem-vindo ao Dashboard!</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}
