import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{ title: 'Fishing Result Timeline', headerShown: false }}
      />

      <Stack.Screen
        name="fishingResultRegister"
        options={{
          title: 'Fishing Result Register',
          headerBackVisible: true,
          headerShown: true,
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
}
