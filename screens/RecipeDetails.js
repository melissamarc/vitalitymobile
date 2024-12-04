import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function Detalhes({ route }) {
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.greenBackground}>
        <Text style={styles.headerText}>Food Details</Text>
      </View>

      <View style={styles.imageWrapper}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
      </View>

      <View style={styles.recipeDetails}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <Text style={styles.recipeCalories}>🔥 {recipe.calories}</Text>
        <Text style={styles.recipeTime}>⏱ {recipe.time}</Text>
      </View>

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
  container: { flex: 1, backgroundColor: '#fff' },
  greenBackground: { backgroundColor: '#4CAF50', height: 180, justifyContent: 'center', alignItems: 'center' },
  headerText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  imageWrapper: { alignSelf: 'center', marginTop: -75 },
  recipeImage: { width: 150, height: 150, borderRadius: 75 },
  recipeDetails: { alignItems: 'center', marginTop: 20 },
  recipeName: { fontSize: 22, fontWeight: 'bold' },
  recipeCalories: { fontSize: 16, color: '#555' },
  recipeTime: { fontSize: 16, color: '#555' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  stepText: { fontSize: 14, color: '#333', marginBottom: 5 },
});
