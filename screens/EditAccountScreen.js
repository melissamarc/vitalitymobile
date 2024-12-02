import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Para escolher a imagem

const EditAccountScreen = ({ route, navigation }) => {
  const { onUpdateUser, currentUsername, currentProfilePhoto } = route.params;  // Recebendo os dados atuais
  const [newUsername, setNewUsername] = useState(currentUsername || '');  // Inicializa com o valor atual
  const [imageUri, setImageUri] = useState(currentProfilePhoto || '');  // Inicializa com a foto atual

  useEffect(() => {
    setNewUsername(currentUsername);
    setImageUri(currentProfilePhoto);
  }, [currentUsername, currentProfilePhoto]);

  const handleSave = () => {
    if (!newUsername) {
      alert('O nome de usuário não pode estar vazio!');
      return;
    }
    if (onUpdateUser) {
      onUpdateUser(newUsername, imageUri); // Atualizando as informações
      navigation.goBack();  // Voltando para a tela anterior após a atualização
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Novo nome de usuário"
        value={newUsername}
        onChangeText={setNewUsername}
      />

      {/* Exibindo a imagem selecionada */}
      <View style={styles.profileSection}>
        <Image
          source={imageUri ? { uri: imageUri } : require('../assets/semfoto.png')}
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={pickImage} style={styles.editPhotoButton}>
          <Text style={styles.editPhotoText}>Escolher Foto</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "white",
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  editPhotoButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
  },
  editPhotoText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditAccountScreen;
