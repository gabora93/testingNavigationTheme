import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, ButtonText, Box, styled} from '@gluestack-ui/themed';
import { useColorMode } from "@gluestack-ui/themed";
import { Header } from "../components/header/Header";
import ToggleMode from "../components/themeToggler/ToggleMode";

export default function EliMenuScreen({ navigation }) {
  const StyledText = styled(Text, {
    fontWeight: "$extrabold",
    fontStyle: "normal",
    fontSize: "$lg",
    color: "$white",
    _dark: {
      color: "$white",
    },
  })

  const StyledBox = styled(Box, {
    backgroundColor: "$backgroundLight50",
    _dark: {
      backgroundColor: "$backgroundDark950",
    },
  })

  const StyledButton = styled(ButtonText, {
    fontWeight: "$extrabold",
    fontStyle: "normal",
    fontSize: "$lg",
    color: "$white",
    _dark: {
      color: "$white",
    },
  })
  return ( 
  <>
    <StyledBox flex={1} >
      <Header headerTx='homeScreen.headerTitle'/>
      <StyledText>Home Screen</StyledText>
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
          <StyledButton>
            GO TO DETAILS
          </StyledButton>
        </Button>
        <ToggleMode />
      </Box>
    </StyledBox>
    </>
  );
}

