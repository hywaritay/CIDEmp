import React, { useState, useEffect } from 'react';
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import LoginScreen from '../components/LoginScreen';
import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';
import LoadingScreen from '../components/LoadingScreen'; 

export default function RootLayout() {
  const [biometricAuthenticated, setBiometricAuthenticated] = useState(false);

  useFonts({
    'outfit-regular': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf')
  });

  useEffect(() => {
    const authenticateUser = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();

      if (!compatible) {
        Alert.alert('Biometric authentication is not supported on this device.');
        return;
      }

      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();

      if (!savedBiometrics) {
        Alert.alert('No biometric records found. Please set up biometrics in your device settings.');
        return;
      }

      const authResult = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with Biometrics',
        fallbackLabel: 'Enter Password',
      });

      if (authResult.success) {
        setBiometricAuthenticated(true);
      } else {
        Alert.alert('Authentication failed. Please try again.');
      }
    };

    authenticateUser();
  }, []);

  if (!biometricAuthenticated) {
    return <LoadingScreen />; 
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <LoginScreen />
    </Stack>
  );
}
