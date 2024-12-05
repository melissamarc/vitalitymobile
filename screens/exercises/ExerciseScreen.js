import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserButton from "../components/UserButton";
import { Ionicons } from "@expo/vector-icons";

export default function Exercicio() {
  const navigation = useNavigation();

  const exercises = [
    {
      id: 1,
      name: "Caminhada",
      description: "Ande ao ar livre e aproveite a natureza.",
      calories: 200,
      image: require("../../assets/corrida.png"),
    },
    {
      id: 2,
      name: "Corrida",
      description: "Melhore seu condicionamento físico correndo.",
      calories: 400,
      image: require("../../assets/corrida.png"),
    },
    {
      id: 3,
      name: "Musculacao",
      description: "Melhore seu condicionamento físico correndo.",
      calories: 400,
      image: require("../../assets/corrida.png"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
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

      {/* Novo cabeçalho estilizado */}
      <View style={styles.customHeader}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Vamos se {"\n"}movimentar!</Text>
          <Text style={styles.subtitle}>
            Escolha um exercício e comece agora.
          </Text>
        </View>
        <View style={styles.imageWrapper}>
          <Image
            source={require("../../assets/gym.png")} // Substitua pelo caminho correto
            style={styles.image}
          />
        </View>
      </View>

      {/* Exercícios em destaque */}
      <Text style={styles.sectionTitle}>Em alta 🔥</Text>
      {exercises.map((exercise) => (
        <TouchableOpacity
          key={exercise.id}
          style={styles.exerciseCard}
          onPress={() => navigation.navigate(exercise.name)}
        >
          <View style={styles.cardContent}>
            <Text style={styles.exerciseTitle}>{exercise.name}</Text>
            <Text style={styles.exerciseDescription}>
              {exercise.description}
            </Text>
            <Text style={styles.caloriesText}>🔥 {exercise.calories} Kcal</Text>
          </View>
          {/* Imagem do exercício posicionada à direita */}
          <Image source={exercise.image} style={styles.exerciseImage} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
  // Novo cabeçalho estilizado
  customHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    height: 170,
    overflow: "hidden",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#E0E0E0",
    marginTop: 5,
  },
  imageWrapper: {
    position: "absolute",
    right: -50, // Move a imagem para fora da borda
    bottom: -20,
    width: 200,
    height: 200,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    transform: [{ rotate: "-19deg" }], // Inclina a imagem
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    paddingLeft: 12,
  },
  exerciseCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    height: 150,
    alignItems: "center", // Alinha o conteúdo dentro do card
  },
  exerciseImage: {
    width: 120, // Ajuste o tamanho da imagem conforme necessário
    height: 120,
    borderRadius: 10,
    marginLeft: 15,
    right: -15,
    transform: [{ rotate: "-5deg" }], // Inclina a imagem
    overflow: "hidden", // Garante que a imagem seja cortada nas bordas
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  exerciseTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
  },
  exerciseDescription: {
    fontSize: 20,
    color: "#000",
    marginVertical: 5,
  },
  caloriesText: {
    fontSize: 20,
    color: "#4CAF50",
    fontWeight: "bold",
  },
});
