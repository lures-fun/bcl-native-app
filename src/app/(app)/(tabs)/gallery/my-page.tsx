import { SafeAreaView, Text } from '@gluestack-ui/themed';
import React from 'react';
import { useFetchUserData } from 'src/hooks/useFetchUserData';

export default function ProfileScreen() {
  const { userData } = useFetchUserData();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Name: {userData?.firstName}</Text>
      <Text>Email: {userData?.email}</Text>
    </SafeAreaView>
  );
}
