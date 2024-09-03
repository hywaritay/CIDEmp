import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import LocationComponent from '../../components/Location/LocationComponent'


export default function location() {
  return (
    <View>
      {/* header */}
      <Header />
       {/* Add Rank */}
       <LocationComponent />
     

      <View style={{height:50}}></View>
    </View>
  )
}