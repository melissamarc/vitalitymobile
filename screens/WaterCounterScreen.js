{/*} joao, essa tela e a tela de refeições nao vao ficar na tab bar, vao ficar dentro do maiszinho que eu adicionei na barra embaixo. cuidado para nao se confundir*/}





import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Svg, { Path, Rect, Defs, ClipPath } from "react-native-svg";

export default function WaterCounterScreen() {
  const goal = 4000; // Meta diária de água em ML
  const step = 200; // Quantidade de água adicionada/removida por vez

  const [totalWater, setTotalWater] = useState(0);
  const [waterLevel] = useState(new Animated.Value(0)); // Nível da água animado

  const updateWaterLevel = (newTotal: number) => {
    Animated.timing(waterLevel, {
      toValue: (newTotal / goal) * 100, // Converte o total para porcentagem
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  const addWater = () => {
    if (totalWater + step <= goal) {
      const newTotal = totalWater + step;
      setTotalWater(newTotal);
      updateWaterLevel(newTotal);
    }
  };

  const removeWater = () => {
    if (totalWater - step >= 0) {
      const newTotal = totalWater - step;
      setTotalWater(newTotal);
      updateWaterLevel(newTotal);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoje</Text>

      <View style={styles.dropContainer}>
        <Svg height="200" width="120" viewBox="0 0 24 24">
          {/* Forma da gota */}
          <Defs>
            <ClipPath id="dropClip">
              <Path
                d="M12 2C8 7 5 10.5 5 14.5C5 18.1 8.1 21 12 21C15.9 21 19 18.1 19 14.5C19 10.5 16 7 12 2Z"
              />
            </ClipPath>
          </Defs>

          {/* Fundo da gota */}
          <Path
            d="M12 2C8 7 5 10.5 5 14.5C5 18.1 8.1 21 12 21C15.9 21 19 18.1 19 14.5C19 10.5 16 7 12 2Z"
            fill="#E0F7FF"
          />

          {/* Nível de água */}
          <Animated.View
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: waterLevel.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"], // Controla o preenchimento vertical
              }),
              overflow: "hidden",
            }}
          >
            <Svg height="200" width="120" viewBox="0 0 24 24" clipPath="url(#dropClip)">
              <Rect x="0" y="0" width="24" height="24" fill="#1E90FF" />
            </Svg>
          </Animated.View>
        </Svg>

        <Text style={styles.waterText}>
          {`${totalWater}ml\n${Math.round((totalWater / goal) * 100)}%`}
        </Text>
      </View>

      <Text style={styles.goalText}>{`Meta: ${goal}ml`}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={addWater}>
          <Text style={styles.buttonText}>+ 200ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={removeWater}>
          <Text style={styles.buttonText}>- 200ml</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dropContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 200,
    marginBottom: 20,
  },
  waterText: {
    position: "absolute",
    top: "45%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  goalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
