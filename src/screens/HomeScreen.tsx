// src/screens/HomeScreen.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  RefreshControl,
  View, 
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUser } from '../Service/userService';
import Header from '../components/Header';
import PromoBanner from '../components/Promo';
import InfoCard from '../components/InfoCard';
import MenuGrid from '../components/Menu';
import RecommendationList from '../components/Rekomendasi';
import useTheme from '../Hooks/useTheme';
import useScrollTop from '../Hooks/useScrollTop';
import { RootStackParamList } from '../navigation/StackNavigator';
import { useProfile } from '../Hooks/useProfile';


type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Main'>;
  route: RouteProp<RootStackParamList, 'Main'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const { scrollRef, showScrollTop, handleScroll, scrollTop } = useScrollTop(200);

  // AsyncStorage
  const getUserId = async () => {
    const user = await AsyncStorage.getItem('profile');
    return user ? JSON.parse(user).id : 1;
  };

  const { data: user, isLoading, isError } = useProfile();

  // pull refresh
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ['profile'] });
    setRefreshing(false);
  }, [queryClient]);

  const [localName, setLocalName] = useState('profile');
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        setLocalName(parsed.firstName);
      }
    })();
  }, []);

  const username = user?.firstName || localName;

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
        <ActivityIndicator style={{ flex: 2 }} size="large" />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
        <Text
          onPress={onRefresh}
          style={{ color: 'red', textAlign: 'center', marginTop: 40 }}
        >
          Gagal memuat data pengguna. Tarik ke bawah untuk mencoba lagi.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
    <View>
      <Header navigation={navigation} username={username} />
    </View>
      <ScrollView
        // style={{ marginTop: 100 }}
        contentContainerStyle={styles.container}
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#E0001E"
            progressViewOffset={HEADER_HEIGHT}
          />
        }
      >

        <Text style={[styles.greeting, { color: theme.text }]}>
          Halo, {username}!
        </Text>
        <PromoBanner />
        <InfoCard number="0812-0000-0000" />
        <MenuGrid />
        <RecommendationList />
        <RecommendationList />
        <PromoBanner />
      </ScrollView>

      {showScrollTop && (
        <TouchableOpacity style={styles.scrollTopBtn} onPress={scrollTop}>
          <Image source={require('../assets/icons/Arrow.png')} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const HEADER_HEIGHT = 80;
const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  container: { padding: 16, paddingTop: HEADER_HEIGHT+ 20 }, 
  greeting: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  scrollTopBtn: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    zIndex: 20,
  },
});