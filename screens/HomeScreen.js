import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="hidden" /> {/* Esconde a barra de status */}
      
      {/* Texto Bem-vindo! */}
      <Text style={styles.welcomeText}>Bem-vindo ao Vitality Vision!</Text>
      

    
      {/* Botões na parte inferior */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
            color="#fff"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Cadastro"
            onPress={() => navigation.navigate('Signup')}
            color="#fff"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff', // Cor de fundo do app
  },

  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
  },
 
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30, // Coloca os botões na parte inferior
    justifyContent: 'space-between',
    width: '80%',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 25, // Borda arredondada nos botões
    backgroundColor: '#007BFF', // Cor de fundo dos botões
  },
});
