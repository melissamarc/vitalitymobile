import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.texto}>
          <Text style={styles.title}>Comece definindo {"\n"}suas metas!</Text>

          <Text style={styles.cardDescription}>
            Planeje suas metas e objetivos e obtenha um melhor desempenho.
          </Text>
        </View>

        <Image
          source={require("../assets/estrelas.png")}
          style={styles.estrelasIcon}
        />
      </View>

      <View style={styles.stepsContainer}>
        <View style={styles.step}>
          <View style={styles.stepDetails}>
            <Text style={styles.stepTitle}>Passos Diários </Text>
            <TextInput
              placeholder="Meta de passos diários"
              keyboardType="numeric"
              value={stepGoal}
              onChangeText={setStepGoal}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.step}>
          <View style={styles.stepDetails}>
            <Text style={styles.stepTitle}>Gasto de Calorias Diário</Text>
            <TextInput
              placeholder="Meta de calorias diárias"
              keyboardType="numeric"
              value={calorieGoal}
              onChangeText={setCalorieGoal}
              style={styles.input}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveGoals}>
        <Text style={styles.saveButtonText}>Salvar Metas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    width: 170,
  },
  estrelasIcon: {
    width: 85,
    height: 85,
    top: -15,
    left: -15,
  },
  card: {
    backgroundColor: "#7dcd9a",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D9CDB",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
    width: 260,
  },
  avatarContainer: {
    flexDirection: "row",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  stepsContainer: {
    marginBottom: 20,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  stepIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  stepDetails: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  saveButton: {
    backgroundColor: "#7dcd9a",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 290,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
