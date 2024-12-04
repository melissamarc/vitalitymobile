import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { firebase } from "../firebaseconfig";

export default function GoalsScreen({ navigation }) {
  const [stepGoal, setStepGoal] = useState("");
  const [calorieGoal, setCalorieGoal] = useState("");

  const saveGoals = () => {
    if (!stepGoal || !calorieGoal) {
      Alert.alert("Erro", "Você deve definir suas metas!");
      return;
    }

    if (isNaN(stepGoal) || isNaN(calorieGoal)) {
      Alert.alert("Erro", "As metas devem ser números válidos!");
      return;
    }

    const userId = firebase.auth().currentUser.uid;

    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({
        stepGoal: parseInt(stepGoal),
        calorieGoal: parseInt(calorieGoal),
      })
      .then(() => {
        Alert.alert("Sucesso", "Metas salvas com sucesso!");
        navigation.navigate("Dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Erro", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Defina suas metas</Text>
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
      <TouchableOpacity style={styles.saveButton} onPress={saveGoals}>
        <Text style={styles.saveButtonText}>Salvar Metas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#7DCD9A",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
