import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import index from './app/(tabs)/index';
import SignInScreen from './app/(tabs)/SignInScreen';
import SignUpScreen from './app/(tabs)/SignUpScreen';
import ForgotPasswordScreen from './app/(tabs)/ForgotPasswordScreen';
import SettingsScreen from './app/(tabs)/SettingsScreen';
import AboutScreen from './app/(tabs)/AboutScreen';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="index"> 
        <Stack.Screen name="index" component={index} /> 
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
