import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Colors } from '@/constants/Colors';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPasswordScreen'>;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const [email, setEmail] = useState('');

  const colorScheme = useColorScheme();

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
    forgotPasswordButton: {
      width: '80%',
      padding: 15,
      backgroundColor: Colors[colorScheme ?? "light"].buttonBackground,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 10,
    },
    forgotPasswordText: {
      color: Colors[colorScheme ?? "light"].text,
      fontSize: 16,
      fontWeight: 'bold',
    },
    signinText: {
      color: Colors[colorScheme ?? "light"].text,
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      {/* Ícone e Nome do App */}
      <Image
        source={require('@/assets/images/handle-icon.png')}
        style={styles.logo}
      />
      <Text style={styles.appName}>SmartLock</Text>

      {/* Campo de E-mail */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu E-mail"
        placeholderTextColor={Colors[colorScheme ?? "light"].text}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Botão 'Recuperar Senha' */}
      <TouchableOpacity 
        style={styles.forgotPasswordButton} 
        onPress={() => console.log('Solicitação de recuperação de senha enviada')}>
        <Text style={styles.forgotPasswordText}>Recuperar Senha</Text>
      </TouchableOpacity>

      {/* Voltar para Login */}
      <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
        <Text style={styles.signinText}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
}
