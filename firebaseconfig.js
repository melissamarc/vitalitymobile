import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAXLSQwTz7WhoYNzEoK-MLLI2t6Nx9Fegk",
  authDomain: "vitalityvision-47186.firebaseapp.com",
  projectId: "vitalityvision-47186",
  storageBucket: "vitalityvision-47186.appspot.com", // Corrigido "firebasestorage.app" para "appspot.com"
  messagingSenderId: "1031713528053",
  appId: "1:1031713528053:web:fa6f0b9a6bbfb85442cdbc",
  measurementId: "G-5GT87VHZNE",
};

// Inicializa o Firebase apenas se ainda não foi inicializado
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Exporta a instância de Firestore e outros serviços
const db = firebase.firestore(); // Instância do Firestore
const auth = firebase.auth(); // Instância de Autenticação

export { firebase, db, auth };
