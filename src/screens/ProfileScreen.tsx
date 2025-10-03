import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Button,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';

import HomeButton from '../components/HomeButton';
import { updateUser } from '../Service/userService';
import { useProfile } from '../Hooks/useProfile';

type Props = { navigation: StackNavigationProp<RootStackParamList, 'Profile'> };

type FormState = {
  name: string;
  birthDate: string;
  gender: string;
  job: string;
  hobby: string;
};

export default function ProfileScreen({ navigation }: Props) {
  const { data: profile, isLoading, isError, refetch, isFetching } = useProfile();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: '',
    birthDate: '',
    gender: '',
    job: '',
    hobby: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('profileForm');
        if (saved) {
          setForm(JSON.parse(saved));
        }
      } catch (err) {
        console.error('Load AsyncStorage error', err);
      }
    })();
  }, []);

  useEffect(() => {
    if (profile) {
      setForm(prev => ({
        ...prev,
        name: prev.name || (profile.firstName ?? ''),
        birthDate: prev.birthDate || (profile.birthDate ?? ''),
        gender: prev.gender || (profile.gender ?? ''),
        job: prev.job || (profile.company?.department ?? ''),
        hobby: prev.hobby || (profile.role ?? ''),
      }));
    }
  }, [profile]);

  const handleChange = (key: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const saveProfile = async () => {
    try {
      await updateUser(1, {
        firstName: form.name,
        birthDate: form.birthDate,
        gender: form.gender,
        company: { department: form.job },
        role: form.hobby,
      }).then(result => {
      return AsyncStorage.setItem('profile', JSON.stringify(result));
      }).then();

      // local storage
  const getUserId = async () => {
  const user = await AsyncStorage.getItem('profile');
    return user ? JSON.parse(user).id : 1;
  };

      navigation.navigate('Main');
    } catch (err) {
      console.error('Update error', err);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Gagal memuat profil</Text>
        <Button
          title={isFetching ? 'Memuat…' : 'Coba Lagi'}
          onPress={() => refetch()}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.Title}>Profile</Text>

      <View style={styles.numberBox}>
        <Text style={styles.simLabel}>Telkomsel</Text>
        <Text style={styles.numberText}>0822 1198 6275</Text>
      </View>

      <Text style={styles.sectionTitle}>Identitas Akun</Text>

      <Text style={styles.label}>Nama Lengkap</Text>
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={v => handleChange('name', v)}
        placeholder="Masukkan nama lengkap"
      />

      <Text style={styles.label}>Tanggal Lahir</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={{ color: form.birthDate ? '#000' : '#999' }}>
          {form.birthDate || 'Pilih tanggal lahir'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={form.birthDate ? new Date(form.birthDate) : new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(_, selected) => {
            setShowDatePicker(false);
            if (selected) {
              const formatted = selected.toISOString().split('T')[0];
              handleChange('birthDate', formatted);
            }
          }}
        />
      )}

      <Text style={styles.label}>Jenis Kelamin</Text>
      <TextInput
        style={styles.input}
        value={form.gender}
        onChangeText={v => handleChange('gender', v)}
        placeholder="Pilih jenis kelamin"
      />

      <Text style={styles.label}>Pekerjaan</Text>
      <TextInput
        style={styles.input}
        value={form.job}
        onChangeText={v => handleChange('job', v)}
        placeholder="Pilih pekerjaan"
      />

      <Text style={styles.label}>Hobi</Text>
      <TextInput
        style={styles.input}
        value={form.hobby}
        onChangeText={v => handleChange('hobby', v)}
        placeholder="Masukkan hobi"
      />

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Verifikasi akun kamu untuk isi informasi identitas akun
        </Text>
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
        <Text style={styles.saveText}>Simpan</Text>
      </TouchableOpacity>

      <HomeButton onPress={() => navigation.navigate('Main')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffff', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  numberBox: {
    flexDirection: 'row',
    backgroundColor: '#e6e5e5ff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  simLabel: {
    backgroundColor: '#D80027',
    color: '#fff',
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 12,
  },
  numberText: { fontSize: 16, fontWeight: '600', color: '#000' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12, color: '#000', marginTop: 10 },
  Title: { fontSize: 24, fontWeight: '700', marginBottom: 12, color: '#000', marginTop: 18, marginLeft: 50 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 6, color: '#000' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#f11313ff',
    marginBottom: 20,
    fontSize: 14,
  },
  infoBox: {
    backgroundColor: '#E8F1FC',
    padding: 12,
    borderRadius: 10,
    marginBottom: 24,
  },
  infoText: { fontSize: 13, color: '#444', alignItems: 'center' },
  saveBtn: {
    backgroundColor: '#E0001E',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 40,
  },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
