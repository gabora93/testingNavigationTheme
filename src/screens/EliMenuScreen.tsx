import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyledHS, StyledBox, StyledText, StyledButton } from '../components/styledComponents/index';
import { Button, ButtonText, Box, styled} from '@gluestack-ui/themed';
import { useColorMode } from "@gluestack-ui/themed";
import { Header } from "../components/header/Header";
import ToggleMode from "../components/themeToggler/ToggleMode";

export default function EliMenuScreen({ navigation }) {
  return ( 
  <>
    <StyledBox flex={1} >
      <Header headerTx='homeScreen.headerTitle'/>
      <StyledText>Home Screen</StyledText>
        <ToggleMode />
    </StyledBox>
    </>
  );
}

