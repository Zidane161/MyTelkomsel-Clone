// src/components/RecommendationList.js
import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PackageCard from './PaketKuota';
import useTheme from '../Hooks/useTheme';

const data = [
  { id: 'p1', title:'Hot Promo 125 GB', price:'Rp125.000', note:'30 hari' },
  { id: 'p2', title:'Internet OMG 55 GB', price:'Rp55.000', note:'7 hari' },
  { id: 'p3', title:'Paket Hemat 10 GB', price:'Rp25.000', note:'30 hari' },
];

export default function RecommendationList(){
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={{marginTop:12}}>
      <Text style={[styles.title, { color: theme.text }]}>Rekomendasi Untukmu</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={i => i.id}
        renderItem={({item}) => <PackageCard item={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingVertical:8}}
      />
    </View>
  );
}

const styles = StyleSheet.create({ title: { fontWeight:'700', marginBottom:8 } });
