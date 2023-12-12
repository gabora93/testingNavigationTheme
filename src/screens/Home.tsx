import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, ButtonText, Box } from '@gluestack-ui/themed';
import { useColorMode } from "@gluestack-ui/themed";
import { Header } from "../components/header/Header";
import ToggleMode from "../components/themeToggler/ToggleMode";

export default function HomeScreen({ navigation }) {
  return ( 
  <>
    <Box flex={1} bg="$orange200" >
      <Header headerTx='homeScreen.headerTitle'/>
      <Text>Home Screen</Text>
      <Box p={'$1'}>
        <Button sx={{
          _dark: { bg: '$blueGray100' },
          _light: { bg: '$darkBlue700' }
        }}
        size='xs'
          action="positive" 
          isDisabled={false}
          isFocusVisible={false}
          onPress={() => navigation.navigate('Menu', { screen: 'MenuScreen', params: { itemId: 86, otherParam: 'anything you want here' } })}>
          <ButtonText>
            Go to Details
          </ButtonText>
        </Button>
        <ToggleMode />
      </Box>
     
      
    </Box>
    </>
  );
}

