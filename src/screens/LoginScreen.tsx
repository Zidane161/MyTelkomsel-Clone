// LoginScreen
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  StyleSheet, ScrollView, Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { useLogin } from '../Hooks/useLogin';

type Props = { navigation: StackNavigationProp<RootStackParamList, 'Login'> };

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutateAsync, isPending } = useLogin(navigation);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Email dan Password wajib diisi');
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Email tidak valid');
      return;
    }

    try {
      await mutateAsync({ email, password });
      Alert.alert('Login Berhasil');
    } catch (e) {
      Alert.alert('Login Gagal', 'Periksa Email/Password');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/Promo/login-header.jpg')}
        style={styles.headerImage}
        resizeMode="cover"
      />

      <View style={styles.card}>
        <Text style={styles.title}>Masuk menggunakan email</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.terms}>
          Dengan login menggunakan email, saya setuju dengan{' '}
          <Text style={styles.link}
                onPress={() => 
                  navigation.navigate('WebView', {
                    url: 'https://www.telkomsel.com/kebijakan-privasi',
                    // title: 'Syarat & Ketentuan',
                  })
                }>
            Syarat & Ketentuan</Text> dan{' '}
          <Text style={styles.link}
                onPress={() =>
                  navigation.navigate('WebView', {
                    url: 'https://www.telkomsel.com/privacy-policy-mytelkomsel',
                    title: 'Kebijakan Privasi',
                  })
                }>
          Kebijakan Privasi</Text>.
        </Text>

        <TouchableOpacity
          style={[styles.button, isPending && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={isPending}
        >
          <Text style={styles.buttonText}>
            {isPending ? 'Loading...' : 'Masuk'}
          </Text>
        </TouchableOpacity>

        {__DEV__ &&<TouchableOpacity
          style={[styles.button, { backgroundColor: '#4CAF50', marginBottom: 16 }]}
          onPress={() => navigation.replace('Main')}   
        >
          <Text style={styles.buttonText}>Masuk Tanpa Login</Text>
        </TouchableOpacity>}

        <Text style={styles.or}>Atau masuk menggunakan</Text>

        <TouchableOpacity style={styles.socialRow}>
          <Image source={require('../assets/icons/google.png')} style={styles.socialIcon} />
          <Image source={require('../assets/icons/iphone.png')} style={styles.socialIcon} />
          <Image source={require('../assets/icons/facebook.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#fff' },
  headerImage: { width: '100%', height: 435 },
  card: {
    marginTop: -80,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    fontSize: 16,
  },
  terms: { fontSize: 12, color: '#444', marginBottom: 20, textAlign: 'center', lineHeight: 18 },
  link: { color: '#E0001E', textDecorationLine: 'underline' },
  button: {
    backgroundColor: '#E0001E',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  or: { textAlign: 'center', color: '#777', marginVertical: 8 },
  socialRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  socialIcon: { width: 20, height: 20, marginHorizontal: 12 },
});
