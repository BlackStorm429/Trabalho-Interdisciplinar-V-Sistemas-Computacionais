import React from 'react';
import { View, Button, TextInput, Text, Alert, StyleSheet } from 'react-native';

const LockControlScreen: React.FC = () => {
  const [password, setPassword] = React.useState('');

  const lockDoor = async () => {
    try {
      const response = await fetch('http://192.168.1.10/lock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });
      const result = await response.json();
      Alert.alert(result.message);
    } catch (error) {
      Alert.alert('Erro ao trancar a porta');
    }
  };

  const unlockDoor = async () => {
    try {
      const response = await fetch('http://192.168.1.10/unlock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });
      const result = await response.json();
      Alert.alert(result.message);
    } catch (error) {
      Alert.alert('Erro ao destrancar a porta');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Digite a senha:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Trancar Porta" onPress={lockDoor} />
      <View style={{ height: 20 }} />
      <Button title="Destrancar Porta" onPress={unlockDoor} />
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
