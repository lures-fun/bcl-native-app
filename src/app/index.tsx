import { Roboto_400Regular, useFonts } from '@expo-google-fonts/roboto';
import { Button, ButtonText, ImageBackground, View } from '@gluestack-ui/themed';
import { Asset } from 'expo-asset';
import * as Linking from 'expo-linking';
import { router, SplashScreen } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Image } from 'react-native';
import { useAuthenticate } from 'src/hooks/useAuthenticate';
// import axiosInstance from 'src/lib/axiosInstance';
// import { getAppleIdentifier, saveAppleId } from 'src/utils/secureStore';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const bgImageRef = useRef<Asset[] | null>(null);
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });
  const { authenticate, authState, loginSuccess, loginFailure } = useAuthenticate();
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = Linking.createURL('');

  const loadAssetsAsync = async () => {
    const cacheBgImage = await Asset.loadAsync(require('../assets/splash.png'));
    // Wait for all assets to load
    bgImageRef.current = cacheBgImage;
  };

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadAssetsAsync();
        setIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    };
    prepareApp();
  }, []);

  const hideScreen = useCallback(async () => {
    setTimeout(async () => {
      // Delay abit to prevent screen flash
      await SplashScreen.hideAsync();
    }, 200);
  }, []);

  useEffect(() => {
    if (fontsLoaded && isReady) {
      hideScreen();
    }
  }, [fontsLoaded, isReady, hideScreen]);

  const login = useCallback(async () => {
    try {
      setIsLoading(true);
      let result = await WebBrowser.openAuthSessionAsync(
        `${process.env.EXPO_PUBLIC_LOGIN_URL}?s=bcl`,
        callbackUrl,
        { dismissButtonStyle: 'close' }
      );
      if (result.type === 'success') {
        const url = new URL(result.url);
        const token = url.searchParams.get('token');
        if (token) {
          loginSuccess(token);
          setIsLoading(false);
        } else {
          loginFailure();
          setIsLoading(false);
        }
      } else if (result.type === 'cancel' || result.type === 'dismiss') {
        loginFailure();
        setIsLoading(false);
      }
    } catch (e: any) {
      console.log(e);
      WebBrowser.dismissAuthSession();
      hideScreen();
      setIsLoading(false);
    }
  }, [callbackUrl, hideScreen, loginFailure, loginSuccess]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const dummyAppleLogin = async () => {
  //   alert('Appleログインはメンテナンス中です。Googleログインをご利用ください。');
  //   return;
  // };

  // const appleLogin = async () => {
  //   try {
  //     const credential = await signInAsync({
  //       requestedScopes: [AppleAuthenticationScope.FULL_NAME, AppleAuthenticationScope.EMAIL],
  //     });
  //     const email =
  //       (credential.email && (saveAppleId(credential.user, credential.email), credential.email)) ||
  //       getAppleIdentifier(credential.user);
  //     if (!email) {
  //       alert('Email is null.');
  //       return;
  //     }
  //     const response = await axiosInstance.post('/login/apple', {
  //       email: email,
  //       token: credential.identityToken,
  //     });
  //     loginSuccess(response.data.accessToken);
  //   } catch (e: any) {
  //     if (e.code === 'ERR_REQUEST_CANCELED') {
  //       // handle that the user canceled the sign-in flow
  //     } else {
  //       // handle other errors
  //     }
  //   }
  // };

  useEffect(() => {
    if (!isReady) return;
    if (!authState.loading && !authState.auth.checkedAuth) {
      authenticate();
      return;
    }

    if (authState.auth.requireLogin) {
      login();
      return;
    }
  }, [
    authState.auth.accessToken,
    authState.auth.checkedAuth,
    authState.auth.requireLogin,
    authState.loading,
    authenticate,
    isReady,
    login,
  ]);

  useEffect(() => {
    if (authState.auth.accessToken) {
      setIsLoading(false);
      hideScreen();
      router.replace('/web-view');
    }
  }, [authState.auth.accessToken, hideScreen]);

  return (
    <View flex={1} alignItems="center" justifyContent="center" backgroundColor="$black">
      {bgImageRef.current && (
        <ImageBackground
          position="absolute"
          source={{ uri: bgImageRef.current?.at(0)?.localUri || bgImageRef.current?.at(0)?.uri }}
          resizeMode="cover"
          flex={1}
          w="$full"
          h="$full"
          justifyContent="center"
          bgColor="$black"
        />
      )}
      <Button
        size="lg"
        onPress={login}
        style={{
          flexDirection: 'row',
          width: 200,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#d3d3d3',
          marginBottom: 10,
        }}
      >
        <Image
          source={require('../assets/google-logo.png')}
          style={{
            width: 24,
            height: 24,
            marginRight: 10,
          }}
        />
        <ButtonText
          fontFamily="Roboto_400Regular"
          color="$black"
          fontSize={16}
          lineHeight={22}
          disabled={isLoading}
        >
          {/* {isLoading ? `Loading....` : `Google でログイン`} */}
          {`Google でログイン`}
        </ButtonText>
      </Button>
      {/* {Platform.OS === 'ios' && (
        <AppleAuthenticationButton
          buttonType={AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthenticationButtonStyle.WHITE}
          cornerRadius={5}
          style={{
            width: 200,
            height: 44,
          }}
          onPress={login}
        />
      )} */}
      {/* {isLoading && (
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
            backgroundColor: 'rgba(0, 0, 0, 1)',
          }}
        />
      )} */}
    </View>
  );
}
