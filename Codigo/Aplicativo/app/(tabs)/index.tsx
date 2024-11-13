import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert, Dimensions, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { ENV } from '@/config/environment';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

type NavigationProp = StackNavigationProp<RootStackParamList, 'index'>;

export default function index() {
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

  const handleLock = async () => {
    try {
      const response = await fetch(ENV.API_URL + (doorOpened ? '/lock' : '/unlock'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: 'lucas@gmail.com', doorPassword: doorPassword })
      });

      const result = await response.json();

      if (result.message) {
        Alert.alert(result.message);
        setDoorOpened(!doorOpened);
      }
      
      Alert.alert("Senha incorreta");
      console.log(result);

    } catch (error) {
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

        <TouchableOpacity style={styles.unlockButton} onPress={handleLock}>
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

