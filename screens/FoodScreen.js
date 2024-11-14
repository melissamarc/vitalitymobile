import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';

const FoodScreen = () => {
  const screenWidth = Dimensions.get('window').width;

  // Estado inicial para dados nutricionais e lista de refeições
  const initialNutritionData = {
    carb: 0,
    protein: 0,
    fat: 0,
  };

  const [nutritionData, setNutritionData] = useState(initialNutritionData);
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [foodOptions, setFoodOptions] = useState([]);
  
  // Dados para o gráfico de pizza
  const data = [
    { name: 'Carb', grams: nutritionData.carb, color: '#FF6347', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Protein', grams: nutritionData.protein, color: '#FFA07A', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Fat', grams: nutritionData.fat, color: '#4682B4', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  // Função para pesquisar alimentos na API
  const searchFood = async () => {
    if (!searchQuery) return;

    try {
      const response = await axios.get(`https://api.spoonacular.com/food/ingredients/search`, {
        params: {
          query: searchQuery,
          apiKey: '1537be70870c479e884e1c2e85f83db4',
        },
      });
      setFoodOptions(response.data.results); // Atualiza a lista de alimentos com a resposta da API
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  // Função para adicionar uma refeição e atualizar dados
  const addMeal = (food) => {
    setMeals([...meals, food]);

    setNutritionData(prevData => ({
      carb: prevData.carb + food.nutrition.carbs,
      protein: prevData.protein + food.nutrition.protein,
      fat: prevData.fat + food.nutrition.fat,
    }));
  };

  // Função para resetar o gráfico e as refeições
  const resetData = () => {
    setNutritionData(initialNutritionData);
    setMeals([]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>You have consumed</Text>
      <Text style={styles.caloriesText}>
        {nutritionData.carb + nutritionData.protein + nutritionData.fat} cal today
      </Text>

      <PieChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="grams"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <View style={styles.mealSection}>
        <Text style={styles.mealHeader}>Meals</Text>
        {meals.map((meal, index) => (
          <View key={index} style={styles.mealItem}>
            <Text>{meal.name}</Text>
            <Text>{meal.calories} cal</Text>
          </View>
        ))}
      </View>

      <Text style={styles.mealHeader}>Add Food</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for food..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={searchFood} // Pesquisa ao pressionar Enter
      />
      <FlatList
        data={foodOptions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.foodItem} onPress={() => addMeal(item)}>
            <Text>{item.name}</Text>
            <Text>{item.nutrition.calories} cal</Text>
          </TouchableOpacity>
        )}
      />

      {/* Botão de reset */}
      <View style={styles.resetButtonContainer}>
        <Button title="Reset Data" onPress={resetData} color="#FF6347" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  caloriesText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4682B4',
    textAlign: 'center',
    marginVertical: 10,
  },
  mealSection: {
    marginTop: 20,
  },
  mealHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  mealItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  resetButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default FoodScreen;
