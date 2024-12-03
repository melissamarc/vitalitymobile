import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet } from 'react-native';

const NutritionChart = ({ data }) => {
  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  if (!data || data.length === 0) {
    return <Text>Carregando dados do gráfico...</Text>;
  }

  return (
    <View style={styles.card}>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Resumo Nutricional</Text>
        <PieChart
          data={data}
          width={150}
          height={150}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#d69',
    borderRadius: 12,
    justifyContent: 'space-between',
   
    marginVertical: 10,
  },
  chartContainer: {
    flex: 1,
  
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',

  },
});

export default NutritionChart;
