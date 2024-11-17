import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Exercicio() {
  const [steps, setSteps] = useState('');
  const [time, setTime] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [distance, setDistance] = useState('');
  const [calories, setCalories] = useState('');
  const [pace, setPace] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  const navigation = useNavigation();

  // Função para formatar o horário
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Função para obter o dia da semana
  const getDayOfWeek = (date) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  };

  // Atualiza o tempo e o dia a cada segundo
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      setCurrentTime(formatTime(currentDate));
      setCurrentDay(getDayOfWeek(currentDate));
    }, 1000);

    return () => clearInterval(intervalId); // Limpar o intervalo quando o componente for desmontado
  }, []);

  const handleSave = (activity) => {
    if (!steps || !time || !heartRate || !distance || !calories || !pace) {
      Alert.alert('Erro', `Por favor, preencha todas as informações de ${activity}.`);
      return;
    }

    console.log({
      activity,
      steps,
      time,
      heartRate,
      distance,
      calories,
      pace,
    });

    Alert.alert('Sucesso', `Informações de ${activity} salvas com sucesso!`);
    setSteps('');
    setTime('');
    setHeartRate('');
    setDistance('');
    setCalories('');
    setPace('');
  };

  const renderActivityContainer = (activityName) => (
    <View style={styles.containerSection}>
      <Text style={styles.sectionTitle}>{activityName}</Text>
      <TextInput
        style={styles.input}
        placeholder="Passos"
        keyboardType="numeric"
        value={steps}
        onChangeText={setSteps}
      />
      <TextInput
        style={styles.input}
        placeholder="Tempo (minutos)"
        keyboardType="numeric"
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Batimentos Cardíacos (BPM)"
        keyboardType="numeric"
        value={heartRate}
        onChangeText={setHeartRate}
      />
      <TextInput
        style={styles.input}
        placeholder="Distância (km)"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />
      <TextInput
        style={styles.input}
        placeholder="Calorias (kcal)"
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />
      <TextInput
        style={styles.input}
        placeholder="Ritmo (min/km)"
        keyboardType="numeric"
        value={pace}
        onChangeText={setPace}
      />
      <Button title={`Salvar ${activityName}`} onPress={() => handleSave(activityName)} />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Exercício</Text>
          <Text style={styles.dateText}>{`${currentDay}, ${currentTime}`}</Text>
        </View>

        <View style={styles.activityOverview}>
          <Text style={styles.activityType}>Musculação</Text>
          <Text style={styles.activityDistance}>15.00 km</Text>
          <Text style={styles.activityTime}>8:30 AM</Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityOverview}>
          <Text style={styles.activityType}>Caminhada</Text>
          <Text style={styles.activityDistance}>15.00 km</Text>
          <Text style={styles.activityTime}>8:30 AM</Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityOverview}>
          <Text style={styles.activityType}>Corrida</Text>
          <Text style={styles.activityDistance}>15.00 km</Text>
          <Text style={styles.activityTime}>8:30 AM</Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  dateText: {
    fontSize: 14,
    color: '#888',
  },
  activityOverview: {
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  activityType: {
    fontSize: 18,
    color: '#555',
  },
  activityDistance: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  activityTime: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#0EAB6E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
});
