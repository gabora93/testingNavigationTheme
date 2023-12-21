import { useState, createContext, useCallback } from 'react';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { ThemeContext } from './src/context/ThemeContext'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabNavigator } from './navigation';
import { GluestackUIProvider, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [colorMode, setColorMode] = useState<"dark" | "light">("light");
  const [fontsLoaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  if(error){
    console.log('error',error)
  }

  const toggleColorMode = async () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>

      <NavigationContainer onReady={onLayoutRootView} >
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <GluestackUIProvider colorMode={colorMode} config={config}>
          <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
            <TabNavigator />
          </ThemeContext.Provider>
        </GluestackUIProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  );
};