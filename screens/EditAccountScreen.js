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
  Text,
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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Icon from "react-native-vector-icons/Feather"; // Importando o ícone de lápis

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

  const handleChangeProfilePicture = () => {
    Alert.alert(
      "Alterar Foto de Perfil",
      "Aqui você pode permitir que o usuário selecione uma nova foto."
    );
    // Você pode integrar com uma biblioteca de seleção de imagem aqui, como o `react-native-image-picker`
  };

  const handleSave = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado");
      return;
    }

    try {
      let photoURL = userData.photoURL;

      // Se o usuário escolheu uma nova foto, faça o upload
      if (newAvatar) {
        const storage = getStorage();
        const avatarRef = ref(storage, `avatars/${user.uid}`);

        // Converte a imagem para o formato adequado e faz o upload
        const response = await fetch(newAvatar);
        const blob = await response.blob();

        await uploadBytes(avatarRef, blob);
        photoURL = await getDownloadURL(avatarRef); // Obtém a URL da imagem carregada
      }

      // Atualiza o perfil no Firebase Authentication
      await updateProfile(user, {
        displayName: newUsername || userData.username,
        photoURL: photoURL,
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
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        username: newUsername || userData.username,
        phoneNumber: newPhoneNumber || userData.phoneNumber,
        email: newEmail || userData.email,
        photoURL: photoURL,
      });

      // Salva no AsyncStorage
      await AsyncStorage.setItem("userAvatar", JSON.stringify(photoURL));

      // Navega de volta
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar as informações:", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar as informações.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

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
        <TouchableOpacity
          onPress={handleChangeProfilePicture}
          style={styles.editIconContainer}
        >
          <Icon name="edit" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Campo de Username */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome de Usuário</Text>
        <TextInput
          style={styles.input}
          value={newUsername}
          onChangeText={setNewUsername}
        />
      </View>

      {/* Campo de Telefone */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número de Telefone</Text>
        <TextInput
          style={styles.input}
          value={newPhoneNumber}
          onChangeText={setNewPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      {/* Campo de Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={newEmail}
          onChangeText={setNewEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Botões */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          color="gray"
          style={styles.saveButton2}
        >
          {" "}
          <Text style={styles.saveButtonText2}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 12,
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderColor: "#2C6B2F", // Cor verde escuro
    fontSize: 16,
    color: "#333",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 5,
    right: 10,
    backgroundColor: "#7dcd9a",
    padding: 6,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  avatarButton: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 50,
    marginBottom: 10,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 180,
    justifyContent: "flex-end",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  saveButton2: {
    backgroundColor: "#ddd",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  saveButtonText2: {
    color: "#4acf50",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditAccountScreen;
