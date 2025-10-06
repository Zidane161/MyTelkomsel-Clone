// src/components/MenuGrid.js
import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Icons } from '../assets/icons';
import useTheme from '../Hooks/useTheme';

const items = [
  { id:'1', title:'Beli Paket', icon: Icons.Kuota },
  { id:'2', title:'Beli Roaming', icon: Icons.Roaming },
  { id:'3', title:'Kirim Hadiah', icon: Icons.Hadiah },
  { id:'4', title:'Tagihan', icon: Icons.Tagihan },
  { id:'5', title:'Indihome', icon: Icons.Router }, 
  { id:'6', title:'Semua Menu', icon: Icons.Menu },
];  

export default function MenuGrid() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ScrollView 
      horizontal  
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.scrollWrap}
    >
      {items.map(i => (
        <TouchableOpacity key={i.id} style={styles.item}>
          {/* kotak selalu putih */}
          <View style={styles.iconPlaceholder}>
            <Image source={i.icon} style={styles.icon} />
          </View>
          {/* teks ikut dark/light */}
          <Text style={[styles.text, { color: theme.text }]}>{i.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollWrap: { paddingHorizontal: 12 },
  item: { width: 80, alignItems: 'center', marginRight: 16 },
  iconPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#fff', // <-- selalu putih
    marginBottom: 8,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: { width: 48, height: 48, resizeMode: 'contain' },
  text: { fontSize: 12, textAlign: 'center' }
});
