import { config } from '@/config/environment';
import React from 'react';
import { View, Button, TextInput, Text, Alert, StyleSheet } from 'react-native';

const LockControlScreen: React.FC = () => {
  const [doorPassword, setDoorPassword] = React.useState('');

  const lockDoor = async () => {
    try {
      const response = await fetch(config.apiUrl + '/lock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: 'lucas@gmail.com', doorPassword: doorPassword })
      });
      const result = await response.json();
      Alert.alert(result.message);
      console.log(result.message);
      
    } catch (error) {
      Alert.alert('Erro ao trancar a porta');
    }
  };

  const unlockDoor = async () => {
    try {
      const response = await fetch(config.apiUrl + '/unlock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: 'lucas@gmail.com', doorPassword: doorPassword })
      });
      const result = await response.json();
      Alert.alert(result.message);
      console.log(result.message);

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
        value={doorPassword}
        onChangeText={setDoorPassword}
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
