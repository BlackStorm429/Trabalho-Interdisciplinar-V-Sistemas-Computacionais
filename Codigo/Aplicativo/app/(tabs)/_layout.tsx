import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Unlocked',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? 'unlocked' : 'unlocked'} 
              color={color} 
              family="Fontisto" 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="AboutScreen"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? 'info-with-circle' : 'info-with-circle'} 
              color={color} 
              family="Entypo"
            />
          ),
        }}
      />

    <Tabs.Screen
        name="SignInScreen"
        options={{
          title: 'Sign In',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? 'login' : 'login'} 
              color={color} 
              family="MaterialIcons"
            />
          ),
        }}
      />

    <Tabs.Screen
        name="SettingsScreen"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? 'settings' : 'settings'} 
              color={color} 
              family="Feather"
            />
          ),
        }}
      />

    <Tabs.Screen
        name="SignUpScreen"
        options={{
          title: 'Sign Up',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? 'account-circle' : 'account-circle'} 
              color={color} 
              family="MaterialIcons"
            />
          ),
        }}
      />

    <Tabs.Screen
        name="ForgotPasswordScreen"
        options={{
          title: 'Forgot Password',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? 'lock-reset' : 'lock-reset'} 
              color={color} 
              family="MaterialIcons"
            />
          ),
        }}
      />
    </Tabs>
  );
}
