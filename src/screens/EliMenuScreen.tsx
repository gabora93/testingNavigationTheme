import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyledHS, StyledBox, StyledText, StyledButton } from '../components/styledComponents/index';
import { Button, ButtonText, Box, styled, VStack } from '@gluestack-ui/themed';
import { useColorMode } from "@gluestack-ui/themed";
import { Header } from "../components/header/Header";
import ToggleMode from "../components/themeToggler/ToggleMode";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StyledTextContent from '../components/styledComponents/StyledTextContent';

export default function EliMenuScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return ( 
  <>
    <StyledBox flex={1} paddingTop={insets.top} bg='#1F4F7B'>
      <Header headerTx='homeScreen.headerTitle'/>
      <VStack $light-bg='#e0e8ee'>
      <StyledTextContent>Home Screen</StyledTextContent>
        <ToggleMode />

      </VStack>
    </StyledBox>
    </>
  );
}

