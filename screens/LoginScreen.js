import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import { firebase } from '../firebaseconfig';
import { FontAwesome } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('Dashboard'))
      .catch(error => Alert.alert(error.message));
  };

  return (
    <View style={styles.container}>
      {/* Imagem do logo */}
      <Image
        source={require('../assets/iconhome.png')} // Caminho da imagem do logo
        style={styles.imagemlogin}
      />

      {/* Título abaixo da imagem */}
      <Text style={styles.titleText}>Bem-vindo de volta!</Text>
      
      {/* Parágrafo abaixo do título */}
      <Text style={styles.paragraphText}>
        Faça login para acessar sua conta {"\n"} e gerenciar sua saúde.
      </Text>

      <View style={styles.loginBox}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>ou</Text>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="google" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.signUpSection}>
          <Text>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signUpText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff0',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  imagemlogin: {
    width: 200,
    height: 200,
    borderRadius: 75,
    marginBottom: 20,  // Ajustei o espaçamento entre a imagem e o texto abaixo dela
  },
  
  titleText: {
    fontSize: 24,      // Tamanho da fonte do título
    fontWeight: 'bold',
    marginBottom: 10,     // Espaço entre a imagem e o título
    textAlign: 'center',
    marginTop: 10,
  },

  paragraphText: {
    fontSize: 18,      // Tamanho da fonte do parágrafo
    fontWeight: '400',
    color: '#555',     // Cor do texto do parágrafo
    marginBottom: 40,      // Reduzi o espaço entre o título e o parágrafo para aproximá-los
    marginTop: 10,
    textAlign: 'center',
  },

  loginBox: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    marginBottom: 15,
    color: '#000'
  },
  loginButton: {
    backgroundColor: '#7DCD9A', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 10,
    color: '#888',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '60%',
  },
  socialButton: {
    backgroundColor: '#EEE',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  signUpSection: {
    flexDirection: 'row',
    marginTop: 10,
  },
  signUpText: {
    color: '#7DCD9A',
    fontWeight: 'bold',
  },
});
