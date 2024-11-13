import { StyleSheet, InputModeOptions, TextInput, TouchableOpacity, View, useColorScheme } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";

interface PasswordInputCustomProps {
  placeholder: string;
  onChangeText?: (text: string) => void;
  inputMode?: InputModeOptions;
  value?: string;
}

export function PasswordInputCustom({ placeholder, onChangeText, inputMode, value }: PasswordInputCustomProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { darkMode } = useTheme();

  const colorScheme = darkMode ? "dark" : "light";

  const styles = StyleSheet.create({
    textInputContainer: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: Colors[colorScheme ?? "light"].inputBackground,
      borderRadius: 10,
      marginBottom: 20,
    },
    passwordInput: {
      flex: 1,
      padding: 10,
      textAlign: 'center',
      fontSize: 16,
      color: Colors[colorScheme ?? "light"].text,
    },
    eyeIcon: {
      position: 'absolute',
      right: 0,
      padding: 10,
    }
  });
  
  return (
    <View style={styles.textInputContainer}>
        <TextInput
        style={styles.passwordInput}
        secureTextEntry={!showPassword}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors[colorScheme ?? "light"].text}
        inputMode={inputMode}
        />
        <TouchableOpacity
        style={styles.eyeIcon}
        onPress={() => setShowPassword(!showPassword)}
        >
        <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#FF7690" />
        </TouchableOpacity>
    </View>
  );
}
