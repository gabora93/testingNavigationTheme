import React from "react";
import { HeaderProps } from "./header.props"
import { StatusBar, styled, Button, ButtonText, Box, InfoIcon, ShareIcon, SettingsIcon, Text, ArrowLeftIcon, HStack, Heading } from '@gluestack-ui/themed';
import { translate } from "../../i18n/";
import { Icon } from "@gluestack-ui/themed"

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
    fontFamily: "Inter-Black",
    fontWeight: "$extrabold",
    fontStyle: "normal",
    fontSize: "$xl",
    color: "$white",
    _dark: {
      color: "$white",
    },
  })
  return (
    <>
    <StatusBar backgroundColor="#7CB236" />
    <Box bg="$violet600"/>
      <HStack h='$16' justifyContent="center" bg="$darkBlue700" >
      <HStack alignItems="center" display="none">
        <>
        </>
      </HStack>
      <HStack alignItems="center">
        <StyledText>{header}</StyledText>
      </HStack>
      <HStack m={8} alignItems="center" display="none">
        <Icon as={SettingsIcon} color="white"  w="$8" h="$8"/>
        <Icon as={SettingsIcon} color="white" w="$8" h="$8"/>
        </HStack>
      </HStack>
      </>
  )
}
