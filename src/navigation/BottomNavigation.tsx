// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Placeholder from '../screens/placeholder';
import { ThemeProvider } from '../context/Theme';
import { Image } from 'react-native';
import { Icons } from '../assets/icons';
import { TabList } from './TabList';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator<TabList>();

export default function App() {
  return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={Icons.Home}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
          <Tab.Screen 
            name="Explore" 
            component={Placeholder}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={Icons.Explore}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
          <Tab.Screen 
            name="History" 
            component={Placeholder}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={Icons.History}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
          <Tab.Screen 
            name="Setting" 
            component={SettingScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={Icons.Setting}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          /> 
        </Tab.Navigator>
  );
}
