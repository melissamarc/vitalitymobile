import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseconfig";
import WaterCounter from "./components/WaterCount";

import NutritionChart from "./components/NutritionChart";
import UserButton from "./components/UserButton";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import StepSummary from "./components/StepSumary";
import ProgressBarCalories from "./components/ProgressChart";

export default function DashboardHomeScreen() {
  const navigation = useNavigation();

  const [stepsTaken, setStepsTaken] = useState(2000); // Exemplo: passos dados
  const dailyCalorieGoal = 200; // Meta de calorias diárias definida pelo usuário
  const [totalWater, setTotalWater] = useState(0);

  useEffect(() => {
    const loadWaterData = async () => {
      const storedTotalWater = await AsyncStorage.getItem("totalWater");
      if (storedTotalWater) {
        setTotalWater(Number(storedTotalWater));
      }
    };

    loadWaterData();
  }, []);

  const [chartData, setChartData] = useState([]);

  // Função para calcular os dados do gráfico
  const calculateChartData = (meals) => {
    return [
      {
        name: "Calorias",
        population: meals.reduce((acc, meal) => acc + (meal.calories || 0), 0),
        color: "#0088FE",
      },
      {
        name: "Gorduras",
        population: meals.reduce((acc, meal) => acc + (meal.fat || 0), 0),
        color: "#00C49F",
      },
      {
        name: "Proteínas",
        population: meals.reduce((acc, meal) => acc + (meal.protein || 0), 0),
        color: "#FFBB28",
      },
    ];
  };

  // Monitorar dados do Firestore em tempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "userMeals"), (snapshot) => {
      const meals = snapshot.docs.map((doc) => doc.data());
      setChartData(calculateChartData(meals));
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  return (
    <View style={styles.container}>
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
      <NutritionChart data={chartData} />
      <View style={styles.content}>
        <WaterCounter />
        <StepSummary />
      </View>

      <ProgressBarCalories
        dailyCalorieGoal={dailyCalorieGoal}
        stepsTaken={stepsTaken}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },

  content: {
    flexDirection: "row",
    gap: 7,
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

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
  },
});
