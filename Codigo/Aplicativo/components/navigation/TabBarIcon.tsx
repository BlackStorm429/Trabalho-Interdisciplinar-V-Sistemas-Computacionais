import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import { type ComponentProps } from 'react';

type IconName = ComponentProps<typeof Entypo>['name'] | ComponentProps<typeof Fontisto>['name'] | ComponentProps<typeof MaterialIcons>['name'] | ComponentProps<typeof Feather>['name'];

interface TabBarIconProps {
  name: IconName;
  color: string;
  style?: object;
  family?: 'Entypo' | 'Fontisto' | 'MaterialIcons' | 'Feather'; 
}

export function TabBarIcon({ name, color, style, family = 'Entypo' }: TabBarIconProps) {
  if (family === 'Fontisto') {
    return <Fontisto name={name as ComponentProps<typeof Fontisto>['name']} size={24} color={color} style={[{ marginBottom: -3 }, style]} />;
  }

  if (family === 'MaterialIcons') {
    return <MaterialIcons name={name as ComponentProps<typeof MaterialIcons>['name']} size={24} color={color} style={[{ marginBottom: -3 }, style]} />;
  }

  if (family === 'Feather') {
    return <Feather name={name as ComponentProps<typeof Feather>['name']} size={24} color={color} style={[{ marginBottom: -3 }, style]} />;
  }

  return <Entypo name={name as ComponentProps<typeof Entypo>['name']} size={24} color={color} style={[{ marginBottom: -3 }, style]} />;
}
