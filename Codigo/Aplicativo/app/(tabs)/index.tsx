import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import axios from 'axios';

type NavigationProp = StackNavigationProp<RootStackParamList, 'index'>;

export default function index() {
  const navigation = useNavigation<NavigationProp>();
  const [password, setPassword] = useState('');
  const correctPassword = '1234'; 

  // Função handleLock modificada
  const handleLock = async () => {
    try {
      const response = await axios.post('http://localhost:3000/lock', {
        username: 'nome_do_usuario', // ajuste com o username real
        password: password
      });

      Alert.alert('Sucesso', response.data.message);
      navigation.navigate('Locked');

    } catch (error) {
      console.error('Erro na tentativa de trancar a porta:', error.response?.data || error);
      Alert.alert('Erro', error.response?.data?.message || 'Não foi possível trancar a porta.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={styles.iconContainer}>
            <Image
              source={require('@/assets/images/menu-icon.png')}
              style={styles.headerImage}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
          <View style={styles.iconContainer}>
            <Image
              source={require('@/assets/images/user-icon.png')}
              style={styles.headerImage}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Image
        source={require('@/assets/images/unlocked-status.png')}
        style={[styles.statusButton, { marginTop: 20 }]}
      />

      <TouchableOpacity style={styles.unlockButton} onPress={handleLock}>
        <Image
          source={require('@/assets/images/locked-icon.png')}
          style={styles.unlockImage}
        />
      </TouchableOpacity>

      <TextInput
        style={styles.passwordInput}
        placeholder="Digite a sua senha:"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFE4E9',
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
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
    backgroundColor: '#FF7690',
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
    backgroundColor: '#FFD6E2',
    borderRadius: 10,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 40,
    color: '#FF7690',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 50,
  },
  iconContainer: {
    backgroundColor: '#FF7690',
    padding: 10,
    borderRadius: 10,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
});
