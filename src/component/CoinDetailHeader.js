import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CoinDetailHeader = ({ small, symbol, market_cap_rank }) => {

  const navigate = useNavigation();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
      <Pressable onPress={() => navigate.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ height: 40, width: 40 }} source={{ uri: small }}></Image>
        <Text style={{ textTransform: 'uppercase', color: 'white', marginHorizontal: 3, fontWeight: 'bold' }}>{symbol}</Text>
        <Text style={{ paddingHorizontal: 3, backgroundColor: 'gray', fontWeight: 'bold', color: 'white' }}>#{market_cap_rank}</Text>
      </View>
      <AntDesign name="user" size={24} color="white" />
    </View>
  )
}

export default CoinDetailHeader