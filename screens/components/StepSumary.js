import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StepSummary = () => {
  const [steps, setSteps] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const storedSteps = await AsyncStorage.getItem("steps");
      const storedCalories = await AsyncStorage.getItem("caloriesBurned");
      if (storedSteps) {
        setSteps(Number(storedSteps));
      }
      if (storedCalories) {
        setCaloriesBurned(Number(storedCalories));
      }
      setLoading(false);
    };
    loadData();
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
      <View style={styles.textContainer}>
        <Text style={styles.stepsText}>{steps}</Text>
        <Text style={styles.label}>Passos</Text>
        <Text style={styles.caloriesText}>
          {caloriesBurned.toFixed(1)} kcal
        </Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/tenis.png")} // Substitua pelo caminho correto da sua imagem
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    padding: 20,
    width: 200,
    height: 200,
    overflow: "hidden", // Garante o corte da imagem nas bordas
  },
  textContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  stepsText: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#fff",
  },
  label: {
    fontSize: 20,
    color: "#fff",
    marginTop: 5,
  },
  caloriesText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
  },
  imageWrapper: {
    position: "absolute",
    right: -55, // Posiciona a imagem para "entrar" na borda
    top: -40,
    width: 150,
    height: 200,
    overflow: "hidden", // Garante o corte da imagem
  },
  image: {
    width: "100%", // Garante que a imagem preencha o wrapper
    height: "100%",
    resizeMode: "contain",
    transform: [{ rotate: "-15deg" }], // Inclinação da imagem
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StepSummary;
