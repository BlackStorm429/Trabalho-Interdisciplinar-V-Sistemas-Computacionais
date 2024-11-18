import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Image, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SettingsScreen'>;

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  const colorScheme = darkMode ? "dark" : "light";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? "light"].background,
      paddingHorizontal: 20,
      justifyContent: 'space-between',
    },
    keyboardContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '80%',
    },
    iconContainer: {
      backgroundColor: Colors[colorScheme ?? "light"].buttonBackground,
      padding: 10,
      borderRadius: 10,
      position: 'absolute',
      top: 50,
      left: 20,
      marginTop: 30,
    },
    backIcon: {
      width: 30,
      height: 30,
    },
    content: {
      flex: 1,
      justifyContent: 'center', 
      width: '100%',
      paddingTop: 150,
      paddingBottom: 50, 
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors[colorScheme ?? "light"].text,
      alignSelf: 'flex-start',
      marginBottom: 10,
    },
    input: {
      width: '100%',
      padding: 10,
      backgroundColor: Colors[colorScheme ?? "light"].inputBackground,
      borderRadius: 10,
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
      color: Colors[colorScheme ?? "light"].text,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    switchLabel: {
      fontSize: 16,
      color: Colors[colorScheme ?? "light"].text,
    },
    logoutButton: {
      width: '80%',
      padding: 15,
      backgroundColor: Colors[colorScheme ?? "light"].buttonBackground,
      borderRadius: 10,
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: 40, 
    },
    logoutText: {
      color: Colors[colorScheme ?? "light"].textButton,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      {/* Header - Botão Voltar */}
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
        <Image source={require('@/assets/images/back-icon.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
      <View style={styles.content}>
        {/* Campo de E-mail */}
        <Text style={styles.sectionTitle}>Alterar E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor={Colors[colorScheme ?? "light"].text}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Campo de Senha */}
        <Text style={styles.sectionTitle}>Alterar Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={Colors[colorScheme ?? "light"].text}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Preferências de Notificação */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Notificações</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={(value) => setNotificationsEnabled(value)}
          />
        </View>

        {/* Modo Escuro */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Modo Escuro</Text>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
          />
        </View>
      </View>
      </KeyboardAvoidingView>
      {/* Botão de Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('SignInScreen')}>
        <Text style={ styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}