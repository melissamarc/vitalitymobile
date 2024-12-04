import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { firebase } from "../firebaseconfig";

export default function GoalSettingScreen({ navigation }) {
  const [stepGoal, setStepGoal] = useState("");
  const [calorieGoal, setCalorieGoal] = useState("");

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
        Alert.alert("Sucesso", "Metas salvas com sucesso!");
        navigation.navigate("Dashboard"); // Redireciona para o Dashboard
      })
      .catch((error) => Alert.alert("Erro", error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Defina suas metas</Text>

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
  title: {
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
    padding: 15,
    borderRadius: 10,
    width: "100%",
  },
  saveButtonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
