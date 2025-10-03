// src/components/PromoBanner.js
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

export default function PromoBanner() {
  return (
    <ImageBackground
      source={{ uri: 'https://picsum.photos/200/300' }}
      style={styles.bg}
      imageStyle={{ borderRadius: 12 }}
    >
      <View>
        <Text style={styles.title}>Nikmati Promo Menarik</Text>
        <Text style={styles.subtitle}>Ikut challenge, raih hadiah!</Text>
        <TouchableOpacity style={styles.cta}><Text style={{color:'#fff'}}>Coba Sekarang</Text></TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { height: 160, marginVertical: 10, padding: 24, justifyContent: 'flex-end' },
  title: { color: '#fff', fontSize: 18, fontWeight: '700' },
  subtitle: { color:'#fff', marginTop: 4 },
  cta: { marginTop: 8, alignSelf:'flex-start', backgroundColor:'#fd0000ff', paddingVertical:8, paddingHorizontal:12, borderRadius:8 }
});
