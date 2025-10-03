// ../Service/authService.tsx
import apiClient from '../api/apiClient';
import { Profile } from '../Hooks/useProfile';

const API_BASE_URL = 'https://dummyjson.com';

export async function login (email: string, password: string) {
  const res = await apiClient.post<Profile>(`${API_BASE_URL}/users/`, { email, password });
  return res.data;
}

export async function getUser(id: number) {
  const res = await apiClient.get<Profile>(`${API_BASE_URL}/users/${id}`);
  return res.data
}