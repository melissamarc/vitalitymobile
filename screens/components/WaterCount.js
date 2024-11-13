import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Ícone de copo de água

const WaterCounter = () => {
  const totalCups = 10; // total de copos
  const waterPerCup = 200; // ml por copo

  // Estado para quantidade total de água e copos cheios
  const [totalWater, setTotalWater] = useState(0);
  const [filledCups, setFilledCups] = useState(Array(totalCups).fill(false));

  // Função para atualizar o contador de água
  const handleCupPress = (index) => {
    setFilledCups((prevCups) => {
      const newCups = [...prevCups];
      if (newCups[index]) {
        // Se o copo já está cheio, esvaziar e subtrair 200 ml
        newCups[index] = false;
        setTotalWater(totalWater - waterPerCup);
      } else {
        // Se o copo está vazio, encher e adicionar 200 ml
        newCups[index] = true;
        setTotalWater(totalWater + waterPerCup);
      }
      return newCups;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.totalText}>Total de Água: {totalWater} ml</Text>
        <View style={styles.cupsContainer}>
          {filledCups.map((isFilled, index) => (
            <TouchableOpacity key={index} onPress={() => handleCupPress(index)}>
              <FontAwesome5
                name="glass-whiskey" // Ícone de copo de água
                size={40}
                color={isFilled ? '#00bfff' : '#d3d3d3'} // Azul quando cheio, cinza quando vazio
                style={styles.cupIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    padding: 20,
    borderWidth: 2,
    borderColor: '#007acc',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007acc',
    marginBottom: 10,
  },
  cupsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  cupIcon: {
    margin: 8,
  },
});

export default WaterCounter;
