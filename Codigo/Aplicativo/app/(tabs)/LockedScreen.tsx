import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Platform, Button, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { RootStackParamList } from '../types';

type LockedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LockedScreen'>;

export default function LockedScreen() {
  const navigation = useNavigation<LockedScreenNavigationProp>();
  const [password, setPassword] = useState('');
  const correctPassword = '1234';

  const handleUnlockPress = () => {
    if (password === correctPassword) {
      axios.get('http://<ESP8266_IP>/unlock')
        .then(response => {
          Alert.alert('Sucesso', 'A porta foi destrancada.');
        })
        .catch(error => {
          Alert.alert('Erro', 'Falha ao destrancar a porta.');
        });
    } else {
      Alert.alert('Senha Incorreta', 'Por favor, insira a senha correta.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* Header com ícones de menu e pessoa */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => console.log('Menu pressionado')}>
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

        {/* Status Button (Image) */}
        <Image
          source={require('@/assets/images/locked-status.png')}
          style={[styles.statusButton, { marginTop: 20 }]}
        />

        {/* Lock Icon */}
        <View style={styles.lockButton}>
          <TouchableOpacity onPress={handleUnlockPress}>
            <Image
              source={require('@/assets/images/unlocked-icon.png')}
              style={styles.unlockImage}
            />
          </TouchableOpacity>
        </View>

        {/* Password input field */}
        <TextInput
          style={styles.passwordInput}
          placeholder="Digite a sua senha:"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Bottom Navigation */}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  lockButton: {
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
