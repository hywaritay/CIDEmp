import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import AddRank from '../../components/Rank/AddRank'

export default function rank() {
  return (
    <View>
      {/* header */}
      <Header />
       {/* Add Rank */}
       <AddRank />
      <View style={{height:50}}></View>
    </View>
  )
}