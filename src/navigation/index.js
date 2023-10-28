import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../Screens/HomeScreen'
import Detail from '../Screens/Detail'


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: 'false',
    }}>
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='DetailScreen' component={Detail} options={{ headerShown: false }}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default Navigation