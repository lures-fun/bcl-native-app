import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Profile', headerShown: false }} />
      <Stack.Screen
        name="my-page"
        options={{ title: 'User Setting', headerBackVisible: true, headerShown: false }}
      />
    </Stack>
  );
}
