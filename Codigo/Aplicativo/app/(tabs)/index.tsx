import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Button, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert, Dimensions, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import { useNotification } from '@/contexts/NotificationContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '@/config/environment';
import Toast from 'react-native-toast-message';

type NavigationProp = StackNavigationProp<RootStackParamList, 'index'>;

export default function index() {
  const IP_ESP8266 = 'http://192.168.36.24'; // definido de forma fixa no código do ESP
  const AUTH_TOKEN = "TIV_2024/2"; // Token de autenticação

  const navigation = useNavigation<NavigationProp>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Referência para o intervalo
  const [doorPassword, setDoorPassword] = useState('');
  const [doorOpened, setDoorOpened] = useState(false);
  const [timer, setTimer] = useState(0); // Tempo em segundos
  const { darkMode } = useTheme();
  const { notification } = useNotification();


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
    iconContainer: {
      backgroundColor: Colors[colorScheme ?? "light"].buttonBackground,
      padding: 10,
      borderRadius: 10,
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
      setDoorPassword('');
      
      handleLock();

    } catch (error) {
    //  console.error('Erro ao verificar a senha da porta:', error);
    }
  };

  const handleLock = async () => {
    try {
      const route = doorOpened ? '/trancar' : '/destrancar';
      const response = await axios.get(`${IP_ESP8266}${route}`, {
        params: { token: AUTH_TOKEN },
      });
      console.log(response.data);
      setDoorOpened(!doorOpened);
    } catch (error) {
      console.log(error);
      Alert.alert(`Erro ao ${doorAction} a porta`);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Limpa os campos sempre que a tela for focada
      setDoorPassword('');
    }, [])
  );


  useEffect(() => {
    // Quando a porta está aberta, inicia o temporizador
    if (doorOpened) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000); // Atualiza a cada segundo
    } else {
      // Quando a porta fecha, para e reseta o temporizador
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTimer(0);
    }

    // Limpeza do intervalo quando o componente desmonta
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [doorOpened]);

  
  useEffect(() => {
    // Envia o aviso após 10 minutos
    if (timer >= 60) {
      const minutes = Math.floor(timer / 60);
      if (notification) {
        Toast.show({
          type: 'info', 
          text1: `A porta está aberta faz ${minutes} ${minutes > 1 ? 'minutos' : 'minuto'}.`, 
          text2: 'Recomendo fechá-la.',
          visibilityTime: 5000,
          autoHide: true,
          topOffset: 30,
        });
      }
    }
  }, [Math.floor(timer / 60)]);

  const handleToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Validando senha...',
      text2: 'Por favor aguarde',
      position: 'top',
      visibilityTime: 1000,
      autoHide: true,
      topOffset: 30,
      onShow: () => {
        setDoorOpened(!doorOpened);
        // checkDoorPassword();
      },
      onHide: () => {
        console.log('Toast hidden');
      }
    });
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

          <TouchableOpacity style={styles.unlockButton} onPress={() => {
            notification 
            ? handleToast()
            : checkDoorPassword();
          }}>
            <Image
              source={doorOpened ? require('@/assets/images/locked-icon.png') : require('@/assets/images/unlocked-icon.png')}
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
            keyboardType="number-pad"
          />
        </KeyboardAvoidingView>
        <Toast />
      </View>
  );
}
