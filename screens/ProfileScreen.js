import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const [avatar, setAvatar] = useState(require("../assets/semfoto.png")); // Avatar padrão

  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const savedAvatar = await AsyncStorage.getItem("userAvatar");
        if (savedAvatar) {
          setAvatar(JSON.parse(savedAvatar));
        }
      } catch (error) {
        console.error("Erro ao carregar avatar:", error);
      }
    };
    loadAvatar();
  }, []);

  const handleAvatarChange = async (selectedAvatar) => {
    try {
      setAvatar(selectedAvatar);
      await AsyncStorage.setItem("userAvatar", JSON.stringify(selectedAvatar));
    } catch (error) {
      console.error("Erro ao salvar avatar:", error);
    }
  };

  const handleEditAccount = () => {
    navigation.navigate("EditAccountScreen", {
      onAvatarSelect: handleAvatarChange,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={avatar} style={styles.profileImage} />
        <TouchableOpacity
          style={styles.editIcon}
          onPress={handleEditAccount}
        >
          <Text style={styles.editText}>✏️</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.profileName}>Seu Nome</Text>

      <TouchableOpacity style={styles.button} onPress={handleEditAccount}>
        <Text style={styles.buttonText}>Editar Conta</Text>
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
  avatarContainer: {
    position: "relative",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 5,
    elevation: 3,
  },
  editText: {
    fontSize: 16,
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
});
