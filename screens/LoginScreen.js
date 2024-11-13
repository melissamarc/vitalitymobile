// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { firebase } from '../firebaseconfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('Dashboard'))
      .catch(error => Alert.alert(error.message));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} style={{ width: '80%', padding: 8, marginVertical: 8, borderWidth: 1 }} />
      <TextInput placeholder="Senha" onChangeText={setPassword} secureTextEntry style={{ width: '80%', padding: 8, marginVertical: 8, borderWidth: 1 }} />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}
