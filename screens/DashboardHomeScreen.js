import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca para os ícones
import { useNavigation } from '@react-navigation/native';

export default function DashboardHomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Barra de topo com ícones */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notification')}
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

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text>Gráficos e Informações do Dashboard</Text>
        {/* Aqui você pode adicionar componentes de gráficos ou outras informações */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  iconButton: {
    padding: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
