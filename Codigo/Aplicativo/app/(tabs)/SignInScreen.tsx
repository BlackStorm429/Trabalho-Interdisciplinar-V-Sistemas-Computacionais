import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import { RootStackParamList } from '../types';
import axios from 'axios';
import { ENV } from '@/config/environment';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignInScreen'>;

export default function SignInScreen() {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { darkMode } = useTheme();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(ENV.API_URL + '/login', {
        email,
        password,
      });
      
      console.log('Usuário logado com sucesso:', response.data);
      
      // Armazena o email do usuário no AsyncStorage
      const userEmail = response.data.user.email; 
      await AsyncStorage.setItem('userEmail', userEmail);
      
      navigation.navigate('index');

    } catch (error) {
      console.error('Erro ao logar o usuário:', error);
      alert('Erro ao logar, verifique suas credenciais.');
    }
  };

  const colorScheme = darkMode ? "dark" : "light";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors[colorScheme ?? "light"].background,
      paddingHorizontal: 20,
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    appName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: Colors[colorScheme ?? "light"].text,
      marginBottom: 30,
    },
    input: {
      width: '80%',
      padding: 10,
      backgroundColor: Colors[colorScheme ?? "light"].inputBackground,
      borderRadius: 10,
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 15,
      color: Colors[colorScheme ?? "light"].text,
    },
    loginButton: {
      width: '80%',
      padding: 15,
      backgroundColor: Colors[colorScheme ?? "light"].buttonBackground,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 10,
    },
    loginText: {
      color: Colors[colorScheme ?? "light"].textButton,
      fontSize: 16,
      fontWeight: 'bold',
    },
    forgotPasswordText: {
      color: Colors[colorScheme ?? "light"].text,
      marginBottom: 30,
    },
    signupText: {
      color: Colors[colorScheme ?? "light"].text,
    },
  });

  const handleSignInToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Verificando credenciais...',
      text2: 'Por favor aguarde',
      position: 'top',
      autoHide: false,
      topOffset: 30,
      onShow: async () => {
        await handleSignIn();
        Toast.hide();
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/handle-icon.png')} style={styles.logo} />
      <Text style={styles.appName}>SmartLock</Text>
      <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor={Colors[colorScheme ?? "light"].text} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor={Colors[colorScheme ?? "light"].text} value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.loginButton} onPress={handleSignInToast}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.signupText}>Não tem conta? Cadastre-se!</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
}
