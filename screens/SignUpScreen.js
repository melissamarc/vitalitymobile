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
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { firebase } from "../firebaseconfig"; // Certifique-se de ter configurado corretamente o Firebase

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [stepGoal, setStepGoal] = useState("");
  const [calorieGoal, setCalorieGoal] = useState("");

  // Cores dinâmicas
  const [backgroundColor, setBackgroundColor] = useState("#ffff0");
  const [inputColor, setInputColor] = useState("#000");

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
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

        // Salva dados básicos do usuário no Firestore
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
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Erro", errorMessage);
      });
  };

  const saveGoals = () => {
    const userId = firebase.auth().currentUser.uid;

    if (!stepGoal || !calorieGoal) {
      Alert.alert("Erro", "Você deve definir suas metas!");
      return;
    }

    // Verificação para garantir que as metas sejam números válidos
    if (isNaN(stepGoal) || isNaN(calorieGoal)) {
      Alert.alert("Erro", "As metas devem ser números válidos!");
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
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Erro", errorMessage);
      });
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar hidden />
      
      {/* Imagem do logo */}
      <Image
        source={require('../assets/iconhome.png')} // Caminho da imagem do logo
        style={styles.imagemsingup}
      />

      <View style={styles.topSection}>
        <Text style={styles.headerText}>Criar Conta</Text>
      </View>

      <View style={styles.boxsingup}>
        <TextInput
          placeholder="Nome completo"
          value={fullName}
          onChangeText={setFullName}
          style={[styles.input, { color: inputColor }]}
          placeholderTextColor="black"
        />
        <TextInput
          placeholder="Nome de usuário"
          value={username}
          onChangeText={setUsername}
          style={[styles.input, { color: inputColor }]}
          placeholderTextColor="black"
        />

        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.input, { color: inputColor }]}>
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

        {/* Campo de seleção de gênero */}
        <TouchableOpacity
          style={[styles.input, { color: inputColor }]}
          onPress={() => setShowGenderOptions(!showGenderOptions)}
        >
          <Text style={{ color: gender ? "black" : "#888" }}>
            {gender || "Selecione o gênero"}
          </Text>
        </TouchableOpacity>

        {/* Drop-down para gênero */}
        {showGenderOptions && (
          <View style={styles.genderOptions}>
            <TouchableOpacity
              style={styles.genderOption}
              onPress={() => { setGender("Feminino"); setShowGenderOptions(false); }}
            >
              <Text style={styles.genderOptionText}>Feminino</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.genderOption}
              onPress={() => { setGender("Masculino"); setShowGenderOptions(false); }}
            >
              <Text style={styles.genderOptionText}>Masculino</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.genderOption}
              onPress={() => { setGender("Prefiro não dizer"); setShowGenderOptions(false); }}
            >
              <Text style={styles.genderOptionText}>Prefiro não dizer</Text>
            </TouchableOpacity>
          </View>
        )}

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, { color: inputColor }]}
          keyboardType="email-address"
          placeholderTextColor="black"
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { color: inputColor }]}
          secureTextEntry
          placeholderTextColor="black"
        />
        <TextInput
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={[styles.input, { color: inputColor }]}
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
              style={[styles.input, { color: inputColor }]}
            />
            <TextInput
              placeholder="Meta de calorias diárias"
              keyboardType="numeric"
              value={calorieGoal}
              onChangeText={setCalorieGoal}
              style={[styles.input, { color: inputColor }]}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.signupButton} onPress={saveGoals}>
                <Text style={styles.signupButtonText}>Salvar Metas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signupButton}
                onPress={() => setShowGoalModal(false)}
              >
                <Text style={styles.signupButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagemsingup: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 30,
  },
  topSection: {
  marginTop: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 5,
  },
  boxsingup: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    marginBottom: 15,
    color: "#000",
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
  },
  genderOptions: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  genderOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  genderOptionText: {
    color: "black",
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
    borderRadius: 20,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",

  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "46%",
  },

  saveButton: {
    backgroundColor: "#7DCD9A",
    padding: 15,
    borderRadius: 10,
    width: "46%",  // Ajusta a largura dos botões
  },
  saveButtonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
