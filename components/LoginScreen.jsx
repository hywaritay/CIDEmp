import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Colors } from '@/constants/Colors';
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [biometricSupported, setBiometricSupported] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if biometric authentication is supported
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setBiometricSupported(compatible);
    };

    checkBiometricSupport();
  }, []);

  const handleBiometricAuth = async () => {
    if (!biometricSupported) {
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
      Alert.alert('Authentication successful!');
      // Navigate to the home screen or any other screen after successful authentication
      router.replace("(tabs)");  // This will navigate to the main tabs screen
    } else {
      Alert.alert('Authentication failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={handleBiometricAuth}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 100,
          }}
        >
          <Image
            source={require('./../assets/images/fingerprint.jpg')}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: -20,
    elevation: 1,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
  },
});
