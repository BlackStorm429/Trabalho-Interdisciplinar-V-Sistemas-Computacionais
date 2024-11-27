import React, { useEffect, useState } from 'react';
import { View, Button, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert, Dimensions, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '@/config/environment';

type NavigationProp = StackNavigationProp<RootStackParamList, 'index'>;

export default function index() {
  const IP_ESP8266 = 'http://192.168.36.24'; // definido de forma fixa no código do ESP
  const AUTH_TOKEN = "TIV_2024/2"; // Token de autenticação

  const navigation = useNavigation<NavigationProp>();
  const [doorPassword, setDoorPassword] = useState('');
  const [doorOpened, setDoorOpened] = useState(false);
  const { darkMode } = useTheme();

  const doorAction = doorOpened ? 'trancar' : 'destrancar';

  const colorScheme = darkMode ? "dark" : "light";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: Colors[colorScheme ?? "light"].background,
      color: Colors[colorScheme ?? "light"].text,
      paddingHorizontal: 20,
    },
    keyboardContainer: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      height: '80%',
    },
    header: {
      width: '100%',
      height: '10%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 20,
      marginTop: 60,
    },
    headerImage: {
      width: 30,
      height: 30,
    },
    statusButton: {
      width: 60,
      height: 60,
      marginTop: 40,
    },
    unlockButton: {
      width: 150,
      height: 150,
      backgroundColor: Colors[colorScheme ?? "light"].buttonBackground,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 75,
      marginTop: 50,
    },
    unlockImage: {
      width: 70,
      height: 70,
    },
    passwordInput: {
      width: '80%',
      padding: 10,
      backgroundColor: Colors[colorScheme ?? "light"].inputBackground,
      borderRadius: 10,
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 40,
      marginTop: 40,
    },
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      height: '10%',
      position: 'absolute',
      bottom: 30,
      paddingHorizontal: 50,
    },
    iconContainer: {
      backgroundColor: Colors[colorScheme ?? "light"].buttonBackground,
      padding: 10,
      borderRadius: 10,
    },
    iconImage: {
      width: 40,
      height: 40,
    },
  });

  const checkDoorPassword = async () => {
    try {
      // Recupera o email do usuário armazenado no AsyncStorage
      const email = await AsyncStorage.getItem('userEmail');
      
      if (!email) {
        console.log('Email do usuário não encontrado.');
        return;
      }

      console.log(doorPassword);
      console.log(email);

      // Envia a senha para o backend para comparação
      const response = await axios.post(ENV.API_URL + '/verifydoorpass', {
        email,
        doorPassword,
      });

      console.log('Senha da porta verificada com sucesso:', response.data);
      
      handleLock();

    } catch (error) {
      console.error('Erro ao verificar a senha da porta:', error);
    }
  };

  const handleLock = async () => {
    try {
      const route = doorOpened ? '/trancar' : '/destrancar';
      const response = await axios.get(`${IP_ESP8266}${route}`, {
        params: { token: AUTH_TOKEN },
      });
      console.log(response.data);
      Alert.alert(response.data);
      setDoorOpened(!doorOpened);
    } catch (error) {
      console.log(error);
      Alert.alert(`Erro ao ${doorAction} a porta`);
    }
  };

  return (
    <View
    style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
          <View style={styles.iconContainer}>
            <Image
              source={require('@/assets/images/user-icon.png')}
              style={styles.headerImage}
            />
          </View>
        </TouchableOpacity>
      </View>
    
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <Image
          source={doorOpened ? require('@/assets/images/unlocked-status.png') : require('@/assets/images/locked-status.png')}
          style={[styles.statusButton, { marginTop: 20 }]}
        />

        <TouchableOpacity style={styles.unlockButton} onPress={() => checkDoorPassword()}>
          <Image
            source={doorOpened ? require('@/assets/images/unlocked-icon.png') : require('@/assets/images/locked-icon.png')}
            style={styles.unlockImage}
          />
        </TouchableOpacity>

        <TextInput
          style={styles.passwordInput}
          placeholder="Digite a senha da porta"
          placeholderTextColor={Colors[colorScheme ?? "light"].text}
          secureTextEntry
          value={doorPassword}
          onChangeText={setDoorPassword}
        />
      </KeyboardAvoidingView>
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
          <View style={styles.iconContainer}>
            <Image
              source={require('@/assets/images/settings-icon.png')}
              style={styles.iconImage}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('index')}>
          <View style={styles.iconContainer}>
            <Image
              source={require('@/assets/images/home-icon.png')}
              style={styles.iconImage}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AboutScreen')}>
          <View style={styles.iconContainer}>
            <Image
              source={require('@/assets/images/about-icon.png')}
              style={styles.iconImage}
            />
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
}

