import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { collection, getDocs, addDoc, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseconfig';

const FoodScreen = () => {
  const [foods, setFoods] = useState([]); // Lista de alimentos
  const [searchQuery, setSearchQuery] = useState(''); // Barra de pesquisa
  const [selectedFoods, setSelectedFoods] = useState([]); // Alimentos selecionados
  const [weeklySummary, setWeeklySummary] = useState([]); // Resumo semanal
  const [loading, setLoading] = useState(true); // Indicador de carregamento

  // Buscar alimentos do Firestore
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const foodCollection = collection(db, 'foods');
        const foodSnapshot = await getDocs(foodCollection);
        const foodList = foodSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFoods(foodList);
      } catch (error) {
        console.error('Erro ao buscar alimentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
    fetchWeeklySummary();
  }, []);

  // Função para adicionar alimento ao Firestore e na lista local
  const handleAddFood = async (food) => {
    try {
      const foodWithTimestamp = {
        ...food,
        date: Timestamp.now(),
      };

      // Salva a refeição no Firestore
      await addDoc(collection(db, 'userMeals'), foodWithTimestamp);

      // Adiciona localmente para exibição imediata
      setSelectedFoods((prev) => [...prev, foodWithTimestamp]);
    } catch (error) {
      console.error('Erro ao adicionar alimento:', error);
    }
  };

  // Buscar resumo semanal
  const fetchWeeklySummary = async () => {
    try {
      const oneWeekAgo = Timestamp.now().toMillis() - 7 * 24 * 60 * 60 * 1000; // 7 dias atrás
      const mealsQuery = query(
        collection(db, 'userMeals'),
        where('date', '>=', Timestamp.fromMillis(oneWeekAgo))
      );
      const mealsSnapshot = await getDocs(mealsQuery);
      const mealsList = mealsSnapshot.docs.map((doc) => doc.data());
      setWeeklySummary(mealsList);
    } catch (error) {
      console.error('Erro ao buscar resumo semanal:', error);
    }
  };

  // Dados para o gráfico
  const chartData = [
    { name: 'Calorias', population: selectedFoods.reduce((acc, food) => acc + food.calories, 0), color: '#0088FE' },
    { name: 'Gorduras', population: selectedFoods.reduce((acc, food) => acc + food.fat, 0), color: '#00C49F' },
    { name: 'Proteínas', population: selectedFoods.reduce((acc, food) => acc + food.protein, 0), color: '#FFBB28' },
  ];

  // Renderização condicional durante o carregamento
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando alimentos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calorias do Usuário</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar alimentos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={foods.filter((food) => food.name.toLowerCase().includes(searchQuery.toLowerCase()))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <Text style={styles.foodText}>
              {item.name} - {item.calories} Calorias
            </Text>
            <TouchableOpacity onPress={() => handleAddFood(item)} style={styles.addButton}>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum alimento encontrado.</Text>}
      />

      <Text style={styles.chartHeader}>Nutrição do Dia</Text>
      <PieChart
        data={chartData}
        width={300}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <Text style={styles.chartHeader}>Resumo Semanal</Text>
      <FlatList
        data={weeklySummary}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.summaryText}>
            {item.name} - {item.calories} Calorias
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  foodText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#0088FE',
    padding: 5,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 20,
  },
  chartHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  summaryText: {
    fontSize: 16,
    marginVertical: 5,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FoodScreen;
