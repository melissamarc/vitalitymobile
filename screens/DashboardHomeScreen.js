import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca para os ícones
import { useNavigation } from '@react-navigation/native';
import UserButton from './components/UserButton';
export default function DashboardHomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Barra de topo com ícones */}
      <View style={styles.header}> 
        <UserButton/>


        <View style={styles.icons}> 
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
      
      </View>

      {/* Conteúdo principal */}
      <View syle={styles.content}>

       <Text style={styles.today}> Hoje </Text> 
       <View style={styles.cabecalho}> 
        <Text> aqui vai ficar a qt de calorias  </Text> 
         <TouchableOpacity
        style={styles.devButton}
        onPress={() => navigation.navigate('CaloriasDev')}
      >
        <Text style={styles.devButtonText}>Acessar Modo Desenvolvedor</Text>
      </TouchableOpacity>
         </View>
        
    
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
 today: {
   paddingLeft: 13,
   marginTop: 13,
   fontSize: 18

 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 30,


  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
 
  },

  iconButton: {
    padding: 10,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },

  cabecalho: {
    margin: 'auto',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    width: '95%',
    height: '40%',
    borderRadius: 20
  }
});
