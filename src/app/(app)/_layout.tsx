import { AxiosError } from 'axios';
import { router, Slot } from 'expo-router';
import { useEffect } from 'react';
import { useAuthenticate } from 'src/hooks/useAuthenticate';
import { useFetchUserData } from 'src/hooks/useFetchUserData';

export default function AppLayout() {
  const { authState, logout } = useAuthenticate();
  const { error } = useFetchUserData();

  useEffect(() => {
    if (error && error instanceof AxiosError && error?.response?.status === 401) {
      logout();
    }
  }, [error, logout]);

  useEffect(() => {
    if (!authState.auth.accessToken) {
      router.push('/');
    }
  }, [authState.auth.accessToken]);
  // This layout can be deferred because it's not the root layout.
  // return <Stack screenOptions={{ headerShown: false }} />;
  return <Slot />;
}
