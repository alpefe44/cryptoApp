import { View, Text, Image, Dimensions, TextInput, Button, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import Coin from '../../assets/data/crypto.json'
import CoinDetailHeader from '../component/CoinDetailHeader';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { LineChart } from 'react-native-wagmi-charts';
import { getCoinMarketChart, getDetailCoinData } from '../services/request';


export const { width: SIZE } = Dimensions.get('window');

const Detail = ({ route }) => {

  const { id } = route.params;
  const [coinData, setCoinData] = useState(null)
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [selectedRange, setSelectedRange] = useState("1");


  const getCoinData = async (coinId) => {
    const data = await getDetailCoinData(coinId)
    if (data) {
      setCoinData(data)
    }
  }

  const fetchMarketCoinData = async (coinId) => {
    const fetchedCoinMarketData = await getCoinMarketChart(coinId);
    if (fetchedCoinMarketData) {
      setCoinMarketData(fetchedCoinMarketData);
    }
  };
  useEffect(() => {
    getCoinData(id)
    fetchMarketCoinData(id)
  }, [])

  const getData = () => console.log(coinData)
  const getMarketData = () => console.log(coinMarketData.prices[0])

  const formatCurrency = ({ value }) => {
    "worklet";
    if (value === "") {
      if (coinData?.market_data?.current_price?.usd < 1) {
        return `$${coinData?.market_data?.current_price?.usd}`;
      }
      return `$${coinData?.market_data?.current_price?.usd?.toFixed(2)}`;
    }
    if (coinData?.market_data?.current_price?.usd < 1) {
      return `$${parseFloat(value)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };

  const {
    image: { small },
    name,
    symbol,
    market_data: { market_cap_rank, current_price, price_change_24h },
  } = Coin;

  const percentageColor =
    coinData?.market_data?.price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";
  const chartColor = current_price.usd > coinMarketData?.prices[0][1] ? "#16c784" : "#ea3943";

  const [coinValue, setCoinValue] = useState("")
  const [usdValue, setUsdValue] = useState(coinData?.market_data.current_price.usd)

  const changeCoinValue = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value) || 0
    setUsdValue((floatValue * coinData?.market_data.current_price.usd).toString());
  }

  const changeUsdValue = (value) => {
    setUsdValue(value);
    setCoinValue((value / coinData?.market_data.current_price.usd).toString());
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>

        {
          coinMarketData ? (
            <LineChart.Provider data={coinMarketData?.prices?.map(([timestamp, value]) => ({ timestamp, value }))}>
              <CoinDetailHeader market_cap_rank={coinData?.market_cap_rank} small={coinData?.image.small} symbol={coinData?.symbol}></CoinDetailHeader>
              {
                coinData ? (
                  <View>
                    <View style={styles.priceContainer}>
                      <View>
                        <Text style={styles.name}>{coinData?.name}</Text>
                        <LineChart.PriceText
                          format={formatCurrency}
                          style={styles.currentPrice}
                        />
                      </View>
                      <View
                        style={{
                          backgroundColor: percentageColor,
                          paddingHorizontal: 3,
                          paddingVertical: 8,
                          borderRadius: 5,
                          flexDirection: "row",
                        }}
                      >
                        <AntDesign
                          name={coinData.market_data.price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
                          size={12}
                          color={"white"}
                          style={{ alignSelf: "center", marginRight: 5 }}
                        />
                        <Text style={styles.priceChange}>
                          {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : null
              }

              <LineChart height={SIZE * .5} width={SIZE} >
                <LineChart.Path color={chartColor} />
                <LineChart.CursorCrosshair color={chartColor} />
              </LineChart>
            </LineChart.Provider>
          ) : null
        }



        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'nowrap' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>{coinData?.symbol.toUpperCase()}</Text>
            <TextInput value={coinValue} onChangeText={(text) => changeCoinValue(text)} style={{ color: 'white', borderBottomWidth: .7, borderBottomColor: 'white', paddingHorizontal: 35 }}></TextInput>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>USD</Text>
            <TextInput onChangeText={(text) => changeUsdValue(text)} keyboardType='numeric' value={usdValue} style={{ color: 'white', paddingHorizontal: 35, borderBottomWidth: .7, borderBottomColor: 'white' }}></TextInput>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  priceContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: "white",
    fontSize: 15,
  },
  currentPrice: {
    color: "white",
    fontSize: 30,
    fontWeight: "600",
  },
  priceChange: {
    color: "white",
    fontSize: 17,
    fontWeight: "500",
  }
})

export default Detail