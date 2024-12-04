import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [showHelp1, setShowHelp1] = useState(false);
  const [showHelp2, setShowHelp2] = useState(false);
  const [showHelp3, setShowHelp3] = useState(false);

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta',
      'Tem certeza de que deseja excluir sua conta? Essa ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => console.log('Conta excluída') },
      ]
    );
  };

  const handleLogout = () => {
    navigation.navigate('Home'); // Redireciona para a tela Home
  };

  const handleAddAccount = () => {
    Alert.alert('Adicionar Conta', 'Funcionalidade de adicionar uma nova conta será implementada.');
  };

  const toggleHelp = (helpNumber) => {
    if (helpNumber === 1) setShowHelp1(!showHelp1);
    if (helpNumber === 2) setShowHelp2(!showHelp2);
    if (helpNumber === 3) setShowHelp3(!showHelp3);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo ou imagem, se necessário */}
      <Image style={styles.imagemlogin} source={{ uri: 'https://via.placeholder.com/200' }} />
      
      {/* Título */}
      <Text style={styles.titleText}>Configurações</Text>


      {/* Botões para expandir as seções de ajuda */}
      <TouchableOpacity onPress={() => toggleHelp(1)} style={styles.helpButton}>
        <Text style={styles.buttonText}>{showHelp1 ? 'Fechar Ajuda 1' : 'Abrir Ajuda 1'}</Text>
      </TouchableOpacity>
      {showHelp1 && (
        <View style={styles.helpContent}>
          <Text style={styles.helpText}>
            Aqui você pode encontrar mais informações sobre como utilizar o aplicativo e solucionar problemas comuns. Ajuda 1.
          </Text>
        </View>
      )}

      <TouchableOpacity onPress={() => toggleHelp(2)} style={styles.helpButton}>
        <Text style={styles.buttonText}>{showHelp2 ? 'Fechar Ajuda 2' : 'Abrir Ajuda 2'}</Text>
      </TouchableOpacity>
      {showHelp2 && (
        <View style={styles.helpContent}>
          <Text style={styles.helpText}>
            Ajuda 2: Mais informações sobre a funcionalidade X.
          </Text>
        </View>
      )}

      <TouchableOpacity onPress={() => toggleHelp(3)} style={styles.helpButton}>
        <Text style={styles.buttonText}>{showHelp3 ? 'Fechar Ajuda 3' : 'Abrir Ajuda 3'}</Text>
      </TouchableOpacity>
      {showHelp3 && (
        <View style={styles.helpContent}>
          <Text style={styles.helpText}>
            Ajuda 3: Informações sobre como solucionar problemas comuns de configuração.
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddAccount}>
          <Text style={styles.buttonText}>Adicionar Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Text style={styles.buttonText}>Excluir Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff0',
    alignItems: 'center',
    justifyContent: 'flex-start', // Para garantir que o conteúdo seja centralizado, mas o título fique no topo
    padding: 20,
  },

  titleText: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 20, // Espaço do topo
    marginBottom: 140, // Espaço entre o título e o próximo conteúdo
    textAlign: 'center', // Centraliza o título
  },
  buttonContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#7DCD9A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#ff6f61',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#7DCD9A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  helpButton: {
    backgroundColor: '#a9a9a9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
  },
  helpContent: {
    backgroundColor: '#f1f1f1',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  helpText: {
    fontSize: 14,
    color: '#555',
  },
});


