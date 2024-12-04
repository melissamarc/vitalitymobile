import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Ícone de copo de água
import { useWaterContext } from '../Watercontext'; // Importando o contexto

const WaterCounter = () => {
  const { cupsConsumed } = useWaterContext(); // Acessando o estado global de copos consumidos

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.totalText}>{cupsConsumed}</Text> {/* Exibe o número de copos consumidos */}
        <Text style={styles.label}>Água</Text>
        <View style={styles.cupsContainer}>
          <FontAwesome5
            name="glass-whiskey" // Ícone de copo de água
            size={40}
            color="#00bfff" // Cor azul para indicar que o copo está "cheio"
            style={styles.cupIcon}
          />
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
    height: 200,
    width: 158,
    flexDirection: 'row',
   
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#007ac1',
  },
  totalText: {
    fontSize: 50, // Maior tamanho para o total de copos consumidos
    fontWeight: 'bold',
    color: '#fff',
  },
  label: {
    fontSize: 20,
    color: '#fff',
    marginTop: 10,
  },
  cupsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  cupIcon: {
    margin: 8,
  },
});

export default WaterCounter;
