import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

type AboutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AboutScreen'>;

export default function AboutScreen() {
  const navigation = useNavigation<AboutScreenNavigationProp>();
  const { darkMode } = useTheme();

  const colorScheme = darkMode ? "dark" : "light";

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1, // Permite o scroll baseado no conteúdo
      padding: 20,
      backgroundColor: Colors[colorScheme ?? "light"].background,
    },
    logo: {
      width: 100,
      height: 100,
      alignSelf: 'center',
      marginTop: 50,
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
      marginBottom: 20,
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
    <ScrollView contentContainerStyle={styles.container}>
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
    </ScrollView>
  );
}
