import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserButton from './components/UserButton';
import { Ionicons } from "@expo/vector-icons";
import Swiper from 'react-native-swiper'


export default function RecipeScreen() {
  const navigation = useNavigation();

  const carouselData = [
    { id: '1', image: 'https://via.placeholder.com/300x150.png?text=Oferta+1' },
    { id: '2', image: 'https://via.placeholder.com/300x150.png?text=Oferta+2' },
  ];





  // Dados das categorias
  const categories = ['Café da Manhã', 'Almoço', 'Lanche', 'Janta'];

  // Dados de todas as receitas
  const allRecipes = [
    { id: '1', name: 'Salada Caesar', calories: '150 kcal', time: '20 min', category: 'Café da Manhã', image: 'https://via.placeholder.com/100.png?text=Salada' },
    { id: '2', name: 'Frango Grelhado', calories: '250 kcal', time: '30 min', category: 'Almoço', image: 'https://via.placeholder.com/100.png?text=Frango' },
    { id: '3', name: 'Torta de Maçã', calories: '200 kcal', time: '40 min', category: 'Lanche', image: 'https://via.placeholder.com/100.png?text=Torta' },
    { id: '4', name: 'Sopa de Legumes', calories: '100 kcal', time: '25 min', category: 'Janta', image: 'https://via.placeholder.com/100.png?text=Sopa' },
    // Adicione mais receitas aqui...
  ];

  // Estado da categoria ativa e receitas filtradas
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const filteredRecipes = selectedCategory === 'Todas' ? allRecipes : allRecipes.filter((recipe) => recipe.category === selectedCategory);

  return (
    <View style={styles.container}>
          <View style={styles.header}>
        <UserButton />
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notification")}
            style={styles.iconButton}
          >
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
            style={styles.iconButton}
          >
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

   {/* Carrossel */}
      <View style={styles.carouselContainer}>
        <Swiper autoplay autoplayTimeout={3} showsPagination>
          {carouselData.map((item) => (
            <Image key={item.id} source={{ uri: item.image }} style={styles.carouselImage} />
          ))}
        </Swiper>
      </View>




      {/* Categorias */}
      <Text style={styles.sectionTitle}>Categorias</Text>
      <FlatList
        data={['Todas', ...categories]}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryItem, selectedCategory === item && styles.categoryItemActive]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text style={[styles.categoryText, selectedCategory === item && styles.categoryTextActive]}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.categoryList}
      />

      {/* Receitas Recomendadas */}
      <Text style={styles.sectionTitle}>Recomendadas</Text>
      <FlatList
        data={filteredRecipes}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeCard}
            onPress={() => navigation.navigate('Detalhes', { recipe: item })}
          >
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <Text style={styles.recipeName}>{item.name}</Text>
            <Text style={styles.recipeCalories}>{item.calories}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        style={styles.recipeList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
    header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingTop: 30,
  },
  icons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  iconButton: {
    padding: 10,
  },

    carouselContainer: {
    height: 220,
    marginVertical: 10,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  categoryList: {
    marginBottom: 10,
  },
  categoryItem: {
    backgroundColor: '#0001',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    justifyContent: 'space-around'
  },
  categoryItemActive: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#fff',
  },
  recipeList: {
    marginTop: 10,
  },
  recipeCard: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  recipeCalories: {
    fontSize: 14,
    color: 'gray',
  },
});
