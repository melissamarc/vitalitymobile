import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Importe os avatares diretamente da pasta assets
import avatar1 from '../assets/avatar1.png';
import avatar2 from '../assets/avatar2.png';
import avatar3 from '../assets/avatar3.png';
import avatar4 from '../assets/avatar4.png';

export default function ProfileScreen() {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  // Lista de avatares disponíveis
  const avatars = [avatar1, avatar2, avatar3, avatar4];

  // Função para atualizar a foto do avatar no Firestore
  const updateAvatar = async (avatarUrl) => {
    try {
      if (user) {
        // Atualiza o avatar no Firestore
        await setDoc(doc(db, 'users', user.uid), {
          photoURL: avatarUrl, // Campo photoURL no Firestore
        }, { merge: true });
        Alert.alert('Sucesso', 'Foto de perfil atualizada!');
        setSelectedAvatar(avatarUrl); // Atualiza a foto localmente
      } else {
        Alert.alert('Erro', 'Usuário não logado');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a foto de perfil.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Escolha uma foto de perfil</Text>
      <View style={styles.avatarContainer}>
        {avatars.map((avatar, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.avatarButton,
              selectedAvatar === avatar && styles.selectedAvatar,
            ]}
            onPress={() => updateAvatar(avatar)}
          >
            <Image source={avatar} style={styles.avatarImage} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  avatarButton: {
    margin: 10,
    padding: 10,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  selectedAvatar: {
    borderColor: '#00f',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
