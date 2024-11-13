// screens/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { firebase } from '../firebaseconfig';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Dashboard');
      })
      .catch(error => Alert.alert(error.message));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Cadastro</Text>
      <TextInput placeholder="Nome" onChangeText={setName} style={{ width: '80%', padding: 8, marginVertical: 8, borderWidth: 1 }} />
      <TextInput placeholder="Email" onChangeText={setEmail} style={{ width: '80%', padding: 8, marginVertical: 8, borderWidth: 1 }} />
      <TextInput placeholder="Senha" onChangeText={setPassword} secureTextEntry style={{ width: '80%', padding: 8, marginVertical: 8, borderWidth: 1 }} />
      <Button title="Cadastrar" onPress={handleSignup} />
    </View>
  );
}
