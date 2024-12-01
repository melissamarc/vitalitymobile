import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native';
import { firebase } from '../../firebaseconfig';
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

// Lista de e-mails autorizados
const DEVELOPER_EMAILS = ['melmrc1@gmail.com']; // Substitua pelos e-mails dos desenvolvedores

const CaloriasDev = ({ navigation }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [fat, setFat] = useState('');
  const [protein, setProtein] = useState('');
  const [foods, setFoods] = useState([]);
  const [showFoodList, setShowFoodList] = useState(false);
  const [editFood, setEditFood] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        setUserEmail(user.email);
        if (!DEVELOPER_EMAILS.includes(user.email)) {
          Alert.alert('Acesso Negado', 'Você não tem permissão para acessar esta tela.');
          navigation.goBack(); // Voltar para a tela anterior
        }
      }
    };

    fetchUser();
  }, []);

  const handleAddNewFood = async () => {
    if (name && calories && fat && protein) {
      const newFood = { name, calories: Number(calories), fat: Number(fat), protein: Number(protein) };
      try {
        await addDoc(collection(firebase.firestore(), 'foods'), newFood);
        Alert.alert('Sucesso', 'Alimento adicionado com sucesso!');
        setName('');
        setCalories('');
        setFat('');
        setProtein('');
        setShowForm(false);
        fetchFoods();
      } catch (error) {
        Alert.alert('Erro', 'Erro ao adicionar alimento.');
      }
    } else {
      Alert.alert('Erro', 'Preencha todos os campos corretamente.');
    }
  };

  const fetchFoods = async () => {
    const foodsCollection = collection(firebase.firestore(), 'foods');
    const foodSnapshot = await getDocs(foodsCollection);
    const foodList = foodSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setFoods(foodList);
  };

  const handleDeleteFood = async (foodId) => {
    try {
      const foodDoc = doc(firebase.firestore(), 'foods', foodId);
      await deleteDoc(foodDoc);
      Alert.alert('Sucesso', 'Alimento excluído com sucesso!');
      fetchFoods();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao excluir alimento.');
    }
  };

  const handleEditFoodSave = async () => {
    if (editFood && editFood.name && editFood.calories >= 0 && editFood.fat >= 0 && editFood.protein >= 0) {
      try {
        const foodDoc = doc(firebase.firestore(), 'foods', editFood.id);
        await updateDoc(foodDoc, {
          name: editFood.name,
          calories: editFood.calories,
          fat: editFood.fat,
          protein: editFood.protein,
        });
        Alert.alert('Sucesso', 'Alimento atualizado com sucesso!');
        setEditFood(null);
        fetchFoods();
      } catch (error) {
        Alert.alert('Erro', 'Erro ao editar alimento.');
      }
    } else {
      Alert.alert('Erro', 'Preencha todos os campos corretamente.');
    }
  };

  useEffect(() => {
    if (showFoodList) {
      fetchFoods();
    }
  }, [showFoodList]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modo Desenvolvedor</Text>
      {!showForm && !showFoodList && (
        <View>
          <TouchableOpacity style={styles.button} onPress={() => setShowForm(true)}>
            <Text style={styles.buttonText}>Adicionar Novo Alimento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setShowFoodList(true)}>
            <Text style={styles.buttonText}>Exibir Alimentos Cadastrados</Text>
          </TouchableOpacity>
        </View>
      )}
      {showForm && (
        <View style={styles.form}>
          <Text style={styles.formTitle}>Preencha os dados do alimento:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do Alimento"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Calorias"
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
          />
          <TextInput
            style={styles.input}
            placeholder="Gordura"
            keyboardType="numeric"
            value={fat}
            onChangeText={setFat}
          />
          <TextInput
            style={styles.input}
            placeholder="Proteína"
            keyboardType="numeric"
            value={protein}
            onChangeText={setProtein}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddNewFood}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setShowForm(false)}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
      {showFoodList && (
        <FlatList
          data={foods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.foodItem}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text>Calorias: {item.calories}</Text>
              <Text>Gordura: {item.fat}g</Text>
              <Text>Proteína: {item.protein}g</Text>
              <TouchableOpacity onPress={() => setEditFood(item)}>
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteFood(item.id)}>
                <Text style={styles.deleteText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      {editFood && (
        <Modal transparent={true} visible={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Editar Alimento</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={editFood.name}
                onChangeText={(text) => setEditFood({ ...editFood, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Calorias"
                keyboardType="numeric"
                value={String(editFood.calories)}
                onChangeText={(text) => setEditFood({ ...editFood, calories: Number(text) })}
              />
              <TextInput
                style={styles.input}
                placeholder="Gordura"
                keyboardType="numeric"
                value={String(editFood.fat)}
                onChangeText={(text) => setEditFood({ ...editFood, fat: Number(text) })}
              />
              <TextInput
                style={styles.input}
                placeholder="Proteína"
                keyboardType="numeric"
                value={String(editFood.protein)}
                onChangeText={(text) => setEditFood({ ...editFood, protein: Number(text) })}
              />
              <TouchableOpacity style={styles.button} onPress={handleEditFoodSave}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setEditFood(null)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#7dcd9a', padding: 15, borderRadius: 10, marginVertical: 5 },
  buttonText: { color: '#fff', textAlign: 'center' },
  cancelButton: { backgroundColor: '#ff5c5c' },
  form: { marginTop: 20 },
  formTitle: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  foodItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  foodName: { fontWeight: 'bold', fontSize: 16 },
  editText: { color: '#007AFF', marginTop: 5 },
  deleteText: { color: '#FF0000', marginTop: 5 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
});

export default CaloriasDev;
