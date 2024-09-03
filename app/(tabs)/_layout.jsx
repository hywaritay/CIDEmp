import { View, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from './../../constants/Colors';

export default function TabLayout() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarStyle: { display: keyboardVisible ? 'none' : 'flex' },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="rank"
        options={{
          tabBarLabel: 'Rank',
          tabBarIcon: ({ color }) => <Ionicons name="star" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="department"
        options={{
          tabBarLabel: 'Department',
          tabBarIcon: ({ color }) => <Ionicons name="business" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          tabBarLabel: 'Location',
          tabBarIcon: ({ color }) => <Ionicons name="locate" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="employee"
        options={{
          tabBarLabel: 'Employee',
          tabBarIcon: ({ color }) => <Ionicons name="people-circle" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
