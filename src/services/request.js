import axios from "axios";

export const getDetailCoinData = async (coinId) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`);
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getCoinMarketChart = async (coinId) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=14&interval=daily`)
    return response.data;
  } catch (e) {
    console.log(e)
  }
}

export const getCoins = async () => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/coins/list?include_platform=false")
    return response.data
  } catch (error) {
    console.log(error)
  }
}