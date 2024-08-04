import { View, Text ,TouchableOpacity,StyleSheet} from 'react-native'
import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { SafeAreaView } from 'react-native';
import { Route } from 'react-router-dom';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
{/* //      <TouchableOpacity
//                        onPress={() => navigation.navigate('Medal')}
//                        style={styles.startedButton}>
//                        <Text style={styles.startedButtonText}>Let's Get Started!</Text>
//                    </TouchableOpacity> */}
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: themeColors.bg,
  },
  content: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: 20,
  },
  title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
  },
  imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
  },
  image: {
      width: 300,
      height: 300,
      borderRadius: 150,
  },
  buttonContainer: {
      width: '100%',
      paddingHorizontal: 30,
  },
  startedButton:{
      backgroundColor: '#fbbf24',
      padding: 15,
      borderRadius: 20,
      marginBottom: 10,
  },
  startedButtonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'rgb(51 65 85)',
      textAlign: 'center',
  },
});
