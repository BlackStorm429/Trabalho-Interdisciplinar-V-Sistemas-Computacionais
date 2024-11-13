import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { StyleSheet, InputModeOptions, TextInput, View, useColorScheme } from "react-native";

interface TextInputCustomProps {
  placeholder: string;
  onChangeText?: (text: string) => void;
  inputMode?: InputModeOptions;
  value?: string;
}

export function TextInputCustom({ placeholder, onChangeText, inputMode, value }: TextInputCustomProps) {
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
    }
  });

  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.passwordInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors[colorScheme ?? "light"].text}
        inputMode={inputMode}
      />
    </View>
  );
}
