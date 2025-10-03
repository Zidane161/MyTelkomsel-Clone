import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import BottomTabNavigator from './BottomNavigation';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import LoginScreen from '../screens/LoginScreen';
import WebViewScreen from '../components/WebViewScreen';

export type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
  Profile: undefined;
  Setting: undefined;
  Login: undefined;
  WebView: { url: string; title?: string};
  Home: undefined
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  return (
    <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="WebView" component={WebViewScreen} options={{ headerShown: true, title: 'Back' }}/>
    </Stack.Navigator>
  );
}
