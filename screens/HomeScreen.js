import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="hidden" /> {/* Esconde a barra de status */}

      {/* Texto de boas-vindas */}
      <Text style={styles.welcomeText}>Bem-vindo ao Vitality Vision!</Text>
      <Text style={styles.TextHome}>
        Acompanhe, monitore e gerencie sua saúde de forma rápida e eficiente.
      </Text>

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
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  TextHome: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    justifyContent: 'space-between',
    width: '80%',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 25,
    backgroundColor: '#007BFF',
    overflow: 'hidden',
  },
});

