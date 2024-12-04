import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useWaterContext } from "../Watercontext"; // Importando o contexto

const WaterCounter = () => {
  const { cupsConsumed } = useWaterContext(); // Acessando o estado global de copos consumidos

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.textContainer}>
          <Text style={styles.totalText}>{cupsConsumed}</Text>{" "}
          {/* Número de copos */}
          <Text style={styles.label}>copos {"\n"}consumidos </Text>{" "}
          {/* Texto "Água" */}
        </View>
        <View style={styles.imageWrapper}>
          <Image
            source={require("../../assets/agua.png")}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#007ac1",
    borderRadius: 20,
    padding: 20,
    width: 160,
    height: 200,
    overflow: "hidden", // Garante que elementos saindo da borda sejam cortados
  },
  textContainer: {
    alignItems: "left",
    marginTop: 50,
  },
  totalText: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#fff",
  },
  label: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  imageWrapper: {
    position: "absolute",
    right: -60, // Posiciona a imagem para "entrar" na borda
    bottom: -10,
    width: 150,
    height: 200,
    overflow: "hidden", // Garante que a imagem seja cortada pela borda do container
  },
  image: {
    width: "100%", // Garante que a imagem ocupe todo o wrapper
    height: "100%",
    resizeMode: "contain",
    transform: [{ rotate: "-19deg" }], // Inclina a imagem para um visual dinâmico
  },
});

export default WaterCounter;
