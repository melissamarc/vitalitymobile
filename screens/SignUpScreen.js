import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { firebase } from "../firebaseconfig";

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Para metas
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [stepGoal, setStepGoal] = useState("");
  const [calorieGoal, setCalorieGoal] = useState("");

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

        // Salva dados básicos do usuário
        firebase.firestore().collection("users").doc(userId).set({
          fullName,
          username,
          dob: dob ? dob.toISOString().split("T")[0] : "",
          gender,
          email,
        });

        // Exibe modal para definir metas
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

    // Atualiza o Firestore com as metas
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

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione o gênero" value="" />
            <Picker.Item label="Feminino" value="feminino" />
            <Picker.Item label="Masculino" value="masculino" />
            <Picker.Item label="Prefiro não dizer" value="naoDizer" />
          </Picker>
        </View>

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

      {/* Modal para definir metas */}
      <Modal visible={showGoalModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Defina suas metas</Text>
            <TextInput
              placeholder="Meta de passos diários"
              keyboardType="numeric"
              value={stepGoal}
              onChangeText={setStepGoal}
              style={styles.input}
            />
            <TextInput
              placeholder="Meta de calorias diárias"
              keyboardType="numeric"
              value={calorieGoal}
              onChangeText={setCalorieGoal}
              style={styles.input}
            />
            <TouchableOpacity style={styles.signupButton} onPress={saveGoals}>
              <Text style={styles.signupButtonText}>Salvar Metas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#FFF" },
  form: { width: "90%" },
  input: { marginBottom: 15, padding: 10, borderWidth: 1, borderColor: "#DDD", borderRadius: 5 },
  signupButton: { padding: 15, backgroundColor: "#4CAF50", borderRadius: 5, alignItems: "center" },
  signupButtonText: { color: "#FFF", fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "#FFF", padding: 20, borderRadius: 10, width: "80%" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
});