import React from "react";
import { PieChart } from "react-native-chart-kit";
import { View, Text, StyleSheet, Image } from "react-native";

const NutritionChart = ({ data }) => {
  const chartConfig = {
    backgroundColor: "#FF80AB",
    backgroundGradientFrom: "#FF4081",
    backgroundGradientTo: "#F50057",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  const updatedData = data.map((item) => ({
    ...item,
    color:
      item.name === "Calorias"
        ? "#FF80AB"
        : item.name === "Gorduras"
        ? "#FF4081"
        : item.name === "Proteínas"
        ? "#F50057"
        : "#FF80AB",
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
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Calorias {"\n"}consumidas</Text>
        <PieChart
          data={updatedData}
          width={300}
          height={150}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          hasLegend={false}
        />
        <View style={styles.legendContainer}>
          {updatedData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText}>
                {item.name}: {item.population}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/fruta.png")}
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
    backgroundColor: "#000",
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
    width: "100%",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  legendDot: {
    width: 12, // Tamanho da bolinha
    height: 12,
    borderRadius: 6, // Deixa a bolinha redonda
    marginRight: 8, // Espaço entre a bolinha e o texto
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 10,
    marginTop: 19,
  },
  legendText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  imageWrapper: {
    position: "absolute",
    right: -70,
    top: -40,
    width: 200,
    height: 200,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    transform: [{ rotate: "-15deg" }],
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
