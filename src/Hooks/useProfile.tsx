// useQuery
import { useQuery } from '@tanstack/react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export type Profile = {
  firstName: string
  birthDate?: string
  gender?: string
  company?: { department?: string };
  role?: string
  token?: string
}
// fungsi fetch 
async function fetchProfile(): Promise<Profile> {
  const local = await AsyncStorage.getItem('profile');
  console.log(local);
  if(local) {
    const parsed = JSON.parse(local) as Profile;
    return parsed;
  }

  const { data } = await axios.get('https://dummyjson.com/users/1');
  data.token = 'test'
  await AsyncStorage.setItem('profile', JSON.stringify(data));
  return data;
}
// custom hook
export function useProfile() {
  return useQuery<Profile>({
    queryKey: ['profile'],   
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000, 
  });
}
export { useQuery }

