import { SafeAreaView, Text } from '@gluestack-ui/themed';
import React from 'react';
import { TIMELINE_TYPES } from 'src/utils/constValues';

export default function DaoTimeline() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>DaoTimeline</Text>
      <Text>Timeline Type: {TIMELINE_TYPES.daoResults}</Text>
    </SafeAreaView>
  );
}
