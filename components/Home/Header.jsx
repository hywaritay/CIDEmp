import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter, useSegments } from 'expo-router';

export default function Header() {
  const router = useRouter();
  const segments = useSegments();
  
  const isHomeRoute = segments[1] === '/home'; 

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        {/* Conditionally display the Go Back Arrow */}
        {!isHomeRoute && (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={32} color="#fff" />
          </TouchableOpacity>
        )}

        <Image 
          source={require('./../../assets/images/user.png')}
          style={styles.profileImage} 
        />
        <View>
          <Text style={styles.welcomeText}>
            Welcome 
          </Text>
        </View>
      </View>

      {/* search bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={32} color={Colors.PRIMARY} />
        <TextInput 
          placeholder="Search.."
          style={styles.searchInput} 
        />
      </View>
    </View>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    paddingTop: 70,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 99,
  },
  welcomeText: {
    color: '#fff',
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginTop: 15,
  },
  searchInput: {
    fontFamily: 'outfit-regular',
    fontSize: 16,
  },
});
