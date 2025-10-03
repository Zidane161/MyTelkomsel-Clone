import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../Service/authService';
import { saveProfile } from '../storage/ProfileStorage';
import type { Profile } from '../Hooks/useProfile';

export function useLogin(navigation: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vars: { email: string; password: string }) => {
      const { email, password } = vars;
      return await login(email, password);
    },
    onSuccess: async (local) => {
      const profile: Profile = {
        firstName: local.firstName,
        token: local.token,
      };

      await saveProfile(profile);
      queryClient.invalidateQueries({ queryKey: ['profile'] });

      navigation.replace('Main');
    },
  });
}
