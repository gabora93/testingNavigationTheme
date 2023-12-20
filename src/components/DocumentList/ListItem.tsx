import React, { useState, useEffect } from 'react';
import { DocumentListProps } from "./DocumentList.props"
import { Menu, FileText, CheckCheck, Check } from 'lucide-react-native';
import { i18n } from '../../i18n/i18n';
import { Center, Icon, Checkbox, CheckboxIndicator, CheckboxIcon, CheckIcon, CheckboxLabel, Pressable } from "@gluestack-ui/themed"
import { translate } from "../../i18n/"
import { StatusBar } from 'expo-status-bar';
import { StyledHS, StyledText, StyledBox } from '../styledComponents/index';
import { StyledLinearGradient } from '../styledComponents/StyledLinearGradient';
import GradientIcon from '../styledComponents/GradientIcon';
import { FlatList, Box, Heading, VStack, HStack, Avatar, AvatarImage, Text, View } from '@gluestack-ui/themed';
import PDFIcon from "./PDFIcon";
import { StyleSheet, TouchableOpacity } from 'react-native';

const ListItem = ({ item, isSelected, onSelect }) => {
  return (
    <Box h={96} borderBottomWidth="$1" borderColor="$trueGray800" flexDirection='row'>

    <Pressable flex={0.5}>
        <VStack justifyContent="center" alignItems="center" >
            <Icon as={PDFIcon} size="xl" h={55} w={55} />
        </VStack>
        <VStack borderWidth={1} borderColor="blue" justifyContent='center' alignItems='center'  >
            <StyledText color='black' fontSize="$2xs">
                2320932023
            </StyledText>
        </VStack>
    </Pressable>

    <Pressable borderBottomWidth="$1" flex={2}>
        <VStack >
            <StyledText fontSize="$md" color='black' >{item.TransDate}</StyledText>
            <StyledText fontSize="$md" color='black'>Truck: {item.Terminal}</StyledText>
            <StyledText  fontSize="$md" color='black'>Trailer:{item.Terminal}</StyledText>
            <StyledText fontSize="$md" color='black'>{item.Terminal}</StyledText>
        </VStack>
    </Pressable>

    <Pressable onPress={onSelect} flex={0.5} borderWidth="$1" justifyContent='center' alignItems='center' >
        <View style={[styles.checkboxBase, isSelected && styles.checkboxChecked]} onPress={onSelect} >
            {isSelected && <Icon as={Check} size={24} color="white" />}
        </View>
    </Pressable>

</Box>
  );
};

const styles = StyleSheet.create({
  checkboxBase: {
    width: 30,
    height: 30,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#1f4f7b',
    backgroundColor: 'transparent',
    margin: 'auto',
  },
  checkboxChecked: {
    backgroundColor: '#1f4f7b',
  }


});

export default ListItem;