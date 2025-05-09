import { SafeAreaView, Text } from '@gluestack-ui/themed';
import React from 'react';
import { TIMELINE_TYPES } from 'src/utils/constValues';

export default function FishingResultTimeline() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Fishing Result TimeLine</Text>
      <Text>Timeline Type: {TIMELINE_TYPES.fishingResults}</Text>
    </SafeAreaView>
  );
}
