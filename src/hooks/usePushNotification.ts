import { NavigationContainerRef } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import axiosInstance from 'src/lib/axiosInstance';
import { useFetchUserData } from 'src/hooks/useFetchUserData';

export interface PushNotificationState {
  notification?: Notifications.Notification;
  expoPushToken?: Notifications.ExpoPushToken;
}

export const usePushNotification = (): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken | undefined>();
  const [notification, setNotification] = useState<Notifications.Notification | undefined>();
  const { userData } = useFetchUserData();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const registerForPushNotificationAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // grantedは「許可済み」それ以外の時は、権限をリクエストする
      if (existingStatus !== 'granted') {
        // 上の画像のメッセージが表示される
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get notification push token!');
        return;
      }
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error('Project ID not found');
        }
        token = await Notifications.getExpoPushTokenAsync({
          projectId,
        });
      } catch (e) {
        token = `${e}`;
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.HIGH,
          sound: 'default',
          enableVibrate: true,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
          lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        });
      }
      return token;
    } else {
      console.log('Please use a physical device.');
      return;
    }
  };

  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  useEffect(() => {
    registerForPushNotificationAsync().then(
      (token) => typeof token !== 'string' && setExpoPushToken(token)
    );
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      const { data } = response.notification.request.content;

      if (data && data.screen) {
        navigationRef.current?.navigate(data.screen, data.params || {});
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current!);
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  useEffect(() => {
    const sendExpoNotificationToken = async () => {
      if (!userData?.id || !expoPushToken?.data) return;
      try {
        await axiosInstance.post('/notifications/add/noti-token', {
          id: userData?.id,
          token: expoPushToken?.data,
        });
      } catch (error) {
        console.log('Expo-push-token sending failed: ', error);
      }
    };
    sendExpoNotificationToken();
  }, [expoPushToken?.data, userData?.id]);

  return { expoPushToken, notification };
};
