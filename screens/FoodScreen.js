import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseconfig";

const FoodScreen = () => {
  const [foods, setFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFoodsByCategory, setSelectedFoodsByCategory] = useState({
    "Café da Manhã": [],
    Almoço: [],
    Jantar: [],
    Lanche: [],
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: "Café da Manhã", icon: "coffee" },
    { name: "Almoço", icon: "food" },
    { name: "Jantar", icon: "silverware-fork-knife" },
    { name: "Lanche", icon: "baguette" },
  ];

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const foodCollection = collection(db, "foods");
        const foodSnapshot = await getDocs(foodCollection);
        const foodList = foodSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFoods(foodList);

        const userMealsCollection = collection(db, "userMeals");
        const oneDayAgo = Timestamp.fromDate(
          new Date(Date.now() - 24 * 60 * 60 * 1000)
        );
        const q = query(userMealsCollection, where("date", ">", oneDayAgo));
        const mealsSnapshot = await getDocs(q);
        const meals = mealsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const categorizedMeals = {
          "Café da Manhã": [],
          Almoço: [],
          Jantar: [],
          Lanche: [],
        };

        meals.forEach((meal) => {
          categorizedMeals[meal.category].push(meal);
        });

        setSelectedFoodsByCategory(categorizedMeals);
      } catch (error) {
        console.error("Erro ao buscar alimentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const handleAddFood = async (food) => {
    if (!selectedCategory) {
      Alert.alert("Erro", "Por favor, selecione uma categoria.");
      return;
    }

    try {
      const foodWithTimestamp = {
        ...food,
        category: selectedCategory,
        date: Timestamp.now(),
      };

      await addDoc(collection(db, "userMeals"), foodWithTimestamp);

      setSelectedFoodsByCategory((prev) => ({
        ...prev,
        [selectedCategory]: [...prev[selectedCategory], foodWithTimestamp],
      }));
    } catch (error) {
      console.error("Erro ao adicionar alimento:", error);
    }
  };

  const handleClearMeals = async () => {
    try {
      const mealsCollection = collection(db, "userMeals");
      const mealsSnapshot = await getDocs(mealsCollection);
      const deletePromises = mealsSnapshot.docs.map((docItem) =>
        deleteDoc(doc(db, "userMeals", docItem.id))
      );
      await Promise.all(deletePromises);

      setSelectedFoodsByCategory({
        "Café da Manhã": [],
        Almoço: [],
        Jantar: [],
        Lanche: [],
      });

      Alert.alert("Sucesso", "Todas as refeições foram limpas.");
    } catch (error) {
      console.error("Erro ao limpar refeições:", error);
      Alert.alert("Erro", "Não foi possível limpar as refeições.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando alimentos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <View style={styles.texts}>
          <Text style={styles.infoTitle}>Registro de Refeições</Text>
          <Text style={styles.infoText}>
            Selecione uma categoria de refeição e pesquise seus alimentos
            consumidos para cadastrá-los.
          </Text>
        </View>

        <Image
          source={require("../assets/faca.png")} // Substitua pelo caminho da sua imagem PNG
          style={styles.recipeImage2}
        />
      </View>

      <View style={styles.categories}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={[
              styles.categoryButton,
              selectedCategory === category.name &&
                styles.categoryButtonSelected,
            ]}
            onPress={() => setSelectedCategory(category.name)}
          >
            <MaterialCommunityIcons
              name={category.icon}
              size={30}
              color={selectedCategory === category.name ? "#fff" : "#333"}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.name &&
                  styles.categoryTextSelected,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar alimentos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {searchQuery.length > 0 && (
        <FlatList
          data={foods.filter((food) =>
            food.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.foodItem}>
              <Text style={styles.foodText}>
                {item.name} - {item.calories} Calorias
              </Text>
              <TouchableOpacity
                onPress={() => handleAddFood(item)}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum alimento encontrado.</Text>
          }
        />
      )}

      {Object.entries(selectedFoodsByCategory).map(([category, items]) => (
        <View key={category}>
          {items.length > 0 && (
            <>
              <Text style={styles.categoryHeader}>{category}</Text>
              <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Text style={styles.selectedFoodText}>
                    {item.name} - {item.calories} Calorias
                  </Text>
                )}
              />
            </>
          )}
        </View>
      ))}

      <TouchableOpacity onPress={handleClearMeals} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Limpar Refeições</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },

  subheader: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 50,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  infoBox: {
    backgroundColor: "#4CAF50", // Cor de fundo azul
    padding: 15,
    height: "17%",
    borderRadius: 10,
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  texts: {
    flexDirection: `column`,
    justifyContent: "space-between",
    width: `65%`,
  },

  infoTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    color: "#fff",
    flex: 2,
  },
  recipeImage2: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  categoryButton: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
    padding: 15,
    backgroundColor: "#e6e6e6",
    borderRadius: 20,
  },
  categoryButtonSelected: {
    backgroundColor: "#7dcd9a",
  },
  categoryIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  categoryTextSelected: {
    color: "#fff",
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  foodText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#7dcd9a",
    padding: 5,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#555",
  },
  selectedFoodText: {
    fontSize: 20,
    color: "#333",
    marginBottom: 5,
  },
  clearButton: {
    backgroundColor: "#7dcd8a",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 20,
  },
});

export default FoodScreen;
