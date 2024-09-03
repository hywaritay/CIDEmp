import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import DepartmentComponent from '../../components/Department/DepartmentComponent'


export default function depatrment() {
  return (
    <View>
      {/* header */}
      <Header />
       {/* Add Rank */}
       <DepartmentComponent />
     

      <View style={{height:50}}></View>
    </View>
  )
}