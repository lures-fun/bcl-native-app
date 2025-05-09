import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Slot } from 'expo-router';
import { themeConfig } from 'src/styles/themeConfig';
import { StrictMode } from 'react';
import { AuthenticateProvider } from 'src/hooks/useAuthenticate';

export default function Root() {
  return (
    <StrictMode>
      <AuthenticateProvider>
        <GluestackUIProvider config={themeConfig}>
          <Slot />
        </GluestackUIProvider>
      </AuthenticateProvider>
    </StrictMode>
  );
}
