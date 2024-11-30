import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function Detalhes({ route }) {
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Fundo Verde */}
      <View style={styles.greenBackground}>
        <Text style={styles.headerText}>Food Details</Text>
      </View>

      {/* Imagem Flutuante */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
      </View>

      {/* Detalhes da Receita */}
      <View style={styles.recipeDetails}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>⭐ 4.5</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>🔥 {recipe.calories} Kcal</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>⏱ {recipe.time} min</Text>
          </View>
        </View>
        <Text style={styles.price}>${recipe.price}</Text>
      </View>

      {/* Conteúdo (Ingredientes e Modo de Preparo) */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>About food</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit cursus tortor metus
          suspendisse sed. ...Read More
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  greenBackground: {
    backgroundColor: '#4CAF50',
    height: 180,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  imageWrapper: {
    position: 'absolute',
    top: 120, // Posiciona a imagem para flutuar entre o fundo verde e a aba branca
    alignSelf: 'center',
    zIndex: 2, // Garante que a imagem fique sobreposta
  },
  recipeImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Torna a imagem circular
    borderWidth: 5,
    borderColor: '#fff', // Borda branca para destacar
  },
  recipeDetails: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 75, // Garante espaço para a imagem flutuante
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  recipeName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  infoBox: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    minWidth: 80,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
  content: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
