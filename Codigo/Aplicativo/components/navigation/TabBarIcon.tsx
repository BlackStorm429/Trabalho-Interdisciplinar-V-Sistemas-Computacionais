import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Substitua por outra biblioteca de ícones se necessário

interface TabBarIconProps {
  name: string;
  color: string;
  family?: string; // Mantido caso use outras bibliotecas de ícones
  containerBackground: string;
}

export function TabBarIcon({ name, color, containerBackground }: TabBarIconProps) {
  return (
    <View style={[styles.iconContainer, { backgroundColor: containerBackground }]}>
      <Feather name={name} size={40} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 60, // Largura do contêiner
    height: 60, // Altura do contêiner
    borderRadius: 20, // Borda arredondada para formato circular
    justifyContent: 'center',
    alignItems: 'center',
  },
});
