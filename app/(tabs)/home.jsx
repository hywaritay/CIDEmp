import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from './../../components/Home/Header'
import Slider from './../../components/Home/Slider'

export default function home() {
  return (
    <ScrollView>
      {/* header */}
      <Header />
      {/* slider */}
      <Slider />

      <View style={{height:50}}></View>
    </ScrollView>
  )
}