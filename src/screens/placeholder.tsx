import React from 'react';
import { View, Text } from 'react-native';
import HomeButton from '../components/HomeButton';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabList } from '../navigation/TabList';

type Props = BottomTabScreenProps<TabList>;

export default function Placeholder({ route, navigation }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{route.name} Screen (Coming Soon)</Text>
      <HomeButton onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
