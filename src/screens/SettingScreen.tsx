import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import HomeButton from "../components/HomeButton";
import useTheme from '../Hooks/useTheme';
import { useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Setting">;
};

export default function SettingScreen({ navigation }: Props) {
  const [notif, setNotif] = useState(true);
  const [stamp, setStamp] = useState(false);
  const { theme } = useTheme();
  const queryClient = useQueryClient

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('profile');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login'}],
      });
    } catch (err) {
      console.log('Logout error', err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pengaturan Aplikasi</Text>

      {/* Notifikasi */}
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>Suara Notifikasi</Text>
        <Switch
          value={notif}
          onValueChange={setNotif}
          thumbColor={notif ? "#fff" : "#fff"}
          trackColor={{ true: "#1456c7ff", false: "#ccc" }}
        />
      </View>

      {/* Pengingat Stamp */}
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>Pengingat Stamp Berhadiah</Text>
        <Switch
          value={stamp}
          onValueChange={setStamp}
          thumbColor={stamp ? "#fff" : "#fff"}
          trackColor={{ true: "#1456c7ff", false: "#ccc" }}
        />
      </View>

      {/* Menu Setting */}
      <TouchableOpacity
        style={styles.itemRow}
      >
        <Text style={styles.itemText}>Pilih Bahasa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.itemRow}
      >
        <Text style={styles.itemText}>MyTelkomsel Experience Program</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.itemRow}
      >
        <Text style={styles.itemText}>
          Persetujuan Pengguna & Salinan Data
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.itemRow}
      >
        <Text style={styles.itemText}>Ajukan Penghapusan Akun</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.itemRow}
        onPress={() => {/* link ke store rating */}}
      >
        <Text style={styles.itemText}>Beri Rating Aplikasi Telkomsel</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.outBtn} onPress={handleLogout}>
        <Text style={styles.BtnText}>Keluar</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Versi Aplikasi 1.0.0</Text>
      <HomeButton onPress={() => navigation.navigate('Home')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    paddingHorizontal: 16,
    paddingTop: 16
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 40,
    marginTop: 20,
    textAlign: "center"
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  itemText: {
    fontSize: 16
  },
  version: {
    textAlign: "center",
    marginTop: 24,
    color: "#888"
  },
  outBtn: {
    backgroundColor: '#E0001E',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 40,
  },
  BtnText: {
    color: '#ffff',
    fontSize: 16, 
    fontWeight: '700',
  },
});
