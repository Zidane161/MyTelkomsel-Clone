import axios from 'axios';
import { Profile } from '../Hooks/useProfile';

const API_BASE_URL = 'https://dummyjson.com';

export interface UserData {
  firstName: string;
  birthDate: string;
  gender: string;
  company: { department: string };
  role: string;
  token: string;
}

export async function fetchUser(id: number): Promise<UserData> {
  try {
  const res = await axios.get<UserData>(`${API_BASE_URL}/users/${id}`, {
    // timeout
  timeout: 5000,
  }); 
  // throw 'test' 
  // throw randomly
  return res.data;
} catch (err) {
    console.error('Error fetching user:', err);
    throw err; 
  }
}  

export async function updateUser(id: number, payload: Partial<UserData>) {
  const { data } = await axios.put<Profile>(`${API_BASE_URL}/users/${id}`, payload, {
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000,
  });
  return data;
}
