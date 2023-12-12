import { useState, createContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabNavigator } from './navigation';
import { GluestackUIProvider, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

type ThemeContextType = {
  colorMode?: "dark" | "light";
  toggleColorMode?: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  colorMode: "light",
  toggleColorMode: () => { },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [colorMode, setColorMode] = useState<"dark" | "light">("light");
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  })

  if (!fontsLoaded) {
    return null;
  }

  const toggleColorMode = async () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>

      <NavigationContainer>
      <SafeAreaProvider>
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