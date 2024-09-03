import { View, Text } from 'react-native'
import React from 'react'

export default function PopularRanks({rank}) {
    const [rankList,setRankList]=useState([]);
    
    useEffect(()=>{
        GetRankList();
    },[])

    const GetRankList=async()=>{
        setRankList([]);
        setRankList(prev=>[...prev,doc.data()]);  
    }

  return (
    <View style={{
        padding: 10,
        borderRadius:18,
        marginLeft:15,
        backgroundColor: '#FFFFFF'
    }} >
      <Image source={require('./../../assets/images/user.png')}
      style={{
        width:200,
        height:130,
        borderRadius:15,
      }} />
      <View style={{marginTop:8,gap:5}}> 
        <Text
        style={{
            fontFamily:'outfit-bold',
            fontSize:16
        }}>name</Text>
        <Text
        style={{
            fontFamily:'outfit-regular',
            fontSize:13,
            color:Colors.GRAY
        }}>address</Text>
        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
        }}
        >
            <View
            style={{
                display:'flex',
                flexDirection:'row',
                gap:5,
            }}>
                <Image source={require('./../../assets/images/star.png')} 
                style={{
                    width:12,
                    height:12
                }}
                />
                <Text style={{fontFamily:'outfit-regular'}}>4.5</Text>
            </View>
            <Text
            style={{
                fontFamily:'outfit-regular',
                fontSize:12,
                color:'#FFFFFF',
                backgroundColor:Colors.PRIMARY,
                padding:3,
                borderRadius:5
            }}>
                category
            </Text>
        </View>
        
      </View>
    </View>
  )
}