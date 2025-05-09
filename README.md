# BCL Native App Repository

This repository contains the native BCL app, implemented with React Native.

## First time installation

```
yarn install
npx expo install
```

## Installing package

`npx expo install {package_name}`

## Start Expo

`npx expo start`

## Start Expo without cache

```
npx expo start -c
//
npx expo start --clear
```

## Build Expo

```
npx expo prebuild
eas build -p ios --profile production
eas build -p android --profile production
```

## Expo OTA

```
eas build -p ios --profile production
eas build -p android --profile production

eas submit --latest -p ios
eas submit --latest -p android

eas update --branch main --message "xxxx"
```

## Connecting to localhost (In Andorid Emulator)

android currently cannot connect to `http://localhost`. Currently, connecting to `http://10.0.2.2:{port}`. If connection failure, the port needed to be reverted using `adb` comment.

```
% adb devices
List of devices   attached
emulator-5554	    device

% adb  -s emulator-5554 reverse tcp:{port} tcp:{port}
```

## Folder Structure

Folder structure is according to `expo-router`.

```
- src
  -app
    - user
      - _layout.tsx
      - index.tsx
      - page2.tsx
      ...
    - home
      - _layout.tsx
      - index.tsx
      ...
    _layout.tsx
    index.tsx (entry point)
  - assets
    - logo.png
    ...
```
