import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { firebase } from "../firebaseconfig";

export default function SignupScreen({ navigation }) {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleSignup = () => {
    if (
      !fullname ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone
    ) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos!");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido!");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        "Senha inválida",
        "A senha deve conter pelo menos uma letra maiúscula, um número e ter no mínimo 6 caracteres."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;

        // Salva dados do usuário no Firestore
        firebase.firestore().collection("users").doc(userId).set({
          fullname,
          username,
          email,
          phone,
        });

        navigation.navigate("Metas");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Erro", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/iconhome.png")} // Adicione o logo de planta
        style={styles.logo}
      />
      <View style={styles.textos}>
        <Text style={styles.headerText}>Bem-Vindo ao Vitality.</Text>
        <Text style={styles.subtext}>
          Cadastre-se e inicie uma jornada mais saudável.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nome Completo"
          value={fullname}
          onChangeText={setFullname}
          style={styles.input}
        />
        <TextInput
          placeholder="Nome de Usuário"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Telefone"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Cadastrar</Text>
        </TouchableOpacity>

        <View style={styles.signUpSection}>
          <Text>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signUpText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 50,
  },
  signUpSection: {
    flexDirection: "row",
    width: "100%",
    marginTop: 15,
    justifyContent: "center",
  },
  signUpText: {
    color: "#7DCD9A",
    fontWeight: "bold",
  },

  signupButton: {
    backgroundColor: "#7DCD9A",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  signupButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  orText: {
    marginVertical: 10,
    color: "#888",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    width: "60%",
  },
  socialButton: {
    backgroundColor: "#EEE",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  textos: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: 20,
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
  },
  subtext: {
    fontSize: 18,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 18,
  },
});
