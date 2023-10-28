import { View, Text, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import SafeAreaView from 'react-native-safe-area-view';


const CoinItem = ({ marketCoin }) => {

  const { image, name, symbol, market_cap_rank, price_change_percentage_24h, current_price, market_cap } = marketCoin

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ borderBottomWidth: .4, borderColor: 'white', padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignSelf: 'center', justifyContent: 'center', padding: 5 }}>
            <Image style={{ height: 45, width: 45 }} source={{ uri: image }}></Image>
          </View>
          <View style={{ justifyContent: 'space-around' }}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>{name}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ backgroundColor: 'gray', paddingHorizontal: 3, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{market_cap_rank}</Text>
              </View>
              <View style={{ flexDirection: 'row', paddingHorizontal: 2, alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: 'gray' }}>{symbol}</Text>
                <View style={{ flexDirection: 'row', paddingLeft: 5, alignItems: 'center', alignSelf: 'center' }}>
                  <AntDesign name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"} size={14} color="gray" />
                  <Text style={{ fontSize: 12, color: price_change_percentage_24h < 0 ? 'red' : 'green' }}>{price_change_percentage_24h}</Text>
                </View>
              </View>

            </View>
          </View>
        </View>
        <View style={{}}>
          <Text style={{ color: 'white' , fontWeight:'bold' }}>{current_price}</Text>
          <Text style={{ color: 'white' , fontSize:10 }}>MCAP  {market_cap}</Text>
        </View>
      </View>
    </View>
  )
}

export default CoinItem