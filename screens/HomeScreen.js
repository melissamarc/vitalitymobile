import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="hidden" /> {/* Esconde a barra de status */}

      {/* Logo */}
      <Image
        source={require('../assets/logo.png')} // Caminho da imagem do logo
        style={styles.logo}
      />

      {/* Texto de boas-vindas */}
      <Text style={styles.welcomeText}>Bem-vindo ao Vitality Vision!</Text>
      <Text style={styles.TextHome}>
        Acompanhe, monitore e gerencie sua saúde de forma rápida e eficiente.
      </Text>

      {/* Botões na parte inferior */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonWrapper, { backgroundColor: '#DDF' }]} // Cor de fundo do botão "Entrar"
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text> {/* Cor do texto no botão "Entrar" */}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonWrapper2, { backgroundColor: '#7DCD9A' }]} // Cor de fundo do botão "Criar Conta"
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={[styles.buttonText, { color: '#DDF' }]}>Cadastre-se</Text> {/* Cor do texto no botão "Criar Conta" */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logo: {
    width: 200, // Ajuste o tamanho do logo
    height: 200, // Ajuste o tamanho do logo
    marginTop: 50,
  },
  welcomeText: {
    fontSize: 38,
    fontWeight: 'bold',
    marginTop: 20, // Ajuste para que o texto fique próximo ao logo
    textAlign: 'center',
  },
  TextHome: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: '#555',
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: 'column', // Alinha os botões verticalmente
    justifyContent: 'center', // Centraliza os botões verticalmente
    width: '90%', // Limita a largura dos botões a 80% da tela
    alignItems: 'center', // Centraliza os botões horizontalmente
    marginTop: 180, // Ajusta a posição dos botões
  },
  buttonWrapper: {
    width: '100%', // A largura dos botões ocupa toda a largura disponível dentro do container
    marginVertical: 10, // Espaço entre os botões
    borderRadius: 25,
    overflow: 'hidden',
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonWrapper2: {
    width: '100%', // A largura dos botões ocupa toda a largura disponível dentro do container
    marginVertical: 10, // Espaço entre os botões
    borderRadius: 25,
    overflow: 'hidden',
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#7DCD9A', // Cor padrão do texto
    fontSize: 18,
    fontWeight: 'bold',
  },
});
