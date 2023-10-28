import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CoinItem from './src/component/CoinItem';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/Screens/HomeScreen';
import Detail from './src/Screens/Detail';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={{ colors: { background: '#121212' } }}>
        <Navigation></Navigation>
        <StatusBar style='light'></StatusBar>
      </NavigationContainer >
    </SafeAreaProvider>
  );
}

