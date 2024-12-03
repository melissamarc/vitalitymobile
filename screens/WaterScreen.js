import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useWaterContext } from './Watercontext'; // Importando o contexto

export default function WaterScreen() {
  const { cupsConsumed, setCupsConsumed } = useWaterContext(); // Acessando o estado e a função de atualização

  const handleAddCup = () => {
    setCupsConsumed(cupsConsumed + 1);
  };

  const handleRemoveCup = () => {
    if (cupsConsumed > 0) {
      setCupsConsumed(cupsConsumed - 1);
    }
  };

  return (
    <View>
      <Text>Copos consumidos: {cupsConsumed}</Text>
      <TouchableOpacity onPress={handleAddCup}>
        <Text>Adicionar Copo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRemoveCup}>
        <Text>Remover Copo</Text>
      </TouchableOpacity>
    </View>
  );
}
