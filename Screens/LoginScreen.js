import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, View, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';

const logo = require('../Logo.png'); // Cache the image

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = useCallback(() => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
            })
            .catch(error => alert(error.message));
    }, [email, password]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Home");
            }
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <KeyboardAvoidingView 
          style={styles.flexContainer} 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Image source={logo} style={styles.image} />
                    <TextInput 
                      style={styles.input} 
                      placeholder="Email" 
                      value={email} 
                      onChangeText={setEmail} 
                      keyboardType="email-address"
                      autoCorrect={false} 
                    />
                    <TextInput 
                      style={styles.input} 
                      placeholder="Password" 
                      value={password} 
                      onChangeText={setPassword} 
                      secureTextEntry
                      autoCorrect={false}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <StatusBar style="auto" />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
        borderRadius: 5,
    },
    button: {
        marginTop: 20,
        backgroundColor: 'blue',
        borderRadius: 5,
        padding: 10,
        width: '60%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});

