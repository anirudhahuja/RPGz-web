import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import axios from 'axios';
import { API_BASE_URL } from '../config';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = async () => {
        try {
        await axios.post(`${API_BASE_URL}/api/login`, {
            username,
            password,
        });

        const userResponse = await axios.get(
            `${API_BASE_URL}/api/user-info?username=${username}`
        );
        // Here you might want to store the user data in a global state management solution
        navigation.replace('Town');
        } catch (error) {
        console.error('Error during login:', error);
        // Show error message based on status code
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
            alert('Invalid username or password');
            } else if (error.response.status === 404) {
            alert('User not found');
            } else {
            alert('Login failed. Please try again.');
            }
        } else {
            alert('Login failed. Please try again.');
        }
        }
    };

    const handleRegister = async () => {
        try {
        if (!username || !email || !password) {
            alert('All fields are required');
            return;
        }

        if (!email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }

        await axios.post(`${API_BASE_URL}/api/register`, {
            username,
            email,
            password,
        });

        const responseAfterRegistration = await axios.get(
            `${API_BASE_URL}/api/user-info?username=${username}`
        );
        // Here you might want to store the user data in a global state management solution
        navigation.replace('Town');
        } catch (error: any) {
        console.error('Error during registration:', error.response?.data || error.message);
        if (error.response?.data?.error?.includes('already exists')) {
            alert('Username or email already exists');
        } else {
            alert('Registration failed. Please try again.');
        }
        }
    };

    return (
            <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                    {isLogin ? 'Welcome Back!' : 'Start your Journey!'}
                    </Text>

                    <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, isLogin && styles.activeTab]}
                        onPress={() => setIsLogin(true)}
                    >
                        <Text style={[styles.tabText, isLogin && styles.activeTabText]}>
                        LOG IN
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, !isLogin && styles.activeTab]}
                        onPress={() => setIsLogin(false)}
                    >
                        <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>
                        REGISTER
                        </Text>
                    </TouchableOpacity>
                    </View>

                    <View style={styles.form}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Enter username"
                        placeholderTextColor="#666"
                    />

                    {!isLogin && (
                        <>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter email"
                            placeholderTextColor="#666"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        </>
                    )}

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter password"
                        placeholderTextColor="#666"
                        secureTextEntry
                    />

                    {isLogin && (
                        <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={isLogin ? handleLogin : handleRegister}
                    >
                        <Text style={styles.buttonText}>
                        {isLogin ? 'Log In' : 'Register'}
                        </Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
            </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#333',
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#4a4a4a',
    },
    tabText: {
        color: '#999',
        fontWeight: 'bold',
    },
    activeTabText: {
        color: '#fff',
    },
    form: {
        width: '100%',
        maxWidth: 400,
    },
    label: {
        color: '#fff',
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 12,
        color: '#fff',
        marginBottom: 15,
        fontSize: 16,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#666',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen; 