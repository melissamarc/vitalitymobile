import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function Detalhes({ route }) {
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.greenBackground}>
        <Text style={styles.headerText}> Detalhes da Receitas </Text>
      </View>

      <View style={styles.imageWrapper}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
      </View>

      <View style={styles.recipeDetails}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <View style={styles.tempos}>
          <Text style={styles.recipeCalories}>🔥 {recipe.calories}</Text>
          <Text style={styles.recipeTime}>⏱ {recipe.time}</Text>
        </View>
      </View>

      {/* Seção de Ingredientes */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Ingredientes</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.stepText}>
            {index + 1}. {ingredient}
          </Text>
        ))}
      </View>

      {/* Seção de Modo de Preparo */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Modo de Preparo</Text>
        {recipe.preparation.map((step, index) => (
          <Text key={index} style={styles.stepText}>
            {index + 1}. {step}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  greenBackground: {
    backgroundColor: "#4CAF50",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  tempos: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
    marginTop: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  imageWrapper: { alignSelf: "center", marginTop: -75 },
  recipeImage: { width: 200, height: 200, borderRadius: 100 },
  recipeDetails: { alignItems: "center", marginTop: 20 },
  recipeName: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  recipeCalories: { fontSize: 16, color: "#555" },
  recipeTime: { fontSize: 16, color: "#555" },
  content: { padding: 20 },
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  stepText: { fontSize: 16, color: "#333", marginBottom: 5 },
});
