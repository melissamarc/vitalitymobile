import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text , TouchableOpacity, ActivityIndicator } from 'react-native';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import NutritionChart from './components/NutritionChart';
import UserButton from './components/UserButton';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";


export default function DashboardHomeScreen() {
  const navigation = useNavigation();
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailyData = async () => {
      try {
        setLoading(true);
        const startOfDay = Timestamp.fromDate(new Date(new Date().setHours(0, 0, 0, 0)));
        const mealsQuery = query(
          collection(db, 'userMeals'),
          where('date', '>=', startOfDay)
        );
        const mealsSnapshot = await getDocs(mealsQuery);
        const mealsList = mealsSnapshot.docs.map((doc) => doc.data());
        setDailyData(mealsList);
      } catch (error) {
        console.error('Erro ao buscar dados diários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyData();
  }, []);

  const chartData = [
    { name: 'Calorias', population: dailyData.reduce((acc, food) => acc + food.calories, 0), color: '#0088FE' },
    { name: 'Gorduras', population: dailyData.reduce((acc, food) => acc + food.fat, 0), color: '#00C49F' },
    { name: 'Proteínas', population: dailyData.reduce((acc, food) => acc + food.protein, 0), color: '#FFBB28' },
  ];

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

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

     
      <NutritionChart data={chartData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
 
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
