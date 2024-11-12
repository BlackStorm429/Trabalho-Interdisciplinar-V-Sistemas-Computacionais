import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Colors } from '@/constants/Colors';

type AboutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AboutScreen'>;

export default function AboutScreen() {
  const navigation = useNavigation<AboutScreenNavigationProp>();

  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: Colors[colorScheme ?? "light"].background,
    },
    iconContainer: {
      backgroundColor: Colors[colorScheme ?? "light"].buttonBackground, 
      padding: 10,
      borderRadius: 10,
      position: 'absolute',
      top: 40,
      left: 20,
    },
    backIcon: {
      width: 30,
      height: 30,
    },
    logo: {
      width: 100,
      height: 100,
      alignSelf: 'center',
      marginTop: 100,
      marginVertical: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      color: Colors[colorScheme ?? "light"].text,
      marginBottom: 10,
    },
    description: {
      textAlign: 'center',
      color: Colors[colorScheme ?? "light"].text,
      marginBottom: 30,
    },
    subTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors[colorScheme ?? "light"].text,
      marginBottom: 10,
    },
    developerContainer: {
      flexDirection: 'column',
    },
    developerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    devImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
    },
    devName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors[colorScheme ?? "light"].text,
    },
    devRole: {
      fontSize: 14,
      color: Colors[colorScheme ?? "light"].text,
    },
  });

  return (
    <View style={styles.container}>
      {/* Header - Botão Voltar com fundo */}
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
        <Image source={require('@/assets/images/back-icon.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Logo e Título do Projeto */}
      <Image source={require('@/assets/images/handle-icon.png')} style={styles.logo} />
      <Text style={styles.title}>SmartLock</Text>
      <Text style={styles.description}>
        É um projeto realizado por estudantes do curso de Ciência da Computação da Pontifícia Universidade Católica de Minas Gerais (PUC-MG), na disciplina de Trabalho Interdisciplinar V: Sistemas Computacionais.
      </Text>

      {/* Desenvolvedores */}
      <Text style={styles.subTitle}>Desenvolvedores</Text>

      <View style={styles.developerContainer}>
        {/* Developer 1 */}
        <View style={styles.developerItem}>
          <Image source={require('@/assets/images/carol.jpeg')} style={styles.devImage} />
          <View>
            <Text style={styles.devName}>Carolina Morais Nigri</Text>
            <Text style={styles.devRole}>Front-end & Back-end</Text>
          </View>
        </View>

        {/* Developer 2 */}
        <View style={styles.developerItem}>
          <Image source={require('@/assets/images/joao.jpg')} style={styles.devImage} />
          <View>
            <Text style={styles.devName}>João Paulo de Castro Markiewicz</Text>
            <Text style={styles.devRole}>Front-end & Back-end</Text>
          </View>
        </View>

        {/* Developer 3 */}
        <View style={styles.developerItem}>
          <Image source={require('@/assets/images/lara.jpg')} style={styles.devImage} />
          <View>
            <Text style={styles.devName}>Lara Brigida Rezende Souza</Text>
            <Text style={styles.devRole}>Front-end & Back-end</Text>
          </View>
        </View>

        {/* Developer 4 */}
        <View style={styles.developerItem}>
          <Image source={require('@/assets/images/pedro.png')} style={styles.devImage} />
          <View>
            <Text style={styles.devName}>Pedro Miranda Rodrigues</Text>
            <Text style={styles.devRole}>Front-end & Back-end</Text>
          </View>
        </View>

        {/* Developer 5 */}
        <View style={styles.developerItem}>
          <Image source={require('@/assets/images/victor.jpeg')} style={styles.devImage} />
          <View>
            <Text style={styles.devName}>Victor Cabral de Souza Oliveira</Text>
            <Text style={styles.devRole}>Front-end & Back-end</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
