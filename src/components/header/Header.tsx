import React from "react";
import { HeaderProps } from "./header.props"
import { Button, ButtonText, Box, InfoIcon, ShareIcon, SettingsIcon, ArrowLeftIcon, HStack, Heading, Text } from '@gluestack-ui/themed';
import { i18n } from '../../i18n/i18n';
import { Icon } from "@gluestack-ui/themed"
import { translate } from "../../i18n/"
import { StatusBar } from 'expo-status-bar';
import { StyledHS, StyledText } from '../styledComponents/index';
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    onSharePress,
    rightIcon,
    leftIcon,
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
      <StatusBar translucent={false} backgroundColor='#1F4F7B'/>
      <StyledHS >
        <HStack alignItems="center" display="none">
        </HStack>
        <HStack alignItems="center">
          <StyledText>{header}</StyledText>
        </HStack>
        <HStack m={8} alignItems="center" display="none">
          <Icon as={SettingsIcon} color="white" w="$8" h="$8" />
          <Icon as={SettingsIcon} color="white" w="$8" h="$8" />
        </HStack>
      </StyledHS>
    </>
  )
}
