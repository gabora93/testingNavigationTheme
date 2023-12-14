import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, ButtonText, Box, styled, Pressable, VStack, Center, HStack } from '@gluestack-ui/themed';
import { Menu, FileText, CheckCheck, Container } from 'lucide-react-native';
import { Header } from "../components/header/Header";
import ToggleMode from "../components/themeToggler/ToggleMode";
import { i18n } from '../i18n/i18n';
import { StyledBox, StyledText } from '../components/styledComponents/index';

export default function HomeScreen({ navigation }) {
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
        <Header headerTx='homeScreen.headerTitle' />
        <HStack justifyContent='center' alignItems="center" flex={1}>
          <VStack borderWidth={1} h="$full" w="$full" alignItems="center" justifyContent='center' >

            <Pressable flex={1} justifyContent='center' w="$full" onPress={() => {navigation.navigate('Bols')}}>
              {({ pressed }) =>
                <Center  >
                  <HStack space={2}>
                    <Icon as={FileText} color="blue" size='xl' w="$8" h="$8" size={60}>
                    </Icon>
                    <StyledText color={pressed ? "pink" : "black"}>{i18n.t('homeScreen.viewBols')}</StyledText>
                  </HStack>
                </Center>}
            </Pressable>


            <Pressable flex={1} justifyContent='center' w="$full" onPress={() => {navigation.navigate('Bols')}}>
              {({ pressed }) =>
                <Center >
                  <HStack space={2}>
                    <HStack space={2}>
                      <Icon as={Container} color="$blue" size='xl' w="$8" h="$8" size={60}>
                      </Icon>
                      <Icon as={CheckCheck} color="green" size='xl' w="$8" h="$8" size={60} marginLeft={-30}>
                      </Icon>
                    </HStack>
                    <VStack space={2} justifyContent='center'>
                      <StyledText color={pressed ? "pink" : "black"}>{i18n.t('homeScreen.viewLoadEligibility')}</StyledText>
                    </VStack>
                  </HStack>
                </Center>}
            </Pressable>

            <Pressable flex={1} justifyContent='center' w="$full" onPress={() => {navigation.navigate('Menu')}}>
              {({ pressed }) =>
                <Center  >
                  <HStack space={2}>
                    <Icon as={Menu} color="$blue" size='xl' w="$8" h="$8" size={60}>
                    </Icon>
                    <StyledText color={pressed ? "pink" : "black"}>{i18n.t('homeScreen.viewFullMenu')}</StyledText>
                  </HStack>
                </Center>}
            </Pressable>

            {/* <ToggleMode /> */}
          </VStack>
        </HStack>
      </StyledBox>
    </>
  );
}

