import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet, Image } from 'react-native';

const NutritionChart = ({ data }) => {
  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  return (
    <View style={styles.card}>
      {/* Gráfico de Pizza */}
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Resumo Nutricional</Text>
        <PieChart
          data={data}
          width={150} // Tamanho menor para caber na View
          height={150}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Imagem do outro lado */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/breakfast.png')} // Substitua pelo caminho correto
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default NutritionChart;
