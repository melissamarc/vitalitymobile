import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth"; // Para autenticação
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore"; // Para acessar dados do usuário
import Icon from "react-native-vector-icons/Feather"; // Importando o ícone de lápis

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    photoURL: "",
    consecutiveDays: 0, // Contador de dias consecutivos
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            ...data,
            consecutiveDays: calculateConsecutiveDays(data.loginDates || []),
          });

          // Adiciona a data do login atual
          await updateDoc(userDocRef, {
            loginDates: arrayUnion(new Date().toISOString()),
          });
        }
      }
    };
    fetchUserData();
  }, []);

  const calculateConsecutiveDays = (loginDates) => {
    if (loginDates.length === 0) return 0;

    // Ordena as datas
    const sortedDates = loginDates
      .map((date) => new Date(date))
      .sort((a, b) => b - a);

    let consecutiveDays = 1;
    for (let i = 1; i < sortedDates.length; i++) {
      const currentDate = sortedDates[i];
      const previousDate = sortedDates[i - 1];
      const diffTime = currentDate - previousDate;
      const diffDays = diffTime / (1000 * 3600 * 24);

      if (diffDays === 1) {
        consecutiveDays++;
      } else if (diffDays > 1) {
        break;
      }
    }
    return consecutiveDays;
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Excluir Conta",
      "Tem certeza de que deseja excluir sua conta? Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => console.log("Conta excluída"),
        },
      ]
    );
  };

  const handleChangeProfilePicture = () => {
    Alert.alert(
      "Alterar Foto de Perfil",
      "Aqui você pode permitir que o usuário selecione uma nova foto."
    );
    // Você pode integrar com uma biblioteca de seleção de imagem aqui, como o `react-native-image-picker`
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Informações do Usuário */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri:
              userData.photoURL ||
              "https://i.pinimg.com/736x/13/b4/08/13b408f0ad453542c0d8fa8e62602245.jpg",
          }}
          style={styles.userImage}
        />
      </View>
      <Text style={styles.nameText}>{userData.name}</Text>
      <Text style={styles.usernameText}>@{userData.username}</Text>

      {/* Botões */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("EditAccountScreen")}
      >
        <Text style={styles.buttonText}>Editar Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.permissionButton}
        onPress={() => navigation.navigate("HelpScreen")}
      >
        <Text style={styles.buttonText}>Ajuda</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => Alert.alert("Adicionar Conta")}
      >
        <Text style={styles.buttonText}>Adicionar Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteAccount}
      >
        <Text style={styles.buttonText}>Excluir Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    marginTop: 120,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },

  nameText: {
    fontSize: 25,
    marginTop: 25,
    fontWeight: "bold",
    color: "#000",
  },
  usernameText: {
    fontSize: 20,
    color: "gray",
    marginBottom: 140,
    marginTop: 10,
  },
  consecutiveDaysContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: "#7DCD9A",
    borderRadius: 10,
  },
  consecutiveDaysText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  editButton: {
    backgroundColor: "#7DCD9A",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  permissionButton: {
    backgroundColor: "#7DCD9A",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#FD6F61",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#7dcd9a",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#ff6f61",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
