import React from "react";
import { HeaderProps } from "./header.props"
import { styled, Button, ButtonText, Box, InfoIcon, ShareIcon, SettingsIcon, ArrowLeftIcon, HStack, Heading, Text } from '@gluestack-ui/themed';
import { i18n } from '../../i18n/i18n';
import { Icon } from "@gluestack-ui/themed"
import { translate } from "../../i18n/"
import { StatusBar } from 'expo-status-bar';
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
  const StyledText = styled(Text, {
    fontWeight: "$extrabold",
    fontStyle: "normal",
    fontSize: "$lg",
    color: "$white",
    _dark: {
      color: "$white",
    },
  });
  const StyledHStack = styled(HStack, {
    justifyContent: "center",
    height: '$16',
    backgroundColor: "#1F4F7B",
    _dark: {
      backgroundColor: "#1F4F7B",
    },
  })

  return (
    <>
      <StatusBar translucent={false} backgroundColor='#1F4F7B'/>
      <StyledHStack >
        <HStack alignItems="center" display="none">
        </HStack>
        <HStack alignItems="center">
          <StyledText>{header}</StyledText>
        </HStack>
        <HStack m={8} alignItems="center" display="none">
          <Icon as={SettingsIcon} color="white" w="$8" h="$8" />
          <Icon as={SettingsIcon} color="white" w="$8" h="$8" />
        </HStack>
      </StyledHStack>
    </>
  )
}
