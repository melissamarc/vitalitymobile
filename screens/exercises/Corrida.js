import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { Pedometer } from "expo-sensors";
import Icon from "react-native-vector-icons/FontAwesome5"; // Usando FontAwesome5

export default function Corrida() {
  const [location, setLocation] = useState(null);
  const [route, setRoute] = useState([]); // Rota percorrida
  const [steps, setSteps] = useState(0); // Contador de passos
  const [calorias, setCalorias] = useState(0);
  const [distancia, setDistancia] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [ativo, setAtivo] = useState(false);
  const [mapaExpandido, setMapaExpandido] = useState(false);
  const [exercicioFinalizado, setExercicioFinalizado] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão de localização negada!");
        return;
      }

      // Após permissão, obter a localização inicial
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    Pedometer.isAvailableAsync().then(
      (result) => setIsPedometerAvailable(result),
      (error) => console.error("Pedometer não disponível:", error)
    );
  }, []);

  useEffect(() => {
    let subscription;

    if (ativo) {
      subscription = Pedometer.watchStepCount((result) => {
        const newSteps = result.steps;
        setSteps(newSteps);
        setDistancia(newSteps * 0.0008); // Aproximadamente 0.8 metros por passo
        setCalorias(newSteps * 0.04); // Estimativa de calorias (0.04 kcal por passo)
      });
    }

    return () => subscription?.remove();
  }, [ativo]);

  useEffect(() => {
    let intervalo;

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
  }, [ativo]);

  const finalizarExercicio = () => {
    setAtivo(false);
    setExercicioFinalizado(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setMapaExpandido(true)}>
        <MapView
          style={styles.map}
          region={
            location
              ? {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }
              : null
          }
          showsUserLocation
          followsUserLocation
        >
          {route.length > 0 && (
            <Polyline
              coordinates={route}
              strokeWidth={4}
              strokeColor="#0EAB6E"
            />
          )}
        </MapView>
      </TouchableOpacity>

      {/* Cabeçalho sobreposto ao mapa */}
      <View style={styles.headerContainer}>
        <Icon name="running" size={30} color="#fff" solid style={styles.icon} />
        <Text style={styles.headerText}>Corrida</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{steps}</Text>
          <Text style={styles.statLabel}>Passos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{distancia.toFixed(1)} km</Text>
          <Text style={styles.statLabel}>Distância</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{calorias.toFixed()} kcal</Text>
          <Text style={styles.statLabel}>Calorias</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{tempo}s</Text>
          <Text style={styles.statLabel}>Tempo</Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        {!ativo && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setAtivo(true)}
          >
            <Text style={styles.buttonText}>Iniciar</Text>
          </TouchableOpacity>
        )}
        {ativo && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setAtivo(false)}
          >
            <Text style={styles.buttonText}>Pausar</Text>
          </TouchableOpacity>
        )}
        {!ativo && tempo > 0 && (
          <TouchableOpacity style={styles.button2} onPress={finalizarExercicio}>
            <Text style={styles.buttonText}>Finalizar</Text>
          </TouchableOpacity>
        )}
      </View>

      {exercicioFinalizado && (
        <View style={styles.resultadosContainer}>
          <Text style={styles.resultadosTitle}>Resultados ✨</Text>
          <View style={styles.resultadoBox}>
            <Text style={styles.resultadoLabel}>Passos:</Text>
            <Text style={styles.resultadoValue}>{steps}</Text>
          </View>
          <View style={styles.resultadoBox}>
            <Text style={styles.resultadoLabel}>Distância:</Text>
            <Text style={styles.resultadoValue}>{distancia.toFixed(1)} km</Text>
          </View>
          <View style={styles.resultadoBox}>
            <Text style={styles.resultadoLabel}>Calorias:</Text>
            <Text style={styles.resultadoValue}>
              {calorias.toFixed(2)} kcal
            </Text>
          </View>
          <View style={styles.resultadoBox}>
            <Text style={styles.resultadoLabel}>Tempo:</Text>
            <Text style={styles.resultadoValue}>{tempo}s</Text>
          </View>
        </View>
      )}

      <Modal visible={mapaExpandido} animationType="slide">
        <MapView
          style={{ flex: 1 }}
          region={
            location
              ? {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }
              : null
          }
          showsUserLocation
          followsUserLocation
        >
          {route.length > 0 && (
            <Polyline
              coordinates={route}
              strokeWidth={4}
              strokeColor="#0EAB6E"
            />
          )}
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "75%", // Ajustei para 70% da altura da tela
  },
  headerContainer: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    zIndex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
  icon: {
    backgroundColor: "#A7D8A1", // Verde bem claro para o fundo do ícone
    padding: 2,
    borderRadius: 25,
  },
  statsContainer: {
    top: -150,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10, // Adicionei padding para dar mais espaço
  },
  statBox: {
    width: "24%",
    height: 100,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 10,
    gap: 5,
  },
  button: {
    top: -135,
    backgroundColor: "#0EAB6E",
    padding: 15,
    width: 185,
    borderRadius: 10,
  },
  button2: {
    top: -135,
    backgroundColor: "#FF0000",
    padding: 15,
    width: 185,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#0EAB6E",
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  resultadosContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    top: -100,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  resultadosTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resultadoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  resultadoLabel: {
    fontSize: 16,
    color: "#555",
  },
  resultadoValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
