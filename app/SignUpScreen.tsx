
// SignUpScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { themeColors } from '@/theme/index';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerApi } from '@/apis/common_apis/common_apis';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLogin, setIsLogin] = useState(false);
   
    const router = useRouter();

    useEffect(() => {
        const checkUserStatus = async () => {
            const userStatus = await AsyncStorage.getItem('isUser');
            setIsLogin(userStatus === 'true');
        };
        checkUserStatus();
    }, [isLogin]);

    const handleSignUp = async () => {
        setEmailError('');
        setPasswordError('');

        let isValid = true;
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
        } else {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                setPasswordError('Password must be at least 8 characters long, include uppercase and lowercase letters, numbers, and special characters.');
                isValid = false;
            }
        }

        if (!isValid) return;

        try {
            const result = await registerApi(email, password);
            if (result.email) {
                Alert.alert("Congratulations!", "Successfully signed up.");

            }
            console.log(`User account created & signed in! ${result}`);
            await AsyncStorage.setItem('isUser', 'true');
            setIsLogin(true);
            router.push("(tabs)");
        } catch (error) {
            Alert.alert("EMAIL ALREADY IN USE");
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.imageContainer}>
                    <Image source={require('@/assets/images/images/signup1.png')} style={styles.image} />
                </View>
            </SafeAreaView>
            <View style={styles.formContainer}>
                <View style={styles.form}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder='Enter Email'
                        autoCapitalize="none"
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder='Enter Password'
                        secureTextEntry
                        autoCapitalize="none"
                    />
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                    <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.orText}>Or</Text>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.push('LoginScreen')}>
                        <Text style={styles.loginLink}>Log In</Text>
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
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 260,
        height: 260,
        borderRadius: 200,
        marginTop: -16,
    },
    formContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingTop: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingBottom: 80,
    },
    form: {
        // Styles for form
    },
    label: {
        marginLeft: 5,
        color: 'rgb(51 65 85)',
        marginBottom: 8,
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        color: 'gray',
    },
    signUpButton: {
        backgroundColor: '#fbbf24',
        padding: 15,
        borderRadius: 20,
        marginVertical: 12,
    },
    signUpButtonText: {
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
        paddingVertical: 10,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginText: {
        color: 'rgb(51 65 85)',
        fontWeight: 'bold',
        fontSize: 15,
    },
    loginLink: {
        color: '#fbbf24',
        fontWeight: 'bold',
        fontSize: 15,
    },
    errorText: {
        color: 'red',
        marginLeft: 5,
    },
});

export default SignUpScreen;
