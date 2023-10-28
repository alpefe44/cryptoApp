import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import cryptocurrencies from '../../assets/data/cryptocurrencies.json'
import CoinItem from '../component/CoinItem'
import { useNavigation } from '@react-navigation/native';
import { getCoins } from '../services/request';

const HomeScreen = () => {

  const { navigate } = useNavigation();

  // const [data, setData] = useState(null)

  // useEffect(() => {
  //   getCoinsData();
  // }, [])

  // const getCoinsData = async () => {
  //   const response = await getCoins();
  //   setData(response)
  // }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <FlatList
        data={cryptocurrencies}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => navigate("DetailScreen", {
            id: item.id
          })}>
            <CoinItem marketCoin={item} ></CoinItem>
          </TouchableOpacity>
        }
      ></FlatList >
    </SafeAreaView >
  )
}

export default HomeScreen