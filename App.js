import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppRoutes from './routes';

export default function App() {
  return (
    <> 
    <StatusBar hidden={true} />
   <AppRoutes/>
    </>
       
  );
}

