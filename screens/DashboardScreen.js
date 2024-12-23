import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { firebase } from '../firebaseconfig';

// Importando as telas
import DashboardHomeScreen from './DashboardHomeScreen';
import WaterScreen from './WaterScreen';

import Exercicio from './exercises/ExerciseScreen';
import FoodScreen from './FoodScreen';
import StepCounterScreen from './StepCounterScreen';
import RecipeScreen from './RecipeScreen';

const Tab = createBottomTabNavigator();

const FloatingButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.floatingButton, { backgroundColor: '#7dcd9a' }]}
      onPress={onPress}
    >
      <Ionicons name="add" size={30} color="#fff" />
    </TouchableOpacity>
  );
};

const FloatingMenu = ({ isOpen, onSelect }) => {
  const animatedValue = new Animated.Value(isOpen ? 1 : 0);

  Animated.timing(animatedValue, {
    toValue: isOpen ? 1 : 0,
    duration: 300,
    useNativeDriver: true,
  }).start();

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  return (
    <Animated.View style={[styles.floatingMenu, { transform: [{ translateY }] }]}>
      <TouchableOpacity style={styles.menuItem} onPress={() => onSelect('FoodScreen')}>
        <MaterialIcons name="restaurant" size={30} color="#000" />
        <Text> Adicionar Refeição </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => onSelect('WaterScreen')}>
        <FontAwesome5 name="tint" size={30} color="#000" />
        <Text>Adicionar Água Consumida</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function DashboardScreen({ navigation }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSelect = (screen) => {
    setMenuOpen(false);
    navigation.navigate(screen); // Navega diretamente para a tela selecionada
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (route.name === 'Dashboard') {
              return <Ionicons name="stats-chart" size={size} color={focused ? '#7dcd9a' : color} />;
            } else if (route.name === 'Exercicio') {
              return <MaterialIcons name="fitness-center" size={size} color={focused ? '#7dcd9a' : color} />;
            } else if (route.name === 'Receitas') {
              return <MaterialIcons name="book" size={size} color={focused ? '#7dcd9a' : color} />;
            } else if (route.name === 'Passos') {
              return <MaterialIcons name="directions-walk" size={size} color={focused ? '#7dcd9a' : color} />;
            } 
          },
          tabBarShowLabel: false,
          tabBarStyle: { ...styles.tabBar },
          tabBarActiveTintColor: '#7dcd9a', // Cor dos ícones selecionados
          tabBarInactiveTintColor: 'gray', // Cor dos ícones não selecionados
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardHomeScreen} />
        <Tab.Screen name="Exercicio" component={Exercicio} />
        <Tab.Screen
          name="Add"
          component={() => null} // Botão "+" não renderiza tela
          options={{
            tabBarButton: () => <FloatingButton onPress={handleMenuToggle} />,
          }}
        />
        <Tab.Screen name="Receitas" component={RecipeScreen} />
        <Tab.Screen name="Passos" component={StepCounterScreen} />
      </Tab.Navigator>
     
       {menuOpen && (
  <FloatingMenu
    isOpen={menuOpen}
    onSelect={(screenName) => {
      setMenuOpen(false); // Fecha o menu após selecionar
      if (screenName === 'FoodScreen') {
        navigation.navigate('Refeicoes'); // Nome da rota corrigido
      } else if (screenName === 'WaterScreen') {
        navigation.navigate('WaterScreen'); // Nome da rota corrigido
      }
    }}
  />
)}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    elevation: 5,
  },
  floatingMenu: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    elevation: 20,
    height: 150,
    width: 200,
 fontSize: 16,
  },
  menuItem: {
   
    alignItems: 'center',
    marginVertical: 10,
  },
});
