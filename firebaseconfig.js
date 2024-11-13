import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAXLSQwTz7WhoYNzEoK-MLLI2t6Nx9Fegk",
  authDomain: "vitalityvision-47186.firebaseapp.com",
  projectId: "vitalityvision-47186",
  storageBucket: "vitalityvision-47186.firebasestorage.app",
  messagingSenderId: "1031713528053",
  appId: "1:1031713528053:web:fa6f0b9a6bbfb85442cdbc",
  measurementId: "G-5GT87VHZNE"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };