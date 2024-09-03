import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from './../../components/Home/Header'
import EmpComponent from './../../components/Employee/EmpComponent'

export default function employee() {
  return (
    <View>
      {/* header */}
      <Header />
      {/* EmpComponent */}
      <EmpComponent />

      <View style={{height:50}}></View>
    </View>
  )
}