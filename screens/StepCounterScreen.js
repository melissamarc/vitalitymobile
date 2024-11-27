import React, { useState, useEffect } from "react";
import {
     View,
      Text,
       StyleSheet, 
       Dimensions,
    TouchableOpacity} from "react-native";
import { Pedometer } from "expo-sensors";
import { Ionicons } from '@expo/vector-icons'; // Biblioteca para os ícones
import { ProgressCircle, LineChart } from "react-native-svg-charts";
import UserButton from "./components/UserButton";

const StepCounterScreen = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(null);
  const [steps, setSteps] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  // Metas diárias
  const STEP_GOAL = 3000;
  const CALORIE_GOAL = 200;

  useEffect(() => {
    // Verifica se o pedômetro está disponível no dispositivo
    Pedometer.isAvailableAsync().then(
      (result) => setIsPedometerAvailable(result),
      (error) => console.error("Erro ao verificar o pedômetro:", error)
    );

    // Monitora os passos
    const subscription = Pedometer.watchStepCount((result) => {
      const newSteps = result.steps;
      setSteps(newSteps);
      // Calcula calorias queimadas (estimativa: 0,04 kcal por passo)
      setCaloriesBurned(newSteps * 0.04);
    });

    // Limpa a assinatura ao desmontar o componente
    return () => subscription && subscription.remove();
  }, []);

  // Cálculo de porcentagens para os gráficos
  const stepProgress = Math.min((steps / STEP_GOAL) * 100, 100);
  const calorieProgress = Math.min((caloriesBurned / CALORIE_GOAL) * 100, 100);

  return (
    <View style={styles.container}>
           <View style={styles.header}> 
        <UserButton/>


        <View style={styles.icons}> 
            <TouchableOpacity
          onPress={() => navigation.navigate('Notification')}
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
        <Text style={styles.subTitle}>Passos: {steps}/{STEP_GOAL}</Text>
        <Text style={styles.subTitle}>
          Calorias: {caloriesBurned.toFixed(1)} kcal / {CALORIE_GOAL} kcal
        </Text>
      </View>

      {/* Informações Adicionais em Cartões */}
      <View style={styles.cardRow}>
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Calorias diárias</Text>
          <Text style={styles.cardValue}>{caloriesBurned.toFixed(1)} kcal</Text>
          <Text style={styles.cardMeta}>Meta: {CALORIE_GOAL} kcal</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}> Passos</Text>
          <Text style={styles.cardValue}>{steps}</Text>
          <Text style={styles.cardMeta}> Meta: {STEP_GOAL}</Text>
        </View>
      </View>

      {/* Gráfico Linear para Progresso Diário */}
      <View style={styles.graphContainer}>
        <LineChart
          style={{ height: 150, width: Dimensions.get("window").width - 40 }}
          data={[steps, caloriesBurned, CALORIE_GOAL]} // Simula dados do progresso
          svg={{ stroke: "#4CAF50", strokeWidth: 2 }}
          contentInset={{ top: 10, bottom: 10 }}
        />
        <Text style={styles.graphTitle}> Progresso diário </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 30,


  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
