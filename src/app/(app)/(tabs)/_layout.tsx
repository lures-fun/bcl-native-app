import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Box, Icon, Image } from '@gluestack-ui/themed';
import { createIcon } from '@gluestack-ui/themed';
import { View } from '@gluestack-ui/themed';
import { Tabs } from 'expo-router';
import { Path, Rect } from 'react-native-svg';
const GluestackIcon = createIcon({
  // createIcon function is imported from '@gluestack-ui/themed'
  viewBox: '0 0 32 32',
  path: (
    <>
      {/* Rect, Path is imported from 'react-native-svg' */}
      <Rect width="32" height="32" rx="2" fill="currentColor" />
      <Path d="M9.5 14.6642L15.9999 9.87633V12.1358L9.5 16.9236V14.6642Z" fill="white" />
      <Path d="M22.5 14.6642L16.0001 9.87639V12.1359L22.5 16.9237V14.6642Z" fill="white" />
      <Path d="M9.5 19.8641L15.9999 15.0763V17.3358L9.5 22.1236V19.8641Z" fill="white" />
      <Path d="M22.5 19.8642L16.0001 15.0764V17.3358L22.5 22.1237V19.8642Z" fill="white" />
    </>
  ),
});
export default function TabLayout() {
  return (
    <View h="$full">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          headerShown: false,
          tabBarBackground: () => <Box bg="black" w="$full" h="$full" />,
          tabBarIconStyle: {
            top: 7,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="daoTimeline"
          options={{
            tabBarLabel: 'dao timeline',
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          }}
        />
        <Tabs.Screen
          name="sns"
          options={{
            title: 'sns',
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: 15,
            },
            tabBarIcon: ({ color }) => (
              <Box position="relative">
                <Image
                  source={require('src/assets/post_bg.png')}
                  alt="something"
                  position="absolute"
                  top={-23}
                  right={-27}
                  width={72}
                  height={72}
                />
                <Icon as={GluestackIcon} />
              </Box>
            ),
          }}
        />
        <Tabs.Screen
          name="fishingResultTimeline"
          options={{
            tabBarLabel: 'fishing result timeline',
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          }}
        />
        <Tabs.Screen
          name="(gallery)"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}
