import React from "react";
import { ScrollView, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditAccountScreen = ({ navigation }) => {
  const avatars = [
    require('../assets/avatares/avatar1.png'),
    require('../assets/avatares/avatar2.png'),
    require('../assets/avatares/avatar3.png'),
  ];

  const handleAvatarSelect = async (selectedAvatar) => {
    try {
      // Salva o avatar no AsyncStorage
      await AsyncStorage.setItem('userAvatar', JSON.stringify(selectedAvatar));
      // Retorna para a tela de perfil
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar avatar:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {avatars.map((avatar, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleAvatarSelect(avatar)}
          style={styles.avatarButton}
        >
          <Image source={avatar} style={styles.avatarImage} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  avatarButton: {
    margin: 10,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default EditAccountScreen;
