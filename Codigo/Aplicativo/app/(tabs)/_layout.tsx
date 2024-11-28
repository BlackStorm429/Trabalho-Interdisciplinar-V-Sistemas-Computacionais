import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { darkMode } = useTheme();
  const colorScheme = darkMode ? "dark" : "light";

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background, // Rosa claro
          borderTopWidth: 0, // Remove borda superior
          height: 80, // Ajusta altura da barra
        },
        tabBarActiveTintColor: '#fff', // Rosa escuro para ícones ativos
        tabBarInactiveTintColor: '#fff', // Rosa escuro para ícones inativos
        tabBarShowLabel: false, // Remove textos das labels
        headerShown: false, // Remove o cabeçalho
      }}
    >
      <Tabs.Screen
        name="SettingsScreen"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="settings"
              color={color}
              family="Feather" // Ícone da biblioteca Feather
              containerBackground = {Colors[colorScheme].buttonBackground}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="home"
              color={color}
              family="Feather" // Ícone da biblioteca Feather
              containerBackground = {Colors[colorScheme].buttonBackground}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="AboutScreen"
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="info"
              color={color}
              family="Feather" // Ícone da biblioteca Feather
              containerBackground = {Colors[colorScheme].buttonBackground}
            />
          ),
        }}
      />

      {/* As telas abaixo não exibem ícones na barra de navegação */}
      <Tabs.Screen
        name="ForgotPasswordScreen"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="SignInScreen"
        options={{
          href: null,
        }}
      />
      
      <Tabs.Screen
        name="SignUpScreen"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
