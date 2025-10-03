import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Profile } from "../Hooks/useProfile";

const KEY = 'profile';

export async function saveProfile(profile: Profile) {
    await AsyncStorage.setItem(KEY, JSON.stringify(profile));
}

export async function getProfile(): Promise<Profile | null> {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Profile) : null;
}

export async function clearProfile() {
    await AsyncStorage.removeItem(KEY);
}