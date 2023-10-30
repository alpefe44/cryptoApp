import { View, Text, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import SafeAreaView from 'react-native-safe-area-view';
import { LineChartProvider, LineChart } from 'react-native-wagmi-charts';
import { getCoinMarketChart, getDetailCoinData } from '../services/request';

export const { width: SIZE } = Dimensions.get('window');

const CoinItem = ({ marketCoin }) => {

  const { id, name, symbol, current_price, image, market_cap_rank, market_cap } = marketCoin

  const [coinMarketData, setCoinMarketData] = useState(null);


  useEffect(() => {
    fetchedCoinMarketData(id)
    fetchCoinData(id)
  }, [])



  const fetchedCoinMarketData = async (id) => {
    const response = await getCoinMarketChart(id);
    if (response) {
      setCoinMarketData(response)
    }
  }

  const fetchCoinData = async (id) => {
    const response = await getDetailCoinData(id);
    if (response) {
      setCoinDetail(response)
    }
  }
  const [coinDetail, setCoinDetail] = useState(null);


  return (

    <View style={{ flex: 1, backgroundColor: 'black' }}>

      <View style={{ borderBottomWidth: .4, borderColor: 'white', padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
        {
          coinDetail ? (
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
                      <AntDesign name={coinDetail?.market_data.price_change_percentage_24h < 0 ? "caretdown" : "caretup"} size={14} color="gray" />
                      <Text style={{ fontSize: 12, color: coinDetail?.market_data.price_change_percentage_24h < 0 ? 'red' : 'green' }}>{coinDetail?.market_data.price_change_percentage_24h}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : <Text>Waiting Data</Text>
        }

        <View>
          {
            coinMarketData ? (
              <LineChartProvider data={coinMarketData?.prices?.map(([timestamp, value]) => ({ timestamp, value }))}>
                <LineChart height={SIZE * .1} width={SIZE * .2} >
                  <LineChart.Path color= {coinDetail?.market_data.price_change_percentage_24h < 0 ? 'red' : 'green'} />
                </LineChart>
              </LineChartProvider>
            ) : null
          }
        </View>
        <View>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{current_price}</Text>
          <Text style={{ color: 'white', fontSize: 10 }}>MCAP  {market_cap}</Text>
        </View>
      </View>

    </View >
  )
}

export default CoinItem