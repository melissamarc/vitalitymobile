import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";

interface ProgressBarCaloriesProps {
  dailyCalorieGoal: number; // Meta de calorias diária
  stepsTaken: number; // Total de passos dados
}

const ProgressBarCalories: React.FC<ProgressBarCaloriesProps> = ({
  dailyCalorieGoal,
  stepsTaken,
}) => {
  const CALORIES_PER_STEP = 0.02; // Quantas calorias são queimadas por passo
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  useEffect(() => {
    // Calcula calorias queimadas com base nos passos dados
    setCaloriesBurned(stepsTaken * CALORIES_PER_STEP);
  }, [stepsTaken]);

  const progress = Math.min(caloriesBurned / dailyCalorieGoal, 1); // Garante que o progresso não passe de 100%

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Calorias {"\n"}gastas</Text>
      <ProgressBar
        progress={progress}
        color="#7dcd9a"
        style={styles.progress}
      />
      <Text style={styles.details}>
        {Math.min(caloriesBurned, dailyCalorieGoal).toFixed()} /{" "}
        {dailyCalorieGoal} kcal
      </Text>
      {caloriesBurned >= dailyCalorieGoal ? (
        <Text style={styles.congratulations}>Meta atingida! 🎉</Text>
      ) : (
        <Text style={styles.remaining}>
          Faltam{" "}
          {(
            dailyCalorieGoal - Math.min(caloriesBurned, dailyCalorieGoal)
          ).toFixed()}{" "}
          kcal para alcançar sua meta.
        </Text>
      )}
    </View>
  );
};

export default ProgressBarCalories;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#046",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
    height: 190,
    marginTop: 9,
  },
  label: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  progress: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#DDD",
  },
  details: {
    fontSize: 16,
    marginTop: 10,
    color: "#fff",
  },
  congratulations: {
    marginTop: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  remaining: {
    marginTop: 10,
    color: "#fff",
  },
});
