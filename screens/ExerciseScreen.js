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
import { Ionicons } from '@expo/vector-icons'; // Biblioteca para os ícones
import UserButton from './components/UserButton';

export default function Exercicio() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Header com ícones */}
        <View style={styles.header}>
         <UserButton/>
          <View style={styles.icons}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              style={styles.iconButton}
            >
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}
              style={styles.iconButton}
            >
              <Ionicons name="person-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

  
      

      

        {/* Cartões de Exercícios */}
        {['Caminhada', 'Corrida', 'Musculacao'].map((exercicio, index) => (
          <TouchableOpacity
            key={index}
            style={styles.exerciseCard}
            onPress={() => navigation.navigate(exercicio)}
          >
            <View style={styles.cardContent}>
              <Ionicons name="walk-outline" size={40} color="#6C63FF" />
              <Text style={styles.exerciseTitle}>{exercicio}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="#aaa" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 30,

  },

  icons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  searchText: {
    marginLeft: 10,
    color: '#aaa',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  suggestions: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  suggestionCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginRight: 15,
    alignItems: 'center',
  },
  suggestionText: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  exerciseCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseTitle: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
