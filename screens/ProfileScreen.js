import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

export default function ProfileScreen({ navigation }) {
  const handleEditAccount = () => {
    navigation.navigate("EditAccountScreen"); // Substitua "EditAccountScreen" pelo nome da tela desejada
  };

  const handleSettings = () => {
    navigation.navigate("SettingsScreen"); // Substitua "SettingsScreen" pelo nome da tela desejada
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Foto de Perfil */}
      <Image
        source={require("../assets/profilepicture.png")} // Substitua pelo caminho correto da imagem ou use um estado para imagem dinâmica
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>Seu Nome</Text>

      {/* Botão Editar Conta */}
      <TouchableOpacity style={styles.button} onPress={handleEditAccount}>
        <Text style={styles.buttonText}>Editar Conta</Text>
      </TouchableOpacity>

      {/* Botão Configuração */}
      <TouchableOpacity style={styles.button} onPress={handleSettings}>
        <Text style={styles.buttonText}>Configuração</Text>
      </TouchableOpacity>

      {/* Botão Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
  },
  button: {
    width: "80%",
    padding: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 50,
    padding: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    alignItems: "center",
    width: "60%",
  },
  backButtonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },
});
