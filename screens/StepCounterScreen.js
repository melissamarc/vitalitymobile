import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native";
import { Pedometer } from "expo-sensors";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../firebaseconfig";
import UserButton from './components/UserButton';
import { LineChart } from "react-native-svg-charts";
import FootImage from '../assets/pe.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  // Carregar dados do AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      const storedSteps = await AsyncStorage.getItem('steps');
      const storedCalories = await AsyncStorage.getItem('caloriesBurned');
      if (storedSteps) {
        setSteps(Number(storedSteps));
      }
      if (storedCalories) {
        setCaloriesBurned(Number(storedCalories));
      }
    };
    loadData();
  }, []);

  // Salvar passos e calorias no AsyncStorage
  useEffect(() => {
    const saveData = async () => {
      await AsyncStorage.setItem('steps', String(steps));
      await AsyncStorage.setItem('caloriesBurned', String(caloriesBurned));
    };
    saveData();
  }, [steps, caloriesBurned]);

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
            onPress={() => navigation.navigate("SettingsScreen")}
            style={styles.iconButton}
          >
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
            style={styles.iconButton}
          >
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Cartão de Progresso */}
      <View style={styles.progressCard}>
        <View style={styles.textContainer}>
          <Text style={styles.metricValue}>{steps}</Text>
          <Text style={styles.metricLabel}>Passos</Text>
          <Text style={styles.metricValue}>{caloriesBurned.toFixed(1)} kcal</Text>
          <Text style={styles.metricLabel}>Calorias</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={FootImage} style={styles.imageStyle} />
        </View>
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
    paddingHorizontal: 10
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
  progressCard: {
    flexDirection: "row",
    backgroundColor: "#7dcd9a",
    padding: 25,
    borderRadius: 20,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  imageStyle: {
    marginLeft: 20,
    width: 150,
    height: 150
  },
  metricValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  metricLabel: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 20
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 12,
    height: 200,
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
    color: "#7dcd9a",
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
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  }
});

export default StepCounterScreen;
