import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Svg, { Path, Rect, ClipPath, Defs } from 'react-native-svg';
import UserButton from "./components/UserButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function WaterCounterScreen() {
  const goal = 4000; // Meta diária de água em ML
  const waterPerCup = 500; // Quantidade de água por copo em ML

  const [totalWater, setTotalWater] = useState(0);
  const [waterLevel] = useState(new Animated.Value(0)); // Animação para o nível de água

  const addWater = () => {
    if (totalWater + waterPerCup <= goal) {
      setTotalWater(totalWater + waterPerCup);
      animateWaterLevel((totalWater + waterPerCup) / goal);
    }
  };

  const resetWater = () => {
    setTotalWater(0);
    animateWaterLevel(0);
  };

  const navigation = useNavigation();

  const animateWaterLevel = (level: number) => {
    Animated.timing(waterLevel, {
      toValue: level * 100, // Converte a porcentagem em valor para a animação
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

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

      <Text style={styles.title}>Hoje</Text>

      <View style={styles.dropContainer}>
        <Svg height="200" width="120" viewBox="0 0 24 24">
          {/* Definindo a forma da gota e criando um caminho de recorte para o preenchimento */}
          <Defs>
            <ClipPath id="dropClip">
              <Path
                d="M12 2C8 7 5 10.5 5 14.5C5 18.1 8.1 21 12 21C15.9 21 19 18.1 19 14.5C19 10.5 16 7 12 2Z"
              />
            </ClipPath>
          </Defs>

          {/* Fundo da gota */}
          <Path
            d="M12 2C8 7 5 10.5 5 14.5C5 18.1 8.1 21 12 21C15.9 21 19 18.1 19 14.5C19 10.5 16 7 12 2Z"
            fill="#E0F7FF"
          />

          {/* Nível de água preenchendo a gota, ajustado pela animação */}
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: waterLevel.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
              overflow: 'hidden',
            }}
          >
            <Svg height="200" width="120" viewBox="0 0 24 24" clipPath="url(#dropClip)">
              <Rect x="0" y="0" width="24" height="24" fill="#1E90FF" />
            </Svg>
          </Animated.View>
        </Svg>

        <Text style={styles.waterText}>{`${totalWater}ml\n${Math.round((totalWater / goal) * 100)}%`}</Text>
      </View>

      <Text style={styles.goalText}>{`Meta: ${goal}ml`}</Text>
      <Text style={styles.statusText}>{`${totalWater / waterPerCup}/${goal / waterPerCup} Copos`}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={addWater}>
          <Text style={styles.buttonText}>Adicionar 500ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetWater}>
          <Text style={styles.resetButtonText}>Resetar</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  dropContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 200,
    position: 'relative',
    marginBottom: 20,
  },
  waterText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    position: 'absolute',
    top: '45%',
    fontWeight: 'bold',
  },
  goalText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 10,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
