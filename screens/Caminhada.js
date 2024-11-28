import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { Pedometer } from 'expo-sensors';

export default function Caminhada() {
  const [location, setLocation] = useState(null);
  const [route, setRoute] = useState([]); // Rota percorrida
  const [steps, setSteps] = useState(0); // Contador de passos
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(null);
  const [calorias, setCalorias] = useState(0);
  const [distancia, setDistancia] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [ativo, setAtivo] = useState(false);
  const [mapaExpandido, setMapaExpandido] = useState(false);

  // Solicitar permissões para acessar a localização
  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão de localização negada!');
        return;
      }

      // Após permissão, obter a localização inicial
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    };

    requestLocationPermission();
  }, []);

  // Verificar se o pedômetro está disponível
  useEffect(() => {
    Pedometer.isAvailableAsync().then(
      (result) => setIsPedometerAvailable(result),
      (error) => console.error("Pedometer não disponível:", error)
    );
  }, []);

  // Iniciar o pedômetro quando o exercício começar
  useEffect(() => {
    let subscription;

    if (ativo) {
      subscription = Pedometer.watchStepCount((result) => {
        setSteps(result.steps);
        setDistancia(result.steps * 0.0008); // Aproximadamente 0.8 metros por passo
        setCalorias(result.steps * 0.04); // Estimativa de calorias (0.04 kcal por passo)
      });
    } else if (subscription) {
      subscription.remove();
    }

    return () => subscription?.remove();
  }, [ativo]);

  // Rastreamento de localização
  useEffect(() => {
    let intervalo: NodeJS.Timeout;

    if (ativo) {
      intervalo = setInterval(async () => {
        const novaLocalizacao = await Location.getCurrentPositionAsync({});
        const novaCoordenada = {
          latitude: novaLocalizacao.coords.latitude,
          longitude: novaLocalizacao.coords.longitude,
        };

        setRoute((prevRoute) => [...prevRoute, novaCoordenada]);
        setTempo((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [ativo, route]);

  const finalizarExercicio = () => {
    setAtivo(false);
    alert(
      `Exercício finalizado!\nPassos: ${steps}\nDistância: ${distancia.toFixed(
        2
      )} km\nCalorias: ${calorias.toFixed(2)} kcal`
    );
    setSteps(0);
    setTempo(0);
    setCalorias(0);
    setDistancia(0);
    setRoute([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Caminhada</Text>

      <TouchableOpacity onPress={() => setMapaExpandido(true)}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location?.latitude || 37.78825,
            longitude: location?.longitude || -122.4324,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation
          followsUserLocation
        >
          {route.length > 0 && <Polyline coordinates={route} strokeWidth={4} strokeColor="#0EAB6E" />}
        </MapView>
      </TouchableOpacity>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{steps}</Text>
          <Text style={styles.statLabel}>Passos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{distancia.toFixed(2)} km</Text>
          <Text style={styles.statLabel}>Distância</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{calorias.toFixed(2)} kcal</Text>
          <Text style={styles.statLabel}>Calorias</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{tempo}s</Text>
          <Text style={styles.statLabel}>Tempo</Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        {!ativo && (
          <TouchableOpacity style={styles.button} onPress={() => setAtivo(true)}>
            <Text style={styles.buttonText}>Iniciar</Text>
          </TouchableOpacity>
        )}
        {ativo && (
          <TouchableOpacity style={styles.button} onPress={() => setAtivo(false)}>
            <Text style={styles.buttonText}>Pausar</Text>
          </TouchableOpacity>
        )}
        {!ativo && tempo > 0 && (
          <TouchableOpacity style={styles.button} onPress={finalizarExercicio}>
            <Text style={styles.buttonText}>Finalizar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Modal para o mapa expandido */}
      <Modal visible={mapaExpandido} animationType="slide">
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location?.latitude || 37.78825,
            longitude: location?.longitude || -122.4324,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation
          followsUserLocation
        >
          {route.length > 0 && <Polyline coordinates={route} strokeWidth={4} strokeColor="#0EAB6E" />}
        </MapView>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setMapaExpandido(false)}
        >
          <Text style={styles.closeButtonText}>Fechar</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  map: { height: Dimensions.get('window').height / 3, borderRadius: 10 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  statBox: { alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 14, color: '#555' },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  button: { backgroundColor: '#0EAB6E', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16 },
  closeButton: { position: 'absolute', bottom: 30, alignSelf: 'center', backgroundColor: '#0EAB6E', padding: 10, borderRadius: 10 },
  closeButtonText: { color: '#fff', fontSize: 16 },
});
