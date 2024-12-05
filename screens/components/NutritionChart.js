import React from "react";
import { PieChart } from "react-native-chart-kit";
import { View, Text, StyleSheet, Image } from "react-native";

const NutritionChart = ({ data }) => {
  const chartConfig = {
    backgroundColor: "#FF80AB", // Rosa suave
    backgroundGradientFrom: "#FF4081", // Rosa mais intenso
    backgroundGradientTo: "#F50057", // Vermelho
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Cor das legendas
  };

  // Alteração das cores do gráfico
  const updatedData = data.map((item) => ({
    ...item,
    color:
      item.name === "Calorias"
        ? "#FF80AB" // Vermelho para Calorias
        : item.name === "Gorduras"
        ? "#FF4081" // Rosa para Gorduras
        : item.name === "Proteínas"
        ? "#F50057" // Vermelho escuro para Proteínas
        : "#FF80AB", // Rosa claro para Carboidratos
  }));

  if (!data || data.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando dados do gráfico...</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {/* Gráfico à esquerda */}
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Calorias {"\n"}consumidas</Text>
        <PieChart
          data={updatedData}
          width={300} // Tamanho ajustado
          height={180} // Tamanho ajustado
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          hasLegend={false} // Desativa as legendas padrão do gráfico
        />
        {/* Legendas abaixo do gráfico */}
        <View style={styles.legendContainer}>
          {updatedData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <Text style={styles.legendText}>
                {item.name}: {item.population}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Imagem cortada à direita */}
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/fruta.png")} // Substitua pelo caminho correto da sua imagem
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ff1", // Rosa claro
    borderRadius: 20,
    padding: 20,
    width: "100%",
    height: 250,
    overflow: "hidden",
    marginVertical: 10,
  },
  chartContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%", // Tamanho do gráfico ajustado
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "left",
    left: 0,
    marginRight: 210,
  },
  legendText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff", // Cor preta para contraste
  },
  imageWrapper: {
    position: "absolute",
    right: -70,
    top: -40, // Move a imagem para fora da borda
    width: 200,
    height: 200,
    overflow: "hidden", // Garante o corte da imagem
  },
  image: {
    width: "100%", // Faz a imagem preencher o wrapper
    height: "100%",
    resizeMode: "contain",
    transform: [{ rotate: "-15deg" }], // Inclina a imagem
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
});

export default NutritionChart;
