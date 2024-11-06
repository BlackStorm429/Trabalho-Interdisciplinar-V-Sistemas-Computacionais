import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UnlockedScreen from './app/(tabs)/index';
import LockedScreen from './app/(tabs)/LockedScreen';
import SignInScreen from './app/(tabs)/SignInScreen';
import SignUpScreen from './app/(tabs)/SignUpScreen';
import ForgotPasswordScreen from './app/(tabs)/ForgotPasswordScreen';
import SettingsScreen from './app/(tabs)/SettingsScreen';
import AboutScreen from './app/(tabs)/AboutScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="index"> 
        <Stack.Screen name="index" component={UnlockedScreen} /> 
        <Stack.Screen name="LockedScreen" component={LockedScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
