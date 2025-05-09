import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';

const HeaderMenu = () => {
  const handlePress = (link) => {
    console.log('Pressed:', link);
  };
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'lightblue', // ヘッダーの背景色
        padding: 10,
        zIndex: 1000, // 他の要素より上に表示するための zIndex
        elevation: 3, // Androidの影の効果
      }}
    >
      {/* ここにヘッダーメニューのコンテンツを追加 */}
      <TouchableWithoutFeedback onPress={() => handlePress('/home')}>
        <Image
          style={{ height: 8, resizeMode: 'contain' }}
          source={require('src/assets/adaptive-icon.png')}
        />
      </TouchableWithoutFeedback>
      <Text>Menu Item 2</Text>
      <Text>Menu Item 3</Text>
    </View>
  );
};

export default HeaderMenu;
