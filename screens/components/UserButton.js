import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Importando a imagem padrão do avatar
import avatar1 from '../../assets/avatar1.png';

const UserButton = ({ onPress }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  if (!userData) {
    return (
      <Text style={styles.errorText}>
        Não foi possível carregar os dados do usuário.
      </Text>
    );
  }

// Verifica se o usuário tem uma foto, caso contrário usa o avatar1
  

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={avatar1} // Sempre exibe o avatar1
        style={styles.profileImage}
      />
      <Text style={styles.username}>{userData.username || 'User2985'}</Text>
    </TouchableOpacity>
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
    width: 50,
    height: 50,
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
  errorText: {
    color: '#ff0000',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default UserButton;
