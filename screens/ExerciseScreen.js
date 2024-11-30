import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserButton from './components/UserButton';
import { Ionicons } from "@expo/vector-icons";


export default function Exercicio() {
  const navigation = useNavigation();

  // Dados dos exercícios sugeridos
  const suggestedWorkouts = [
    { id: 1, name: 'Yoga', icon: require('../assets/gym.png') },
    { id: 2, name: 'Weightlifting', icon: require('../assets/corrida.png') },
    { id: 3, name: 'Cycling', icon: require('../assets/corrida.png') },
  ];

  // Dados dos exercícios "Trending"
  const exercises = [
    {
      id: 1,
      name: 'Caminhada',
      description: 'Ande ao ar livre e aproveite a natureza.',
      calories: 200,
      image: require('../assets/corrida.png'),
    },
    {
      id: 2,
      name: 'Corrida',
      description: 'Melhore seu condicionamento físico correndo.',
      calories: 400,
      image: require('../assets/corrida.png'),
    },
    {
      id: 3,
      name: 'Musculação',
      description: 'Ganhe força e tonifique seus músculos.',
      calories: 300,
      image: require('../assets/corrida.png'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
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

      {/* Workouts sugeridos */}
      <View>
        <Text style={styles.sectionTitle}>Sugestões</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestions}>
          {suggestedWorkouts.map((workout) => (
            <View key={workout.id} style={styles.suggestionCard}>
              <Image source={workout.icon} style={styles.suggestionImage} />
              <Text style={styles.suggestionText}>{workout.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Exercícios em destaque */}
      <View>
        <Text style={styles.sectionTitle}>Em alta 🔥</Text>
        {exercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={styles.exerciseCard}
            onPress={() => navigation.navigate(exercise.name)}
          >
            <Image source={exercise.image} style={styles.exerciseImage} />
            <View style={styles.cardContent}>
              <Text style={styles.exerciseTitle}>{exercise.name}</Text>
              <Text style={styles.exerciseDescription}>{exercise.description}</Text>
              <Text style={styles.caloriesText}>🔥 {exercise.calories} Kcal</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10
   
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
 
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingLeft: 12
  },
  suggestions: {
    flexDirection: 'row',
  },
  suggestionCard: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    width: 95,
    height: 95,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20
  },
  suggestionImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  suggestionText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    height: 140
  },
  exerciseImage: {
    width: 65,
    height: 65,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  exerciseDescription: {
    fontSize: 12,
    color: '#777',
    marginVertical: 5,
  },
  caloriesText: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: 'bold',
  },
});
