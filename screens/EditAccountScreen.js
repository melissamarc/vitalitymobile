import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import {
  getAuth,
  updateEmail,
  updatePhoneNumber,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { launchImageLibrary } from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditAccountScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    photoURL: "",
  });
  const [newUsername, setNewUsername] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);

  useEffect(() => {
    // Carregar dados do usuário
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        setUserData({
          username: user.displayName,
          phoneNumber: user.phoneNumber,
          email: user.email,
          photoURL: user.photoURL,
        });
      }
    };
    fetchUserData();
  }, []);

  const handleAvatarSelect = async () => {
    let result = await launchImageLibrary({ mediaTypes: "Images", quality: 1 });
    if (!result.cancelled) {
      setNewAvatar(result.uri);
    }
  };

  const handleSave = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado");
      return;
    }

    try {
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);

      // Atualiza o perfil
      await updateProfile(user, {
        displayName: newUsername || userData.username,
        photoURL: newAvatar || userData.photoURL,
      });

      // Atualiza email se foi modificado
      if (newEmail && newEmail !== userData.email) {
        await updateEmail(user, newEmail);
      }

      // Atualiza número de telefone se foi modificado
      if (newPhoneNumber && newPhoneNumber !== userData.phoneNumber) {
        await updatePhoneNumber(user, newPhoneNumber); // Este método só funciona para usuários que autenticaram via telefone.
      }

      // Salva as informações no Firestore
      await updateDoc(userDocRef, {
        username: newUsername || userData.username,
        phoneNumber: newPhoneNumber || userData.phoneNumber,
        email: newEmail || userData.email,
        photoURL: newAvatar || userData.photoURL,
      });

      // Salva no AsyncStorage
      await AsyncStorage.setItem(
        "userAvatar",
        JSON.stringify(newAvatar || userData.photoURL)
      );

      // Navega de volta
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar as informações:", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar as informações.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Campo de Username */}
      <TextInput
        style={styles.input}
        placeholder="Novo Username"
        value={newUsername}
        onChangeText={setNewUsername}
      />

      {/* Campo de Telefone */}
      <TextInput
        style={styles.input}
        placeholder="Novo Número de Telefone"
        value={newPhoneNumber}
        onChangeText={setNewPhoneNumber}
        keyboardType="phone-pad"
      />

      {/* Campo de Email */}
      <TextInput
        style={styles.input}
        placeholder="Novo Email"
        value={newEmail}
        onChangeText={setNewEmail}
        keyboardType="email-address"
      />

      {/* Seletor de Foto de Perfil */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity
          onPress={handleAvatarSelect}
          style={styles.avatarButton}
        >
          <Image
            source={{
              uri:
                newAvatar ||
                userData.photoURL ||
                "https://via.placeholder.com/100",
            }}
            style={styles.avatarImage}
          />
        </TouchableOpacity>
      </View>

      {/* Botão de Salvar */}
      <Button title="Salvar" onPress={handleSave} />

      {/* Botão de Cancelar */}
      <Button
        title="Cancelar"
        onPress={() => navigation.goBack()}
        color="gray"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarButton: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 50,
    padding: 5,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default EditAccountScreen;
