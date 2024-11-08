import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPasswordScreen'>;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const [email, setEmail] = useState('');

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE4E9',
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
    color: '#FF7690',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    padding: 10,
    backgroundColor: '#FFD6E2',
    borderRadius: 10,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: '#FF7690',
  },
  forgotPasswordButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#FF7690',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signinText: {
    color: '#FF7690',
    marginTop: 10,
  },
});
