import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Criando o contexto
const WaterContext = createContext();

// Componente para fornecer o contexto aos filhos
export const WaterProvider = ({ children }) => {
  const [cupsConsumed, setCupsConsumed] = useState(0);

  // Carregar a quantidade de copos consumidos do AsyncStorage
  useEffect(() => {
    const loadCups = async () => {
      const storedCups = await AsyncStorage.getItem('cupsConsumed');
      if (storedCups) {
        setCupsConsumed(Number(storedCups));
      }
    };
    loadCups();
  }, []);

  // Salvar a quantidade de copos no AsyncStorage sempre que mudar
  useEffect(() => {
    const saveCups = async () => {
      await AsyncStorage.setItem('cupsConsumed', String(cupsConsumed));
    };
    saveCups();
  }, [cupsConsumed]);

  return (
    <WaterContext.Provider value={{ cupsConsumed, setCupsConsumed }}>
      {children}
    </WaterContext.Provider>
  );
};

// Hook para consumir o contexto em qualquer componente
export const useWaterContext = () => useContext(WaterContext);
