import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://world.openfoodfacts.org/api/v0/product/';

const FoodScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foods, setFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [chartData, setChartData] = useState([
    { name: 'Calorias', population: 0, color: '#f00', legendFontColor: '#fff', legendFontSize: 15 },
    { name: 'Carboidratos', population: 0, color: '#0f0', legendFontColor: '#fff', legendFontSize: 15 },
    { name: 'Proteínas', population: 0, color: '#00f', legendFontColor: '#fff', legendFontSize: 15 },
    { name: 'Gorduras', population: 0, color: '#ff0', legendFontColor: '#fff', legendFontSize: 15 }
  ]);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      return;
    }

    try {
      const response = await axios.get(`${API_URL}${searchQuery}.json`);
      if (response.data.product) {
        setFoods([response.data.product]); // Espera um único produto por busca
      } else {
        Alert.alert('Produto não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar alimentos:', error);
    }
  };

  const handleSelectFood = (food) => {
    if (selectedFoods.some((selectedFood) => selectedFood.code === food.code)) {
      Alert.alert('Alimento já selecionado');
      return;
    }

    const updatedSelectedFoods = [...selectedFoods, food];
    setSelectedFoods(updatedSelectedFoods);
    updateChartData(updatedSelectedFoods);
    saveFoods(updatedSelectedFoods);
  };

  const updateChartData = (foods) => {
    const totalCalories = foods.reduce((acc, food) => acc + (food.nutriments?.energy_kcal || 0), 0);
    const totalCarbs = foods.reduce((acc, food) => acc + (food.nutriments?.carbohydrates_100g || 0), 0);
    const totalProteins = foods.reduce((acc, food) => acc + (food.nutriments?.proteins_100g || 0), 0);
    const totalFats = foods.reduce((acc, food) => acc + (food.nutriments?.fat_100g || 0), 0);

    setChartData([
      { name: 'Calorias', population: totalCalories, color: '#f00', legendFontColor: '#fff', legendFontSize: 15 },
      { name: 'Carboidratos', population: totalCarbs, color: '#0f0', legendFontColor: '#fff', legendFontSize: 15 },
      { name: 'Proteínas', population: totalProteins, color: '#00f', legendFontColor: '#fff', legendFontSize: 15 },
      { name: 'Gorduras', population: totalFats, color: '#ff0', legendFontColor: '#fff', legendFontSize: 15 }
    ]);
  };

  const saveFoods = async (foods) => {
    try {
      const foodData = JSON.stringify(foods);
      await AsyncStorage.setItem('selectedFoods', foodData);
      // Definindo tempo de expiração de 24 horas
      setTimeout(() => {
        AsyncStorage.removeItem('selectedFoods');
      }, 86400000); // 24 horas em milissegundos
    } catch (error) {
      console.error('Erro ao salvar alimentos:', error);
    }
  };

  const clearChart = () => {
    setSelectedFoods([]);
    setChartData([
      { name: 'Calorias', population: 0, color: '#f00', legendFontColor: '#fff', legendFontSize: 15 },
      { name: 'Carboidratos', population: 0, color: '#0f0', legendFontColor: '#fff', legendFontSize: 15 },
      { name: 'Proteínas', population: 0, color: '#00f', legendFontColor: '#fff', legendFontSize: 15 },
      { name: 'Gorduras', population: 0, color: '#ff0', legendFontColor: '#fff', legendFontSize: 15 }
    ]);
    AsyncStorage.removeItem('selectedFoods');
  };

  const renderItem = ({ item }) => (
    <View style={styles.foodItem}>
      <Text>{item.product_name || 'Sem nome'}</Text>
      <Button title="Selecionar" onPress={() => handleSelectFood(item)} />
    </View>
  );

  useEffect(() => {
    const fetchStoredFoods = async () => {
      try {
        const storedFoods = await AsyncStorage.getItem('selectedFoods');
        if (storedFoods) {
          setSelectedFoods(JSON.parse(storedFoods));
          updateChartData(JSON.parse(storedFoods));
        }
      } catch (error) {
        console.error('Erro ao carregar alimentos armazenados:', error);
      }
    };

    fetchStoredFoods();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar alimento"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Buscar" onPress={handleSearch} />

      <FlatList
        data={foods}
        renderItem={renderItem}
        keyExtractor={(item) => item.code.toString()}
      />

      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={300}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
        />
      </View>

      <Button title="Limpar Gráfico" onPress={clearChart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default FoodScreen;
