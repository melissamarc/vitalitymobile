// StepSummary.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const StepSummary = () => {
  const [steps, setSteps] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [loading, setLoading] = useState(true);

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
     
      <Text style={styles.info}>Passos: {steps}</Text>
      <Text style={styles.info}>Calorias {caloriesBurned.toFixed(1)} kcal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#7dcd',
    borderRadius: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 18,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StepSummary;
