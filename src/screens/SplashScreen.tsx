import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = { navigation: StackNavigationProp<RootStackParamList, 'Splash'> };

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('profile');
        if(token) {
          navigation.reset({ index: 0, routes: [{ name: 'Main'}] });
        } else {
          navigation.reset({ index: 0, routes: [{ name: 'Login'}] });
        }
      } catch {
        navigation.reset({ index: 0, routes: [{ name: 'Login'}] });
      }
    };

    const timer = setTimeout(checkToken, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);
  
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/mytelkomsel-logo.png')}
        style={styles.icon}
        resizeMode='contain'
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  icon: { width: 300, height: 150 },
});