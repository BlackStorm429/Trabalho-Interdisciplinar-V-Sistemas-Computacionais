import React from 'react';
import { View, Button, TextInput, Text, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const IP_ESP8266 = 'http://192.168.36.24'; // sempre mudar para o IP atual do ESP8266
const CORRECT_PASSWORD = '123456'; // senha definida (TODO: mudar p/pegar a do usuário)

const LockControlScreen: React.FC = () => {
  const [doorPassword, setDoorPassword] = React.useState('');

  const verifyPassword = (action: () => void) => {
    if (doorPassword === CORRECT_PASSWORD) {
      action();
    } else {
      Alert.alert("Erro", "Senha incorreta! Tente novamente.");
    }
  };

  const lockDoor = async () => {
    try {
      const response = await axios.get(`${IP_ESP8266}/trancar`);
      console.log(response.data);
      Alert.alert("Resposta", response.data);
    } catch (error) {
      console.log("Erro ao trancar a porta:", error);
      Alert.alert("Erro", "Erro ao se comunicar com o ESP8266");
    }
  };

  const unlockDoor = async () => {
    try {
      const response = await axios.get(`${IP_ESP8266}/destrancar`);
      console.log(response.data);
      Alert.alert("Resposta", response.data);
    } catch (error) {
      console.log("Erro ao destrancar a porta:", error);
      Alert.alert("Erro", "Erro ao se comunicar com o ESP8266");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Digite a senha:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Senha"
        value={doorPassword}
        onChangeText={setDoorPassword}
      />
      <Button title="Trancar Porta" onPress={() => verifyPassword(lockDoor)} />
      <View style={{ height: 20 }} />
      <Button title="Destrancar Porta" onPress={() => verifyPassword(unlockDoor)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default LockControlScreen;
