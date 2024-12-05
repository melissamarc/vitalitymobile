import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useWaterContext } from "./Watercontext";

export default function WaterScreen() {
  const { cupsConsumed, setCupsConsumed } = useWaterContext();

  const waterAnim = useRef(new Animated.Value(0)).current;

  const handleAddCup = () => {
    setCupsConsumed(cupsConsumed + 1);
  };

  const handleRemoveCup = () => {
    if (cupsConsumed > 0) {
      setCupsConsumed(cupsConsumed - 1);
    }
  };

  const dailyGoal = 2000;
  const waterLevel = cupsConsumed * 200;
  const waterPercentage = Math.min((waterLevel / dailyGoal) * 100, 100);
  const waterInMl = cupsConsumed * 200;

  const waterHeight = Math.min(waterLevel, dailyGoal);

  useEffect(() => {
    Animated.timing(waterAnim, {
      toValue: (waterHeight / dailyGoal) * 300,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [cupsConsumed]);

  return (
    <View style={styles.container}>
      <View style={styles.WaterBox}>
        {/* Textos alinhados à esquerda */}
        <View style={styles.texts}>
          <Text style={styles.topTitle}>Controle de {"\n"}Água</Text>
          <Text style={styles.topText}>
            Acompanhe seu consumo diário de água, mantenha-se hidratado e
            alcance a meta de 2 litros (2000ml) para cuidar da sua saúde!{" "}
          </Text>
        </View>
      </View>

      <View style={styles.TitleContainer}>
        <Text style={styles.titleText}>Meta: 2000ml</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <Animated.View
            style={[styles.waterProgress, { height: waterAnim }]}
          />
        </View>
      </View>

      <View style={styles.dadosContainer}>
        <Text style={styles.dadosText}>Água consumida: {waterInMl}ml</Text>
        <Text style={styles.dadosText}>
          Porcentagem alcançada: {Math.round(waterPercentage)}%
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#80DEEA" }]}
          onPress={handleAddCup}
        >
          <Icon name="water-plus" size={32} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#80DEEA" }]}
          onPress={handleRemoveCup}
        >
          <Icon name="water-minus" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E0F7FA",
  },
  WaterBox: {
    flexDirection: "row",
    backgroundColor: "#00BCD4",
    padding: 15,
    height: "17%",
    borderRadius: 10,
    marginVertical: 15,
    marginTop: 50,
    width: "100%",
    alignItems: "center",
  },
  texts: {
    flex: 1,
    alignItems: "flex-start", // Alinha o texto à esquerda
    justifyContent: "center",
    paddingRight: 10, // Espaçamento entre o texto e a imagem
  },
  topTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  topText: {
    fontSize: 14,
    color: "white",
    width: 250,
  },
  waterImage: {
    width: 100, // Largura da imagem
    height: 100,

    borderRadius: 30, // Torna a imagem circular
  },
  dadosText: {
    fontSize: 16,
    color: "#00BCD9",
    marginBottom: 10,
    marginHorizontal: 5,
    textAlign: "center",
    width: "100%",
  },
  TitleContainer: {
    marginBottom: 24,
    width: "100%",
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00BCD9",
  },
  progressContainer: {
    width: 150,
    height: 300,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  progressBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "#B2EBF2",
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  waterProgress: {
    width: "100%",
    backgroundColor: "#00BCD4",
    position: "absolute",
    bottom: 0,
    borderRadius: 50,
  },
  dadosContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#80DEEA",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
});
