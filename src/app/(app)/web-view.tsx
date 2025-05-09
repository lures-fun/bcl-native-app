import { SafeAreaView, View } from '@gluestack-ui/themed';
import { SplashScreen } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Linking, Platform } from 'react-native';
import WebView from 'react-native-webview';
import Constants from 'expo-constants';
import { useAuthenticate } from 'src/hooks/useAuthenticate';
import { usePushNotification } from 'src/hooks/usePushNotification';
import { useFetchUserData } from 'src/hooks/useFetchUserData';
import { AxiosError } from 'axios';

const CustomHeaderWebView = (props: any) => {
  const { uri, ...restProps } = props;
  const [currentURI, setURI] = useState(props.source.uri);
  const newSource = { ...props.source, uri: currentURI };
  const appURI = new URL(process.env.EXPO_PUBLIC_LOGIN_URL ?? '');
  const appHost = appURI.hostname;
  const webViewRef = useRef<WebView>(null);

  return (
    <View flex={1} backgroundColor="black">
      <WebView
        {...restProps}
        source={newSource}
        style={{ backgroundColor: 'black' }}
        onShouldStartLoadWithRequest={(request) => {
          // If we're loading the current URI, allow it to load
          const requestedHost = new URL(request.url).hostname;
          if (requestedHost !== appHost) {
            Linking.openURL(request.url);
            return false;
          }

          if (request.url === currentURI || request.url === 'about:blank') return true;
          // We're loading a new URL -- change state first
          setURI(request.url);
          return false;
        }}
        ref={webViewRef}
        onContentProcessDidTerminate={webViewRef.current?.reload}
      />
    </View>
  );
};

export default function Home() {
  const { authState, logout } = useAuthenticate();
  const [isLoading, setIsLoading] = useState(false);

  const now = new Date();
  now.setDate(now.getDate() + 1);
  const sExpires = '; expires=' + now.toUTCString();
  const cookies = 'au=' + authState.auth.accessToken + sExpires + ';true';
  const { refetch, isLoading: isUserDataLoading, error } = useFetchUserData();

  useEffect(() => {
    if (error && error instanceof AxiosError && error?.response?.status === 401) {
      logout();
    }
  }, [error, logout]);

  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 200);
  }, []);

  usePushNotification();

  const handleNavigationStateChange = (navState: { loading: boolean }) => {
    setIsLoading(navState.loading);
  };

  return (
    <SafeAreaView
      bgColor="$black"
      flex={1}
      justifyContent="center"
      pt={Constants.statusBarHeight || 16}
    >
      <CustomHeaderWebView
        onLoadEnd={() => Platform.OS === 'android' && refetch()}
        onLoadStart={() => Platform.OS === 'ios' && refetch()}
        // Don't delete this: cookies need to set in js for subsequent pages
        injectedJavaScriptBeforeContentLoaded={`document.cookie = '${cookies}';`}
        source={{
          uri: `${process.env.EXPO_PUBLIC_LOGIN_URL}/home`,
          headers: {
            // Don't delete this: cookies is set at two places intentionally
            // this one is to prevent redirecting to login page in webview (only happen for the first time)
            Cookie: cookies,
          },
        }}
        onNavigationStateChange={handleNavigationStateChange}
        sharedCookiesEnabled={true}
      />
      {(isUserDataLoading || isLoading) && (
        <ActivityIndicator
          size="large"
          color="#93c5fd"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
      )}
    </SafeAreaView>
  );
}
