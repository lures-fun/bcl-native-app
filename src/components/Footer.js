import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();
  const handleRankingPress = () => {
    navigation.navigate('Profile');
  };
  const handleFishingResultForm = () => {
    navigation.navigate('Fishing Result Form')
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'black',
        color: 'blue',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderTopColor: '#707070',
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity onPress={handleRankingPress}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Image
              style={{ width: 36, height: 36, resizeMode: 'contain' }}
              source={require('src/assets/ranking_icon.png')}
              alt="icon"
            />
            <Text style={{ marginTop: 3, color: 'white' }}>ランキング</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFishingResultForm}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Image
              style={{ width: 36, height: 36, resizeMode: 'contain' }}
              source={require('src/assets/ranking_icon.png')}
              alt="icon"
            />
            <Text style={{ marginTop: 3, color: 'white' }}>Fishing Result Form</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Footer;
