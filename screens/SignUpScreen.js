import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { firebase } from "../firebaseconfig";

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState("");
  const [showGenderDropdown, setShowGenderDropdown] = useState(false); // Controle do dropdown
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showGoalModal, setShowGoalModal] = useState(false);
  const [stepGoal, setStepGoal] = useState("");
  const [calorieGoal, setCalorieGoal] = useState("");

  const genderOptions = [
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
    { label: "Prefiro não dizer", value: "naoDizer" },
  ];

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  const handleSignup = () => {
    if (!fullName || !username || !dob || !gender || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos!");
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

        firebase.firestore().collection("users").doc(userId).set({
          fullName,
          username,
          dob: dob ? dob.toISOString().split("T")[0] : "",
          gender,
          email,
        });

        setShowGoalModal(true);
      })
      .catch((error) => Alert.alert("Erro", error.message));
  };

  const saveGoals = () => {
    const userId = firebase.auth().currentUser.uid;

    if (!stepGoal || !calorieGoal) {
      Alert.alert("Erro", "Você deve definir suas metas!");
      return;
    }

    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({
        stepGoal: parseInt(stepGoal),
        calorieGoal: parseInt(calorieGoal),
      })
      .then(() => {
        setShowGoalModal(false);
        Alert.alert("Sucesso", "Metas salvas com sucesso!");
        navigation.navigate("Dashboard");
      })
      .catch((error) => Alert.alert("Erro", error.message));
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View style={styles.topSection}>
        <Text style={styles.headerText}>Criar Conta</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Nome completo"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          placeholderTextColor="black"
        />
        <TextInput
          placeholder="Nome de usuário"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="black"
        />

        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text style={{ color: dob ? "black" : "#888" }}>
            {dob ? dob.toLocaleDateString() : "Data de nascimento"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dob || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Drop-down para gênero */}
        <TouchableOpacity
          onPress={() => setShowGenderDropdown((prev) => !prev)} // Abre/fecha o drop-down
          style={[styles.input, styles.dropdownInput]}
        >
          <Text style={{ color: gender ? "black" : "#888" }}>
            {gender
              ? genderOptions.find((option) => option.value === gender)?.label
              : "Selecione o gênero"}
          </Text>
        </TouchableOpacity>

        {showGenderDropdown && (
          <View style={styles.dropdownContainer}>
            <FlatList
              data={genderOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setGender(item.value); // Define o gênero selecionado
                    setShowGenderDropdown(false); // Fecha o drop-down
                  }}
                >
                  <Text style={styles.dropdownItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          placeholderTextColor="black"
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="black"
        />
        <TextInput
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="black"
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: '#ffff0',

  },
  topSection: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center",
    marginTop: 50,
  },
  headerText: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
  },
  form: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  input: {
      width: '100%',
      padding: 15,
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: 10,
      marginBottom: 15,
    },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#DDD",
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  signupButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#7DCD9A",
    borderRadius: 10,
    alignItems: "center",
    width: '100%',
  },
  signupButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  dropdownInput: {
    position: "relative",
  },
  dropdownContainer: {
    position: "absolute",
    top: 65,
    width: "100%",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    zIndex: 10,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  dropdownItemText: {
    color: "#333",
  },
});
