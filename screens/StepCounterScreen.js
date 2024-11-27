import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Pedometer } from "expo-sensors";
import { Ionicons } from "@expo/vector-icons";
import { ProgressCircle, LineChart } from "react-native-svg-charts";
import UserButton from "./components/UserButton";
import { firebase } from "../firebaseconfig";

const StepCounterScreen = ({ navigation }: any) => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(null);
  const [steps, setSteps] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [stepGoal, setStepGoal] = useState(3000); // Meta padrão
  const [calorieGoal, setCalorieGoal] = useState(200); // Meta padrão
  const [loading, setLoading] = useState(true);

  // Carregar metas do Firestore
  useEffect(() => {
    const fetchUserGoals = async () => {
      const userId = firebase.auth().currentUser?.uid;

      if (!userId) {
        console.error("Usuário não autenticado");
        return;
      }

      try {
        const userDoc = await firebase
          .firestore()
          .collection("users")
          .doc(userId)
          .get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          setStepGoal(userData.stepGoal || 3000);
          setCalorieGoal(userData.calorieGoal || 200);
        } else {
          console.log("Documento do usuário não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao carregar metas do Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserGoals();
  }, []);

  // Configurar pedômetro
  useEffect(() => {
    Pedometer.isAvailableAsync().then(
      (result) => setIsPedometerAvailable(result),
      (error) => console.error("Erro ao verificar o pedômetro:", error)
    );

    const subscription = Pedometer.watchStepCount((result) => {
      const newSteps = result.steps;
      setSteps(newSteps);
      setCaloriesBurned(newSteps * 0.04); // Estimativa: 0,04 kcal por passo
    });

    return () => subscription && subscription.remove();
  }, []);

  // Cálculo de porcentagens para os gráficos
  const stepProgress = Math.min((steps / stepGoal) * 100, 100);
  const calorieProgress = Math.min((caloriesBurned / calorieGoal) * 100, 100);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <UserButton />
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notification")}
            style={styles.iconButton}
          >
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
            style={styles.iconButton}
          >
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Gráfico Circular de Progresso */}
      <View style={styles.card}>
        <Text style={styles.title}>Seu Progresso</Text>
        <ProgressCircle
          style={styles.progressCircle}
          progress={stepProgress / 100}
          progressColor="#4CAF50"
          backgroundColor="#E0E0E0"
          strokeWidth={10}
        >
          <Text style={styles.progressText}>{`${stepProgress.toFixed(0)}%`}</Text>
        </ProgressCircle>
        <Text style={styles.subTitle}>Passos: {steps}/{stepGoal}</Text>
        <Text style={styles.subTitle}>
          Calorias: {caloriesBurned.toFixed(1)} kcal / {calorieGoal} kcal
        </Text>
      </View>

      {/* Informações Adicionais em Cartões */}
      <View style={styles.cardRow}>
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Calorias diárias</Text>
          <Text style={styles.cardValue}>{caloriesBurned.toFixed(1)} kcal</Text>
          <Text style={styles.cardMeta}>Meta: {calorieGoal} kcal</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Passos</Text>
          <Text style={styles.cardValue}>{steps}</Text>
          <Text style={styles.cardMeta}>Meta: {stepGoal}</Text>
        </View>
      </View>

      {/* Gráfico Linear para Progresso Diário */}
      <View style={styles.graphContainer}>
        <LineChart
          style={{ height: 150, width: Dimensions.get("window").width - 40 }}
          data={[steps, caloriesBurned, calorieGoal]} // Simula dados do progresso
          svg={{ stroke: "#4CAF50", strokeWidth: 2 }}
          contentInset={{ top: 10, bottom: 10 }}
        />
        <Text style={styles.graphTitle}>Progresso diário</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingTop: 30,
  },
  icons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  iconButton: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  progressCircle: {
    height: 150,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    position: "absolute",
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subTitle: {
    fontSize: 16,
    color: "#777",
    marginTop: 5,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  cardMeta: {
    fontSize: 14,
    color: "#777",
  },
  graphContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  graphTitle: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "#777",
  },
});

export default StepCounterScreen;
