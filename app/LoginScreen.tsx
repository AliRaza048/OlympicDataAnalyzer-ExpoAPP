import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import auth from '@react-native-firebase/auth';
import { themeColors } from '@/theme/index';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginApi } from '@/apis/common_apis/common_apis';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const checkUserStatus = async () => {
            const userStatus = await AsyncStorage.getItem('isUser');
            setIsLogin(userStatus === 'true');
        };
        checkUserStatus();
    }, [isLogin]);

    const handleLogin = async () => {
        setEmailError('');
        setPasswordError('');

        let isValid = true;
        // Email validation
        if (!email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        } else {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailRegex.test(email)) {
                setEmailError('Invalid email format');
                isValid = false;
            } else if (email.endsWith('@gmail.com')) {
                const localPart = email.split('@')[0];
                if (localPart.includes('..') || localPart.endsWith('.')) {
                    setEmailError('Invalid Gmail address');
                    isValid = false;
                }
            }
        }
        if (!password.trim()) {
            setPasswordError('Password is required');
            isValid = false;
        }

        // Stop if validation fails
        if (!isValid) return;

        try {
            const result = await loginApi(email, password);
            // Alert.alert('Error', result);
             if(result.key){
                console.log(`User signed in!${result}`);
                Alert.alert('Success', 'Successfully signed in!');
    
                // Save the login status in AsyncStorage
                await AsyncStorage.setItem('isUser', 'true');
                setIsLogin(true);
    
                router.push("(tabs)");
             }
             else{
                Alert.alert('Issue', 'Credentials Invalid.');

             }

            

           
        } catch (error) {

            Alert.alert('Error', `ERROR: ${error}`);
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.imageContainer}>
                    <Image source={require('@/assets/images/images/login1.png')} style={styles.image} />
                </View>
            </SafeAreaView>
            <View style={styles.formContainer}>
                <View style={styles.form}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        autoCapitalize="none"
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter your password"
                        secureTextEntry
                        autoCapitalize="none"
                    />
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.orText}>Or</Text>
                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={() => router.push('SignUpScreen')}>
                        <Text style={styles.signUpLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.bg,
    },
    safeArea: {
        flex: 1,
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'start',
    },
    backButton: {
        backgroundColor: '#fbbf24',
        padding: 10,
        borderRadius: 20,
        marginLeft: 5,
        marginTop: 5,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 200,
        marginTop: -17,
    },
    formContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingTop: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingBottom: 100,
    },
    form: {
        // styling for form
    },
    label: {
        marginLeft: 5,
        color: 'rgb(51 65 85)',
        marginBottom: 8,
        fontWeight: 'bold',
        marginTop: 8,
    },
    input: {
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        marginBottom: 5,
        color: 'gray',
    },
    forgotPassword: {
        alignItems: 'flex-end',
    },
    forgotPasswordText: {
        color: 'rgb(51 65 85)',
        marginBottom: 15,
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: '#fbbf24',
        padding: 15,
        borderRadius: 20,
        marginBottom: 10,
    },
    loginButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(51 65 85)',
        textAlign: 'center',
    },
    orText: {
        textAlign: 'center',
        color: 'rgb(51 65 85)',
        fontSize: 15,
        fontWeight: 'bold',
        paddingVertical: 12,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
    },
    signUpText: {
        color: 'rgb(51 65 85)',
        fontWeight: 'bold',
        fontSize: 15,
    },
    signUpLink: {
        color: '#fbbf24',
        fontWeight: 'bold',
        fontSize: 15,
    },
    errorText: {
        color: 'red',
        marginLeft: 5,
    },
});

export default LoginScreen;
