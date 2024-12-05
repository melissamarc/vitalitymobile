import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import UserButton from "./components/UserButton";
import { Ionicons } from "@expo/vector-icons";

export default function RecipeScreen() {
  const navigation = useNavigation();

  const categories = ["Café da Manhã", "Almoço", "Janta"];

  const allRecipes = [
    {
      id: "1",
      name: "Iogurte com Frutas",
      calories: "200 kcal",
      time: "5 min",
      category: "Café da Manhã",
      image:
        "https://i.pinimg.com/736x/81/aa/e0/81aae09a7c17fabea2e489112e8cf078.jpg",
      ingredients: [
        "1 xícara de iogurte natural",
        "Granola a gosto",
        "Frutas variadas (banana, morango, kiwi)",
        "Mel a gosto",
      ],
      preparation: [
        "Coloque o iogurte em uma tigela.",
        "Adicione o mel e misture bem.",
        "Acrescente a granola e as frutas por cima.",
        "Sirva imediatamente.",
      ],
    },
    {
      id: "2",
      name: "Omelete de Legumes",
      calories: "150 kcal",
      time: "15 min",
      category: "Café da Manhã",
      image:
        "https://i.pinimg.com/736x/7f/68/e6/7f68e6a250fcfc9f5b78bccab695528b.jpg",
      ingredients: [
        "2 ovos",
        "1/2 cebola picada",
        "1/4 pimentão picado",
        "1 tomate picado",
        "1 xícara de espinafre",
        "Sal e pimenta a gosto",
      ],
      preparation: [
        "Bata os ovos em uma tigela e tempere com sal e pimenta.",
        "Aqueça o azeite em uma frigideira antiaderente.",
        "Refogue a cebola, pimentão e tomate por alguns minutos.",
        "Adicione o espinafre e refogue até murchar.",
        "Despeje os ovos batidos na frigideira e cozinhe até a omelete estar firme.",
        "Dobre a omelete ao meio e sirva.",
      ],
    },
    {
      id: "3",
      name: "Smoothie Verde",
      calories: "100 kcal",
      time: "5 min",
      category: "Café da Manhã",
      image:
        "https://i.pinimg.com/736x/72/69/fc/7269fc8fd264b802461a8cae1c671166.jpg",
      ingredients: [
        "1 banana",
        "1 xícara de espinafre",
        "1/2 maçã verde",
        "200 ml de água de coco",
        "1 colher de chia",
      ],
      preparation: [
        "Coloque todos os ingredientes no liquidificador.",
        "Bata até obter uma mistura homogênea.",
        "Sirva imediatamente.",
      ],
    },
    {
      id: "4",
      name: "Aveia Overnight",
      calories: "180 kcal",
      time: "10 min",
      category: "Café da Manhã",
      image:
        "https://i.pinimg.com/736x/67/18/45/671845c12bddd9d4f3f493b3c1159325.jpg",
      ingredients: [
        "1/2 xícara de aveia em flocos",
        "1/2 xícara de leite vegetal",
        "1 colher de chia",
        "1 colher de mel",
        "Frutas frescas (morangos, blueberries)",
      ],
      preparation: [
        "Em um recipiente, misture a aveia, leite vegetal, chia e mel.",
        "Tampe e leve à geladeira durante a noite.",
        "Pela manhã, adicione as frutas frescas por cima.",
        "Sirva frio.",
      ],
    },
    {
      id: "5",
      name: "Salmão ao Forno com Aspargos",
      calories: "300 kcal",
      time: "20 min",
      category: "Janta",
      image:
        "https://i.pinimg.com/736x/b7/0e/16/b70e16a5ccd81ad7cfdd0b0b9aaba8ac.jpg",
      ingredients: [
        "2 filés de salmão",
        "1 maço de aspargos",
        "1 limão fatiado",
        "2 colheres de sopa de azeite de oliva",
        "1 dente de alho picado",
        "sal e pimenta a gosto",
      ],
      preparation: [
        "Pré-aqueça o forno a 200°C.",
        "Coloque os filés de salmão e os aspargos em uma assadeira.",
        "Regue com azeite de oliva e tempere com alho, sal e pimenta.",
        "Distribua as fatias de limão sobre o salmão e os aspargos.",
        "Asse por 20 minutos ou até o salmão estar cozido.",
        "Sirva imediatamente.",
      ],
    },
    {
      id: "6",
      name: "Espaguete de Abobrinha com Molho de Tomate",
      calories: "180 kcal",
      time: "15 min",
      category: "Janta",
      image:
        "https://i.pinimg.com/736x/06/72/55/067255654cacc13eb74a231c01f9a3b3.jpg",
      preparation: [
        "Corte as abobrinhas em espiral para formar 'espaguete'.",
        "Refogue a cebola e o alho no azeite.",
        "Adicione os tomates e cozinhe até formar um molho.",
        "Misture o 'espaguete' de abobrinha ao molho e cozinhe por 2-3 minutos.",
        "Sirva quente.",
      ],
      ingredients: [
        "2 abobrinhas",
        "1/2 cebola picada",
        "2 dentes de alho picados",
        "2 tomates maduros picados",
        "1 colher de sopa de azeite de oliva",
        "Sal e pimenta a gosto",
      ],
    },
    {
      id: "7",
      name: "Sopa de Legumes e Grão-de-Bico",
      calories: "250 kcal",
      time: "25 min",
      category: "Janta",
      image:
        "https://i.pinimg.com/736x/fb/d1/7b/fbd17bb51c0da988ab221379e0acf539.jpg",
      preparation: [
        "Refogue cebola e alho no azeite.",
        "Adicione cenoura, abobrinha, batata e grão-de-bico.",
        "Despeje o caldo de legumes e cozinhe até os legumes ficarem macios.",
        "Tempere com sal e pimenta e sirva quente.",
      ],
      ingredients: [
        "1 cebola picada",
        "2 dentes de alho picados",
        "1 cenoura picada",
        "1 abobrinha picada",
        "2 batatas médias picadas",
        "1 xícara de grão-de-bico cozido",
        "1 litro de caldo de legumes",
        "Sal e pimenta a gosto",
      ],
    },
    {
      id: "8",
      name: "Tacos de Alface com Frango",
      calories: "220 kcal",
      time: "10 min",
      category: "Janta",
      image:
        "https://i.pinimg.com/736x/26/2c/b2/262cb2876818c8eb7ed08d53dfcad042.jpg",
      preparation: [
        "Tempere o frango com sal, pimenta e suco de limão.",
        "Separe folhas de alface e use como 'tortillas'.",
        "Coloque o frango, tomate, abacate e coentro sobre as folhas.",
        "Sirva imediatamente.",
      ],
      ingredients: [
        "2 peitos de frango",
        "Suco de 1 limão",
        "8 folhas de alface",
        "1 tomate picado",
        "1 abacate picado",
        "Coentro fresco a gosto",
        "Sal e pimenta a gosto",
      ],
    },

    {
      id: "9",
      name: "Salada de Quinoa com Legumes",
      calories: "220 kcal",
      time: "20 min",
      category: "Almoço",
      image:
        "https://i.pinimg.com/736x/8a/ec/6c/8aec6c96573d5ea59447d0997c7d7757.jpg",
      preparation: [
        "Cozinhe a quinoa em 2 xícaras de água até a água ser absorvida.",
        "Deixe esfriar e misture com legumes e hortelã.",
        "Tempere com suco de limão, azeite, sal e pimenta.",
        "Sirva frio.",
      ],
      ingredients: [
        "1 xícara de quinoa",
        "2 xícaras de água",
        "1 pepino picado",
        "1 tomate picado",
        "1 cenoura ralada",
        "1/2 pimentão vermelho picado",
        "1/4 xícara de folhas de hortelã picadas",
        "Suco de 1 limão",
        "2 colheres de sopa de azeite de oliva",
        "Sal e pimenta a gosto",
      ],
    },
    {
      id: "10",
      name: "Frango Grelhado com Legumes Assados",
      calories: "300 kcal",
      time: "35 min",
      category: "Almoço",
      image:
        "https://i.pinimg.com/736x/d7/4a/6e/d74a6eea99039ee959210f4c8e86ee7b.jpg",
      preparation: [
        "Tempere o frango com sal e pimenta.",
        "Grelhe o frango até estar bem cozido.",
        "Misture legumes com azeite, alecrim, sal e pimenta.",
        "Asse os legumes por 25-30 minutos.",
        "Sirva com o frango.",
      ],
      ingredients: [
        "2 peitos de frango",
        "1 abobrinha picada",
        "1 berinjela picada",
        "1 pimentão vermelho picado",
        "1 cebola roxa fatiada",
        "3 colheres de sopa de azeite de oliva",
        "1 colher de chá de alecrim seco",
        "Sal e pimenta a gosto",
      ],
    },
    {
      id: "11",
      name: "Wrap de Abacate e Frango",
      calories: "250 kcal",
      time: "15 min",
      category: "Almoço",
      image:
        "https://i.pinimg.com/736x/5c/81/37/5c8137dc11fb9f85d9dddc79c189afe6.jpg",
      preparation: [
        "Aqueça as tortillas.",
        "Tempere o frango com suco de limão, sal e pimenta.",
        "Coloque frango, abacate, tomate e alface em cada tortilla.",
        "Enrole e sirva.",
      ],
    },
    {
      id: "12",
      name: "Sopa de Lentilha",
      calories: "280 kcal",
      time: "30 min",
      category: "Almoço",
      image:
        "https://i.pinimg.com/736x/e0/e7/70/e0e77038c93581a2512fa2f9353e4bd0.jpg",
      preparation: [
        "Refogue cebola e alho no azeite.",
        "Adicione cenoura, batata doce e lentilhas.",
        "Despeje o caldo de legumes e cozinhe até os legumes amolecerem.",
        "Tempere com sal e pimenta, retire o louro e sirva.",
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const filteredRecipes =
    selectedCategory === "Todas"
      ? allRecipes
      : allRecipes.filter((recipe) => recipe.category === selectedCategory);

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
        </View>
      </View>
      {/* Nova View com título, texto e imagem */}
      <View style={styles.infoBox}>
        <View style={styles.texts}>
          <Text style={styles.infoTitle}>Receitas</Text>
          <Text style={styles.infoText}>
            Descubra uma receita saudável e deliciosa para começar o seu dia com
            energia.
          </Text>
        </View>

        <Image
          source={require("../assets/recipes/head.png")} // Substitua pelo caminho da sua imagem PNG
          style={styles.recipeImage2}
        />
      </View>

      <Text style={styles.sectionTitle}>Categorias</Text>
      <FlatList
        data={["Todas", ...categories]}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              selectedCategory === item && styles.categoryItemActive,
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item && styles.categoryTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.categoryList}
      />

      <FlatList
        data={filteredRecipes}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeCard}
            onPress={() => navigation.navigate("Detalhes", { recipe: item })}
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
  infoBox: {
    backgroundColor: "#4CAF50", // Cor de fundo azul
    padding: 15,
    height: "22%",
    borderRadius: 18,
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
  },
  infoText: {
    fontSize: 20,
    color: "#fff",
    flex: 2,
  },
  recipeImage2: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  categoryList: {
    marginBottom: 10,
  },
  categoryItem: {
    backgroundColor: "#0001",
    borderRadius: 20,
    padding: 10,
    height: 35,
    alignItems: "center",
    marginRight: 10,
    marginBottom: 50,
  },
  categoryItemActive: {
    backgroundColor: "#4CAF50",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
  },
  categoryTextActive: {
    color: "#fff",
  },
  recipeList: {
    marginTop: 0,
    marginBottom: 0,
  },
  recipeCard: {
    flex: 1,
    margin: 5,
    alignItems: "center",
  },
  recipeImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  recipeCalories: {
    fontSize: 14,
    color: "gray",
  },
});
