import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons'; // Certifique-se de que você tenha essa biblioteca instalada

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpScreen'>;

export default function SignUpScreen() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [doorPassword, setDoorPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDoorPassword, setShowDoorPassword] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword || !doorPassword) {
      setErrorMessage("Todos os campos são obrigatórios!");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas de login não coincidem!");
      return;
    }

    // Exemplo de validação de e-mail (pode ser melhorado)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      const response = await axios.post('http://10.254.128.157:3000/cadastrar', {
        name,
        email,
        password,
        doorPassword,
      });
      console.log('Usuário cadastrado com sucesso:', response.data);
      // Redefinindo os campos após o cadastro
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setDoorPassword('');
      navigation.navigate('SignInScreen');
    } catch (error) {
      console.error('Erro ao cadastrar o usuário:', error);
      setErrorMessage('Erro ao cadastrar o usuário, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/handle-icon.png')} style={styles.logo} />
      <Text style={styles.appName}>SmartLock</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#FF7690" />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <FontAwesome name={showConfirmPassword ? 'eye' : 'eye-slash'} size={20} color="#FF7690" />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha da Porta"
          value={doorPassword}
          onChangeText={setDoorPassword}
          keyboardType="numeric"
          secureTextEntry={!showDoorPassword}
        />
        <TouchableOpacity onPress={() => setShowDoorPassword(!showDoorPassword)}>
          <FontAwesome name={showDoorPassword ? 'eye' : 'eye-slash'} size={20} color="#FF7690" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
        <Text style={styles.signinText}>Já tem conta? Entrar</Text>
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
  errorText: {
    color: 'red',
    marginBottom: 15,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 15,
  },
  signUpButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#FF7690',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signinText: {
    color: '#FF7690',
    marginTop: 10,
  },
});
