import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import semfoto from '../../assets/semfoto.png'; // Avatar padrão
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserButton = ({ onPress, username, profilePhoto }) => {
  const [userData, setUserData] = useState(null);
  const [avatar, setAvatar] = useState(semfoto); // Avatar inicial padrão
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    // Carregar o avatar do AsyncStorage ao iniciar
    const loadAvatar = async () => {
      try {
        const savedAvatar = await AsyncStorage.getItem('userAvatar');
        if (savedAvatar) {
          setAvatar(JSON.parse(savedAvatar)); // Avatar carregado do AsyncStorage
        } else {
          setAvatar(semfoto); // Se não houver avatar salvo, usar o avatar padrão
        }
      } catch (error) {
        console.error('Erro ao carregar avatar:', error);
      }
    };

    // Carregar os dados do usuário
    const fetchUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          Alert.alert('Erro', 'Usuário não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      } finally {
        setLoading(false);
      }
    };

    loadAvatar(); // Carregar avatar ao iniciar a tela
    fetchUserData(); // Buscar dados do usuário

  }, [user]); // Carregar avatar e dados quando o usuário for atualizado

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={avatar ? { uri: avatar } : semfoto}
        style={styles.profileImage}
      />
      <Text style={styles.username}>{userData?.username || 'Usuário'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default UserButton;
