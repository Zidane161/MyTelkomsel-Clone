// src/components/Header.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import useTheme from '../Hooks/useTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HeaderProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Main'>;
  username?: string;   
};

export default function Header({ navigation, username }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.header }]}>
      <View style={[styles.searchBox, { backgroundColor: theme.card }]}>
        <TextInput
          placeholder="Spesial Hari Pelanggan"
          placeholderTextColor={theme.text}
          style={[styles.input, { color: theme.text }]}
        />
      </View>

      <TouchableOpacity
        style={[styles.avatar, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          {username?.slice(0,2) ?? 'ZI'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.toggleBtn} onPress={toggleTheme}>
        <Text style={{ color: theme.text }}>
          {theme.mode === 'light' ? '🌙' : '☀️'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    elevation: 4,
    zIndex: 10,
  },
  searchBox: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 50,
    justifyContent: 'center',
  },
  input: { fontSize: 14 },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fd0000ff',
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleBtn: {
    marginLeft: 12,
    padding: 8,
  },
});