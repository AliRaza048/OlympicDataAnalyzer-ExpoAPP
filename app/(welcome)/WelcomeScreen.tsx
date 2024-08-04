import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '@/theme/index';
import { Link,useRouter } from 'expo-router';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Olymics Data Analyser</Text>
                <View style={styles.imageContainer}>
                    {/* <Image source={require("@/images/welcome1.png")}
                        style={styles.image} /> */}
                </View>
                <View style={styles.buttonContainer}>
                <TouchableOpacity
                        onPress={() =>router.push('LoginScreen')}
                        style={styles.startedButton}>
                        <Text style={styles.startedButtonText}>Let's Get Started!</Text>
                    </TouchableOpacity>      
              
                </View>
            </View>
        </SafeAreaView>
    );
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

    
    // const navigation = useNavigation();

            // <View style={styles.content}>
            //     <Text style={styles.title}>Olymics Data Analyser</Text>
            //     <View style={styles.imageContainer}>
            //         <Image source={require("../assets/images/welcome1.png")}
            //             style={styles.image} />
            //     </View>
            //     <View style={styles.buttonContainer}>
            //     <TouchableOpacity
                        
            //             style={styles.startedButton}>
            //             <Text style={styles.startedButtonText}><Link to="/login">ShoptIt</Link></Text>
            //     </TouchableOpacity>
  
