import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserButton from './components/UserButton';

const WaterScreen = ({ navigation }) => {
  const [cupsConsumed, setCupsConsumed] = useState(0);
  const cupSize = 500; // Size of each cup in ml
  const dailyGoal = 4000; // Daily goal in ml

  const progress = useRef(new Animated.Value(0)).current;

  const progressValue = Math.min((cupsConsumed * cupSize) / dailyGoal, 1);
  const progressPercentage = progressValue * 100;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: progressValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progressValue]);

  useEffect(() => {
    if (cupsConsumed * cupSize >= dailyGoal) {
      Alert.alert("Congratulations!", "You have reached your daily water intake goal!");
    }
  }, [cupsConsumed]);

  const handleAddCup = () => {
    if (cupsConsumed * cupSize < dailyGoal) {
      setCupsConsumed(cupsConsumed + 1);
    }
  };

  const handleRemoveCup = () => {
    if (cupsConsumed > 0) {
      setCupsConsumed(cupsConsumed - 1);
    }
  };

  const dropSize = Math.min(Dimensions.get('window').width * 0.4, 200);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <UserButton />
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            style={styles.iconButton}
          >
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}
            style={styles.iconButton}
          >
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContainer}>
        <Text style={styles.dailyGoalText}>{dailyGoal} ml</Text>

        <View
          style={[
            styles.waterDrop,
            {
              width: dropSize,
              height: dropSize * 1.5,
              borderRadius: dropSize / 2,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.waterFill,
              {
                height: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
          <Ionicons
            name="water"
            size={dropSize}
            color="#fff"
            style={styles.iconContainer}
          />
          <Text style={styles.waterText}>{cupsConsumed * cupSize} ml</Text>
          <Text style={styles.waterPercentage}>
            {cupsConsumed === 0 ? '0%' : `${progressPercentage.toFixed(0)}%`}
          </Text>
        </View>

        <Text style={styles.cupsText}>{cupsConsumed}/8 (500ml Cups)</Text>

        <View style={styles.buttonsContainer}>
        <TouchableOpacity
  style={styles.circularButton}
  onPress={handleAddCup}
  accessibilityLabel="Add water cup"
>
  <Image
    source={require('../assets/watermais.png')} // Ajuste o caminho relativo conforme necessário
    style={styles.iconImage}
  />
</TouchableOpacity>
<TouchableOpacity
  style={styles.circularButton}
  onPress={handleRemoveCup}
  accessibilityLabel="Remove water cup"
>
  <Image
    source={require('../assets/watermenos.png')} // Ajuste o caminho relativo conforme necessário
    style={styles.iconImage}
  />
</TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
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
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  iconButton: {
    padding: 10,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  dailyGoalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  waterDrop: {
    waterDrop: {
  backgroundColor: '#b3e5fc',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  marginBottom: 20,
  position: 'relative',
  borderRadius: 100, // mantém o formato arredondado
},
  },
  waterFill: {
    width: '100%',
    backgroundColor: '#4FC3F7',
    position: 'absolute',
    bottom: 0,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    

  },
  waterText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    zIndex: 1,
    marginBottom: 10,
  },
  waterPercentage: {
    fontSize: 16,
    color: '#fff',
    zIndex: 1,
  },
  cupsText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  circularButton: {
    width: 70,
    height: 70,
    backgroundColor: '#4FC3F7',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 60,
    marginTop: 150,
    elevation: 5,
  },
  iconImage: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
});

export default WaterScreen;
