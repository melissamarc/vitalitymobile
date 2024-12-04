import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import { useWaterContext } from "./Watercontext"; // Importando o contexto

export default function WaterScreen() {
  const { cupsConsumed, setCupsConsumed } = useWaterContext(); // Acessando o estado e a função de atualização

  // Referência para a animação da água
  const waterAnim = useRef(new Animated.Value(0)).current;

  const handleAddCup = () => {
    setCupsConsumed(cupsConsumed + 1);
  };

  const handleRemoveCup = () => {
    if (cupsConsumed > 0) {
      setCupsConsumed(cupsConsumed - 1);
    }
  };

  // Definindo a meta diária de 2L (2000ml)
  const dailyGoal = 2000; // Meta diária em ml
  const waterLevel = cupsConsumed * 200; // Cada copo tem 200ml
  const waterPercentage = (waterLevel / dailyGoal) * 100; // Porcentagem com base na meta diária
  const waterInMl = cupsConsumed * 200; // Quantidade de água consumida

  // Animando a altura da água dentro da gota
  useEffect(() => {
    Animated.timing(waterAnim, {
      toValue: (waterLevel / dailyGoal) * 300, // Ajustando a altura com base na quantidade de água
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [cupsConsumed]); // Atualiza a animação sempre que o número de copos mudar

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Água</Text>
      <Text style={styles.paragraph}>
        Acompanhe a quantidade de água que você consumiu ao longo do dia e
        mantenha-se hidratado. A meta diária é de 2 litros (2000ml). Beba mais
        água e cuide da sua saúde!
      </Text>

      <Text style={styles.infoText}>Meta diária: 2000ml</Text>
      <Text style={styles.infoText}>Água consumida: {waterInMl}ml</Text>
      <Text style={styles.infoText}>
        Porcentagem da meta alcançada: {Math.round(waterPercentage)}%
      </Text>

      <View style={styles.dropContainer}>
        {/* Gota estática */}
        <Image
          source={require("../assets/waterdrop.png")} // Colocando o ícone da gota como fundo
          style={styles.dropIcon}
        />

        {/* Animação da água subindo e descendo dentro da gota */}
        <Animated.View
          style={[
            styles.water,
            { height: waterAnim }, // Animação da altura da água dentro da gota
          ]}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#80DEEA" }]}
          onPress={handleAddCup}
        >
          <Image
            source={require("../assets/watermais.png")}
            style={[styles.icon, { tintColor: "#FFF" }]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#80DEEA" }]}
          onPress={handleRemoveCup}
        >
          <Image
            source={require("../assets/watermenos.png")}
            style={[styles.icon, { tintColor: "#FFF" }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E0F7FA",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#00796B",
  },
  paragraph: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
    color: "#00796B",
  },
  infoText: {
    fontSize: 16,
    color: "#00796B",
    marginBottom: 10,
  },
  dropContainer: {
    width: 200,
    height: 300,
    justifyContent: "flex-end", // Garante que a água suba de baixo para cima
    alignItems: "center",
    position: "relative",
  },
  dropIcon: {
    width: 200,
    height: 300,
    borderRadius: 50, // Tornando a gota arredondada
    opacity: 0.4, // Leve transparência para a gota
    position: "absolute",
    bottom: 0, // Fixando a gota no fundo
  },
  water: {
    width: "100%",
    backgroundColor: "#80DEEA", // Cor azul claro para a água
    position: "absolute",
    bottom: 0, // Mantendo a água no fundo da gota e subindo a partir daí
    borderRadius: 50, // Mantém as bordas arredondadas
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Alinhando os botões lado a lado
    width: "60%", // Controlando a largura dos botões
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#80DEEA", // Cor azul claro
  },
  icon: {
    width: 50,
    height: 50,
  },
});
