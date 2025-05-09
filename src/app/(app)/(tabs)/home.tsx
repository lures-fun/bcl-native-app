import { Button } from '@gluestack-ui/themed';
import { Text, View } from 'react-native';
import { useAuthenticate } from 'src/hooks/useAuthenticate';
import { useFetchUserData } from 'src/hooks/useFetchUserData';

export default function Home() {
  const { logout } = useAuthenticate();
  const { userData } = useFetchUserData();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          logout();
        }}
      >
        <Text>Sign Out {userData?.email}</Text>
      </Button>
    </View>
  );
}
