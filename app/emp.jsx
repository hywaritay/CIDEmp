import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import Header from '../components/Home/Header';
import Emp from '../components/Employee/emp';

export default function emp() { 
  return (
    <ScrollView>
      {/* header */}
      <Header />
      {/* EmpComponent */}
      <Emp />

      <View style={styles.spacer}></View>
    </ScrollView>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  spacer: {
    height: 50,
  },
});
