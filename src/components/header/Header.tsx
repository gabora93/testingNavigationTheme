import React from "react";
import { HeaderProps } from "./header.props"
import { Button, ButtonText, Box, Pressable, ShareIcon, SettingsIcon, ArrowLeftIcon, HStack, VStack, Heading, Text, View } from '@gluestack-ui/themed';
import { i18n } from '../../i18n/i18n';
import { Icon } from "@gluestack-ui/themed"
import { translate } from "../../i18n/"
import { StatusBar } from 'expo-status-bar';
import { StyledHS, StyledText } from '../styledComponents/index';
import { StyledLinearGradient } from '../styledComponents/StyledLinearGradient';
import { Share2, Settings } from 'lucide-react-native';
import GradientIcon from '../styledComponents/GradientIcon';

export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    onSharePress,
    onSettingsPress,
    rightButtons,
    leftIcon,
    withBack,
    headerText,
    headerTx,
    style,
    titleStyle,
    subtitle,
    bolViewer,
    shareIcon
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""
  return (
    <>
      <StatusBar translucent={false} backgroundColor='#1F4F7B' />
      <StyledLinearGradient justifyContent="space-between" start={[1, 1]} end={[1, 0]} colors={['#1c3c59', '#1f4f7b']}>

        <StyledHS px="$1" justifyContent="space-between" alignItems="center" w="100%"  >
          <HStack alignItems="center" flex={1} >
            {withBack ? (
              <Pressable onPress={onLeftPress}>
                <Icon as={ArrowLeftIcon} color="white" w="$8" h="$8" />
              </Pressable>
            ) : (<View />)}
          </HStack>

          <HStack justifyContent="center" >
            <StyledText>{header}</StyledText>
          </HStack>

          <HStack alignItems="center" flex={1} justifyContent="flex-end" space="xl" >
            {rightButtons ?
              <>
                <Pressable onPress={onSharePress}>
                  <Icon as={Share2} sx={{ _dark: { color: '' }, _light: { color: 'white' } }} size={40} />
                </Pressable>
                <Pressable onPress={onSettingsPress}>
                  <Icon as={Settings} sx={{ _dark: { color: '' }, _light: { color: 'white' } }} size={40} />
                </Pressable>
              </> :
              <>
              </>


            }
          </HStack>


        </StyledHS>
      </StyledLinearGradient>
    </>
  )
}
