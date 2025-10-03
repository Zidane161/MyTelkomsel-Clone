// src/components/PackageCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PackageCard({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.note}>{item.note}</Text>
      <TouchableOpacity style={styles.cta}><Text style={{color:'#fd0000ff'}}>Beli</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160, height: 160, marginRight: 12, borderRadius: 12, padding: 12, backgroundColor:'#fff', elevation:4
  },
  title: { fontWeight:'700', marginBottom:6 },
  price: { color:'#fd0000ff', fontWeight:'700', marginBottom:6 },
  note: { color:'#666', fontSize:12 },
  cta: { marginTop: 12, alignSelf:'flex-start', backgroundColor:'#fff', borderWidth: 2, borderColor: '#fd0000ff', paddingVertical:8, paddingHorizontal:20, borderRadius:8 }
});
