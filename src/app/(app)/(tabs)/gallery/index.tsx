import { SafeAreaView, Text } from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import React from 'react';

export default function ProfileScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Gallery</Text>
      <Link href="/my-page">My page</Link>
    </SafeAreaView>
  );
}
