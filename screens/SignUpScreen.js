import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, StatusBar, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { firebase } from '../firebaseconfig';

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  const handleSignup = () => {
    if (!fullName || !username || !dob || !gender || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos!');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Senha inválida',
        'A senha deve conter pelo menos uma letra maiúscula, um número e ter no mínimo 6 caracteres.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;

        firebase.firestore().collection('users').doc(userId).set({
          fullName,
          username,
          dob: dob ? dob.toISOString().split('T')[0] : '',
          gender,
          email,
        });

        navigation.navigate('Dashboard');
      })
      .catch((error) => Alert.alert('Erro', error.message));
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View style={styles.topSection}>
        <Text style={styles.headerText}>Criar Conta</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Nome completo"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          placeholderTextColor="black"
        />
        <TextInput
          placeholder="Nome de usuário"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="black"
        />

        {/* Botão de calendário */}
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text style={{ color: dob ? 'black' : '#888' }}>
            {dob ? dob.toLocaleDateString() : 'Data de nascimento'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dob || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            textColor="black" // Apenas para iOS
            onChange={handleDateChange}
          />
        )}

        {/* Dropdown de gênero */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione o gênero" value="" color="black" />
            <Picker.Item label="Feminino" value="feminino" color="black" />
            <Picker.Item label="Masculino" value="masculino" color="black" />
            <Picker.Item label="Prefiro não dizer" value="naoDizer" color="black" />
          </Picker>
        </View>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          placeholderTextColor="black"
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="black"
        />
        <TextInput
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="black"
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Cadastrar</Text>
        </TouchableOpacity>

        <View style={styles.loginSection}>
          <Text style={{ color: 'black' }}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  topSection: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },

  form: {
    display: 'flex',
    width: '90%',
    height: '60%'
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    marginBottom: 15,
    color: 'black',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    marginBottom: 15,
  },
  picker: {
    
    color: 'black',
  },
  signupButton: {
    backgroundColor: '#7DCD9A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginSection: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  loginText: {
    color: '#7DCD9A',
    fontWeight: 'bold',
  },
});
