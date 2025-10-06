import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import usePulsa from '../Hooks/usePulsa';

export default function InfoCard({ number }: { number: string }) {
  const { pulsa, kuota, masaAktif, isiPulsa, tambahKuota } = usePulsa();

  return (
    <View style={styles.card}>
      <Text style={styles.number}>{number}</Text>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Pulsa</Text>
          {pulsa === 0 ? (
            <Text style={styles.warning}>Segera isi pulsa anda!</Text>
          ) : (
            <Text style={styles.value}>Rp{pulsa}</Text>
          )}
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Kuota</Text>
          <Text style={styles.value}>{kuota} GB</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Masa Aktif</Text>
          <Text style={styles.value}>{masaAktif} hari</Text>
        </View>
      </View>

      {/* Tombol */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => isiPulsa(10000)}>
          <Text style={styles.btnText}>Isi Pulsa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => tambahKuota(1)}>
          <Text style={styles.btnText}>Tambah Kuota</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor:'#3b3a3aff', borderRadius:12, padding:16, marginVertical:12 },
  number: { color:'#fcc755ff', fontWeight:'700', marginBottom:8, fontSize:16 },
  row: { flexDirection:'row', justifyContent:'space-between', marginBottom:12 },
  col: { alignItems:'flex-start', flex: 1, marginRight: 8 },
  label: { color:'#fff', fontSize:12 },
  value: { color:'#fcc755ff', fontWeight:'700', fontSize:14 },
  warning: { color:'#fff', fontWeight:'700', fontSize:14 },
  actions: { flexDirection:'row', justifyContent:'space-between' },
  button: { backgroundColor:'#fff', padding:8, borderRadius:8, marginHorizontal:4, borderWidth: 2, borderColor: '#fd0000ff' },
  btnText: { color:'#fd0000ff', fontWeight:'600' }
});
