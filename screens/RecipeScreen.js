import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import UserButton from './components/UserButton';
import { Ionicons } from "@expo/vector-icons";


export default function RecipeScreen() {
  const navigation = useNavigation();

  const carouselData = [
    { id: '1', image: 'https://via.placeholder.com/300x150.png?text=Oferta+1' },
    { id: '2', image: 'https://via.placeholder.com/300x150.png?text=Oferta+2' },
  ];

  const categories = ['Café da Manhã', 'Almoço', 'Lanche', 'Janta'];

  const allRecipes = [
    {
      id: '1',
      name: 'Iogurte com Frutas e Granola',
      calories: '200 kcal',
      time: '5 min',
      category: 'Café da Manhã',
      image: require('../assets/recipes/iogurte.jpg'),
      preparation: [
        'Coloque o iogurte em uma tigela.',
        'Adicione o mel e misture bem.',
        'Acrescente a granola e as frutas por cima.',
        'Sirva imediatamente.',
      ],
    },
    {
      id: '2',
      name: 'Omelete de Legumes',
      calories: '150 kcal',
      time: '15 min',
      category: 'Café da Manhã',
      image: 'https://via.placeholder.com/100.png?text=Omelete',
      preparation: [
        'Bata os ovos em uma tigela e tempere com sal e pimenta.',
        'Aqueça o azeite em uma frigideira antiaderente.',
        'Refogue a cebola, pimentão e tomate por alguns minutos.',
        'Adicione o espinafre e refogue até murchar.',
        'Despeje os ovos batidos na frigideira e cozinhe até a omelete estar firme.',
        'Dobre a omelete ao meio e sirva.',
      ],
    },
    {
      id: '3',
      name: 'Smoothie Verde',
      calories: '100 kcal',
      time: '5 min',
      category: 'Café da Manhã',
      image: 'https://via.placeholder.com/100.png?text=Smoothie',
      preparation: [
        'Coloque todos os ingredientes no liquidificador.',
        'Bata até obter uma mistura homogênea.',
        'Sirva imediatamente.',
      ],
    },
    {
      id: '4',
      name: 'Aveia Overnight',
      calories: '180 kcal',
      time: '10 min',
      category: 'Café da Manhã',
      image: 'https://via.placeholder.com/100.png?text=Aveia',
      preparation: [
        'Em um recipiente, misture a aveia, leite vegetal, chia e mel.',
        'Tampe e leve à geladeira durante a noite.',
        'Pela manhã, adicione as frutas frescas por cima.',
        'Sirva frio.',
      ],
    },
    {
      id: '5',
      name: 'Panqueca de Banana e Aveia',
      calories: '250 kcal',
      time: '20 min',
      category: 'Café da Manhã',
      image: 'https://via.placeholder.com/100.png?text=Panqueca',
      preparation: [
        'Amasse a banana em uma tigela.',
        'Adicione os ovos e misture bem.',
        'Acrescente a aveia, canela e fermento, misturando até formar uma massa homogênea.',
        'Aqueça uma frigideira antiaderente e despeje pequenas porções da massa.',
        'Cozinhe até as panquecas dourarem dos dois lados.',
        'Sirva com mel e frutas.',
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const filteredRecipes = selectedCategory === 'Todas' ? allRecipes : allRecipes.filter((recipe) => recipe.category === selectedCategory);

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <UserButton />
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SettingsScreen")}
            style={styles.iconButton}
          >
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
            style={styles.iconButton}
          >
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.carouselContainer}>
        <Swiper autoplay autoplayTimeout={3} showsPagination>
          {carouselData.map((item) => (
            <Image key={item.id} source={{ uri: item.image }} style={styles.carouselImage} />
          ))}
        </Swiper>
      </View>

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
    height: 45,
    alignItems: 'center',
    marginRight: 10,
  },
  categoryItemActive: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    fontSize: 12,
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
