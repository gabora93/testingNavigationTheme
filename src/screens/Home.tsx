import { Icon, ButtonText, Box, styled, Pressable, VStack, Center, HStack, View, Text } from '@gluestack-ui/themed';
import { Menu, FileText, CheckCheck, Container } from 'lucide-react-native';
import { Header } from "../components/header/Header";
import { i18n } from '../i18n/i18n';
import { StyledBox, StyledText } from '../components/styledComponents/index';
import { PressableType } from '../types/types';

export default function HomeScreen({ navigation }) {
  return (
    <>
      <StyledBox flex={1} >
        <Header headerTx='homeScreen.headerTitle' />
        <HStack justifyContent='center' alignItems="center" flex={1} marginLeft={20}>
          <VStack h="$full" w="$full" justifyContent='center'>
            <VStack h="$full" w="$full" justifyContent='center' >
              <Pressable flex={0.5} justifyContent='flex-end' onPress={() => { navigation.navigate('Bols') }}  >
                {({ pressed }: PressableType) =>
                  <>
                    <HStack m={10} >
                      <HStack alignItems='center' flex={0.9} justifyContent='center' >
                        <Icon as={FileText} color="#1F4F7B" size={60}>
                        </Icon>
                      </HStack>
                      <VStack justifyContent='center' flex={2}>
                        <StyledText color={pressed ? "pink" : "black"}>{i18n.t('homeScreen.viewBols')}</StyledText>
                      </VStack>
                    </HStack>
                  </>
                }
              </Pressable>
              <Pressable flex={0.5} justifyContent='center' onPress={() => { navigation.navigate('Bols') }}  >
                {({ pressed }: PressableType) =>
                  <>
                    <HStack m={10} >
                      <HStack alignItems='center' justifyContent='center' flex={0.9} >
                        <Icon as={Container} color="#1F4F7B" size={60} >
                        </Icon>
                       <Box position='absolute'>
                       <Box marginTop={60} marginLeft={40}>
                       <Icon as={CheckCheck} color="$backgroundLight50" size={53} marginTop={-35} marginLeft={-2}>
                        </Icon>
                        <Icon as={CheckCheck} color="$backgroundLight50" size={50} marginTop={-55} marginLeft={-2}>
                        </Icon>
                        <Icon as={CheckCheck} color="$backgroundLight50" size={50} marginTop={-53} marginLeft={-2}>
                        </Icon>
                        <Icon as={CheckCheck} color="green" size={50} marginTop={-47} marginLeft={-0.5} >
                        </Icon>
                       </Box>
                       </Box>
                      </HStack>
                      <VStack justifyContent='center' flex={2} marginLeft={-8}>
                        <StyledText color={pressed ? "pink" : "black"}>{i18n.t('homeScreen.viewLoadEligibility')}</StyledText>
                      </VStack>
                    </HStack>
                  </>
                }
              </Pressable>
              <Pressable flex={1} justifyContent='flex-start' onPress={() => { navigation.navigate('MenuStack') }}  >
                {({ pressed }: PressableType) =>
                  <>
                    <HStack m={10} >
                      <HStack alignItems='center' flex={0.9} justifyContent='center'>
                        <Icon as={Menu} color="#1F4F7B" size={60}>
                        </Icon>
                      </HStack>
                      <VStack justifyContent='center' flex={2}>
                        <StyledText color={pressed ? "pink" : "black"}>{i18n.t('homeScreen.viewFullMenu')}</StyledText>
                        <Text color={pressed ? "pink" : "black"}>{i18n.t('bigMenu.profile')}</Text>
                        <Text color={pressed ? "pink" : "black"}>{i18n.t('bigMenu.settings')}</Text>
                        <Text color={pressed ? "pink" : "black"}>{i18n.t('bigMenu.privacyPolicy')}</Text>
                        <Text color={pressed ? "pink" : "black"}>{i18n.t('bigMenu.about')}</Text>
                      </VStack>
                    </HStack>
                  </>
                }
              </Pressable>
              {/* <ToggleMode /> */}
            </VStack>
          </VStack>
        </HStack>
      </StyledBox>
    </>
  );
}

