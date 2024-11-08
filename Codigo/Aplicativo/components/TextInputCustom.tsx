import { StyleSheet, InputModeOptions, TextInput, View } from "react-native";

interface TextInputCustomProps {
  placeholder: string;
  onChangeText?: (text: string) => void;
  inputMode?: InputModeOptions;
  value?: string;
}

export function TextInputCustom({ placeholder, onChangeText, inputMode, value }: TextInputCustomProps) {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.passwordInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="gray"
        inputMode={inputMode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFD6E2',
    borderRadius: 10,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#FF7690',
  }
});
